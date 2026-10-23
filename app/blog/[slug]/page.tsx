import type { Metadata } from 'next';
import { PostRoute, postMetadata, postParams } from '@/components/BlogRoute';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = postParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return postMetadata((await params).slug, 'tr');
}

export default async function Page({ params }: Props) {
  return <PostRoute slug={(await params).slug} lang="tr" />;
}
