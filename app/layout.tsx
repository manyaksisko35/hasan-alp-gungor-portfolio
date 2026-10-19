import './globals.css';
import type { Metadata, Viewport } from 'next';
// Fonts ship with the app (no network needed at build time).
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

const title = 'Hasan Alp Güngör';
const description =
  "I'm Hasan Alp Güngör, a Computer Programming student at İzmir University of Economics, game developer and software enthusiast. I build software and hardware projects and share them on YouTube.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = { themeColor: '#161618' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="antialiased selection:bg-white/25" suppressHydrationWarning>
      <body className="bg-[#161618] text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
