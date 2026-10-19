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
    <div className={`flex rounded-full bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] p-0.5 font-mono text-[0.7rem] ${className}`} role="group" aria-label="Language">
      {(['tr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? 'bg-white/20 text-white' : 'text-white/45 hover:text-white'}`}
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
      <div className="glass pointer-events-auto w-full md:w-auto flex items-center gap-2 md:gap-6 rounded-full pl-2 pr-2 py-2">
        <a href="#top" onClick={(e) => go(e, 'top')} className="flex items-center gap-2.5 pr-1">
          <span className="ui-btn !p-0 grid place-items-center w-9 h-9 !text-sm font-bold tracking-tight">HA</span>
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
                className={`rounded-full px-3.5 py-2 transition-all ${isActive ? 'bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]' : 'text-white/60 hover:text-white'}`}
              >
                {t(s.label)}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <LangToggle className="hidden sm:flex" />
          <a href="#contact" onClick={(e) => go(e, 'contact')} className="ui-btn !py-2 !px-4 !text-sm">
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
          <nav className="glass lg:hidden absolute top-[calc(100%+10px)] inset-x-0 rounded-[28px] flex flex-col p-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => go(e, s.id)}
                className={`rounded-full px-4 py-3 text-base ${active === s.id ? 'bg-white/10 text-white' : 'text-white/60'}`}
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
