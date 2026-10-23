'use client';

import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLang, useT, type Localized } from '@/lib/i18n';

const STATS: { value: number; suffix?: string; label: Localized }[] = [
  { value: 12, suffix: '+', label: { tr: 'Açık kaynak proje', en: 'Open source projects', no: 'Prosjekter med åpen kildekode' } },
  { value: 15, suffix: '+', label: { tr: 'YouTube videosu', en: 'YouTube videos', no: 'YouTube-videoer' } },
  { value: 10, suffix: '+', label: { tr: 'Dil ve teknoloji', en: 'Languages and technologies', no: 'Språk og teknologier' } },
];

const LANGUAGES: { name: Localized; level: Localized }[] = [
  { name: { tr: 'Türkçe', en: 'Turkish', no: 'Tyrkisk' }, level: { tr: 'Ana dil', en: 'Native', no: 'Morsmål' } },
  { name: { tr: 'İngilizce', en: 'English', no: 'Engelsk' }, level: { tr: 'Ana dil / iki dilli', en: 'Native / bilingual', no: 'Morsmål / tospråklig' } },
  { name: { tr: 'Norveççe', en: 'Norwegian', no: 'Norsk' }, level: { tr: 'Profesyonel çalışma', en: 'Professional working', no: 'Profesjonelt arbeidsnivå' } },
];

const FOCUS: Localized[] = [
  { tr: 'Yazılım geliştirme ve tasarımı', en: 'Software development and design', no: 'Programvareutvikling og design' },
  { tr: 'Oyun geliştirme ve tasarımı', en: 'Game development and design', no: 'Spillutvikling og design' },
  { tr: 'Bilgisayar donanımı ve gömülü sistemler', en: 'Computer hardware and embedded systems', no: 'Datamaskinvare og innebygde systemer' },
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

/** Live local time in İzmir. */
function IzmirClock() {
  const lang = useLang();
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000 * 15);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  const time = now
    ? now.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : lang === 'no' ? 'nb-NO' : 'en-GB', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit' })
    : '--:--';
  return <span className="tabular-nums">{time}</span>;
}

const cell = 'ui-card p-6 lg:p-8';

