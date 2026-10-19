import * as THREE from 'three';

type Pt = [number, number];
/** Right half of the silhouette as cubic segments [c1, c2, end], starting at RIGHT_START. */
const RIGHT_START: Pt = [0.5, 0.46];
const RIGHT: [Pt, Pt, Pt][] = [
  [[0.78, 0.48], [0.98, 0.44], [1.06, 0.26]],
  [[1.16, 0.04], [1.2, -0.3], [1.18, -0.52]],
  [[1.16, -0.8], [0.98, -0.92], [0.84, -0.88]],
  [[0.7, -0.84], [0.64, -0.7], [0.58, -0.56]],
  [[0.5, -0.4], [0.34, -0.36], [0, -0.36]],
];

/** Gamepad outline in the XY plane, mirrored from the right half. */
export function controllerShape(scale = 1): THREE.Shape {
  const s = (p: Pt, mirror = false) => [(mirror ? -p[0] : p[0]) * scale, p[1] * scale] as const;
  const shape = new THREE.Shape();
  shape.moveTo(...s([0, 0.46]));
  shape.lineTo(...s(RIGHT_START));
  for (const [c1, c2, end] of RIGHT) shape.bezierCurveTo(...s(c1), ...s(c2), ...s(end));
  for (let i = RIGHT.length - 1; i >= 0; i--) {
    const [c1, c2] = RIGHT[i];
    const start = i === 0 ? RIGHT_START : RIGHT[i - 1][2];
    shape.bezierCurveTo(...s(c2, true), ...s(c1, true), ...s(start, true));
  }
  shape.lineTo(...s([0, 0.46]));
  return shape;
}

export function roundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const x = -w / 2;
  const y = -h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

export function crossShape(len: number, arm: number): THREE.Shape {
  const a = arm / 2;
  const l = len / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-a, l);
  shape.lineTo(a, l);
  shape.lineTo(a, a);
  shape.lineTo(l, a);
  shape.lineTo(l, -a);
  shape.lineTo(a, -a);
  shape.lineTo(a, -l);
  shape.lineTo(-a, -l);
  shape.lineTo(-a, -a);
  shape.lineTo(-l, -a);
  shape.lineTo(-l, a);
  shape.lineTo(-a, a);
  shape.lineTo(-a, l);
  return shape;
}

/** Map the planar UVs ExtrudeGeometry generates (world XY) onto 0..1 for a box of w×h centered at cx, cy. */
export function fitTexture(tex: THREE.Texture, w: number, h: number, cx = 0, cy = 0) {
  tex.repeat.set(1 / w, 1 / h);
  tex.offset.set(0.5 - cx / w, 0.5 - cy / h);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (ctx) draw(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function fontStack() {
  return getComputedStyle(document.body).fontFamily || 'system-ui, sans-serif';
}

/** The glass touch screen: an aurora wallpaper with the monogram. */
export function drawScreen(ctx: CanvasRenderingContext2D) {
  const { width: w, height: h } = ctx.canvas;
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0a0404');
  bg.addColorStop(1, '#140606');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const blob = (x: number, y: number, r: number, color: string) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  };
  blob(w * 0.18, h * 0.85, w * 0.5, 'rgba(255, 77, 77, 0.55)');
  blob(w * 0.62, h * 0.2, w * 0.45, 'rgba(185, 28, 28, 0.6)');
  blob(w * 0.95, h * 0.9, w * 0.4, 'rgba(255, 140, 120, 0.4)');

  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    for (let x = 0; x <= w; x += 8) {
      const y = h * (0.35 + i * 0.09) + Math.sin(x / 70 + i) * 14;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const font = fontStack();
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `700 ${h * 0.36}px ${font}`;
  ctx.fillText('HAG', w / 2, h * 0.52);
}

/** The circuit board hidden between the shells. */
export function drawBoard(ctx: CanvasRenderingContext2D) {
  const { width: w, height: h } = ctx.canvas;
  ctx.fillStyle = '#0f0707';
  ctx.fillRect(0, 0, w, h);

  // Seeded so every visit gets the same board.
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  ctx.lineCap = 'round';
  for (let i = 0; i < 70; i++) {
    let x = rnd() * w;
    let y = rnd() * h;
    ctx.strokeStyle = rnd() > 0.7 ? 'rgba(255, 77, 77, 0.85)' : 'rgba(220, 38, 38, 0.3)';
    ctx.lineWidth = rnd() > 0.8 ? 4 : 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let s = 0; s < 4; s++) {
      if (rnd() > 0.5) x += (rnd() - 0.5) * 220;
      else y += (rnd() - 0.5) * 160;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  const chip = (x: number, y: number, cw: number, ch: number, label: string) => {
    ctx.fillStyle = '#0d0f12';
    ctx.fillRect(x, y, cw, ch);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, cw, ch);
    ctx.fillStyle = 'rgba(203, 213, 225, 0.8)';
    for (let p = 8; p < cw - 4; p += 14) {
      ctx.fillRect(x + p, y - 8, 6, 8);
      ctx.fillRect(x + p, y + ch, 6, 8);
    }
    ctx.font = `600 ${Math.min(cw, ch) * 0.2}px ${fontStack()}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.fillText(label, x + cw / 2, y + ch / 2);
  };
  chip(w * 0.42, h * 0.3, w * 0.16, h * 0.22, 'HAG-01');
  chip(w * 0.2, h * 0.45, w * 0.1, h * 0.14, 'TS');
  chip(w * 0.7, h * 0.45, w * 0.1, h * 0.14, 'R3F');
}
