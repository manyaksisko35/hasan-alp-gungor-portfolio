'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PARTS } from '@/lib/data';
import { useT } from '@/lib/i18n';
import { getLenis } from '@/lib/lenis';
import { LOGO_PIECES } from '@/lib/logoShape';

// A hidden puzzle: the logo's seven pieces are scattered and you drag them back into place.

type Ring = readonly (readonly [number, number])[];
const ring = (pts: Ring) => `M${pts.map(([x, y]) => `${x} ${y}`).join('L')}Z`;
const PATHS = LOGO_PIECES.map((p) => [ring(p.outer), ...p.holes.map(ring)].join(''));
const SNAP = 0.14; // how close (in logo units) a piece has to be to click into place
const SNAP_PX = 20; // ...but never less than this on screen, so small phones stay playable
const BEST_KEY = 'hag-puzzle-best';

type Offset = { x: number; y: number; done: boolean };

// Middle of each piece's bounding box, so pieces can be laid out by where they really sit.
const MIDS = LOGO_PIECES.map((p) => {
  const xs = p.outer.map((q) => q[0]);
  const ys = p.outer.map((q) => q[1]);
  return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
});
// Waiting spots beside the empty logo: a 2×2 grid on each side, seven of the eight get used.
const SPOTS = [
  [-2.2, 0.75], [-1.62, 0.75], [-2.2, -0.75], [-1.62, -0.75],
  [1.62, 0.75], [2.2, 0.75], [1.62, -0.75], [2.2, -0.75],
];
const jitter = (n: number) => (Math.random() - 0.5) * n;

/** Pieces dealt out to random spots on both sides, never already in place. */
function scatter(): Offset[] {
  const order = SPOTS.map((s) => ({ s, k: Math.random() })).sort((a, b) => a.k - b.k).map((o) => o.s);
  return LOGO_PIECES.map((_, i) => ({
    x: order[i][0] + jitter(0.05) - MIDS[i][0],
    y: order[i][1] + jitter(0.15) - MIDS[i][1],
    done: false,
  }));
}

function readBest(): number | null {
  try {
    const v = Number(localStorage.getItem(BEST_KEY));
    return v > 0 ? v : null;
  } catch {
    return null;
  }
}

const fmt = (ms: number) => `${(ms / 1000).toFixed(1)} s`;

