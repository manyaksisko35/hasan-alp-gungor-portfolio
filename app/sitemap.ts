import type { MetadataRoute } from 'next';
import { DETAILS, detailHref } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...DETAILS.map((d) => ({
      url: `${SITE_URL}${detailHref(d.slug)}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
      images: [`${SITE_URL}${d.cover.src}`],
    })),
  ];
}
