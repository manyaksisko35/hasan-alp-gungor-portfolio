import { POSTS, type Block } from '@/lib/blog';
import { blogHref, type Lang } from '@/lib/lang';
import { PERSON_NAME, SITE_URL } from '@/lib/site';

// RSS 2.0 feed of the blog, one per language. Each item carries the full post as HTML,
// so readers and dev.to's RSS import get the whole text, not just a summary.

export const feedHref = (lang: Lang) => `${blogHref(lang)}/feed.xml`;

const abs = (path: string) => `${SITE_URL}${path}`;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// CDATA cannot contain "]]>", so split it across two sections if it ever appears.
const cdata = (s: string) => `<![CDATA[${s.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;

const LANG_CODE: Record<Lang, string> = { tr: 'tr', en: 'en', no: 'nb' };
const FEED_TITLE: Record<Lang, string> = { tr: `${PERSON_NAME} | Blog`, en: `${PERSON_NAME} | Blog`, no: `${PERSON_NAME} | Blogg` };
const FEED_DESCRIPTION: Record<Lang, string> = {
  tr: 'Projelerimi yaparken karşılaştığım sorunlar ve onları nasıl çözdüğüm.',
  en: 'The problems I ran into while building my projects and how I solved them.',
  no: 'Problemene jeg møtte da jeg bygde prosjektene mine, og hvordan jeg løste dem.',
};
const ORIGINAL: Record<Lang, string> = {
  tr: 'Bu yazı ilk olarak şurada yayınlandı:',
  en: 'This post was originally published on',
  no: 'Dette innlegget ble først publisert på',
};

function blockHtml(b: Block, lang: Lang): string {
  switch (b.type) {
    case 'p':
      return `<p>${esc(b.text[lang])}</p>`;
    case 'h2':
      return `<h2>${esc(b.text[lang])}</h2>`;
    case 'list':
      return `<ul>${b.items.map((i) => `<li>${esc(i[lang])}</li>`).join('')}</ul>`;
    case 'code':
      return `<pre><code class="language-${esc(b.lang)}">${esc(b.code)}</code></pre>`;
    case 'img':
      return `<figure><img src="${esc(abs(b.src))}" alt="${esc(b.caption[lang])}" /><figcaption>${esc(b.caption[lang])}</figcaption></figure>`;
  }
}

export function buildFeed(lang: Lang): string {
  const self = abs(feedHref(lang));
  const items = [...POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => {
      const url = abs(blogHref(lang, post.slug));
      const html =
        `<p><img src="${esc(abs(post.cover))}" alt="" /></p>` +
        post.body.map((b) => blockHtml(b, lang)).join('\n') +
        `\n<p><em>${esc(ORIGINAL[lang])} <a href="${esc(url)}">${esc(SITE_URL.replace(/^https?:\/\//, ''))}</a></em></p>`;
      return [
        '    <item>',
        `      <title>${esc(post.title[lang])}</title>`,
        `      <link>${esc(url)}</link>`,
        `      <guid isPermaLink="true">${esc(url)}</guid>`,
        `      <pubDate>${new Date(`${post.date}T09:00:00Z`).toUTCString()}</pubDate>`,
        `      <dc:creator>${esc(PERSON_NAME)}</dc:creator>`,
        `      <description>${esc(post.description[lang])}</description>`,
        ...post.tags.map((t) => `      <category>${esc(t)}</category>`),
        `      <enclosure url="${esc(abs(post.cover))}" type="${post.cover.endsWith('.png') ? 'image/png' : 'image/jpeg'}" length="0" />`,
        `      <content:encoded>${cdata(html)}</content:encoded>`,
        '    </item>',
      ].join('\n');
    });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(FEED_TITLE[lang])}</title>
    <link>${esc(abs(blogHref(lang)))}</link>
    <description>${esc(FEED_DESCRIPTION[lang])}</description>
    <language>${LANG_CODE[lang]}</language>
    <atom:link href="${esc(self)}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date(`${[...POSTS].sort((a, b) => b.date.localeCompare(a.date))[0].date}T09:00:00Z`).toUTCString()}</lastBuildDate>
${items.join('\n')}
  </channel>
</rss>
`;
}

export function feedResponse(lang: Lang) {
  return new Response(buildFeed(lang), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
