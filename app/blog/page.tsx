import { BlogIndexRoute, blogIndexMetadata } from '@/components/BlogRoute';

export const metadata = blogIndexMetadata('tr');

export default function Page() {
  return <BlogIndexRoute lang="tr" />;
}
