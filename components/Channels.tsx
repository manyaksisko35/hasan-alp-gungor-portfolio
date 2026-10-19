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
    text: { tr: 'Geliştirdiğim oyunlar.', en: 'Games I have developed.' },
    cta: { tr: 'Oyunlara göz at', en: 'Browse games' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(250, 92, 92, 0.28), transparent 70%)',
    big: true,
  },
  {
    name: 'YouTube',
    handle: '@hasanalpgungor',
    href: LINKS.youtube,
    Icon: YouTubeIcon,
    text: { tr: 'YouTube kanalım.', en: 'My YouTube channel.' },
    cta: { tr: 'Kanala git', en: 'Visit channel' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(255, 46, 59, 0.26), transparent 70%)',
    big: true,
  },
  {
    name: 'GitHub',
    handle: '@manyaksisko35',
    href: LINKS.github,
    Icon: GitHubIcon,
    text: { tr: 'Açık kaynak projelerim.', en: 'My open source projects.' },
    cta: { tr: 'Profili gör', en: 'View profile' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(203, 213, 225, 0.16), transparent 70%)',
  },
  {
    name: 'LinkedIn',
    handle: 'Hasan Alp Güngör',
    href: LINKS.linkedin,
    Icon: LinkedInIcon,
    text: { tr: 'Profesyonel profilim.', en: 'My professional profile.' },
    cta: { tr: 'Profili gör', en: 'View profile' },
    glow: 'radial-gradient(70% 70% at 80% 10%, rgba(10, 102, 194, 0.32), transparent 70%)',
  },
];

export default function Channels() {
  const t = useT();

  return (
    <section id="channels" className="sg-ambient amb-violet relative z-10 bg-[#030303] px-6 lg:px-[8%] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto">
        <p className="sg-eyebrow mb-3 lg:mb-5">{t({ tr: 'Bağlantılar', en: 'Links' })}</p>
        <h2 className="sg-title max-w-3xl">
          {t({ tr: 'Beni ', en: 'Find me ' })}
          <strong className="sg-ai">{t({ tr: 'takip edin.', en: 'online.' })}</strong>
        </h2>
        <p className="sg-lead mt-4 lg:mt-6 max-w-xl">
          {t({ tr: 'Oyunlarım, videolarım ve kodlarım.', en: 'My games, videos and code.' })}
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
