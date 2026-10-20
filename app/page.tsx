import type { Metadata } from 'next';
import Home from '@/components/Home';
import LangRedirect from '@/components/LangRedirect';
import { LangProvider } from '@/lib/i18n';

export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { tr: '/', en: '/en', 'x-default': '/' } },
};

export default function Page() {
  return (
    <>
      <LangRedirect to="/en" />
      <LangProvider lang="tr">
        <Home />
      </LangProvider>
    </>
  );
}
