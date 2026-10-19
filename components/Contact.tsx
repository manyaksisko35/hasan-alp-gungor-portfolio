'use client';

import { ArrowIcon, GitHubIcon, LinkedInIcon } from '@/components/Icons';
import { LINKS } from '@/lib/data';
import { useT } from '@/lib/i18n';

export default function Contact() {
  const t = useT();

  return (
    <>
      <section id="contact" className="relative z-10 bg-[#030303] overflow-hidden px-6 lg:px-[8%] py-32 lg:py-48 text-center">
        <div aria-hidden className="hero-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(130vw,1000px)] aspect-square opacity-60" data-live>
          <div className="hero-glow__halo absolute inset-[18%] rounded-full" />
          <div className="hero-glow__ring absolute inset-0 rounded-full" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <p className="sg-eyebrow mb-5 lg:mb-8">{t({ tr: 'İletişim', en: 'Contact' })}</p>
          <h2 className="sg-title sg-title-xl">
            {t({ tr: 'Birlikte bir şey ', en: "Let's build something " })}
            <strong className="sg-ai">{t({ tr: 'yapalım.', en: 'together.' })}</strong>
          </h2>
          <p className="sg-lead mt-6 lg:mt-8 max-w-lg mx-auto">
            {t({
              tr: 'Staj, iş ya da ortak bir proje fikrin varsa LinkedIn\'den yaz. Kodlarıma GitHub\'dan göz at.',
              en: 'Got an internship, a job or a project idea? Message me on LinkedIn. Browse my code on GitHub.',
            })}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="sg-btn">
              <LinkedInIcon className="w-4 h-4" />
              {t({ tr: 'LinkedIn\'den yaz', en: 'Message on LinkedIn' })}
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="sg-btn sg-btn--ghost">
              <GitHubIcon className="w-4 h-4" />
              GitHub
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-[#030303] border-t border-white/10 px-6 lg:px-[8%] py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:items-center justify-between text-xs text-white/45">
          <p>© 2026 Hasan Alp Güngör</p>
          <p>
            {t({
              tr: 'Next.js, Three.js ve TypeScript ile yapıldı. Oyun kolu dahil her şey kodla.',
              en: 'Built with Next.js, Three.js and TypeScript. Everything is code, the controller included.',
            })}
          </p>
          <div className="flex gap-5">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
            <a href={LINKS.itch} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">itch.io</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
