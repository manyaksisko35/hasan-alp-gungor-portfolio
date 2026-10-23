import { BlogIndexRoute, blogIndexMetadata } from '@/components/BlogRoute';

export const metadata = blogIndexMetadata('no');

export default function Page() {
  return <BlogIndexRoute lang="no" />;
}
