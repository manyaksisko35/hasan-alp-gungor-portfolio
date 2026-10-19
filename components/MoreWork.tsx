'use client';

import { ArrowIcon } from '@/components/Icons';
import { MORE_REPOS, PROJECTS } from '@/lib/data';
import { useT } from '@/lib/i18n';

export default function MoreWork() {
  const t = useT();

  return (
    <section id="more" className="ui-ambient amb-red relative z-10 bg-[#030303] px-6 lg:px-[8%] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto">
        <p className="ui-label mb-3 lg:mb-5">{t({ tr: 'Diğer projelerim', en: 'More projects' })}</p>
        <h2 className="ui-title max-w-3xl">
          {t({ tr: 'Başka neler ', en: 'What else have I ' })}
          <strong>{t({ tr: 'yaptım?', en: 'made?' })}</strong>
        </h2>
        <p className="ui-lead mt-4 lg:mt-6 max-w-xl">
          {t({
            tr: 'Web konseptleri, oyun yayınları için arayüzler, Arduino projeleri ve okulda yazdığım uygulamalar.',
            en: 'Web concepts, overlays for game broadcasts, Arduino projects and apps I wrote for school.',
          })}
        </p>

        <div className="mt-10 lg:mt-14 grid md:grid-cols-2 gap-4 lg:gap-6">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-card group relative overflow-hidden p-6 lg:p-8 flex flex-col min-h-[260px]"
            >
              <div
                aria-hidden
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
                style={{ background: p.accent }}
              />
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 ui-label ui-label--plain !text-[0.65rem]">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.accent }} />
                  {t(p.tag)}
                </span>
                <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 transition-all group-hover:bg-white group-hover:text-black group-hover:border-white">
                  <ArrowIcon />
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
          <span className="text-sm text-white/40 mr-1">{t({ tr: 'Ayrıca:', en: 'Also:' })}</span>
          {MORE_REPOS.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white hover:border-white/30 transition-colors"
            >
              {r.name} <span className="text-white/35 text-xs ml-1">{r.lang}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
