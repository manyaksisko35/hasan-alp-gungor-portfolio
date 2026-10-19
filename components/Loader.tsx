'use client';

import { useEffect, useState } from 'react';

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

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center transition-opacity duration-700 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-busy={!complete}
      aria-label="Loading"
    >
      <div className="w-[min(78vw,320px)]">
        <div className="flex items-center gap-3">
          <span
            className="grid place-items-center w-11 h-11 rounded-xl bg-red-500 text-base font-bold tracking-tight transition-transform duration-500"
            style={{ transform: complete ? 'rotate(-8deg) scale(1.06)' : 'none' }}
          >
            HA
          </span>
          <span className="text-lg font-semibold tracking-tight">Hasan Alp Güngör</span>
        </div>
        <div className="mt-6 h-px bg-white/10 overflow-hidden">
          <div className="h-full bg-red-500 origin-left" style={{ transform: `scaleX(${progress})` }} />
        </div>
        <p className="mt-3 flex justify-between font-mono text-[0.7rem] text-white/40 tabular-nums">
          <span>{complete ? 'ready' : 'loading'}</span>
          <span>{Math.round(progress * 100)}%</span>
        </p>
      </div>
    </div>
  );
}
