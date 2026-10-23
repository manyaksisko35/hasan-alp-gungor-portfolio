'use client';

import { ArrowIcon } from '@/components/Icons';
import LogoMark from '@/components/LogoMark';
import { LangToggle } from '@/components/Navbar';
import { useLang } from '@/lib/i18n';
import { homeHref } from '@/lib/lang';

// Header, background and footer for the pages outside the home page (projects, blog).
// Links back to the home page are full page loads, so its 3D scene and scroll pins start clean.

export function PageHeader({ back }: { back: { href: string; label: string } }) {
  const home = homeHref(useLang());
  return (
    <header className="fixed top-3 md:top-4 inset-x-3 md:inset-x-0 z-50 flex justify-center pointer-events-none">
      <div className="glass pointer-events-auto w-full md:w-auto flex items-center gap-2 md:gap-6 rounded-full pl-2 pr-2 py-2">
        <a href={home} className="flex items-center gap-2.5 pr-1">
          <span className="ui-btn !p-0 w-9 h-9">
            <LogoMark className="w-5 h-5" />
          </span>
          <span className="text-sm font-semibold tracking-tight whitespace-nowrap">Hasan Alp Güngör</span>
        </a>
        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <LangToggle className="hidden sm:flex" />
          <a href={back.href} className="ui-btn !py-2 !px-4 !text-sm whitespace-nowrap">
            <ArrowIcon className="-rotate-[135deg]" />
            {back.label}
          </a>
        </div>
      </div>
    </header>
  );
}

export function PageBackground() {
  return (
    <div aria-hidden className="liquid-bg">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export function PageFooter() {
  const home = homeHref(useLang());
  return (
    <footer className="relative z-10 px-6 lg:px-[8%] pb-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:items-center justify-between font-mono text-xs text-white/55">
        <p>© 2026 Hasan Alp Güngör</p>
        <a href={home} className="hover:text-white transition-colors">hasanalpgungor.com</a>
      </div>
    </footer>
  );
}
