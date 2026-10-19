'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowIcon, GitHubIcon } from '@/components/Icons';
import { CONCEPTS, LINKS } from '@/lib/data';
import { useT } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const t = useT();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const slide = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        // Cards lean in as they cross the centre.
        gsap.utils.toArray<HTMLElement>('[data-card]').forEach((card) => {
          gsap.fromTo(
            card.querySelector('[data-media]'),
            { scale: 1.08 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: slide,
                start: 'left right',
                end: 'center center',
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} id="work" className="ui-ambient amb-red relative z-10 bg-[#030303] lg:h-svh lg:overflow-hidden">
      <div
        ref={track}
        className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 px-6 lg:px-[8%] py-24 lg:py-0 lg:h-full lg:w-max will-change-transform"
      >
        <div className="lg:w-[34vw] lg:shrink-0 lg:pr-8">
          <p className="ui-label mb-3 lg:mb-5">{t({ tr: 'Projeler', en: 'Work' })}</p>
          <h2 className="ui-title">
            {t({ tr: 'Seçili ', en: 'Selected ' })}
            <strong className="ui-accent">{t({ tr: 'projeler.', en: 'work.' })}</strong>
          </h2>
          <p className="ui-lead mt-4 lg:mt-6 max-w-md">
            {t({
              tr: 'Samsung Galaxy ürünleri için geliştirdiğim etkileşimli konsept siteler. Next.js, React Three Fiber ve GSAP ile sıfırdan geliştirildi; tümü yayında ve açık kaynak.',
              en: 'Interactive concept sites I developed for Samsung Galaxy products. Built from scratch with Next.js, React Three Fiber and GSAP; all live and open source.',
            })}
          </p>
          <p className="mt-6 text-xs text-white/40 font-light max-w-sm">
            {t({
              tr: 'Hayran yapımı konseptlerdir. Samsung ile bağlantılı değildir.',
              en: 'Fan-made concepts. Not affiliated with Samsung.',
            })}
          </p>
        </div>

        {CONCEPTS.map((c, i) => (
          <article
            key={c.name}
            data-card
            className="group relative flex flex-col overflow-hidden rounded-[20px] lg:rounded-[20px] border border-white/10 bg-[#0b0b0d] transition-colors duration-300 hover:border-white/25 lg:w-[min(58vw,860px)] lg:h-[74svh] lg:shrink-0"
          >
            <div data-media className="relative aspect-[16/10] lg:aspect-auto lg:flex-1 overflow-hidden" style={{ background: c.glow }}>
              <Image
                src={c.img}
                alt={c.name}
                fill
                sizes="(min-width: 1024px) 58vw, 92vw"
                className={`transition-transform duration-700 group-hover:scale-[1.04] ${c.shot ? 'object-cover object-[50%_75%]' : 'object-contain p-8 lg:p-12'}`}
                priority={i === 0}
              />
              <span className="absolute top-5 left-5 lg:top-6 lg:left-7 ui-label ui-label--plain !text-[0.6rem] !text-white/70 tabular-nums">
                {String(i + 1).padStart(2, '0')} / {String(CONCEPTS.length).padStart(2, '0')}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 px-5 py-5 lg:px-8 lg:py-7 border-t border-white/5">
              <div className="max-w-xl">
                <p className="ui-label ui-label--plain !text-[0.65rem] mb-1.5">{c.stack.join(' · ')}</p>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-[-0.03em]">{c.name}</h3>
                <p className="text-sm lg:text-base text-white/60 font-light mt-2 leading-relaxed">{t(c.text)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="ui-btn !py-2.5 !px-5 !text-sm">
                  {t({ tr: 'Siteyi aç', en: 'Open site' })}
                  <ArrowIcon />
                </a>
                <a
                  href={c.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.name} GitHub`}
                  className="ui-btn ui-btn--ghost !py-2.5 !px-3.5"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        ))}

        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group ui-card relative flex flex-col justify-end p-7 lg:p-10 min-h-64 lg:w-[30vw] lg:h-[74svh] lg:shrink-0 overflow-hidden !rounded-[20px] lg:!rounded-[20px]"
        >
          <div className="absolute inset-0 -z-10 opacity-80" style={{ background: 'radial-gradient(60% 50% at 70% 30%, rgba(239,68,68,0.25), transparent 70%)' }} />
          <p className="ui-label ui-label--plain font-mono text-xs text-white/40 mb-3">GitHub</p>
          <p className="text-3xl lg:text-5xl font-medium tracking-[-0.04em] leading-[1.02]">
            {t({ tr: 'Diğer kodlarım ', en: 'The rest of my code is ' })}
            <strong className="ui-accent font-semibold">{t({ tr: "GitHub'da.", en: 'on GitHub.' })}</strong>
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition-colors">
            {t({ tr: 'Profilime bak', en: 'See my profile' })}
            <ArrowIcon />
          </span>
        </a>
      </div>

      <div className="hidden lg:block absolute bottom-8 left-[8%] right-[8%] h-px bg-white/10">
        <div ref={bar} className="h-full origin-left bg-gradient-to-r from-red-300 via-red-500 to-red-700" style={{ transform: 'scaleX(0)' }} />
      </div>
    </section>
  );
}
