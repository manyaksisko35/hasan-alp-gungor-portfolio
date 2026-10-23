import type { Localized } from '@/lib/i18n';

export interface SectionInfo {
  id: string;
  label: Localized;
  /** Show in the top navigation. */
  nav?: boolean;
}

export const SECTIONS: SectionInfo[] = [
  { id: 'top', label: { tr: 'Giriş', en: 'Home' } },
  { id: 'about', label: { tr: 'Hakkımda', en: 'About' }, nav: true },
  { id: 'skills', label: { tr: 'Yetenekler', en: 'Skills' }, nav: true },
  { id: 'work', label: { tr: 'Projeler', en: 'Work' }, nav: true },
  { id: 'more', label: { tr: 'Diğer projeler', en: 'More work' } },
  { id: 'videos', label: { tr: 'İçerik', en: 'Content' }, nav: true },
  { id: 'blog', label: { tr: 'Blog', en: 'Blog' }, nav: true },
  { id: 'contact', label: { tr: 'İletişim', en: 'Contact' } },
];
