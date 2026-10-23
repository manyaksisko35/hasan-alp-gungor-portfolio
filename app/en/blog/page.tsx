import { BlogIndexRoute, blogIndexMetadata } from '@/components/BlogRoute';

export const metadata = blogIndexMetadata('en');

export default function Page() {
  return <BlogIndexRoute lang="en" />;
}
