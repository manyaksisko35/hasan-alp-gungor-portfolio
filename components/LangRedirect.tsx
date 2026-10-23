import { LANG_KEY } from '@/lib/lang';

/**
 * On a Turkish page, sends visitors to the English or Norwegian version before anything
 * renders: when they chose that language before, or, if they never chose, when their browser
 * isn't Turkish. Crawlers stay put, so each language is indexed at its own address.
 */
export default function LangRedirect({ en, no }: { en: string; no: string }) {
  const script = `try{var s=localStorage.getItem(${JSON.stringify(LANG_KEY)});var bot=/bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse/i.test(navigator.userAgent);var l=(navigator.language||'').toLowerCase();var to=s||(/^tr/.test(l)?'tr':/^(nb|nn|no)/.test(l)?'no':'en');var t={en:${JSON.stringify(en)},no:${JSON.stringify(no)}}[to];if(!bot&&t)location.replace(t+location.search+location.hash)}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