export default function About() {
  const t = useT();

  return (
    <section id="about" className="relative z-10 px-6 lg:px-[8%] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto">
        <p className="ui-label mb-3 lg:mb-5">{t({ tr: 'Hakkımda', en: 'About', no: 'Om meg' })}</p>
        <h2 className="ui-title max-w-4xl">
          {t({ tr: 'Yazılım ve donanımın ', en: 'I work where software ', no: 'Der programvare ' })}
          <strong className="ui-accent">{t({ tr: 'kesiştiği yerde.', en: 'meets hardware.', no: 'møter maskinvare.' })}</strong>
        </h2>

        <div className="mt-10 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div data-reveal className={`${cell} col-span-2 lg:row-span-2 flex flex-col`}>
            <div className="flex items-center gap-4">
              <Image
                src="/hasan-alp-gungor.jpg"
                alt="Hasan Alp Güngör"
                width={88}
                height={88}
                className="w-[72px] h-[72px] lg:w-[88px] lg:h-[88px] rounded-[22px] object-cover ring-1 ring-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              />
              <div>
                <p className="text-lg font-semibold tracking-tight">Hasan Alp Güngör</p>
                <p className="font-mono text-xs text-white/55">{t({ tr: 'Özet', en: 'Summary', no: 'Kort fortalt' })}</p>
              </div>
            </div>
            <p className="mt-4 text-lg lg:text-xl leading-relaxed text-white/85">
              {t({
                tr: 'İzmir Ekonomi Üniversitesi\'nde Bilgisayar Programcılığı öğrencisiyim ve teknolojinin hem yazılım hem donanım tarafında aktif olarak projeler üretiyorum.',
                en: "I'm a Computer Programming student at İzmir University of Economics, actively building projects on both the software and hardware side of technology.",
                no: 'Jeg studerer dataprogrammering ved İzmir University of Economics og lager prosjekter på både programvare- og maskinvaresiden av teknologi.',
              })}
            </p>
            <p className="mt-4 text-white/55 leading-relaxed">
              {t({
                tr: 'C#, Python, Java, PHP, C++, Lua, JavaScript ve SQL ile uygulama geliştiriyor; ESP32 ve Arduino ile sensör tabanlı cihazlar tasarlıyorum. Projelerimi GitHub\'da açık kaynak olarak, geliştirme süreçlerini ise YouTube\'da paylaşıyorum.',
                en: 'I develop applications with C#, Python, Java, PHP, C++, Lua, JavaScript and SQL, and design sensor-based devices with ESP32 and Arduino. I publish my projects as open source on GitHub and share how they are built on YouTube.',
                no: 'Jeg utvikler applikasjoner med C#, Python, Java, PHP, C++, Lua, JavaScript og SQL, og designer sensorbaserte enheter med ESP32 og Arduino. Prosjektene mine legger jeg ut som åpen kildekode på GitHub, og på YouTube viser jeg hvordan de blir laget.',
              })}
            </p>
          </div>

          <div data-reveal className={`${cell} col-span-2`}>
            <p className="font-mono text-xs text-white/55">{t({ tr: 'Eğitim', en: 'Education', no: 'Utdanning' })}</p>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xl lg:text-2xl font-semibold tracking-tight">{t({ tr: 'İzmir Ekonomi Üniversitesi', en: 'İzmir University of Economics', no: 'İzmir University of Economics' })}</p>
                <p className="mt-1 text-white/55">{t({ tr: 'Bilgisayar Programcılığı', en: 'Computer Programming', no: 'Dataprogrammering' })}</p>
              </div>
              <span className="shrink-0 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[0.7rem] text-zinc-100">
                {t({ tr: 'Devam ediyor', en: 'In progress', no: 'Pågår' })}
              </span>
            </div>
          </div>

          <div data-reveal className={`${cell} col-span-2 lg:col-span-1`}>
            <p className="font-mono text-xs text-white/55">{t({ tr: 'Diller', en: 'Languages', no: 'Språk' })}</p>
            <ul className="mt-4 space-y-3">
              {LANGUAGES.map((l) => (
                <li key={l.name.en}>
                  <p className="font-medium">{t(l.name)}</p>
                  <p className="text-xs text-white/55">{t(l.level)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className={`${cell} col-span-2 lg:col-span-1 flex flex-col`}>
            <p className="font-mono text-xs text-white/55">{t({ tr: 'Konum', en: 'Location', no: 'Sted' })}</p>
            <p className="mt-4 text-xl font-semibold tracking-tight">İzmir, {t({ tr: 'Türkiye', en: 'Türkiye', no: 'Tyrkia' })}</p>
            <p className="mt-auto pt-6 flex items-center gap-2 font-mono text-sm text-white/55">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-zinc-200 animate-ping opacity-60" />
                <span className="relative w-2 h-2 rounded-full bg-zinc-200" />
              </span>
              <IzmirClock /> <span className="text-white/55">GMT+3</span>
            </p>
          </div>

          {STATS.map((s) => (
            <div key={s.label.en} data-reveal className={cell}>
              <p className="text-4xl lg:text-5xl font-semibold tracking-[-0.04em]">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/55">{t(s.label)}</p>
            </div>
          ))}

          <div data-reveal className={cell}>
            <p className="font-mono text-xs text-white/55">{t({ tr: 'Odak alanları', en: 'Focus areas', no: 'Fokusområder' })}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {FOCUS.map((f) => (
                <li key={f.en} className="flex gap-2">
                  <span className="mt-2 w-1 h-1 shrink-0 rounded-full bg-zinc-200" />
                  {t(f)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
