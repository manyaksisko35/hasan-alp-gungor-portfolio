'use client';

import { useT } from '@/lib/i18n';
import { scrollToId } from '@/lib/lenis';
import { SECTIONS } from '@/lib/sections';
import { useActiveSection } from '@/lib/useActiveSection';

export default function SectionDots() {
  const t = useT();
  const active = useActiveSection();

  return (
    <nav aria-label="Sections" className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1">
      {SECTIONS.map((s) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollToId(s.id)}
            aria-label={t(s.label)}
            aria-current={on ? 'true' : undefined}
            className="group relative flex items-center justify-end h-5 w-5"
          >
            <span className="absolute right-6 whitespace-nowrap rounded-full bg-black/80 border border-white/10 px-3 py-1 text-xs text-white/80 opacity-0 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
              {t(s.label)}
            </span>
            <span
              className={`block w-1.5 rounded-full transition-all duration-300 ${on ? 'h-5 bg-gradient-to-b from-red-400 to-red-600' : 'h-1.5 bg-white/30 group-hover:bg-white/70'}`}
            />
          </button>
        );
      })}
    </nav>
  );
}
