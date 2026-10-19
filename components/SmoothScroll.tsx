'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect } from 'react';
import { setLenis } from '@/lib/lenis';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: prefersReducedMotion() ? 1 : 0.1 });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors go through Lenis too.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.getAttribute('href') === '#') return;
      const el = document.querySelector(a.getAttribute('href')!);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { duration: 1.6 });
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      setLenis(null);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
