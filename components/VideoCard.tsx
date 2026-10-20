'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ArrowIcon } from '@/components/Icons';
import type { Video } from '@/lib/data';
import { useT } from '@/lib/i18n';
import { getLenis } from '@/lib/lenis';

const PlayBadge = ({ big = false }: { big?: boolean }) => (
  <span
    className={`glass grid place-items-center rounded-full text-white transition-transform duration-500 group-hover:scale-110 ${big ? 'w-16 h-16 lg:w-20 lg:h-20' : 'w-12 h-12'}`}
  >
    <svg width={big ? 20 : 14} height={big ? 20 : 14} viewBox="0 0 14 14" aria-hidden className="translate-x-[1px]">
      <path d="M3 1.5v11l9.5-5.5z" fill="currentColor" />
    </svg>
  </span>
);

/**
 * A video tile. With a video id it shows the YouTube thumbnail and opens the player in place;
 * without one it links out to the channel.
 */
export function VideoCard({ video, index, big = false, onPlay }: { video: Video; index?: number; big?: boolean; onPlay: (v: Video) => void }) {
  const t = useT();

  const media = (
    <span className="relative block aspect-video overflow-hidden rounded-[20px] bg-[#1b1c1f]">
      {video.id ? (
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt=""
          fill
          unoptimized
          sizes={big ? '(min-width: 1024px) 50vw, 92vw' : '(min-width: 1024px) 25vw, 92vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 flex items-end p-5"
          style={{ background: 'radial-gradient(70% 90% at 30% 20%, rgba(255,255,255,0.16), transparent 70%), linear-gradient(160deg, #2a2b30, #151618)' }}
        >
          <span className={`font-semibold tracking-[-0.04em] text-white/[0.1] leading-none ${big ? 'text-[clamp(2.2rem,4.5vw,4.2rem)]' : 'text-2xl lg:text-[1.7rem]'}`}>{t(video.tag)}</span>
        </span>
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <span className="absolute inset-0 grid place-items-center">
        <PlayBadge big={big} />
      </span>
      {index !== undefined && (
        <span className="absolute top-3 left-4 font-mono text-[0.65rem] tabular-nums text-white/60">{String(index + 1).padStart(2, '0')}</span>
      )}
    </span>
  );

  const caption = (
    <span className="block px-1 pt-3">
      <span className="block font-mono text-[0.65rem] text-white/55">{t(video.tag)}</span>
      <span className={`mt-1 flex items-start justify-between gap-3 font-medium leading-snug ${big ? 'text-lg lg:text-xl' : 'text-base'}`}>
        {t(video.title)}
        {!video.id && <ArrowIcon className="mt-1.5 shrink-0 text-white/55" />}
      </span>
    </span>
  );

  if (video.id) {
    return (
      <button type="button" onClick={() => onPlay(video)} className="group block w-full text-left" aria-label={`${t(video.title)}, ${t({ tr: 'videoyu oynat', en: 'play video' })}`}>
        {media}
        {caption}
      </button>
    );
  }
  return (
    <a href={video.href} target="_blank" rel="noopener noreferrer" className="group block">
      {media}
      {caption}
    </a>
  );
}

/** Plays a YouTube video over the page. */
export function VideoModal({ video, onClose }: { video: Video | null; onClose: () => void }) {
  const t = useT();
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!video) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.activeElement as HTMLElement | null;
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lenis?.start();
      prev?.focus();
    };
  }, [video, onClose]);

  if (!video?.id) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t(video.title)}
      data-lenis-prevent
      onClick={onClose}
      className="fixed inset-0 z-[300] grid place-items-center bg-black/75 backdrop-blur-md p-4 lg:p-10"
    >
      <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="font-medium truncate">{t(video.title)}</p>
          <div className="flex shrink-0 gap-2">
            <a href={video.href} target="_blank" rel="noopener noreferrer" className="ui-btn ui-btn--ghost !py-2 !px-4 !text-sm">
              YouTube <ArrowIcon />
            </a>
            <button ref={close} type="button" onClick={onClose} className="ui-btn !py-2 !px-4 !text-sm">
              {t({ tr: 'Kapat', en: 'Close' })}
            </button>
          </div>
        </div>
        <div className="glass overflow-hidden rounded-[24px] aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={t(video.title)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
