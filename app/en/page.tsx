import type { Metadata } from 'next';
import Home from '@/components/Home';
import { LangProvider } from '@/lib/i18n';
import { PERSON_NAME } from '@/lib/site';

const title = 'Hasan Alp Güngör | Software & Game Developer, YouTuber';
const description =
  'Hasan Alp Güngör: software and game developer, YouTuber. Computer Programming student at İzmir University of Economics who builds games, 3D websites and ESP32 / Arduino hardware projects and shares them on YouTube.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/en', languages: { tr: '/', en: '/en', 'x-default': '/' } },
  openGraph: {
    type: 'profile',
    url: '/en',
    siteName: PERSON_NAME,
    title,
    description,
    locale: 'en_US',
    alternateLocale: ['tr_TR'],
    firstName: 'Hasan Alp',
    lastName: 'Güngör',
    username: 'manyaksisko35',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function Page() {
  return (
    <LangProvider lang="en">
      <Home />
    </LangProvider>
  );
}
