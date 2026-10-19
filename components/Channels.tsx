'use client';

import { ArrowIcon, GitHubIcon, ItchIcon, LinkedInIcon, YouTubeIcon } from '@/components/Icons';
import { LINKS } from '@/lib/data';
import { useT, type Localized } from '@/lib/i18n';

const CHANNELS: {
  name: string;
  handle: string;
  href: string;
  Icon: (p: { className?: string }) => React.ReactElement;
  text: Localized;
  cta: Localized;
  glow: string;
  big?: boolean;
}[] = [
  {
    name: 'itch.io',
    handle: 'hasan-alp-gungor',
    href: LINKS.itch,
    Icon: ItchIcon,
    text: { tr: 'Yaptığım oyunlar. İndir, oyna, puanla.', en: 'The games I make. Download, play, rate.' },
    cta: { tr: 'Oyunları oyna', en: 'Play the games' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(250, 92, 92, 0.28), transparent 70%)',
    big: true,
  },
  {
    name: 'YouTube',
    handle: '@hasanalpgungor',
    href: LINKS.youtube,
    Icon: YouTubeIcon,
    text: { tr: 'Videolarım ve geliştirme süreçleri.', en: 'My videos and behind-the-scenes builds.' },
    cta: { tr: 'İzle', en: 'Watch' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(255, 46, 59, 0.26), transparent 70%)',
    big: true,
  },
  {
    name: 'GitHub',
    handle: '@manyaksisko35',
    href: LINKS.github,
    Icon: GitHubIcon,
    text: { tr: 'Bütün kodlarım ve konsept siteler.', en: 'All my code and the concept sites.' },
    cta: { tr: 'Repolara bak', en: 'Browse repos' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(203, 213, 225, 0.16), transparent 70%)',
  },
  {
    name: 'LinkedIn',
    handle: 'Hasan Alp Güngör',
    href: LINKS.linkedin,
    Icon: LinkedInIcon,
    text: { tr: 'Staj, iş ve ortak projeler için.', en: 'For internships, jobs and collabs.' },
    cta: { tr: 'Bağlantı kur', en: 'Connect' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(10, 102, 194, 0.32), transparent 70%)',
  },
];

export default function Channels() {
  const t = useT();

  return (
    <section id="channels" className="sg-ambient amb-violet relative z-10 bg-[#030303] px-6 lg:px-[8%] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto">
        <p className="sg-eyebrow mb-3 lg:mb-5">{t({ tr: 'Kanallar', en: 'Channels' })}</p>
        <h2 className="sg-title max-w-3xl">
          {t({ tr: 'Oyunlar, videolar, ', en: 'Games, videos, ' })}
          <strong className="sg-ai">{t({ tr: 'kod.', en: 'code.' })}</strong>
        </h2>
        <p className="sg-lead mt-4 lg:mt-6 max-w-xl">
          {t({ tr: 'Ne yaptığımı görmek istersen, hepsi bir tık uzakta.', en: 'If you want to see what I make, it is all one click away.' })}
        </p>

        <div className="mt-10 lg:mt-14 grid md:grid-cols-2 gap-4 lg:gap-6">
          {CHANNELS.map(({ Icon, ...c }) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`sg-card group relative overflow-hidden flex flex-col p-6 lg:p-9 ${c.big ? 'min-h-[300px] lg:min-h-[380px]' : 'min-h-[220px]'}`}
            >
              <div aria-hidden className="absolute inset-0 -z-10 transition-opacity duration-500 opacity-80 group-hover:opacity-100" style={{ background: c.glow }} />
              <Icon className={`${c.big ? 'w-14 h-14 lg:w-20 lg:h-20' : 'w-11 h-11'} text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`} />
              <div className="mt-auto pt-10 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-white/45 mb-1">{c.handle}</p>
                  <h3 className={`${c.big ? 'text-3xl lg:text-5xl' : 'text-2xl lg:text-3xl'} font-semibold tracking-[-0.04em]`}>{c.name}</h3>
                  <p className="mt-2 text-sm lg:text-base text-white/60 font-light">{t(c.text)}</p>
                </div>
                <span className="sg-btn !py-2.5 !px-5 !text-sm shrink-0">
                  {t(c.cta)}
                  <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
