import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin', 'latin-ext'], variable: '--font-outfit', display: 'swap' });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

const title = 'Hasan Alp Güngör | Game Developer & Software Developer';
const description =
  'Portfolio of Hasan Alp Güngör: game developer and Computer Programming student in İzmir. Galaxy concept sites, a CS2 Major HUD, games and more, with a 3D controller built entirely in code.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = { themeColor: '#030303' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${outfit.variable} antialiased selection:bg-cyan-500/30`} suppressHydrationWarning>
      <body className="bg-[#030303] text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
