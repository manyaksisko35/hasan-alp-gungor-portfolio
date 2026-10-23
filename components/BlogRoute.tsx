import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndex, BlogPost } from '@/components/BlogPages';
import LangRedirect from '@/components/LangRedirect';
import { getPost, POSTS } from '@/lib/blog';
import { LangProvider } from '@/lib/i18n';
import { blogHref, homeHref, type Lang } from '@/lib/lang';
import { PERSON_NAME, SITE_URL } from '@/lib/site';

// Server side of the blog pages, shared by /blog and /en/blog.

const abs = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;
const languages = (slug?: string) => ({ tr: blogHref('tr', slug), en: blogHref('en', slug), 'x-default': blogHref('tr', slug) });
const jsonLd = (data: object) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
);

const INDEX_TEXT = {
  tr: { title: `Blog | ${PERSON_NAME}`, description: 'Projelerimi yaparken karşılaştığım sorunlar ve onları nasıl çözdüğüm: 3D web, oyun yerelleştirme ve CS2 yayın arayüzü.' },
  en: { title: `Blog | ${PERSON_NAME}`, description: 'The problems I ran into while building my projects and how I solved them: 3D on the web, game localization and a CS2 broadcast overlay.' },
} satisfies Record<Lang, { title: string; description: string }>;

export function blogIndexMetadata(lang: Lang): Metadata {
  const { title, description } = INDEX_TEXT[lang];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: blogHref(lang), languages: languages() },
    openGraph: { type: 'website', url: blogHref(lang), siteName: PERSON_NAME, title, description, locale: lang === 'en' ? 'en_US' : 'tr_TR', images: [POSTS[0].cover] },
    twitter: { card: 'summary_large_image', title, description, images: [POSTS[0].cover] },
  };
}

export function BlogIndexRoute({ lang }: { lang: Lang }) {
  return (
    <>
      {lang === 'tr' && <LangRedirect to={blogHref('en')} />}
      {jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: INDEX_TEXT[lang].title,
        description: INDEX_TEXT[lang].description,
        url: abs(blogHref(lang)),
        inLanguage: lang,
        author: { '@type': 'Person', name: PERSON_NAME, url: SITE_URL },
        blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title[lang], url: abs(blogHref(lang, p.slug)), datePublished: p.date })),
      })}
      <LangProvider lang={lang}>
        <BlogIndex />
      </LangProvider>
    </>
  );
}

export function postMetadata(slug: string, lang: Lang): Metadata {
  const post = getPost(slug);
  if (!post) return {};
  const title = post.title[lang];
  const description = post.description[lang];
  return {
    title: { absolute: `${title} | ${PERSON_NAME}` },
    description,
    keywords: post.tags,
    authors: [{ name: PERSON_NAME, url: SITE_URL }],
    alternates: { canonical: blogHref(lang, slug), languages: languages(slug) },
    openGraph: {
      type: 'article',
      url: blogHref(lang, slug),
      siteName: PERSON_NAME,
      title,
      description,
      locale: lang === 'en' ? 'en_US' : 'tr_TR',
      publishedTime: post.date,
      authors: [PERSON_NAME],
      tags: post.tags,
      images: [{ url: post.cover, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [post.cover] },
  };
}

export function PostRoute({ slug, lang }: { slug: string; lang: Lang }) {
  const post = getPost(slug);
  if (!post) notFound();
  const url = abs(blogHref(lang, slug));
  return (
    <>
      {lang === 'tr' && <LangRedirect to={blogHref('en', slug)} />}
      {jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            headline: post.title[lang],
            description: post.description[lang],
            url,
            mainEntityOfPage: url,
            image: abs(post.cover),
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: lang,
            keywords: post.tags.join(', '),
            author: { '@type': 'Person', name: PERSON_NAME, url: SITE_URL },
            publisher: { '@type': 'Person', name: PERSON_NAME, url: SITE_URL },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: lang === 'en' ? 'Home' : 'Ana sayfa', item: abs(homeHref(lang)) },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: abs(blogHref(lang)) },
              { '@type': 'ListItem', position: 3, name: post.title[lang], item: url },
            ],
          },
        ],
      })}
      <LangProvider lang={lang}>
        <BlogPost post={post} />
      </LangProvider>
    </>
  );
}

export const postParams = () => POSTS.map((p) => ({ slug: p.slug }));
