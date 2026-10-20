'use client';

import { useEffect, useState } from 'react';
import LogoMark from '@/components/LogoMark';

// Short on purpose: the hero text waits for the loader, and that decides how fast the page feels.
const MIN_MS = 800;
const MAX_WAIT_MS = 2500;

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
    // Never hold the page for a slow device or one without WebGL; the scene fades in when it's ready.
    Promise.race([Promise.all([fonts, scene]), new Promise((r) => setTimeout(r, MAX_WAIT_MS))]).then(markReady);

    const tick = (now: number) => {
      const timeP = Math.min(1, (now - start) / MIN_MS);
      const p = ready ? timeP : Math.min(timeP, 0.9);
      setProgress(p);
      if (p >= 1) {
        setTimeout(() => setComplete(true), 120);
        setTimeout(() => {
          setDone(true);
          document.documentElement.dataset.loaded = '1';
        }, 450);
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
            className="ui-btn !p-0 w-11 h-11 transition-transform duration-500"
            style={{ transform: complete ? 'rotate(-8deg) scale(1.06)' : 'none' }}
          >
            <LogoMark className="w-6 h-6" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Hasan Alp Güngör</span>
        </div>
        <div className="mt-6 h-px bg-white/10 overflow-hidden">
          <div className="h-full bg-zinc-200 origin-left" style={{ transform: `scaleX(${progress})` }} />
        </div>
        <p className="mt-3 flex justify-between font-mono text-[0.7rem] text-white/55 tabular-nums">
          <span>{complete ? 'ready' : 'loading'}</span>
          <span>{Math.round(progress * 100)}%</span>
        </p>
      </div>
    </div>
  );
}
