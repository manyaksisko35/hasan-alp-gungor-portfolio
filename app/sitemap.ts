import type { MetadataRoute } from 'next';
import { POSTS } from '@/lib/blog';
import { blogHref, detailHref } from '@/lib/lang';
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
  const blog = { tr: abs(blogHref('tr')), en: abs(blogHref('en')) };
  pages.push(
    { url: blog.tr, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: blog } },
    { url: blog.en, lastModified: now, changeFrequency: 'weekly', priority: 0.7, alternates: { languages: blog } },
  );
  for (const p of POSTS) {
    const languages = { tr: abs(blogHref('tr', p.slug)), en: abs(blogHref('en', p.slug)) };
    const lastModified = new Date(p.date);
    const images = [abs(p.cover)];
    pages.push(
      { url: languages.tr, lastModified, changeFrequency: 'yearly', priority: 0.7, alternates: { languages }, images },
      { url: languages.en, lastModified, changeFrequency: 'yearly', priority: 0.6, alternates: { languages }, images },
    );
  }
  return pages;
}
