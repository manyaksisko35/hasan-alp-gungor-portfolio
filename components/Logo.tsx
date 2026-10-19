'use client';

import { MeshTransmissionMaterial, useFBO } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { PartId } from '@/lib/data';
import { LOGO_PIECES, LOGO_WHOLE } from '@/lib/logoShape';
import { pose } from '@/lib/sceneState';

const DEPTH = 0.18;
const BEVEL = 0.06;

/** How far each piece travels when the logo comes apart (x, y, z) and how much it tilts. */
const EXPLODE: Record<PartId, { move: [number, number, number]; tilt: [number, number] }> = {
  web: { move: [0, 0.18, 0.75], tilt: [-0.25, 0] },
  csharp: { move: [-0.6, 0.08, 0.2], tilt: [0.1, 0.45] },
  python: { move: [-0.3, -0.05, 0.55], tilt: [0.2, 0.25] },
  game: { move: [0.3, -0.05, 0.55], tilt: [0.2, -0.25] },
  three: { move: [0.6, 0.08, 0.2], tilt: [0.1, -0.45] },
  hardware: { move: [0, -0.18, -0.35], tilt: [0.3, 0] },
  backend: { move: [0, -0.36, 0.25], tilt: [0.45, 0] },
};

/** Where each label points, relative to its piece's centre. */
const LABEL_OFFSET: Record<PartId, [number, number, number]> = {
  web: [0, 0.42, 0.1],
  csharp: [-0.28, 0.5, 0.1],
  python: [-0.1, -0.28, 0.1],
  game: [0.1, -0.28, 0.1],
  three: [0.28, 0.5, 0.1],
  hardware: [0.32, 0, 0.1],
  backend: [0.3, -0.25, 0.1],
};

const toVec2 = (pts: readonly (readonly number[])[]) => pts.map(([x, y]) => new THREE.Vector2(x, y));

type Outline = { readonly outer: readonly (readonly number[])[]; readonly holes: readonly (readonly (readonly number[])[])[] };

function extrude({ outer, holes }: Outline) {
  const shape = new THREE.Shape(toVec2(outer));
  shape.holes = holes.map((h) => new THREE.Path(toVec2(h)));
  return new THREE.ExtrudeGeometry(shape, {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: BEVEL * 0.8,
    bevelSegments: 8,
    curveSegments: 1,
  });
}

/**
 * A stand-in for the page background (the silver light behind the canvas). It is drawn
 * only into an off-screen buffer that the glass refracts, never on screen.
 */
const BACKDROP_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
  }
`;
const BACKDROP_FRAG = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  vec3 lin(vec3 c) { return pow(c, vec3(2.2)); }
  float blob(vec2 uv, vec2 c, float r) { return smoothstep(r, 0.0, distance(uv, c)); }
  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.05;
    vec3 col = mix(vec3(0.15, 0.153, 0.168), vec3(0.086, 0.086, 0.094), clamp(uv.x * 0.5 + (1.0 - uv.y) * 0.5, 0.0, 1.0));
    col += 0.30 * blob(uv, vec2(0.12 + 0.06 * sin(t * 3.1), 0.86 + 0.05 * cos(t * 2.3)), 0.62);
    col += 0.22 * blob(uv, vec2(0.92 + 0.05 * cos(t * 2.7), 0.6 + 0.06 * sin(t * 1.9)), 0.55);
    col += 0.22 * blob(uv, vec2(0.45 + 0.07 * sin(t * 1.7), 0.05 + 0.04 * cos(t * 2.9)), 0.6);
    col += 0.14 * blob(uv, vec2(0.62 + 0.08 * cos(t * 3.7), 0.55 + 0.05 * sin(t * 2.1)), 0.32);
    // Thin bright bands give the refraction crisp detail to bend.
    col += 0.022 * smoothstep(0.012, 0.0, abs(fract(uv.y * 4.0 + uv.x * 1.5 + t) - 0.5) - 0.47);
    // Same darkening the page applies on top of its light.
    col *= mix(1.0, 0.6, clamp(distance(uv, vec2(0.5, 0.6)) * 1.3, 0.0, 1.0));
    gl_FragColor = vec4(lin(clamp(col, 0.0, 1.0)), 1.0);
  }
`;

