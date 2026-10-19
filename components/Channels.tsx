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
    text: { tr: 'Yaptığım oyunları burada paylaşıyorum.', en: 'This is where I share the games I make.' },
    cta: { tr: 'Oyunlarım', en: 'My games' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(250, 92, 92, 0.28), transparent 70%)',
    big: true,
  },
  {
    name: 'YouTube',
    handle: '@hasanalpgungor',
    href: LINKS.youtube,
    Icon: YouTubeIcon,
    text: { tr: 'CS2 × donanım projeleri, ESP32 yapımları ve rehberler.', en: 'CS2 × hardware projects, ESP32 builds and guides.' },
    cta: { tr: 'Kanalım', en: 'My channel' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(255, 46, 59, 0.26), transparent 70%)',
    big: true,
  },
  {
    name: 'GitHub',
    handle: '@manyaksisko35',
    href: LINKS.github,
    Icon: GitHubIcon,
    text: { tr: 'Bütün projelerimin kodu.', en: 'The code for all my projects.' },
    cta: { tr: 'Profilim', en: 'My profile' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(255, 255, 255, 0.12), transparent 70%)',
  },
  {
    name: 'LinkedIn',
    handle: 'Hasan Alp Güngör',
    href: LINKS.linkedin,
    Icon: LinkedInIcon,
    text: { tr: 'Eğitimim, yeteneklerim ve paylaşımlarım.', en: 'My education, skills and posts.' },
    cta: { tr: 'Profilim', en: 'My profile' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(239, 68, 68, 0.22), transparent 70%)',
  },
];

export default function Channels() {
  const t = useT();

  return (
    <section id="channels" className="ui-ambient amb-ember relative z-10 bg-[#030303] px-6 lg:px-[8%] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto">
        <p className="ui-label mb-3 lg:mb-5">{t({ tr: 'Beni bul', en: 'Find me' })}</p>
        <h2 className="ui-title max-w-3xl">
          {t({ tr: 'Beni nerede ', en: 'Where to ' })}
          <strong className="ui-accent">{t({ tr: 'bulabilirsin?', en: 'find me.' })}</strong>
        </h2>
        <p className="ui-lead mt-4 lg:mt-6 max-w-xl">
          {t({ tr: "Oyunlarımı itch.io'da, videolarımı YouTube'da, kodlarımı GitHub'da paylaşıyorum.", en: 'I share my games on itch.io, my videos on YouTube and my code on GitHub.' })}
        </p>

        <div className="mt-10 lg:mt-14 grid md:grid-cols-2 gap-4 lg:gap-6">
          {CHANNELS.map(({ Icon, ...c }) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`ui-card group relative overflow-hidden flex flex-col p-6 lg:p-9 ${c.big ? 'min-h-[300px] lg:min-h-[380px]' : 'min-h-[220px]'}`}
            >
              <div aria-hidden className="absolute inset-0 -z-10 transition-opacity duration-500 opacity-80 group-hover:opacity-100" style={{ background: c.glow }} />
              <Icon className={`${c.big ? 'w-14 h-14 lg:w-20 lg:h-20' : 'w-11 h-11'} text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`} />
              <div className="mt-auto pt-10 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-white/45 mb-1">{c.handle}</p>
                  <h3 className={`${c.big ? 'text-3xl lg:text-5xl' : 'text-2xl lg:text-3xl'} font-semibold tracking-[-0.04em]`}>{c.name}</h3>
                  <p className="mt-2 text-sm lg:text-base text-white/60 font-light">{t(c.text)}</p>
                </div>
                <span className="ui-btn !py-2.5 !px-5 !text-sm shrink-0">
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
