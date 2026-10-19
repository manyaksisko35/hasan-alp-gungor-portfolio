'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { useLang, useT, type Localized } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

/** Words wrapped in *stars* get the gradient. */
const MANIFESTO: Localized = {
  tr: "İzmir Ekonomi Üniversitesi'nde Bilgisayar Programcılığı öğrencisiyim. Gerçek zamanlı *3D web siteleri*, *oyunlar* ve gömülü sistem projeleri geliştiriyorum. Odağım; hızlı, detaylı ve akıcı kullanıcı deneyimleri.",
  en: "I'm a Computer Programming student at İzmir University of Economics. I build real-time *3D websites*, *games* and embedded projects, with a focus on fast, detailed and fluid user experiences.",
};

const STATS: { value: number; suffix?: string; label: Localized }[] = [
  { value: 12, suffix: '+', label: { tr: 'Açık kaynak proje', en: 'Open source projects' } },
  { value: 4, label: { tr: 'Yayında konsept site', en: 'Live concept sites' } },
  { value: 5, label: { tr: 'Programlama dili', en: 'Programming languages' } },
  { value: 10, suffix: ' Hz', label: { tr: 'CS2 HUD veri güncellemesi', en: 'CS2 HUD update rate' } },
];

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const obj = { v: 0 };
      gsap.to(obj, { v: value, duration: 1.4, ease: 'power2.out', onUpdate: () => setShown(Math.round(obj.v)) });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}

export default function About() {
  const t = useT();
  const lang = useLang();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>('[data-word]');
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: { trigger: '[data-manifesto]', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      );
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true },
  );

  const words = t(MANIFESTO).split(' ');

  return (
    <section ref={ref} id="about" className="relative px-6 lg:px-[8%] pt-24 lg:pt-40 pb-24 lg:pb-40">
      <div className="max-w-7xl mx-auto">
        <div className="lg:max-w-[52%]">
          <p className="sg-eyebrow mb-5 lg:mb-8">{t({ tr: 'Hakkımda', en: 'About me' })}</p>
          <p data-manifesto className="text-[clamp(1.6rem,1rem+2.6vw,3.3rem)] font-medium leading-[1.12] tracking-[-0.03em]">
            {words.map((w, i) => {
              const hl = w.includes('*');
              return (
                <span key={`${lang}-${i}`}>
                  <span data-word className={hl ? 'sg-ai font-semibold' : undefined}>
                    {w.replaceAll('*', '')}
                  </span>{' '}
                </span>
              );
            })}
          </p>
        </div>

        <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {STATS.map((s) => (
            <div key={s.label.en} className="sg-card p-5 lg:p-7 !bg-[#0b0b0d]/80">
              <p className="text-4xl lg:text-6xl font-semibold tracking-[-0.04em]">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/60 font-light leading-snug">{t(s.label)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
