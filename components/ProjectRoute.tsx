import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LangRedirect from '@/components/LangRedirect';
import ProjectPage from '@/components/ProjectPage';
import { LangProvider } from '@/lib/i18n';
import { detailHref, homeHref, type Lang } from '@/lib/lang';
import { getDetail } from '@/lib/projects';
import { PERSON_NAME, SITE_URL } from '@/lib/site';

// Server side of the project pages, shared by /projeler/[slug] and /en/projects/[slug].

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
    alternates: {
      canonical: url,
      languages: { tr: detailHref(slug, 'tr'), en: detailHref(slug, 'en'), 'x-default': detailHref(slug, 'tr') },
    },
    openGraph: {
      type: 'article',
      url,
      siteName: PERSON_NAME,
      locale: lang === 'en' ? 'en_US' : 'tr_TR',
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

  const home = `${SITE_URL}${homeHref(lang) === '/' ? '' : homeHref(lang)}`;
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
        author: { '@type': 'Person', name: PERSON_NAME, url: SITE_URL },
        ...(repo && { sameAs: repo }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: lang === 'en' ? 'Home' : 'Ana sayfa', item: home },
          { '@type': 'ListItem', position: 2, name: lang === 'en' ? 'Projects' : 'Projeler', item: `${home}#work` },
          { '@type': 'ListItem', position: 3, name: project.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      {lang === 'tr' && <LangRedirect to={detailHref(slug, 'en')} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <LangProvider lang={lang}>
        <ProjectPage project={project} />
      </LangProvider>
    </>
  );
}
