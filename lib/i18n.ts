'use client';

import { useSyncExternalStore } from 'react';

export type Lang = 'tr' | 'en';
export type Localized = Record<Lang, string>;

const KEY = 'hag-lang';
const listeners = new Set<() => void>();
let current: Lang | null = null;

function read(): Lang {
  if (current) return current;
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {
    /* storage blocked */
  }
  // Crawlers browse in English; keep them on the Turkish page the title and description describe.
  const crawler = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview/i.test(navigator.userAgent);
  current =
    saved === 'tr' || saved === 'en' ? saved : crawler || navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en';
  document.documentElement.lang = current;
  return current;
}

export function setLang(next: Lang) {
  current = next;
  document.documentElement.lang = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* storage blocked */
  }
  listeners.forEach((fn) => fn());
}

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => 'tr');
}

/** Pick the current language from a `{ tr, en }` pair. */
export function useT() {
  const lang = useLang();
  return (s: Localized) => s[lang];
}
