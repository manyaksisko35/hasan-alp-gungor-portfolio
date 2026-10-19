'use client';

import { useEffect, useRef } from 'react';

/** Dotted grid with a red light behind the controller; fades out as the hero scrolls away. */
export default function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const t = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
      el.style.opacity = String(1 - t);
      el.style.visibility = t >= 1 ? 'hidden' : 'visible';
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="hero-grid absolute inset-0" />
      <div className="hero-light absolute left-1/2 top-[72%] lg:left-[74%] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(110vw,820px)] aspect-square rounded-full" />
    </div>
  );
}
