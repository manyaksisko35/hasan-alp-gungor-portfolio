import type { Localized } from '@/lib/i18n';

export interface SectionInfo {
  id: string;
  label: Localized;
  /** Show in the top navigation. */
  nav?: boolean;
}

export const SECTIONS: SectionInfo[] = [
  { id: 'top', label: { tr: 'Giriş', en: 'Home', no: 'Hjem' } },
  { id: 'about', label: { tr: 'Hakkımda', en: 'About', no: 'Om meg' }, nav: true },
  { id: 'skills', label: { tr: 'Yetenekler', en: 'Skills', no: 'Ferdigheter' }, nav: true },
  { id: 'work', label: { tr: 'Projeler', en: 'Work', no: 'Prosjekter' }, nav: true },
  { id: 'more', label: { tr: 'Diğer projeler', en: 'More work', no: 'Flere prosjekter' } },
  { id: 'videos', label: { tr: 'İçerik', en: 'Content', no: 'Innhold' }, nav: true },
  { id: 'blog', label: { tr: 'Blog', en: 'Blog', no: 'Blogg' }, nav: true },
  { id: 'contact', label: { tr: 'İletişim', en: 'Contact', no: 'Kontakt' } },
];
