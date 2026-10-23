'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { ArrowIcon, GitHubIcon, ItchIcon, YouTubeIcon } from '@/components/Icons';
import { PageBackground, PageFooter, PageHeader } from '@/components/PageChrome';
import { VideoCard, VideoModal } from '@/components/VideoCard';
import { VIDEOS, type Video } from '@/lib/data';
import { useLang, useT } from '@/lib/i18n';
import { detailHref, homeHref } from '@/lib/lang';
import { DETAILS, type LinkKind, type ProjectDetail } from '@/lib/projects';

const LINK_ICON: Record<LinkKind, (p: { className?: string }) => React.ReactElement> = {
  live: ArrowIcon,
  github: GitHubIcon,
  itch: ItchIcon,
  youtube: YouTubeIcon,
};

export default function ProjectPage({ project }: { project: ProjectDetail }) {
  const t = useT();
  const lang = useLang();
  const home = homeHref(lang);
  const [playing, setPlaying] = useState<Video | null>(null);
  const close = useCallback(() => setPlaying(null), []);
  const video = project.video ? VIDEOS.find((v) => v.key === project.video) : undefined;

  const index = DETAILS.findIndex((d) => d.slug === project.slug);
  const next = DETAILS[(index + 1) % DETAILS.length];

  return (
    <>
      <PageHeader back={{ href: `${home}#work`, label: t({ tr: 'Tüm projeler', en: 'All projects' }) }} />
      <PageBackground />

      <main className="relative z-10 px-6 lg:px-[8%] pt-32 lg:pt-40 pb-16">
        <article className="max-w-7xl mx-auto">
          <nav aria-label={t({ tr: 'Sayfa yolu', en: 'Breadcrumb' })} className="font-mono text-xs text-white/55">
            <a href={home} className="hover:text-white transition-colors">{t({ tr: 'Ana sayfa', en: 'Home' })}</a>
            <span className="mx-2">/</span>
            <a href={`${home}#work`} className="hover:text-white transition-colors">{t({ tr: 'Projeler', en: 'Projects' })}</a>
            <span className="mx-2">/</span>
            <span className="text-white/70">{project.name}</span>
          </nav>

          <div className="mt-8 grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 lg:gap-16 items-end">
            <div>
              <p className="ui-label ui-label--plain mb-4 lg:mb-6">{t(project.kind)}</p>
              <h1 className="ui-title text-[clamp(2.8rem,1.6rem+5.5vw,6.5rem)]">{project.name}</h1>
              <p className="ui-lead mt-5 lg:mt-7 max-w-2xl !text-white/70">{t(project.summary)}</p>
            </div>
            <div className="flex flex-col gap-5 lg:items-end">
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {project.links.map((l, i) => {
                  const Icon = LINK_ICON[l.kind];
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`ui-btn !py-2.5 !px-5 !text-sm ${i === 0 ? '' : 'ui-btn--ghost'}`}
                    >
                      {l.kind !== 'live' && <Icon className="w-4 h-4" />}
                      {t(l.label)}
                      {l.kind === 'live' && <Icon />}
                    </a>
                  );
                })}
              </div>
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <figure className="ui-card !rounded-[32px] mt-12 lg:mt-16 overflow-hidden">
            <div className="relative aspect-[16/10]" style={{ background: project.cover.glow }}>
              <Image
                src={project.cover.src}
                alt={project.name}
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 92vw"
                className={project.cover.fit === 'cover' ? 'object-cover' : 'object-contain p-8 lg:p-16'}
              />
            </div>
          </figure>

          <section className="mt-16 lg:mt-24 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16">
            <div>
              <p className="ui-label ui-label--plain mb-4">{t({ tr: 'Proje hakkında', en: 'About the project' })}</p>
              <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.035em] leading-tight">
                {t({ tr: 'Ne yaptım, ', en: 'What I built ' })}
                <span className="ui-accent">{t({ tr: 'nasıl yaptım.', en: 'and how.' })}</span>
              </h2>
            </div>
            <div className="space-y-5 text-base lg:text-lg leading-relaxed text-white/70">
              {project.about.map((p) => (
                <p key={p.en}>{t(p)}</p>
              ))}
            </div>
          </section>

          <section className="mt-16 lg:mt-24">
            <p className="ui-label ui-label--plain mb-6">{t({ tr: 'Öne çıkanlar', en: 'Highlights' })}</p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {project.features.map((f, i) => (
                <li key={f.title.en} className="ui-card p-6 lg:p-7">
                  <span className="font-mono text-[0.65rem] tabular-nums text-white/55">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">{t(f.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{t(f.text)}</p>
                </li>
              ))}
            </ul>
          </section>

          {project.gallery.length > 0 && (
            <section className="mt-16 lg:mt-24">
              <p className="ui-label ui-label--plain mb-6">{t({ tr: 'Görseller', en: 'Gallery' })}</p>
              <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                {project.gallery.map((g, i) => (
                  <figure key={g.src} className={project.gallery.length % 2 === 1 && i === 0 ? 'md:col-span-2' : ''}>
                    <div className="ui-card !rounded-[24px] overflow-hidden relative aspect-[16/10]">
                      <Image src={g.src} alt={t(g.caption)} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-3 px-1 text-sm text-white/55">{t(g.caption)}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {video && (
            <section className="mt-16 lg:mt-24 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16 items-center">
              <div>
                <p className="ui-label ui-label--plain mb-4">{t({ tr: 'Video', en: 'Video' })}</p>
                <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.035em] leading-tight">
                  {t({ tr: 'Geliştirme sürecini ', en: 'Watch how ' })}
                  <span className="ui-accent">{t({ tr: "YouTube'da anlattım.", en: 'I built it.' })}</span>
                </h2>
              </div>
              <VideoCard video={video} big onPlay={setPlaying} />
            </section>
          )}

          <a
            href={detailHref(next.slug, lang)}
            className="group ui-card !rounded-[32px] mt-20 lg:mt-28 flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-7 lg:p-10"
          >
            <span>
              <span className="block font-mono text-xs text-white/55">{t({ tr: 'Sıradaki proje', en: 'Next project' })}</span>
              <span className="mt-2 block text-3xl lg:text-5xl font-semibold tracking-[-0.04em]">{next.name}</span>
              <span className="mt-2 block text-sm text-white/55">{t(next.kind)}</span>
            </span>
            <span className="ui-btn !p-0 w-14 h-14 shrink-0 grid place-items-center transition-transform group-hover:translate-x-1">
              <ArrowIcon className="rotate-45 w-4 h-4" />
            </span>
          </a>
        </article>
      </main>

      <PageFooter />

      <VideoModal video={playing} onClose={close} />
    </>
  );
}
