'use client';

import { useSyncExternalStore } from 'react';
import { ArrowIcon } from '@/components/Icons';
import { homeHref, LANGS, type Lang } from '@/lib/lang';
import { LOGO_PIECES } from '@/lib/logoShape';

type Ring = readonly (readonly [number, number])[];
const ring = (pts: Ring) => `M${pts.map(([x, y]) => `${x} ${y}`).join('L')}Z`;

// How far each piece drifts from the middle of the logo, and how much it turns.
const SPREAD = 0.42;
const TILT = [-14, 9, -6, 12, -10, 7, -8];

// The 404 page is prerendered once, so the language comes from the address in the browser.
const noop = () => () => {};
const langFromPath = (): Lang => {
  const path = window.location.pathname;
  return LANGS.find((l) => l !== 'tr' && (path === `/${l}` || path.startsWith(`/${l}/`))) ?? 'tr';
};

const TEXT = {
  tr: {
    title: 'Bu sayfa parçalara ayrılmış.',
    lead: 'Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Ana sayfadan devam edebilirsin.',
    home: 'Ana sayfaya dön',
    work: 'Projelere bak',
  },
  en: {
    title: 'This page fell apart.',
    lead: "The page you're looking for may have moved or never existed. You can carry on from the home page.",
    home: 'Back to home',
    work: 'See my projects',
  },
  no: {
    title: 'Denne siden gikk i stykker.',
    lead: 'Siden du leter etter kan ha flyttet, eller den har aldri fantes. Du kan fortsette fra forsiden.',
    home: 'Tilbake til forsiden',
    work: 'Se prosjektene mine',
  },
} satisfies Record<Lang, Record<string, string>>;

export default function NotFoundView() {
  const lang = useSyncExternalStore(noop, langFromPath, () => 'tr' as Lang);
  const t = TEXT[lang];
  const home = homeHref(lang);

  return (
    <>
      <div aria-hidden className="liquid-bg">
        <span />
        <span />
        <span />
        <span />
      </div>
      <main lang={lang} className="relative z-10 min-h-svh px-6 lg:px-[8%] py-16 grid lg:grid-cols-2 items-center gap-10 lg:gap-16 max-w-7xl mx-auto">
        <svg viewBox="-1.9 -1.9 3.8 3.8" aria-hidden className="w-full max-w-[460px] mx-auto lg:order-2 overflow-visible">
          <defs>
            <linearGradient id="nf-glass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.42" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="0.1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.24" />
            </linearGradient>
          </defs>
          <g transform="scale(1 -1)">
            {LOGO_PIECES.map((p, i) => {
              const [cx, cy] = p.center;
              return (
                <g key={p.id} transform={`translate(${cx * SPREAD} ${cy * SPREAD}) rotate(${TILT[i % TILT.length]} ${cx} ${cy})`}>
                  <path
                    className="nf-shard"
                    style={{ animationDelay: `${i * -0.9}s` }}
                    d={[ring(p.outer), ...p.holes.map(ring)].join('')}
                    fillRule="evenodd"
                    fill="url(#nf-glass)"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="0.012"
                  />
                </g>
              );
            })}
          </g>
        </svg>

        <div>
          <p className="ui-label ui-label--plain mb-5">404</p>
          <h1 className="ui-title text-[clamp(2.6rem,1.4rem+4.6vw,5.5rem)]">
            <span className="ui-accent">{t.title}</span>
          </h1>
          <p className="ui-lead mt-6 max-w-md">{t.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={home} className="ui-btn">
              {t.home}
              <ArrowIcon />
            </a>
            <a href={`${home}#work`} className="ui-btn ui-btn--ghost">
              {t.work}
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
