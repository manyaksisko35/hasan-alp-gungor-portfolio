/**
 * Pointer position over the whole window in normalised device coordinates (-1..1).
 * The 3D canvas sits under the page and gets no pointer events, so it reads this instead.
 */
export const pointer = { x: 0, y: 0, active: false };

let attached = false;

export function trackPointer() {
  if (attached) return;
  attached = true;
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.active = true;
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => (pointer.active = false));
  window.addEventListener('blur', () => (pointer.active = false));
}
