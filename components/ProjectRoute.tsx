import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import LangRedirect from '@/components/LangRedirect';
import ProjectPage from '@/components/ProjectPage';
import { LangProvider } from '@/lib/i18n';
import { detailHref, homeHref, LANG_INFO, languageAlternates, type Lang } from '@/lib/lang';
import { getDetail } from '@/lib/projects';
import { PERSON_NAME, PERSON_REF, SITE_URL } from '@/lib/site';

// Server side of the project pages, shared by /projeler/[slug], /en/projects/[slug] and /no/prosjekter/[slug].

const CRUMBS: Record<Lang, { home: string; projects: string }> = {
  tr: { home: 'Ana sayfa', projects: 'Projeler' },
  en: { home: 'Home', projects: 'Projects' },
  no: { home: 'Hjem', projects: 'Prosjekter' },
};

export function projectMetadata(slug: string, lang: Lang): Metadata {
  const project = getDetail(slug);
  if (!project) return {};
  const url = detailHref(slug, lang);
  const description = project.summary[lang];
  const image = project.share ?? project.cover.src;
  const shareTitle = `${project.name} | ${PERSON_NAME}`;
  return {
    title: { absolute: `${project.name}: ${project.kind[lang]} | ${PERSON_NAME}` },
    description,
    alternates: { canonical: url, languages: languageAlternates((l) => detailHref(slug, l)) },
    openGraph: {
      type: 'article',
      url,
      siteName: PERSON_NAME,
      locale: LANG_INFO[lang].ogLocale,
      title: shareTitle,
      description,
      images: [{ url: image, alt: project.name }],
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description, images: [image] },
  };
}

export function ProjectRoute({ slug, lang }: { slug: string; lang: Lang }) {
  const project = getDetail(slug);
  if (!project) notFound();

  const home = `${SITE_URL}${lang === 'tr' ? '' : homeHref(lang)}`;
  const url = `${SITE_URL}${detailHref(slug, lang)}`;
  const repo = project.links.find((l) => l.kind === 'github')?.href;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.summary[lang],
        url,
        image: `${SITE_URL}${project.share ?? project.cover.src}`,
        inLanguage: lang,
        keywords: project.stack.join(', '),
        author: PERSON_REF,
        ...(repo && { sameAs: repo }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: CRUMBS[lang].home, item: home },
          { '@type': 'ListItem', position: 2, name: CRUMBS[lang].projects, item: `${home}#work` },
          { '@type': 'ListItem', position: 3, name: project.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      {lang === 'tr' && <LangRedirect en={detailHref(slug, 'en')} no={detailHref(slug, 'no')} />}
      <JsonLd data={jsonLd} />
      <LangProvider lang={lang}>
        <ProjectPage project={project} />
      </LangProvider>
    </>
  );
}
