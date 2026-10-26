import Home from '@/components/Home';
import JsonLd from '@/components/JsonLd';
import LangRedirect from '@/components/LangRedirect';
import { LangProvider } from '@/lib/i18n';
import { homeMetadata, profilePageJsonLd } from '@/lib/meta';

export const metadata = homeMetadata('tr');

export default function Page() {
  return (
    <>
      <LangRedirect en="/en" no="/no" />
      <JsonLd data={profilePageJsonLd('tr')} />
      <LangProvider lang="tr">
        <Home />
      </LangProvider>
    </>
  );
}
