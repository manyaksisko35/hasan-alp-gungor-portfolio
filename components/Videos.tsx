'use client';

import { useCallback, useState } from 'react';
import { ArrowIcon, YouTubeIcon } from '@/components/Icons';
import { VideoCard, VideoModal } from '@/components/VideoCard';
import { LINKS, VIDEOS, type Video } from '@/lib/data';
import { useT } from '@/lib/i18n';

export default function Videos() {
  const t = useT();
  const [playing, setPlaying] = useState<Video | null>(null);
  const close = useCallback(() => setPlaying(null), []);

  return (
    <section id="videos" className="relative z-10 px-6 lg:px-[8%] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-16">
          <div>
            <p className="ui-label mb-3 lg:mb-5">{t({ tr: 'İçerik', en: 'Content' })}</p>
            <h2 className="ui-title">
              {t({ tr: "YouTube'da ", en: 'Technical projects ' })}
              <strong className="ui-accent">{t({ tr: 'teknik projeler.', en: 'on YouTube.' })}</strong>
            </h2>
            <p className="ui-lead mt-4 lg:mt-6 max-w-xl">
              {t({
                tr: 'Kanalımda ESP32 ve Arduino ile geliştirdiğim donanım projelerini, oyunlarla gerçek dünyayı birleştiren deneylerimi ve teknik rehberleri paylaşıyorum.',
                en: 'On my channel I share hardware projects built with ESP32 and Arduino, experiments that connect games with the real world, and technical guides.',
              })}
            </p>
          </div>
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="ui-btn shrink-0 self-start lg:self-end">
            <YouTubeIcon className="w-5 h-5" />
            {t({ tr: 'Kanala git', en: 'Visit the channel' })}
            <ArrowIcon />
          </a>
        </div>

        <ul className="mt-10 lg:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-5 lg:gap-y-10">
          {VIDEOS.map((v, i) => (
            <li key={v.key} data-reveal className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
              <VideoCard video={v} index={i} big={i === 0} onPlay={setPlaying} />
            </li>
          ))}
        </ul>
      </div>
      <VideoModal video={playing} onClose={close} />
    </section>
  );
}
