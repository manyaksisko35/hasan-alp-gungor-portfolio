import { LINKS } from '@/lib/data';

/** Public address of the site. Set NEXT_PUBLIC_SITE_URL once a custom domain is attached. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
).replace(/\/$/, '');

export const PERSON_NAME = 'Hasan Alp Güngör';

/** schema.org Person: tells search engines who this site is about. */
export const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSON_NAME,
  alternateName: ['Hasan Alp Gungor', 'Hasan Güngör', 'manyaksisko35'],
  url: SITE_URL,
  image: `${SITE_URL}/hasan-alp-gungor.jpg`,
  jobTitle: ['Yazılım Geliştirici', 'Oyun Geliştirici', 'YouTuber'],
  description:
    'Yazılım ve oyun geliştirici, YouTuber. İzmir Ekonomi Üniversitesi Bilgisayar Programcılığı öğrencisi; oyunlar, 3D web siteleri ve ESP32 / Arduino donanım projeleri geliştirip YouTube kanalında paylaşıyor.',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'İzmir Ekonomi Üniversitesi',
    alternateName: 'İzmir University of Economics',
  },
  address: { '@type': 'PostalAddress', addressLocality: 'İzmir', addressCountry: 'TR' },
  knowsLanguage: ['tr', 'en', 'no'],
  knowsAbout: [
    'Software Development',
    'Game Development',
    'YouTube',
    'Content Creation',
    'Web Development',
    'TypeScript',
    'React',
    'Next.js',
    'Three.js',
    'C#',
    'Java',
    'Python',
    'C++',
    'Lua',
    'PHP',
    'SQL',
    'ESP32',
    'Arduino',
  ],
  sameAs: [LINKS.linkedin, LINKS.github, LINKS.youtube, LINKS.itch],
};
