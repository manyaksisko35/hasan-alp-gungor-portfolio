/**
 * Pose of the 3D controller. GSAP ScrollTriggers write it, the render loop
 * reads it every frame and eases toward it.
 */
export const pose = {
  x: 0,
  y: -0.5,
  z: 0,
  rotX: 0.66,
  rotY: 0,
  rotZ: 0,
  scale: 1,
  /** 0 = assembled, 1 = fully exploded. */
  explode: 0,
  /** Opacity of the part labels. */
  labels: 0,
  /** Opacity of the whole canvas layer. */
  visible: 1,
};

export type Pose = typeof pose;

/** Drag-to-spin state for the hero. */
export const spin = { angle: 0, velocity: 0, dragging: false };

export function stepSpin(dt: number) {
  if (spin.dragging) return;
  spin.angle += spin.velocity * dt;
  spin.velocity *= Math.pow(0.04, dt);
  // Soft spring back to the front once it slows down.
  if (Math.abs(spin.velocity) < 0.6) {
    const target = Math.round(spin.angle / (Math.PI * 2)) * Math.PI * 2;
    spin.angle += (target - spin.angle) * Math.min(1, dt * 2.4);
  }
}
