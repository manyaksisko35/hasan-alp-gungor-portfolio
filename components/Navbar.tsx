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
    <div className={`flex rounded-lg bg-white/[0.06] p-0.5 font-mono text-[0.7rem] ${className}`} role="group" aria-label="Language">
      {(['tr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-md px-2 py-1 uppercase transition-colors ${lang === l ? 'bg-white/15 text-white' : 'text-white/45 hover:text-white'}`}
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
    <header className="fixed top-3 md:top-4 inset-x-3 md:inset-x-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto relative w-full md:w-auto flex items-center gap-2 md:gap-6 rounded-2xl border border-white/10 bg-[#0a0a0b]/80 backdrop-blur-xl pl-2 pr-2 py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
        <a href="#top" onClick={(e) => go(e, 'top')} className="flex items-center gap-2.5 pr-1">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-red-500 text-sm font-bold tracking-tight">HA</span>
          <span className="text-sm font-semibold tracking-tight whitespace-nowrap">Hasan Alp Güngör</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {NAV.map((s) => {
            const isActive = active === s.id || (s.id === 'work' && active === 'more');
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => go(e, s.id)}
                className={`rounded-lg px-3 py-2 transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/55 hover:text-white'}`}
              >
                {t(s.label)}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <LangToggle className="hidden sm:flex" />
          <a href="#contact" onClick={(e) => go(e, 'contact')} className="ui-btn !py-2 !px-4 !text-sm">
            {t({ tr: 'Bana ulaş', en: 'Contact' })}
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
          <nav className="lg:hidden absolute top-[calc(100%+8px)] inset-x-0 rounded-2xl border border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl flex flex-col p-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => go(e, s.id)}
                className={`rounded-xl px-4 py-3 text-base ${active === s.id ? 'bg-white/10 text-white' : 'text-white/60'}`}
              >
                {t(s.label)}
              </a>
            ))}
            <div className="flex items-center justify-between px-4 py-3 text-base text-white/60">
              <span>{t({ tr: 'Dil', en: 'Language' })}</span>
              <LangToggle />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