/** Mounted only while open, so every opening starts from a fresh shuffle. */
export default function LogoPuzzle({ onClose }: { onClose: () => void }) {
  const t = useT();
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ i: number; sx: number; sy: number; ox: number; oy: number } | null>(null);
  const [pieces, setPieces] = useState<Offset[]>(scatter);
  const [start, setStart] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [result, setResult] = useState<{ time: number; best: number; record: boolean } | null>(null);
  const [lastPart, setLastPart] = useState<number | null>(null);

  const reset = () => {
    setPieces(scatter());
    setStart(null);
    setResult(null);
    setLastPart(null);
  };

  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lenis?.start();
    };
  }, [onClose]);

  // Running clock while a round is in progress.
  useEffect(() => {
    if (start === null || result) return;
    const id = setInterval(() => setNow(performance.now()), 100);
    return () => clearInterval(id);
  }, [start, result]);

  /** Pointer position in logo units (y up, like the logo data). */
  const toLogo = (e: React.PointerEvent) => {
    const m = svg.current!.getScreenCTM()!.inverse();
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m);
    return { x: p.x, y: -p.y };
  };

  const onDown = (i: number) => (e: React.PointerEvent) => {
    if (pieces[i].done || result) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    const p = toLogo(e);
    drag.current = { i, sx: p.x, sy: p.y, ox: pieces[i].x, oy: pieces[i].y };
    if (start === null) {
      const t0 = performance.now();
      setStart(t0);
      setNow(t0);
    }
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const p = toLogo(e);
    setPieces((ps) => ps.map((o, j) => (j === d.i ? { ...o, x: d.ox + p.x - d.sx, y: d.oy + p.y - d.sy } : o)));
  };

  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const o = pieces[d.i];
    const unit = svg.current?.getScreenCTM()?.a || 1; // screen pixels per logo unit
    if (Math.hypot(o.x, o.y) > Math.max(SNAP, SNAP_PX / unit)) return;
    const next = pieces.map((p, j) => (j === d.i ? { x: 0, y: 0, done: true } : p));
    setPieces(next);
    setLastPart(d.i);
    if (next.every((p) => p.done) && start !== null) {
      const time = performance.now() - start;
      const prev = readBest();
      const record = prev === null || time < prev;
      if (record) {
        try {
          localStorage.setItem(BEST_KEY, String(Math.round(time)));
        } catch {
          /* storage blocked */
        }
      }
      setResult({ time, best: record ? time : prev!, record });
    }
  };

  const placed = pieces.filter((p) => p.done).length;
  const elapsed = result ? result.time : start === null ? 0 : now - start;
  const best = result?.best ?? readBest();
  const part = lastPart !== null ? PARTS.find((p) => p.id === LOGO_PIECES[lastPart].id) : undefined;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t({ tr: 'Logo yapbozu', en: 'Logo puzzle', no: 'Logopuslespill' })}
      data-lenis-prevent
      onClick={onClose}
      className="fixed inset-0 z-[300] grid place-items-center bg-black/75 backdrop-blur-md p-4"
    >
      <div className="glass w-full max-w-2xl rounded-[28px] p-5 lg:p-7" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[0.7rem] text-white/55">{t({ tr: 'Gizli oyun', en: 'Secret game', no: 'Hemmelig spill' })}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
              {t({ tr: 'Logoyu birleştir.', en: 'Put the logo back together.', no: 'Sett logoen sammen igjen.' })}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="ui-btn ui-btn--ghost !py-2 !px-4 !text-sm shrink-0">
            {t({ tr: 'Kapat', en: 'Close', no: 'Lukk' })}
          </button>
        </div>

        <svg
          ref={svg}
          viewBox="-2.6 -1.6 5.2 3.2"
          className="mt-4 w-full touch-none select-none"
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <defs>
            <linearGradient id="pz-glass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="0.14" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <g transform="scale(1 -1)">
            {PATHS.map((d, i) => (
              <path key={`slot-${i}`} d={d} fillRule="evenodd" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.01" strokeDasharray="0.04 0.03" />
            ))}
            {pieces.map((o, i) => (
              <path
                key={i}
                d={PATHS[i]}
                fillRule="evenodd"
                transform={`translate(${o.x} ${o.y})`}
                fill={o.done ? 'rgba(255,255,255,0.78)' : 'url(#pz-glass)'}
                stroke={o.done ? '#fff' : 'rgba(255,255,255,0.65)'}
                strokeWidth="0.014"
                className={o.done ? 'transition-[fill] duration-300' : 'cursor-grab active:cursor-grabbing'}
                onPointerDown={onDown(i)}
              />
            ))}
          </g>
        </svg>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-white/60">
          <span className="tabular-nums">
            {placed}/{LOGO_PIECES.length} · {fmt(elapsed)}
            {best !== null && ` · ${t({ tr: 'En iyi', en: 'Best', no: 'Beste' })} ${fmt(best)}`}
          </span>
          <button type="button" onClick={reset} className="ui-btn ui-btn--ghost !py-1.5 !px-3.5 !text-xs">
            {t({ tr: 'Karıştır', en: 'Shuffle', no: 'Stokk om' })}
          </button>
        </div>

        <p className="mt-3 min-h-[1.5em] text-sm text-white/70" aria-live="polite">
          {result
            ? result.record
              ? t({ tr: `Yeni rekor: ${fmt(result.time)}!`, en: `New record: ${fmt(result.time)}!`, no: `Ny rekord: ${fmt(result.time)}!` })
              : t({ tr: `Bitti: ${fmt(result.time)}.`, en: `Done in ${fmt(result.time)}.`, no: `Ferdig på ${fmt(result.time)}.` })
            : part
              ? `${t(part.title)} · ${t(part.text)}`
              : t({ tr: 'Parçaları sürükleyip yerlerine bırak.', en: 'Drag the pieces into their places.', no: 'Dra bitene på plass.' })}
        </p>
      </div>
    </div>,
    document.body,
  );
}
