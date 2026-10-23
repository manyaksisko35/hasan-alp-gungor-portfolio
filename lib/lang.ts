// Language helpers shared by server and client code.

export type Lang = 'tr' | 'en';

/** Remembers the visitor's choice; read by the redirect on Turkish pages (see LangRedirect). */
export const LANG_KEY = 'hag-lang';

export const homeHref = (lang: Lang) => (lang === 'en' ? '/en' : '/');

export const detailHref = (slug: string, lang: Lang = 'tr') => (lang === 'en' ? `/en/projects/${slug}` : `/projeler/${slug}`);

export const blogHref = (lang: Lang, slug?: string) => `${lang === 'en' ? '/en' : ''}/blog${slug ? `/${slug}` : ''}`;

/** The same page in the other language. */
export function translatePath(path: string, to: Lang): string {
  const project = (path.match(/^\/projeler\/([^/]+)/) ?? path.match(/^\/en\/projects\/([^/]+)/))?.[1];
  if (project) return detailHref(project, to);
  const blog = path.match(/^(?:\/en)?\/blog(?:\/([^/]+))?/);
  if (blog) return blogHref(to, blog[1]);
  return homeHref(to);
}
