// Language helpers shared by server and client code.

export type Lang = 'tr' | 'en' | 'no';

export const LANGS: Lang[] = ['tr', 'en', 'no'];

/** Remembers the visitor's choice; read by the redirect on Turkish pages (see LangRedirect). */
export const LANG_KEY = 'hag-lang';

export const LANG_INFO: Record<Lang, { ogLocale: string }> = {
  tr: { ogLocale: 'tr_TR' },
  en: { ogLocale: 'en_US' },
  no: { ogLocale: 'nb_NO' },
};

// Turkish lives at the root; the other languages under their own prefix.
const PREFIX: Record<Lang, string> = { tr: '', en: '/en', no: '/no' };
const PROJECTS: Record<Lang, string> = { tr: 'projeler', en: 'projects', no: 'prosjekter' };

export const homeHref = (lang: Lang) => PREFIX[lang] || '/';

export const detailHref = (slug: string, lang: Lang = 'tr') => `${PREFIX[lang]}/${PROJECTS[lang]}/${slug}`;

export const blogHref = (lang: Lang, slug?: string) => `${PREFIX[lang]}/blog${slug ? `/${slug}` : ''}`;

/** hreflang links for a page, given its address in each language. */
export function languageAlternates(href: (lang: Lang) => string) {
  return { tr: href('tr'), en: href('en'), no: href('no'), 'x-default': href('tr') };
}

/** The same page in another language. */
export function translatePath(path: string, to: Lang): string {
  for (const lang of LANGS) {
    const project = path.match(new RegExp(`^${PREFIX[lang]}/${PROJECTS[lang]}/([^/]+)`));
    if (project) return detailHref(project[1], to);
  }
  const blog = path.match(/^(?:\/(?:en|no))?\/blog(?:\/([^/]+))?/);
  if (blog) return blogHref(to, blog[1]);
  return homeHref(to);
}
