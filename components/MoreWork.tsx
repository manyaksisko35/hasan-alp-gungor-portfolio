'use client';

import { ArrowIcon } from '@/components/Icons';
import { MORE_REPOS, PROJECTS } from '@/lib/data';
import { useLang, useT } from '@/lib/i18n';
import { detailHref } from '@/lib/lang';

export default function MoreWork() {
  const t = useT();
  const lang = useLang();

  return (
    <section id="more" className="relative z-10 px-6 lg:px-[8%] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto">
        <p className="ui-label mb-3 lg:mb-5">{t({ tr: 'Diğer projeler', en: 'More work', no: 'Flere prosjekter' })}</p>
        <h2 className="ui-title max-w-3xl">
          {t({ tr: 'Diğer ', en: 'Other ', no: 'Andre ' })}
          <strong>{t({ tr: 'çalışmalar.', en: 'projects.', no: 'prosjekter.' })}</strong>
        </h2>
        <p className="ui-lead mt-4 lg:mt-6 max-w-xl">
          {t({
            tr: 'Oyun yerelleştirme aracı, oyun yayın arayüzü, gömülü sistemler, web tasarımı ve masaüstü uygulamaları.',
            en: 'A game localization tool, a game broadcast overlay, embedded systems, web design and desktop applications.',
            no: 'Et lokaliseringsverktøy for spill, et broadcast-overlay for spill, innebygde systemer, webdesign og skrivebordsapper.',
          })}
        </p>

        <div className="mt-10 lg:mt-14 grid md:grid-cols-2 gap-4 lg:gap-6">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.slug ? detailHref(p.slug, lang) : p.href}
              {...(!p.slug && { target: '_blank', rel: 'noopener noreferrer' })}
              data-reveal
              className="ui-card group relative overflow-hidden p-6 lg:p-8 flex flex-col min-h-[260px]"
            >
              <div
                aria-hidden
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white opacity-[0.07] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.14]"
              />
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 ui-label ui-label--plain !text-[0.65rem]">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.accent }} />
                  {t(p.tag)}
                </span>
                <span className="flex items-center gap-2">
                  {p.slug && <span className="text-xs text-white/55 transition-colors group-hover:text-white">{t({ tr: 'Detaylar', en: 'Details', no: 'Detaljer' })}</span>}
                  <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 transition-all group-hover:bg-white group-hover:text-black group-hover:border-white">
                    <ArrowIcon className={p.slug ? 'rotate-45' : ''} />
                  </span>
                </span>
              </div>
              <h3 className="mt-8 text-2xl lg:text-3xl font-semibold tracking-[-0.03em]">{p.name}</h3>
              <p className="mt-3 text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-lg">{t(p.text)}</p>
              <ul className="mt-auto pt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                    {s}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-sm text-white/55 mr-1">{t({ tr: 'Ayrıca:', en: 'Also:', no: 'Også:' })}</span>
          {MORE_REPOS.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white hover:border-white/30 transition-colors"
            >
              {r.name} <span className="text-white/55 text-xs ml-1">{r.lang}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
