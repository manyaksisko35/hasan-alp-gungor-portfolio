import type { Localized } from '@/lib/i18n';

export interface SectionInfo {
  id: string;
  label: Localized;
  /** Show in the top navigation. */
  nav?: boolean;
}

export const SECTIONS: SectionInfo[] = [
  { id: 'top', label: { tr: 'Giriş', en: 'Intro' } },
  { id: 'about', label: { tr: 'Hakkımda', en: 'About' }, nav: true },
  { id: 'skills', label: { tr: 'Yetenekler', en: 'Skills' }, nav: true },
  { id: 'work', label: { tr: 'Projeler', en: 'Work' }, nav: true },
  { id: 'more', label: { tr: 'Diğer işler', en: 'More work' } },
  { id: 'channels', label: { tr: 'Kanallar', en: 'Channels' }, nav: true },
  { id: 'contact', label: { tr: 'İletişim', en: 'Contact' } },
];
