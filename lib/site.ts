import { EMAIL, LINKS } from '@/lib/data';

/** Public address of the site. Set NEXT_PUBLIC_SITE_URL once a custom domain is attached. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
).replace(/\/$/, '');

export const PERSON_NAME = 'Hasan Alp Güngör';

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** How other structured data points at the person, e.g. as the author of a post. */
export const PERSON_REF = { '@type': 'Person', '@id': PERSON_ID, name: PERSON_NAME, url: SITE_URL };

/** schema.org Person: tells search engines who this site is about. */
const PERSON = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON_NAME,
  givenName: 'Hasan Alp',
  familyName: 'Güngör',
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
  email: EMAIL,
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
  sameAs: [LINKS.linkedin, LINKS.github, LINKS.youtube, LINKS.itch, LINKS.devto, LINKS.hashnode],
};

/** On every page: the site and the person it belongs to. */
export const SITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: PERSON_NAME,
      inLanguage: ['tr', 'en', 'no'],
      publisher: { '@id': PERSON_ID },
    },
    PERSON,
  ],
};
