'use client';

import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { PartId } from '@/lib/data';
import {
  canvasTexture,
  controllerShape,
  crossShape,
  drawBoard,
  drawScreen,
  fitTexture,
  roundedRectShape,
} from '@/lib/controllerModel';
import { pose } from '@/lib/sceneState';

/** Front face of the front shell (local z). */
const FACE = 0.27;
const BUTTON_COLORS = ['#67e8f9', '#a78bfa', '#f0abfc', '#e2e8f0'];
const BUTTON_OFFSETS: [number, number][] = [
  [0, 0.13],
  [0.13, 0],
  [0, -0.13],
  [-0.13, 0],
];

/** Empty object marking where a part's label points; PartLabels follows it on screen. */
function Anchor({ id, position, onRef }: { id: PartId; position: [number, number, number]; onRef: (id: PartId, o: THREE.Object3D | null) => void }) {
  return <object3D position={position} ref={(o) => onRef(id, o)} />;
}

function useMaterials() {
  return useMemo(() => {
    const shell = new THREE.MeshPhysicalMaterial({
      color: '#3a3e46',
      metalness: 0.6,
      roughness: 0.36,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
    });
    const back = new THREE.MeshPhysicalMaterial({
      color: '#16181c',
      metalness: 0.55,
      roughness: 0.55,
      clearcoat: 0.4,
    });
    const titanium = new THREE.MeshPhysicalMaterial({ color: '#c9ced6', metalness: 1, roughness: 0.25 });
    const rubber = new THREE.MeshStandardMaterial({ color: '#0d0e10', roughness: 0.85, metalness: 0.1 });
    const recess = new THREE.MeshStandardMaterial({ color: '#040405', roughness: 0.9 });
    const dpad = new THREE.MeshPhysicalMaterial({ color: '#1d2026', metalness: 0.6, roughness: 0.3, clearcoat: 1 });
    const glow = new THREE.MeshBasicMaterial({ color: '#7dd3fc', toneMapped: false });
    const buttons = BUTTON_COLORS.map(
      (c) =>
        new THREE.MeshPhysicalMaterial({
          color: '#0b0c10',
          emissive: c,
          emissiveIntensity: 0.55,
          roughness: 0.15,
          clearcoat: 1,
          transmission: 0,
        }),
    );
    return { shell, back, titanium, rubber, recess, dpad, glow, buttons };
  }, []);
}

function useGeometries() {
  return useMemo(() => {
    const extrude = (shape: THREE.Shape, depth: number, bevel: number, segments = 6) =>
      new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel * 0.85,
        bevelSegments: segments,
        curveSegments: 64,
      });

    const body = controllerShape();
    const half = extrude(body, 0.1, 0.085, 10);
    // Front half spans z 0..FACE, back half mirrors it.
    half.translate(0, 0, 0.085);
    const backHalf = half.clone();
    // Rotating (not mirroring) keeps the triangle winding, and the outline is symmetric.
    backHalf.rotateY(Math.PI);

    const board = new THREE.ExtrudeGeometry(controllerShape(0.86), { depth: 0.02, bevelEnabled: false, curveSegments: 48 });
    board.translate(0, 0, -0.01);

    const screen = extrude(roundedRectShape(0.62, 0.32, 0.06), 0.012, 0.008, 3);
    const cross = extrude(crossShape(0.3, 0.1), 0.03, 0.014, 3);

    return {
      half,
      backHalf,
      board,
      screen,
      cross,
      ring: new THREE.TorusGeometry(0.165, 0.022, 16, 64),
      recess: new THREE.CircleGeometry(0.17, 48),
      shaft: new THREE.CylinderGeometry(0.055, 0.07, 0.12, 24),
      cap: new THREE.CylinderGeometry(0.135, 0.125, 0.05, 48),
      capRim: new THREE.TorusGeometry(0.118, 0.016, 12, 48),
      button: new THREE.CylinderGeometry(0.058, 0.058, 0.045, 32),
      small: new THREE.CapsuleGeometry(0.022, 0.06, 6, 12),
      home: new THREE.CylinderGeometry(0.045, 0.045, 0.02, 32),
      homeRing: new THREE.TorusGeometry(0.058, 0.006, 8, 48),
      bar: new THREE.BoxGeometry(0.36, 0.012, 0.01),
    };
  }, []);
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const projected = new THREE.Vector3();

