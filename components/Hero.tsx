'use client';

import { useRef } from 'react';
import { ArrowIcon, GitHubIcon, ItchIcon, LinkedInIcon, YouTubeIcon } from '@/components/Icons';
import { LINKS } from '@/lib/data';
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
      className="h-svh min-h-[640px] w-full relative px-6 lg:px-[8%] touch-pan-y select-none cursor-grab data-[dragging]:cursor-grabbing"
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-start lg:justify-center pt-28 lg:pt-16">
        <div className="lg:max-w-[52%]">
          <p className="hero-in ui-label ui-label--plain mb-5 md:mb-7 glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
            {t({ tr: 'Yazılım ve Oyun Geliştirici · YouTuber', en: 'Software & Game Developer · YouTuber' })}
          </p>

          <h1 className="hero-in hero-in--2 ui-title text-[17vw] sm:text-[13vw] lg:text-[clamp(4.5rem,8.2vw,8.8rem)] !leading-[0.88]">
            Hasan Alp
            <br />
            <strong className="ui-accent">Güngör</strong>
          </h1>

          <p className="hero-in hero-in--3 mt-6 md:mt-8 text-base md:text-xl text-white/65 max-w-md leading-relaxed">
            {t({
              tr: 'İzmir Ekonomi Üniversitesi\'nde Bilgisayar Programcılığı okuyorum. Oyun geliştirme, web teknolojileri ve gömülü sistemler üzerine projeler geliştiriyor, bunları YouTube kanalımda paylaşıyorum.',
              en: "I study Computer Programming at İzmir University of Economics and build projects in game development, web technologies and embedded systems, which I share on my YouTube channel.",
            })}
          </p>

          <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="ui-btn">
              {t({ tr: 'Projelerimi incele', en: 'View my work' })}
              <ArrowIcon className="rotate-90" />
            </a>
            <a href="#contact" className="ui-btn ui-btn--ghost">
              {t({ tr: 'İletişime geç', en: 'Get in touch' })}
            </a>
            <span className="hidden sm:block w-px h-8 bg-white/10 mx-1" />
            {[
              { href: LINKS.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
              { href: LINKS.github, label: 'GitHub', Icon: GitHubIcon },
              { href: LINKS.youtube, label: 'YouTube', Icon: YouTubeIcon },
              { href: LINKS.itch, label: 'itch.io', Icon: ItchIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="ui-btn ui-btn--ghost !p-0 grid place-items-center w-11 h-11 text-white/80"
              >
                <Icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>

        </div>
      </div>

      <span className="hero-in hero-in--4 absolute bottom-6 left-6 lg:left-[8%] font-mono text-[0.7rem] text-white/55">
        {t({ tr: 'aşağı kaydır ↓', en: 'scroll down ↓' })}
      </span>
    </section>
  );
}
