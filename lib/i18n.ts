'use client';

import { createContext, createElement, useContext, useEffect } from 'react';
import { LANG_KEY, translatePath, type Lang } from '@/lib/lang';

export type { Lang } from '@/lib/lang';
export type Localized = Record<Lang, string>;

const LangContext = createContext<Lang>('tr');

/** Every page is in one language, set by its route: Turkish at `/`, English under `/en`. */
export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return createElement(LangContext.Provider, { value: lang }, children);
}

export function useLang(): Lang {
  return useContext(LangContext);
}

/** Pick the current language from a `{ tr, en }` pair. */
export function useT() {
  const lang = useLang();
  return (s: Localized) => s[lang];
}

export function switchLang(to: Lang, path: string) {
  try {
    localStorage.setItem(LANG_KEY, to);
  } catch {
    /* storage blocked */
  }
  window.location.assign(translatePath(path, to));
}