export default function Controller() {
  const m = useMaterials();
  const g = useGeometries();
  const screenMat = useMemo(() => new THREE.MeshPhysicalMaterial({ roughness: 0.12, clearcoat: 1, color: '#000' }), []);
  const boardMat = useMemo(() => new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.2 }), []);

  const frontRef = useRef<THREE.Group>(null);
  const backRef = useRef<THREE.Mesh>(null);
  const boardRef = useRef<THREE.Mesh>(null);
  const screenRef = useRef<THREE.Group>(null);
  const stickLRef = useRef<THREE.Group>(null);
  const stickRRef = useRef<THREE.Group>(null);
  const dpadRef = useRef<THREE.Group>(null);
  const buttonsRef = useRef<THREE.Group>(null);
  const bumperLRef = useRef<THREE.Mesh>(null);
  const bumperRRef = useRef<THREE.Mesh>(null);
  const labelsRef = useRef(-1);
  const explode = useRef(0);
  const screenMeshRef = useRef<THREE.Mesh>(null);
  const anchors = useRef(new Map<PartId, THREE.Object3D>());
  const setAnchor = (id: PartId, o: THREE.Object3D | null) => {
    if (o) anchors.current.set(id, o);
    else anchors.current.delete(id);
  };

  useEffect(() => {
    // Materials are reached through the mesh refs: three.js objects are mutable by design.
    const screenMesh = screenMeshRef.current;
    const boardMesh = boardRef.current;
    if (!screenMesh || !boardMesh) return;
    const paint = () => {
      const screen = fitTexture(canvasTexture(1024, 528, drawScreen), 0.62, 0.32);
      const sm = screenMesh.material as THREE.MeshPhysicalMaterial;
      sm.emissiveMap = screen;
      sm.emissive.set('#ffffff');
      sm.emissiveIntensity = 1.1;
      sm.needsUpdate = true;
      const board = fitTexture(canvasTexture(1024, 600, drawBoard), 2.06, 1.2, 0, -0.19);
      const bm = boardMesh.material as THREE.MeshStandardMaterial;
      bm.map = board;
      bm.emissiveMap = board;
      bm.emissive.set('#ffffff');
      bm.emissiveIntensity = 0.5;
      bm.needsUpdate = true;
      return [screen, board];
    };
    let textures = paint();
    // Repaint once the web font is ready so the monogram uses it.
    document.fonts?.ready.then(() => {
      textures.forEach((t) => t.dispose());
      textures = paint();
    });
    return () => textures.forEach((t) => t.dispose());
  }, []);

  useEffect(
    () => () => {
      Object.values(g).forEach((geo) => geo.dispose());
      [screenMat, boardMat, m.shell, m.back, m.titanium, m.rubber, m.recess, m.dpad, m.glow, ...m.buttons].forEach((mat) =>
        mat.dispose(),
      );
    },
    [g, m, screenMat, boardMat],
  );

  useFrame((state, dt) => {
    explode.current = THREE.MathUtils.damp(explode.current, pose.explode, 5, dt);
    const e = smooth(Math.min(1, Math.max(0, explode.current)));
    frontRef.current?.position.set(0, 0, e * 0.42);
    backRef.current?.position.set(0, 0, -e * 0.85);
    boardRef.current?.position.set(0, 0, -e * 0.12);
    screenRef.current?.position.set(0, 0.16 + e * 0.12, FACE + e * 0.75);
    stickLRef.current?.position.set(-0.36 - e * 0.18, -0.2 - e * 0.08, FACE + e * 0.55);
    stickRRef.current?.position.set(0.36 + e * 0.18, -0.2 - e * 0.08, FACE + e * 0.55);
    dpadRef.current?.position.set(-0.66 - e * 0.32, 0.1 + e * 0.06, FACE + e * 0.4);
    buttonsRef.current?.position.set(0.66 + e * 0.32, 0.1 + e * 0.06, FACE + e * 0.4);
    buttonsRef.current?.children.forEach((b, i) => {
      const [ox, oy] = BUTTON_OFFSETS[i] ?? [0, 0];
      b.position.set(ox * (1 + e * 0.6), oy * (1 + e * 0.6), 0.02);
    });
    bumperLRef.current?.position.set(-0.66, 0.52 + e * 0.38, -e * 0.1);
    bumperRRef.current?.position.set(0.66, 0.52 + e * 0.38, -e * 0.1);

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
        const x = ((projected.x + 1) / 2) * width;
        const y = ((1 - projected.y) / 2) * height;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      });
    }
  });

  const button = (i: number) => (
    <mesh key={i} geometry={g.button} material={m.buttons[i]} rotation-x={Math.PI / 2} />
  );

  const stick = (side: 'L' | 'R') => (
    <group ref={side === 'L' ? stickLRef : stickRRef}>
      <mesh geometry={g.shaft} material={m.titanium} rotation-x={Math.PI / 2} position-z={0.06} />
      <mesh geometry={g.cap} material={m.rubber} rotation-x={Math.PI / 2} position-z={0.13} />
      <mesh geometry={g.capRim} material={m.titanium} position-z={0.156} />
      <Anchor onRef={setAnchor} id={side === 'L' ? 'stickL' : 'stickR'} position={[side === 'L' ? -0.12 : 0.12, -0.32, 0.15]} />
    </group>
  );

  return (
    <group>
      <mesh ref={backRef} geometry={g.backHalf} material={m.back}>
        <Anchor onRef={setAnchor} id="back" position={[0.8, -0.65, -0.3]} />
      </mesh>

      <mesh ref={boardRef} geometry={g.board} material={boardMat}>
        <Anchor onRef={setAnchor} id="pcb" position={[-0.85, -0.55, 0.05]} />
      </mesh>

      <group ref={frontRef}>
        <mesh geometry={g.half} material={m.shell} />
        {/* Stick wells and their titanium rings stay on the shell. */}
        {[-0.36, 0.36].map((x) => (
          <group key={x} position={[x, -0.2, FACE + 0.002]}>
            <mesh geometry={g.recess} material={m.recess} />
            <mesh geometry={g.ring} material={m.titanium} />
          </group>
        ))}
        {[-0.42, 0.42].map((x) => (
          <mesh key={x} geometry={g.small} material={m.titanium} position={[x, 0.36, FACE + 0.01]} rotation-z={Math.PI / 2} />
        ))}
        <group position={[0, -0.12, FACE + 0.012]}>
          <mesh geometry={g.home} material={m.dpad} rotation-x={Math.PI / 2} />
          <mesh geometry={g.homeRing} material={m.glow} position-z={0.011} />
        </group>
        <mesh geometry={g.bar} material={m.glow} position={[0, 0.4, FACE + 0.004]} />
      </group>

      <group ref={screenRef}>
        <mesh ref={screenMeshRef} geometry={g.screen} material={screenMat} />
        <Anchor onRef={setAnchor} id="screen" position={[-0.12, 0.3, 0.05]} />
      </group>

      {stick('L')}
      {stick('R')}

      <group ref={dpadRef}>
        <mesh geometry={g.cross} material={m.dpad} />
        <Anchor onRef={setAnchor} id="dpad" position={[-0.05, 0.3, 0.06]} />
      </group>

      <group ref={buttonsRef}>
        {BUTTON_COLORS.map((_, i) => button(i))}
        <Anchor onRef={setAnchor} id="buttons" position={[0.22, 0.24, 0.06]} />
      </group>

      <RoundedBox ref={bumperLRef} args={[0.5, 0.12, 0.36]} radius={0.05} smoothness={4} material={m.shell} />
      <RoundedBox ref={bumperRRef} args={[0.5, 0.12, 0.36]} radius={0.05} smoothness={4} material={m.shell} />
    </group>
  );
}
