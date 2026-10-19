'use client';

import { PARTS } from '@/lib/data';
import { useLang, useT } from '@/lib/i18n';

export default function Skills() {
  const t = useT();
  const lang = useLang();

  return (
    <section id="skills" className="relative h-[320svh]">
      <div className="sticky top-0 h-svh px-6 lg:px-[8%] pt-24 lg:pt-28 pb-8 flex flex-col">
        <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col lg:justify-center">
          <div className="lg:max-w-sm">
            <p className="sg-eyebrow mb-3 lg:mb-5">{t({ tr: 'Neler biliyorum', en: 'What I know' })}</p>
            <h2 className="sg-title">
              {t({ tr: 'Kullandığım ', en: 'What I ' })}
              <strong className="sg-ai">{t({ tr: 'teknolojiler.', en: 'work with.' })}</strong>
            </h2>
            <p className="sg-lead mt-4 lg:mt-6 hidden sm:block">
              {t({
                tr: 'Bu oyun kolunu da hazır model kullanmadan Three.js ile kendim kodladım. Kaydırdıkça parçalarına ayrılıyor; her parça kullandığım bir teknoloji.',
                en: 'I coded this controller myself with Three.js, without a premade model. It comes apart as you scroll, and each part is something I use.',
              })}
            </p>
          </div>

          <ol className="mt-auto lg:mt-10 lg:max-w-sm grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2 lg:gap-y-3">
            {PARTS.map((p, i) => (
              <li key={p.id} className="flex items-baseline gap-3 text-sm lg:text-base">
                <span className="text-[0.65rem] tabular-nums text-white/40">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="font-medium">{p.title[lang]}</span>
                  <span className="hidden lg:inline text-white/50 font-light"> · {p.text[lang]}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
