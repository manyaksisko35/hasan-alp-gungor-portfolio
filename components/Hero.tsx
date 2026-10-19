'use client';

import { useRef } from 'react';
import { ArrowIcon } from '@/components/Icons';
import { useT } from '@/lib/i18n';
import { spin } from '@/lib/sceneState';

export default function Hero() {
  const t = useT();
  const drag = useRef<{ x: number; t: number } | null>(null);

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest('a, button')) return;
    drag.current = { x: e.clientX, t: performance.now() };
    spin.dragging = true;
    spin.velocity = 0;
    e.currentTarget.setAttribute('data-dragging', '');
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    const dx = e.clientX - d.x;
    const delta = (dx / window.innerWidth) * Math.PI * 2.2;
    spin.angle += delta;
    spin.velocity = delta / Math.max(0.008, (now - d.t) / 1000);
    drag.current = { x: e.clientX, t: now };
  };
  const onUp = (e: React.PointerEvent) => {
    if (!drag.current) return;
    drag.current = null;
    spin.dragging = false;
    e.currentTarget.removeAttribute('data-dragging');
  };

  return (
    <section
      id="top"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onUp}
      className="h-svh min-h-[600px] w-full flex flex-col items-center text-center relative px-4 pt-[17svh] md:pt-[15svh] touch-pan-y select-none cursor-grab data-[dragging]:cursor-grabbing"
    >
      <p className="hero-in sg-eyebrow mb-4 md:mb-6 !text-[0.65rem] md:!text-xs">
        {t({ tr: 'Merhaba, ben', en: "Hi, I'm" })}
      </p>

      <h1
        className="hero-in hero-in--2 sg-title text-[15vw] md:text-[8vw] xl:text-[7.4vw]"
        style={{ filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.9))' }}
      >
        Hasan Alp <strong>Güngör</strong>
      </h1>

      <p className="hero-in hero-in--3 mt-4 md:mt-6 text-base md:text-2xl font-light text-white/70 max-w-[22ch] md:max-w-none">
        {t({ tr: 'Bilgisayar Programcılığı öğrencisiyim. ', en: "I'm a Computer Programming student. " })}
        <span className="sg-ai font-semibold">{t({ tr: 'Yazılım ve donanım projeleri üretiyorum.', en: 'I build software and hardware projects.' })}</span>
      </p>

      <div className="hero-in hero-in--4 mt-7 md:mt-9 flex flex-wrap items-center justify-center gap-3">
        <a href="#about" className="sg-btn">
          {t({ tr: 'Beni tanı', en: 'About me' })}
          <ArrowIcon className="rotate-90" />
        </a>
        <a href="#contact" className="sg-btn sg-btn--ghost">
          {t({ tr: 'Bana ulaş', en: 'Contact me' })}
        </a>
      </div>

      <div className="hero-in hero-in--4 absolute bottom-8 md:bottom-10 flex flex-col items-center gap-3 text-white/50">
        <span className="sg-eyebrow !text-[0.65rem]">{t({ tr: 'Kaydır', en: 'Scroll' })}</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
