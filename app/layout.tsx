import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
// Fonts ship with the app (no network needed at build time).
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import JsonLd from '@/components/JsonLd';
import { PERSON_NAME, SITE_JSON_LD, SITE_URL } from '@/lib/site';

const title = 'Hasan Alp Güngör | Yazılım ve Oyun Geliştirici, YouTuber';
const description =
  "Hasan Alp Güngör: yazılım ve oyun geliştirici, YouTuber. İzmir Ekonomi Üniversitesi Bilgisayar Programcılığı öğrencisi. Oyunlar, 3D web siteleri ve ESP32 / Arduino donanım projelerini YouTube'da paylaşıyor.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${PERSON_NAME}` },
  description,
  applicationName: PERSON_NAME,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  keywords: [
    'Hasan Alp Güngör',
    'Hasan Alp Gungor',
    'manyaksisko35',
    'portfolyo',
    'portfolio',
    'oyun geliştirici',
    'game developer',
    'YouTuber',
    'Hasan Alp Güngör YouTube',
    'yazılım geliştirici',
    'İzmir Ekonomi Üniversitesi',
    'Bilgisayar Programcılığı',
    'Next.js',
    'Three.js',
    'ESP32',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: PERSON_NAME,
    title,
    description,
    locale: 'tr_TR',
    alternateLocale: ['en_US'],
    firstName: 'Hasan Alp',
    lastName: 'Güngör',
    username: 'manyaksisko35',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = { themeColor: '#161618' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="antialiased selection:bg-white/25" suppressHydrationWarning>
      <body className="bg-[#161618] text-white" suppressHydrationWarning>
        <JsonLd data={SITE_JSON_LD} />
        {children}
        {/* Visitor and performance stats; they start collecting once enabled in the Vercel dashboard. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
