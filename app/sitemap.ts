import type { MetadataRoute } from 'next';
import { detailHref } from '@/lib/lang';
import { DETAILS } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;
  const home = { tr: abs('/'), en: abs('/en') };
  const pages: MetadataRoute.Sitemap = [
    { url: home.tr, lastModified: now, changeFrequency: 'monthly', priority: 1, alternates: { languages: home } },
    { url: home.en, lastModified: now, changeFrequency: 'monthly', priority: 0.9, alternates: { languages: home } },
  ];
  for (const d of DETAILS) {
    const languages = { tr: abs(detailHref(d.slug, 'tr')), en: abs(detailHref(d.slug, 'en')) };
    const images = [abs(d.cover.src)];
    pages.push(
      { url: languages.tr, lastModified: now, changeFrequency: 'yearly', priority: 0.7, alternates: { languages }, images },
      { url: languages.en, lastModified: now, changeFrequency: 'yearly', priority: 0.6, alternates: { languages }, images },
    );
  }
  return pages;
}
