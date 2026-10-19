'use client';

import { useEffect } from 'react';

/** Fades [data-reveal] elements in once they enter the viewport, and lights cards under the pointer. */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('reveal-on');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          // Stagger siblings that enter together.
          const index = Array.from(el.parentElement?.children ?? []).indexOf(el);
          el.style.transitionDelay = `${Math.min(index, 6) * 60}ms`;
          el.dataset.in = '1';
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    const observe = () => document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])').forEach((el) => io.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>('.ui-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onMove);
      root.classList.remove('reveal-on');
    };
  }, []);
  return null;
}
