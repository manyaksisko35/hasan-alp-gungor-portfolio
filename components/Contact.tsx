'use client';

import { ArrowIcon, GitHubIcon, LinkedInIcon } from '@/components/Icons';
import { LINKS } from '@/lib/data';
import { useT } from '@/lib/i18n';

export default function Contact() {
  const t = useT();

  return (
    <>
      <section id="contact" className="relative z-10 bg-[#030303] px-6 lg:px-[8%] py-24 lg:py-36">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0a0b] px-6 py-16 lg:px-16 lg:py-24">
          <div aria-hidden className="hero-grid absolute inset-0" />
          <div aria-hidden className="hero-light absolute -right-40 -bottom-40 w-[640px] aspect-square rounded-full" />
          <div className="relative max-w-3xl">
          <p className="ui-label mb-5 lg:mb-8">{t({ tr: 'İletişim', en: 'Contact' })}</p>
          <h2 className="ui-title ui-title-xl">
            {t({ tr: 'Bana ', en: 'Get in ' })}
            <strong className="ui-accent">{t({ tr: 'ulaş.', en: 'touch.' })}</strong>
          </h2>
          <p className="ui-lead mt-6 lg:mt-8 max-w-lg">
            {t({
              tr: 'Staj, iş ya da birlikte bir proje fikrin varsa LinkedIn\'den yazabilirsin.',
              en: 'If you have an internship, a job or a project idea, message me on LinkedIn.',
            })}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="ui-btn">
              <LinkedInIcon className="w-4 h-4" />
              {t({ tr: 'LinkedIn\'den yaz', en: 'Message me on LinkedIn' })}
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="ui-btn ui-btn--ghost">
              <GitHubIcon className="w-4 h-4" />
              GitHub
              <ArrowIcon />
            </a>
          </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-[#030303] px-6 lg:px-[8%] pb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:items-center justify-between font-mono text-xs text-white/40">
          <p>© 2026 Hasan Alp Güngör</p>
          <p>
            {t({
              tr: 'Next.js, Three.js ve TypeScript ile geliştirildi.',
              en: 'Built with Next.js, Three.js and TypeScript.',
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
