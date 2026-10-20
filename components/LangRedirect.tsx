import { LANG_KEY } from '@/lib/lang';

/**
 * On a Turkish page, sends visitors who chose English (or whose browser isn't Turkish and who
 * haven't chosen) to the English page before anything renders. Crawlers stay put, so each
 * language is indexed at its own address.
 */
export default function LangRedirect({ to }: { to: string }) {
  const script = `try{var s=localStorage.getItem(${JSON.stringify(LANG_KEY)});var bot=/bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse/i.test(navigator.userAgent);if(!bot&&(s==='en'||(!s&&!/^tr/i.test(navigator.language))))location.replace(${JSON.stringify(to)}+location.search+location.hash)}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
