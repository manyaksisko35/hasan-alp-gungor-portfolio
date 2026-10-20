import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectPage from '@/components/ProjectPage';
import { DETAILS, detailHref, getDetail } from '@/lib/projects';
import { PERSON_NAME, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DETAILS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getDetail((await params).slug);
  if (!project) return {};
  const url = detailHref(project.slug);
  const description = project.summary.tr;
  const image = project.share ?? project.cover.src;
  return {
    title: `${project.name}: ${project.kind.tr}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: PERSON_NAME,
      locale: 'tr_TR',
      title: `${project.name} | ${PERSON_NAME}`,
      description,
      images: [{ url: image, alt: project.name }],
    },
    twitter: { card: 'summary_large_image', title: `${project.name} | ${PERSON_NAME}`, description, images: [image] },
  };
}

export default async function Page({ params }: Props) {
  const project = getDetail((await params).slug);
  if (!project) notFound();

  const url = `${SITE_URL}${detailHref(project.slug)}`;
  const repo = project.links.find((l) => l.kind === 'github')?.href;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.summary.tr,
        url,
        image: `${SITE_URL}${project.share ?? project.cover.src}`,
        inLanguage: 'tr',
        keywords: project.stack.join(', '),
        author: { '@type': 'Person', name: PERSON_NAME, url: SITE_URL },
        ...(repo && { sameAs: repo }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Projeler', item: `${SITE_URL}/#work` },
          { '@type': 'ListItem', position: 3, name: project.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <ProjectPage project={project} />
    </>
  );
}
