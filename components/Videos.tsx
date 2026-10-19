'use client';

import { ArrowIcon, YouTubeIcon } from '@/components/Icons';
import { LINKS, VIDEOS } from '@/lib/data';
import { useT } from '@/lib/i18n';

export default function Videos() {
  const t = useT();

  return (
    <section id="videos" className="ui-ambient amb-red relative z-10 bg-[#030303] px-6 lg:px-[8%] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="ui-label mb-3 lg:mb-5">{t({ tr: 'Videolarım', en: 'My videos' })}</p>
          <h2 className="ui-title">
            {t({ tr: "CS2'yi gerçek hayata ", en: 'Bringing CS2 into ' })}
            <strong className="ui-accent">{t({ tr: 'taşıyorum.', en: 'real life.' })}</strong>
          </h2>
          <p className="ui-lead mt-4 lg:mt-6 max-w-md">
            {t({
              tr: "YouTube kanalımda ESP32 ile yaptığım cihazları, CS2'yi gerçek dünyaya bağlayan projelerimi ve oyun rehberlerimi paylaşıyorum.",
              en: 'On my YouTube channel I share devices I build with ESP32, projects that connect CS2 to the real world, and gaming guides.',
            })}
          </p>
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="ui-btn mt-8">
            <YouTubeIcon className="w-5 h-5" />
            {t({ tr: 'Kanala git', en: 'Visit the channel' })}
            <ArrowIcon />
          </a>
        </div>

        <ol className="ui-card !rounded-[20px] divide-y divide-white/[0.07] overflow-hidden">
          {VIDEOS.map((v, i) => (
            <li key={v.href}>
              <a
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 lg:gap-6 px-5 py-4 lg:px-7 lg:py-5 transition-colors hover:bg-white/[0.04]"
              >
                <span className="w-6 shrink-0 text-xs tabular-nums text-white/35">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-base lg:text-lg font-medium leading-snug">{t(v.title)}</span>
                  <span className="block mt-1 text-xs text-red-400/80">{t(v.tag)}</span>
                </span>
                <span className="w-9 h-9 shrink-0 rounded-full border border-white/15 flex items-center justify-center text-white/70 transition-all group-hover:bg-red-500 group-hover:border-red-500 group-hover:text-white">
                  <svg width="10" height="10" viewBox="0 0 14 14" aria-hidden>
                    <path d="M3 1.5v11l9.5-5.5z" fill="currentColor" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
