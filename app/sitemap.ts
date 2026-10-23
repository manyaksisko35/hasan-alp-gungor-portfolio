import type { MetadataRoute } from 'next';
import { POSTS } from '@/lib/blog';
import { blogHref, detailHref, homeHref, LANGS, type Lang } from '@/lib/lang';
import { DETAILS } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

  /** One entry per language for a page, each listing the others as alternates. */
  const page = (href: (lang: Lang) => string, priority: number, extra: Partial<Entry> = {}): Entry[] => {
    const languages = Object.fromEntries(LANGS.map((l) => [l, abs(href(l))]));
    return LANGS.map((l) => ({
      url: abs(href(l)),
      lastModified: now,
      // Turkish is the main language of the site.
      priority: l === 'tr' ? priority : Math.round((priority - 0.1) * 10) / 10,
      alternates: { languages },
      ...extra,
    }));
  };

  return [
    ...page(homeHref, 1, { changeFrequency: 'monthly' }),
    ...DETAILS.flatMap((d) => page((l) => detailHref(d.slug, l), 0.7, { changeFrequency: 'yearly', images: [abs(d.cover.src)] })),
    ...page((l) => blogHref(l), 0.8, { changeFrequency: 'weekly' }),
    ...POSTS.flatMap((p) =>
      page((l) => blogHref(l, p.slug), 0.7, { changeFrequency: 'yearly', lastModified: new Date(p.date), images: [abs(p.cover)] }),
    ),
  ];
}
