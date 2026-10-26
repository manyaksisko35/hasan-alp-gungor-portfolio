import type { Metadata } from 'next';
import { homeHref, LANG_INFO, LANGS, languageAlternates, type Lang } from '@/lib/lang';
import { PERSON_ID, PERSON_NAME, SITE_URL, WEBSITE_ID } from '@/lib/site';

// Page titles and descriptions for the home page in each language.

const HOME: Record<Lang, { title: string; description: string }> = {
  tr: {
    title: 'Hasan Alp Güngör | Yazılım ve Oyun Geliştirici, YouTuber',
    description:
      "Hasan Alp Güngör: yazılım ve oyun geliştirici, YouTuber. İzmir Ekonomi Üniversitesi Bilgisayar Programcılığı öğrencisi. Oyunlar, 3D web siteleri ve ESP32 / Arduino donanım projelerini YouTube'da paylaşıyor.",
  },
  en: {
    title: 'Hasan Alp Güngör | Software & Game Developer, YouTuber',
    description:
      'Hasan Alp Güngör: software and game developer, YouTuber. Computer Programming student at İzmir University of Economics who builds games, 3D websites and ESP32 / Arduino hardware projects and shares them on YouTube.',
  },
  no: {
    title: 'Hasan Alp Güngör | Programvare- og spillutvikler, YouTuber',
    description:
      'Hasan Alp Güngör: programvare- og spillutvikler og YouTuber. Studerer dataprogrammering ved İzmir University of Economics, lager spill, 3D-nettsider og maskinvareprosjekter med ESP32 og Arduino, og deler dem på YouTube.',
  },
};

export function homeMetadata(lang: Lang): Metadata {
  const { title, description } = HOME[lang];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: homeHref(lang), languages: languageAlternates(homeHref) },
    openGraph: {
      type: 'profile',
      url: homeHref(lang),
      siteName: PERSON_NAME,
      title,
      description,
      locale: LANG_INFO[lang].ogLocale,
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => LANG_INFO[l].ogLocale),
      firstName: 'Hasan Alp',
      lastName: 'Güngör',
      username: 'manyaksisko35',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/** The home page is the profile page of the person the site is about. */
export function profilePageJsonLd(lang: Lang) {
  const url = `${SITE_URL}${lang === 'tr' ? '' : homeHref(lang)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#profilepage`,
    url,
    name: HOME[lang].title,
    description: HOME[lang].description,
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': PERSON_ID },
  };
}
