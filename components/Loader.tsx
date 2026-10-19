'use client';

import { useEffect, useState } from 'react';

/** Same gamepad silhouette as the 3D model, in SVG (viewBox units = model units × 100). */
const OUTLINE =
  'M0 -46 L50 -46 C78 -48 98 -44 106 -26 C116 -4 120 30 118 52 C116 80 98 92 84 88 C70 84 64 70 58 56 C50 40 34 36 0 36 C-34 36 -50 40 -58 56 C-64 70 -70 84 -84 88 C-98 92 -116 80 -118 52 C-120 30 -116 -4 -106 -26 C-98 -44 -78 -48 -50 -46 Z';

const MIN_MS = 1500;

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let ready = false;
    let raf = 0;
    const markReady = () => (ready = true);
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const scene = new Promise<void>((r) =>
      document.documentElement.dataset.sceneReady ? r() : window.addEventListener('scene-ready', () => r(), { once: true }),
    );
    // Never hang on a device without WebGL.
    Promise.race([Promise.all([fonts, scene]), new Promise((r) => setTimeout(r, 5000))]).then(markReady);

    const tick = (now: number) => {
      const timeP = Math.min(1, (now - start) / MIN_MS);
      const p = ready ? timeP : Math.min(timeP, 0.9);
      setProgress(p);
      if (p >= 1) {
        setTimeout(() => setComplete(true), 120);
        setTimeout(() => {
          setDone(true);
          document.documentElement.dataset.loaded = '1';
        }, 1000);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const part = (a: number, b: number) => Math.min(1, Math.max(0, (progress - a) / (b - a)));
  const stroke = (t: number) => ({ strokeDasharray: 1, strokeDashoffset: 1 - t });

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center transition-opacity duration-700 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-busy={!complete}
      aria-label="Loading"
    >
      <svg viewBox="-130 -60 260 160" className="w-[min(70vw,340px)] mb-8 overflow-visible">
        <defs>
          <linearGradient id="ld-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff9a8f" />
            <stop offset="0.6" stopColor="#ff4d4d" />
            <stop offset="1" stopColor="#d91f26" />
          </linearGradient>
          <linearGradient id="ld-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a1414" />
            <stop offset="1" stopColor="#120808" />
          </linearGradient>
        </defs>
        <path d={OUTLINE} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
        <path
          d={OUTLINE}
          pathLength={1}
          fill={complete ? 'url(#ld-fill)' : 'transparent'}
          stroke="url(#ld-stroke)"
          strokeWidth="1.6"
          style={{ ...stroke(part(0, 0.7)), transition: 'fill 0.6s ease' }}
        />
        {[-36, 36].map((x, i) => (
          <circle key={x} cx={x} cy={20} r={15} pathLength={1} fill="none" stroke="url(#ld-stroke)" strokeWidth="1.4" style={stroke(part(0.6 + i * 0.1, 0.8 + i * 0.1))} />
        ))}
        <rect x={-31} y={-32} width={62} height={32} rx={6} pathLength={1} fill={complete ? '#160707' : 'none'} stroke="url(#ld-stroke)" strokeWidth="1.2" style={{ ...stroke(part(0.75, 0.95)), transition: 'fill 0.5s ease' }} />
        <text
          x="0"
          y="-12"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#fff"
          style={{ opacity: complete ? 0.9 : 0, transition: 'opacity 0.5s ease 0.15s' }}
        >
          HAG
        </text>
      </svg>

      <p className="text-sm tracking-[0.4em] text-white/50 tabular-nums">
        {complete ? 'HASAN ALP GÜNGÖR' : `${Math.round(progress * 100)}%`}
      </p>
    </div>
  );
}
