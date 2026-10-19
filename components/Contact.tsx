'use client';

import { ArrowIcon, GitHubIcon, ItchIcon, LinkedInIcon, YouTubeIcon } from '@/components/Icons';
import { LINKS } from '@/lib/data';
import { useT, type Localized } from '@/lib/i18n';

const PLATFORMS: { name: string; handle: string; href: string; Icon: (p: { className?: string }) => React.ReactElement; text: Localized }[] = [
  { name: 'LinkedIn', handle: 'Hasan Alp Güngör', href: LINKS.linkedin, Icon: LinkedInIcon, text: { tr: 'Profesyonel profil', en: 'Professional profile' } },
  { name: 'GitHub', handle: '@manyaksisko35', href: LINKS.github, Icon: GitHubIcon, text: { tr: 'Açık kaynak projeler', en: 'Open source projects' } },
  { name: 'YouTube', handle: '@hasanalpgungor', href: LINKS.youtube, Icon: YouTubeIcon, text: { tr: 'Teknik proje videoları', en: 'Technical project videos' } },
  { name: 'itch.io', handle: 'hasan-alp-gungor', href: LINKS.itch, Icon: ItchIcon, text: { tr: 'Yayınlanan oyunlar', en: 'Published games' } },
];

export default function Contact() {
  const t = useT();

  return (
    <>
      <section id="contact" className="relative z-10 px-6 lg:px-[8%] py-24 lg:py-36">
        <div className="glass relative max-w-7xl mx-auto overflow-hidden rounded-[32px]">

          <div className="relative grid lg:grid-cols-2 gap-12 px-6 py-14 lg:px-14 lg:py-20">
            <div>
              <p className="ui-label mb-5 lg:mb-7">{t({ tr: 'İletişim', en: 'Contact' })}</p>
              <h2 className="ui-title ui-title-xl">
                {t({ tr: 'Birlikte ', en: "Let's work " })}
                <strong className="ui-accent">{t({ tr: 'çalışalım.', en: 'together.' })}</strong>
              </h2>
              <p className="ui-lead mt-6 max-w-md">
                {t({
                  tr: 'Staj, iş fırsatları ve proje iş birlikleri için LinkedIn üzerinden ulaşabilirsiniz.',
                  en: 'For internships, job opportunities and project collaborations, reach me on LinkedIn.',
                })}
              </p>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="ui-btn mt-8">
                <LinkedInIcon className="w-4 h-4" />
                {t({ tr: "LinkedIn'den mesaj gönder", en: 'Message me on LinkedIn' })}
              </a>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3 self-end">
              {PLATFORMS.map(({ Icon, ...p }) => (
                <li key={p.name} data-reveal>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-card group flex h-full flex-col gap-6 p-5"
                  >
                    <span className="flex items-center justify-between">
                      <Icon className="w-7 h-7 text-white" />
                      <span className="text-white/40 transition-all group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowIcon />
                      </span>
                    </span>
                    <span>
                      <span className="block font-semibold">{p.name}</span>
                      <span className="block font-mono text-[0.7rem] text-white/40 mt-0.5">{p.handle}</span>
                      <span className="block text-sm text-white/55 mt-2">{t(p.text)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-6 lg:px-[8%] pb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:items-center justify-between font-mono text-xs text-white/40">
          <p>© 2026 Hasan Alp Güngör</p>
          <p>
            {t({
              tr: 'Next.js, Three.js ve TypeScript ile geliştirildi.',
              en: 'Built with Next.js, Three.js and TypeScript.',
            })}
          </p>
        </div>
      </footer>
    </>
  );
}