/** Liquid glass: refracts the backdrop with chromatic aberration and a slow, wavy distortion. */
function Glass({ buffer }: { buffer: THREE.Texture }) {
  return (
    <MeshTransmissionMaterial
      buffer={buffer}
      resolution={32}
      samples={8}
      transmission={1}
      thickness={0.42}
      roughness={0.04}
      ior={1.5}
      chromaticAberration={0.14}
      anisotropicBlur={0.08}
      distortion={0.45}
      distortionScale={0.35}
      temporalDistortion={0.12}
      clearcoat={1}
      clearcoatRoughness={0.04}
      iridescence={0.25}
      iridescenceIOR={1.3}
      iridescenceThicknessRange={[120, 420]}
      attenuationDistance={6}
      attenuationColor="#ffffff"
      color="#ffffff"
      envMapIntensity={1.2}
    />
  );
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const projected = new THREE.Vector3();

export default function Logo() {
  const fbo = useFBO(1024, 1024);
  const backdropMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: BACKDROP_VERT,
        fragmentShader: BACKDROP_FRAG,
        uniforms: { uTime: { value: 0 } },
        depthTest: false,
        depthWrite: false,
      }),
    [],
  );

  const pieces = useMemo(
    () =>
      LOGO_PIECES.map((p, i) => {
        const geometry = extrude(p);
        // Centre each piece on its own origin so it can tilt in place.
        geometry.translate(-p.center[0], -p.center[1], -DEPTH / 2);
        return { key: `${p.id}-${i}`, id: p.id as PartId, center: p.center, geometry, labelled: LOGO_PIECES.findIndex((q) => q.id === p.id) === i };
      }),
    [],
  );

  const whole = useMemo(() => {
    const geometry = extrude(LOGO_WHOLE);
    geometry.translate(0, 0, -DEPTH / 2);
    return geometry;
  }, []);

  useEffect(
    () => () => {
      pieces.forEach((p) => p.geometry.dispose());
      whole.dispose();
      backdropMat.dispose();
    },
    [pieces, whole, backdropMat],
  );

  const logoRef = useRef<THREE.Group>(null);
  const backdropRef = useRef<THREE.Mesh>(null);
  const wholeRef = useRef<THREE.Mesh>(null);
  const piecesRef = useRef<THREE.Group>(null);
  const crack = useRef(0);

  const groups = useRef<(THREE.Group | null)[]>([]);
  const anchors = useRef(new Map<PartId, THREE.Object3D>());
  const explode = useRef(0);
  const labelsRef = useRef(-1);

  useFrame((state, dt) => {
    explode.current = THREE.MathUtils.damp(explode.current, pose.explode, 5, dt);
    crack.current = THREE.MathUtils.damp(crack.current, pose.crack, 6, dt);
    const e = smooth(Math.min(1, Math.max(0, explode.current)));
    // Intact until halfway, then the cracked pieces take over and the cracks open a little.
    const cracked = crack.current > 0.5 || e > 0.001;
    const open = smooth(Math.min(1, Math.max(0, (crack.current - 0.5) * 2)));
    if (wholeRef.current) wholeRef.current.visible = !cracked;
    if (piecesRef.current) piecesRef.current.visible = cracked;

    pieces.forEach((p, i) => {
      const g = groups.current[i];
      if (!g) return;
      const { move, tilt } = EXPLODE[p.id];
      // Cracks open a hair (with a slight per-piece jitter) before the logo comes apart.
      const gap = 0.045 * open * (1 + (i % 3) * 0.35);
      const k = gap + e;
      g.position.set(p.center[0] + move[0] * k, p.center[1] + move[1] * k, move[2] * k);
      g.rotation.set(tilt[0] * (0.08 * open + e), tilt[1] * (0.08 * open + e), (i % 2 ? 1 : -1) * 0.015 * open * (1 - e));
    });

    // Render the backdrop alone into the buffer the glass refracts.
    const logo = logoRef.current;
    const backdrop = backdropRef.current;
    if (logo && backdrop) {
      (backdrop.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
      logo.visible = false;
      backdrop.visible = true;
      state.gl.setRenderTarget(fbo);
      state.gl.render(state.scene, state.camera);
      state.gl.setRenderTarget(null);
      backdrop.visible = false;
      logo.visible = true;
    }

    const labels = Math.round(pose.labels * 100) / 100;
    if (labels !== labelsRef.current) {
      labelsRef.current = labels;
      document.documentElement.style.setProperty('--part-labels', String(labels));
    }
    // Pin each DOM label (see PartLabels) to its anchor's screen position.
    if (labels > 0) {
      const { width, height } = state.size;
      anchors.current.forEach((anchor, id) => {
        const el = document.getElementById(`part-label-${id}`);
        if (!el) return;
        anchor.updateWorldMatrix(true, false);
        projected.setFromMatrixPosition(anchor.matrixWorld).project(state.camera);
        el.style.transform = `translate3d(${((projected.x + 1) / 2) * width}px, ${((1 - projected.y) / 2) * height}px, 0) translate(-50%, -50%)`;
      });
    }
  });

  return (
    <>
      <mesh ref={backdropRef} material={backdropMat} visible={false} frustumCulled={false} renderOrder={-1}>
        <planeGeometry args={[1, 1]} />
      </mesh>
      <group ref={logoRef}>
      <mesh ref={wholeRef} geometry={whole}>
        <Glass buffer={fbo.texture} />
      </mesh>
      <group ref={piecesRef} visible={false}>
      {pieces.map((p, i) => (
        <group key={p.key} ref={(g) => void (groups.current[i] = g)}>
          <mesh geometry={p.geometry}>
            <Glass buffer={fbo.texture} />
          </mesh>
          {p.labelled && (
            <object3D
              position={LABEL_OFFSET[p.id]}
              ref={(o) => {
                if (o) anchors.current.set(p.id, o);
                else anchors.current.delete(p.id);
              }}
            />
          )}
        </group>
      ))}
      </group>
      </group>
    </>
  );
}
