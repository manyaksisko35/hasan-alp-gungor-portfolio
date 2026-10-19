import type { Localized } from '@/lib/i18n';

export interface SectionInfo {
  id: string;
  label: Localized;
  /** Show in the top navigation. */
  nav?: boolean;
}

export const SECTIONS: SectionInfo[] = [
  { id: 'top', label: { tr: 'Merhaba', en: 'Hello' } },
  { id: 'about', label: { tr: 'Hakkımda', en: 'About' }, nav: true },
  { id: 'skills', label: { tr: 'Yetenekler', en: 'Skills' }, nav: true },
  { id: 'work', label: { tr: 'Projelerim', en: 'Projects' }, nav: true },
  { id: 'more', label: { tr: 'Diğer projelerim', en: 'More projects' } },
  { id: 'channels', label: { tr: 'Beni bul', en: 'Find me' }, nav: true },
  { id: 'contact', label: { tr: 'İletişim', en: 'Contact' } },
];
