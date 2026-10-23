'use client';

import { PostCard } from '@/components/BlogPages';
import { ArrowIcon } from '@/components/Icons';
import { POSTS } from '@/lib/blog';
import { useLang, useT } from '@/lib/i18n';
import { blogHref } from '@/lib/lang';

export default function BlogTeaser() {
  const t = useT();
  const lang = useLang();
  return (
    <section id="blog" className="relative z-10 px-6 lg:px-[8%] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-16">
          <div>
            <p className="ui-label mb-3 lg:mb-5">Blog</p>
            <h2 className="ui-title">
              {t({ tr: 'Nasıl ', en: 'How I ' })}
              <strong className="ui-accent">{t({ tr: 'yaptım.', en: 'built it.' })}</strong>
            </h2>
            <p className="ui-lead mt-4 lg:mt-6 max-w-xl">
              {t({
                tr: 'Projelerimi yaparken karşılaştığım sorunları ve onları nasıl çözdüğümü yazıyorum.',
                en: 'I write about the problems I ran into while building my projects and how I solved them.',
              })}
            </p>
          </div>
          <a href={blogHref(lang)} className="ui-btn shrink-0 self-start lg:self-end">
            {t({ tr: 'Tüm yazılar', en: 'All posts' })}
            <ArrowIcon className="rotate-45" />
          </a>
        </div>
        <ul className="mt-10 lg:mt-14 grid md:grid-cols-3 gap-4 lg:gap-6">
          {POSTS.slice(0, 3).map((p) => (
            <li key={p.slug} data-reveal>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
