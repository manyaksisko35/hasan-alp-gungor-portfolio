'use client';

import Image from 'next/image';
import { ArrowIcon } from '@/components/Icons';
import { PageBackground, PageFooter, PageHeader } from '@/components/PageChrome';
import { POSTS, type Block, type Post } from '@/lib/blog';
import { useLang, useT, type Lang } from '@/lib/i18n';
import { blogHref, detailHref, homeHref } from '@/lib/lang';
import { getDetail } from '@/lib/projects';

const LOCALE: Record<Lang, string> = { tr: 'tr-TR', en: 'en-GB', no: 'nb-NO' };

export const formatDate = (iso: string, lang: Lang) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric' });

/** A post card, used on the blog index and the home page. */
export function PostCard({ post, wide = false }: { post: Post; wide?: boolean }) {
  const t = useT();
  const lang = useLang();
  return (
    <a
      href={blogHref(lang, post.slug)}
      className={`group ui-card !rounded-[28px] flex h-full flex-col overflow-hidden ${wide ? 'lg:flex-row' : ''}`}
    >
      <span className={`relative block aspect-[16/9] overflow-hidden bg-[#1b1c1f] ${wide ? 'lg:aspect-auto lg:w-[58%] lg:min-h-[380px]' : ''}`}>
        <Image
          src={post.cover}
          alt=""
          fill
          sizes={wide ? '(min-width: 1024px) 50vw, 92vw' : '(min-width: 1024px) 30vw, 92vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </span>
      <span className={`flex flex-1 flex-col p-6 lg:p-7 ${wide ? 'lg:p-10 lg:justify-center' : ''}`}>
        <span className="font-mono text-[0.7rem] text-white/55">
          {formatDate(post.date, lang)} · {post.tags.slice(0, 2).join(' · ')}
        </span>
        <span className={`mt-3 block font-semibold tracking-[-0.03em] leading-snug ${wide ? 'text-2xl lg:text-4xl' : 'text-xl'}`}>{t(post.title)}</span>
        <span className="mt-3 block text-sm leading-relaxed text-white/60">{t(post.description)}</span>
        <span className={`${wide ? 'lg:mt-0' : ''} mt-auto pt-6 inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition-colors`}>
          {t({ tr: 'Yazıyı oku', en: 'Read the post', no: 'Les innlegget' })}
          <ArrowIcon className="rotate-45" />
        </span>
      </span>
    </a>
  );
}

export function BlogIndex() {
  const t = useT();
  const lang = useLang();
  const [first, ...rest] = POSTS;
  return (
    <>
      <PageHeader back={{ href: homeHref(lang), label: t({ tr: 'Ana sayfa', en: 'Home', no: 'Hjem' }) }} />
      <PageBackground />
      <main className="relative z-10 px-6 lg:px-[8%] pt-32 lg:pt-40 pb-20">
        <div className="max-w-7xl mx-auto">
          <p className="ui-label ui-label--plain mb-4 lg:mb-6">Blog</p>
          <h1 className="ui-title text-[clamp(2.8rem,1.6rem+5.5vw,6.5rem)]">
            {t({ tr: 'Nasıl ', en: 'How I ', no: 'Slik ' })}
            <span className="ui-accent">{t({ tr: 'yaptım.', en: 'built it.', no: 'laget jeg det.' })}</span>
          </h1>
          <p className="ui-lead mt-5 lg:mt-7 max-w-2xl">
            {t({
              tr: 'Projelerimi yaparken karşılaştığım sorunları ve onları nasıl çözdüğümü yazıyorum.',
              en: 'I write about the problems I ran into while building my projects and how I solved them.',
              no: 'Jeg skriver om problemene jeg støtte på mens jeg bygde prosjektene mine, og hvordan jeg løste dem.',
            })}
          </p>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-4 lg:gap-6">
            <div className="md:col-span-2">
              <PostCard post={first} wide />
            </div>
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  const t = useT();
  switch (block.type) {
    case 'p':
      return <p className="text-base lg:text-lg leading-[1.8] text-white/75">{t(block.text)}</p>;
    case 'h2':
      return <h2 className="pt-6 text-2xl lg:text-3xl font-semibold tracking-[-0.03em]">{t(block.text)}</h2>;
    case 'list':
      return (
        <ul className="space-y-2.5 text-base lg:text-lg leading-relaxed text-white/75">
          {block.items.map((item) => (
            <li key={item.en} className="flex gap-3">
              <span className="mt-3 w-1.5 h-1.5 shrink-0 rounded-full bg-zinc-300" />
              {t(item)}
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <pre className="ui-card !rounded-[20px] overflow-x-auto p-5 lg:p-6 text-[0.8rem] lg:text-sm leading-relaxed" data-lenis-prevent>
          <span className="block mb-3 font-mono text-[0.65rem] uppercase tracking-wider text-white/55">{block.lang}</span>
          <code className="font-mono text-zinc-200">{block.code}</code>
        </pre>
      );
    case 'img':
      return (
        <figure>
          <div className="ui-card !rounded-[20px] overflow-hidden relative aspect-[16/10]">
            <Image src={block.src} alt={t(block.caption)} fill sizes="(min-width: 1024px) 760px, 92vw" className="object-cover" />
          </div>
          <figcaption className="mt-3 text-sm text-white/55">{t(block.caption)}</figcaption>
        </figure>
      );
  }
}

export function BlogPost({ post }: { post: Post }) {
  const t = useT();
  const lang = useLang();
  const project = post.project ? getDetail(post.project) : undefined;
  const others = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <>
      <PageHeader back={{ href: blogHref(lang), label: t({ tr: 'Tüm yazılar', en: 'All posts', no: 'Alle innlegg' }) }} />
      <PageBackground />
      <main className="relative z-10 px-6 lg:px-[8%] pt-32 lg:pt-40 pb-20">
        <article className="max-w-3xl mx-auto">
          <nav aria-label={t({ tr: 'Sayfa yolu', en: 'Breadcrumb', no: 'Brødsmulesti' })} className="font-mono text-xs text-white/55">
            <a href={homeHref(lang)} className="hover:text-white transition-colors">{t({ tr: 'Ana sayfa', en: 'Home', no: 'Hjem' })}</a>
            <span className="mx-2">/</span>
            <a href={blogHref(lang)} className="hover:text-white transition-colors">Blog</a>
          </nav>
          <p className="mt-8 font-mono text-xs text-white/55">
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time> · Hasan Alp Güngör
          </p>
          <h1 className="mt-4 text-[clamp(2rem,1.3rem+3vw,3.6rem)] font-semibold tracking-[-0.04em] leading-[1.05]">{t(post.title)}</h1>
          <p className="mt-5 text-lg lg:text-xl leading-relaxed text-white/65">{t(post.description)}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                {tag}
              </li>
            ))}
          </ul>

          <figure className="ui-card !rounded-[28px] mt-10 overflow-hidden relative aspect-[16/9]">
            <Image src={post.cover} alt="" fill priority sizes="(min-width: 1024px) 768px, 92vw" className="object-cover" />
          </figure>

          <div className="mt-12 space-y-6">
            {post.body.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>

          {project && (
            <a href={detailHref(project.slug, lang)} className="group ui-card !rounded-[28px] mt-14 flex items-center justify-between gap-6 p-6 lg:p-8">
              <span>
                <span className="block font-mono text-xs text-white/55">{t({ tr: 'Proje sayfası', en: 'Project page', no: 'Prosjektside' })}</span>
                <span className="mt-2 block text-2xl lg:text-3xl font-semibold tracking-[-0.03em]">{project.name}</span>
                <span className="mt-1 block text-sm text-white/55">{t(project.kind)}</span>
              </span>
              <span className="ui-btn !p-0 w-12 h-12 shrink-0 grid place-items-center transition-transform group-hover:translate-x-1">
                <ArrowIcon className="rotate-45" />
              </span>
            </a>
          )}
        </article>

        <section className="max-w-7xl mx-auto mt-20 lg:mt-28">
          <p className="ui-label ui-label--plain mb-6">{t({ tr: 'Diğer yazılar', en: 'More posts', no: 'Flere innlegg' })}</p>
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {others.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
