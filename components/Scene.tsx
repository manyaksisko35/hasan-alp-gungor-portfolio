'use client';

import { Environment, Lightformer } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import Logo from '@/components/Logo';
import PartLabels from '@/components/PartLabels';
import { pose, spin, stepSpin, type Pose } from '@/lib/sceneState';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function StudioEnv() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={3} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
      <Lightformer form="rect" intensity={2.4} position={[-5, 0.5, 1]} rotation-y={Math.PI / 2} scale={[2.5, 9, 1]} />
      <Lightformer form="rect" intensity={2.4} position={[5, 0.5, 1]} rotation-y={-Math.PI / 2} scale={[2.5, 9, 1]} />
      <Lightformer form="rect" intensity={2.2} position={[0, 0, 6]} rotation-y={Math.PI} scale={[8, 5, 1]} />
      <Lightformer form="rect" intensity={1.6} position={[0, 3.5, 4]} rotation-x={Math.PI / 3} scale={[6, 2, 1]} />
      <Lightformer form="ring" color="#ffffff" intensity={1.6} position={[0, 0, -6]} scale={5} />
      <Lightformer form="ring" color="#9ca3af" intensity={1.2} position={[-4, -2, -4]} scale={3} />
    </Environment>
  );
}

/** Applies the scroll pose (eased), drag spin, idle float and pointer parallax. */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const reduce = useReducedMotion();
  const { viewport } = useThree();
  const cur = useRef<Pose>({ ...pose });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const g = ref.current;
    if (!g) return;
    stepSpin(dt);
    const c = cur.current;
    const k = reduce ? 1 : 1 - Math.exp(-dt * 5);
    (Object.keys(pose) as (keyof Pose)[]).forEach((key) => {
      c[key] += (pose[key] - c[key]) * k;
    });

    const t = state.clock.elapsedTime;
    const float = reduce ? 0 : 1;
    // The logo is tall: fit it to whichever side of the viewport is tighter.
    const fit = THREE.MathUtils.clamp(Math.min(viewport.width / 3.3, viewport.height / 3.4), 0.45, 1.1);
    g.position.set(
      (c.x * viewport.width) / 2,
      (c.y * viewport.height) / 2 + Math.sin(t * 1.1) * 0.035 * float,
      c.z,
    );
    g.scale.setScalar(fit * c.scale);
    g.rotation.set(
      c.rotX - state.pointer.y * 0.08 * float,
      c.rotY + spin.angle + state.pointer.x * 0.14 * float,
      c.rotZ + Math.sin(t * 0.7) * 0.025 * float,
    );
  });

  return <group ref={ref}>{children}</group>;
}

type Keyframe = Partial<Pose>;

/** Scroll story: hero → about (to the side) → skills (front, then explode and turn) → fly out. */
function useScrollStory(layer: React.RefObject<HTMLDivElement | null>, setActive: (on: boolean) => void) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ desktop: '(min-width: 1024px)', mobile: '(max-width: 1023px)' }, (ctx) => {
      const desktop = !!ctx.conditions?.desktop;
      const K: Keyframe[] = [
        desktop
          ? { x: 0.5, y: -0.04, z: 0, rotX: 0.06, rotY: -0.38, rotZ: 0, scale: 0.66, crack: 0, explode: 0, labels: 0, visible: 1 }
          : { x: 0, y: -0.52, z: 0, rotX: 0.06, rotY: -0.25, rotZ: 0, scale: 0.5, crack: 0, explode: 0, labels: 0, visible: 1 },
        desktop
          ? { x: 0.5, y: 0.3, rotX: 0.1, rotY: -0.9, rotZ: 0.05, scale: 0.8, visible: 0 }
          : { x: 0, y: 0.5, rotX: 0.1, rotY: -0.7, rotZ: 0.05, scale: 0.5, visible: 0 },
        desktop
          ? { x: 0.32, y: -0.08, rotX: 0.06, rotY: 0.32, rotZ: 0, scale: 0.62, visible: 1 }
          : { x: 0, y: 0.12, rotX: 0.06, rotY: 0.32, rotZ: 0, scale: 0.45, visible: 1 },
        { rotX: 0.1, rotY: 0.42, crack: 1 },
        { rotX: 0.12, rotY: 0.55, explode: 1, labels: 1 },
        { rotX: 0.08, rotY: -0.5, explode: 1, labels: 1 },
        { y: 1.7, rotX: 0.5, rotY: -0.2, explode: 0, labels: 0, scale: 0.7, visible: 0 },
      ];
      // Fill each keyframe from the previous one so every tween has explicit from/to values.
      for (let i = 1; i < K.length; i++) K[i] = { ...K[i - 1], ...K[i] };
      Object.assign(pose, K[0]);

      const seg = (from: Keyframe, to: Keyframe, trigger: string, start: string, end: string) =>
        gsap.fromTo(pose, { ...from }, { ...to, ease: 'none', immediateRender: false, scrollTrigger: { trigger, start, end, scrub: true } });

      seg(K[0], K[1], '#top', 'top top', 'bottom top');
      seg(K[1], K[2], '#skills', 'top bottom', 'top top');
      const turn = gsap.timeline({
        scrollTrigger: { trigger: '#skills', start: 'top top', end: 'bottom bottom', scrub: true },
      });
      // Intact → cracked → hold → apart → turn.
      turn
        .fromTo(pose, { ...K[2] }, { ...K[3], ease: 'power2.in', duration: 0.18, immediateRender: false })
        .to({}, { duration: 0.08 })
        .fromTo(pose, { ...K[3] }, { ...K[4], ease: 'power1.inOut', duration: 0.32, immediateRender: false })
        .fromTo(pose, { ...K[4] }, { ...K[5], ease: 'none', duration: 0.42, immediateRender: false });
      seg(K[5], K[6], '#skills', 'bottom bottom', 'bottom top');
    });

    ScrollTrigger.create({
      trigger: '#scene-track',
      start: 'top top',
      end: 'bottom top',
      onToggle: (self) => setActive(self.isActive),
    });

    const fade = () => {
      if (layer.current) layer.current.style.opacity = String(pose.visible);
    };
    gsap.ticker.add(fade);
    return () => {
      gsap.ticker.remove(fade);
      mm.revert();
    };
  });
}

export default function Scene() {
  const layer = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  useScrollStory(layer, setActive);

  return (
    <div ref={layer} className="absolute inset-0" style={{ visibility: active ? 'visible' : 'hidden' }}>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? 'always' : 'never'}
        camera={{ fov: 30, position: [0, 0, 7], near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={() => {
          document.documentElement.dataset.sceneReady = '1';
          window.dispatchEvent(new Event('scene-ready'));
        }}
      >
        <StudioEnv />
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 2.5, -5]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <directionalLight position={[-4, 1, 4]} intensity={0.6} color="#e5e7eb" />
        <Rig>
          <Logo />
        </Rig>
      </Canvas>
      <PartLabels />
    </div>
  );
}
