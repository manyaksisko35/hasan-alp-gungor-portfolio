import type { Metadata } from 'next';
import { ProjectRoute, projectMetadata } from '@/components/ProjectRoute';
import { DETAILS } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DETAILS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return projectMetadata((await params).slug, 'no');
}

export default async function Page({ params }: Props) {
  return <ProjectRoute slug={(await params).slug} lang="no" />;
}
