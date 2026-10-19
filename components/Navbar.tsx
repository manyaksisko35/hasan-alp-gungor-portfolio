'use client';

import { useState } from 'react';
import { setLang, useLang, useT } from '@/lib/i18n';
import { scrollToId } from '@/lib/lenis';
import { SECTIONS } from '@/lib/sections';
import { useActiveSection } from '@/lib/useActiveSection';

const NAV = SECTIONS.filter((s) => s.nav);

function LangToggle({ className = '' }: { className?: string }) {
  const lang = useLang();
  return (
    <div className={`flex rounded-full border border-white/15 p-0.5 text-xs font-medium ${className}`} role="group" aria-label="Language">
      {(['tr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 px-5 md:px-12 flex items-center justify-between bg-black/85 border-b border-white/10">
      <a href="#top" onClick={(e) => go(e, 'top')} className="text-sm md:text-base font-semibold tracking-[0.3em] md:tracking-[0.35em]">
        <span className="hidden sm:inline">HASAN ALP GÜNGÖR</span>
        <span className="sm:hidden">HAG</span>
      </a>

      <nav className="hidden lg:flex gap-8 xl:gap-10 text-sm h-full">
        {NAV.map((s) => {
          const isActive = active === s.id || (s.id === 'work' && active === 'more');
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              className={`relative h-full flex items-center transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              {t(s.label)}
              <span
                className={`absolute left-0 bottom-[22px] h-px bg-white transition-all duration-300 ${
                  isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <LangToggle className="hidden sm:flex" />
        <a href="#contact" onClick={(e) => go(e, 'contact')} className="sg-btn !py-2 !px-4 md:!px-5 !text-sm">
          {t({ tr: 'İletişim', en: 'Contact' })}
        </a>
        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
        >
          <span className={`w-5 h-px bg-white transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span className={`w-5 h-px bg-white transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden absolute top-16 inset-x-0 bg-black/95 border-b border-white/10 flex flex-col px-5 py-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              className={`block py-3 text-lg font-light border-b border-white/5 last:border-0 ${active === s.id ? 'text-white' : 'text-white/60'}`}
            >
              {t(s.label)}
            </a>
          ))}
          <div className="flex items-center justify-between py-4 text-base font-light text-white/70">
            <span>{t({ tr: 'Dil', en: 'Language' })}</span>
            <LangToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
