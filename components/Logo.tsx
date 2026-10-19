'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { PartId } from '@/lib/data';
import { LOGO_PIECES } from '@/lib/logoShape';
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

/**
 * Clear glass: almost invisible where it faces you and bright at grazing angles (Fresnel),
 * so the real page background shows through the transparent canvas.
 */
function useGlassMaterial() {
  return useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: '#3a3d44',
      metalness: 0,
      roughness: 0.04,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      iridescence: 0.35,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [120, 480],
      envMapIntensity: 2.2,
      specularIntensity: 1,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    m.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        `
        float fresnel = pow(1.0 - saturate(abs(dot(normal, geometryViewDir))), 2.2);
        float glint = max(0.0, dot(outgoingLight, vec3(0.299, 0.587, 0.114)) - 0.35) * 1.4;
        float glassAlpha = clamp(0.14 + 0.75 * fresnel + glint, 0.0, 0.95);
        // Luminous rim, like light caught in the edge of thick glass.
        vec3 rim = vec3(1.0) * pow(fresnel, 1.4) * 0.65;
        gl_FragColor = vec4(outgoingLight + rim, glassAlpha);
        `,
      );
    };
    return m;
  }, []);
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const projected = new THREE.Vector3();

export default function Logo() {
  const glass = useGlassMaterial();

  const pieces = useMemo(
    () =>
      LOGO_PIECES.map((p, i) => {
        const shape = new THREE.Shape(toVec2(p.outer));
        shape.holes = p.holes.map((h) => new THREE.Path(toVec2(h)));
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: DEPTH,
          bevelEnabled: true,
          bevelThickness: BEVEL,
          bevelSize: BEVEL * 0.8,
          bevelSegments: 8,
          curveSegments: 1,
        });
        // Centre each piece on its own origin so it can tilt in place.
        geometry.translate(-p.center[0], -p.center[1], -DEPTH / 2);
        return { key: `${p.id}-${i}`, id: p.id as PartId, center: p.center, geometry, labelled: LOGO_PIECES.findIndex((q) => q.id === p.id) === i };
      }),
    [],
  );

  useEffect(
    () => () => {
      pieces.forEach((p) => p.geometry.dispose());
      glass.dispose();
    },
    [pieces, glass],
  );

  const groups = useRef<(THREE.Group | null)[]>([]);
  const anchors = useRef(new Map<PartId, THREE.Object3D>());
  const explode = useRef(0);
  const labelsRef = useRef(-1);

  useFrame((state, dt) => {
    explode.current = THREE.MathUtils.damp(explode.current, pose.explode, 5, dt);
    const e = smooth(Math.min(1, Math.max(0, explode.current)));

    pieces.forEach((p, i) => {
      const g = groups.current[i];
      if (!g) return;
      const { move, tilt } = EXPLODE[p.id];
      g.position.set(p.center[0] + move[0] * e, p.center[1] + move[1] * e, move[2] * e);
      g.rotation.set(tilt[0] * e, tilt[1] * e, 0);
    });

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
    <group>
      {pieces.map((p, i) => (
        <group key={p.key} ref={(g) => void (groups.current[i] = g)}>
          <mesh geometry={p.geometry} material={glass} renderOrder={i} />
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
  );
}
