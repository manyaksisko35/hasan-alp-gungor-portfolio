import Home from '@/components/Home';
import JsonLd from '@/components/JsonLd';
import { LangProvider } from '@/lib/i18n';
import { homeMetadata, profilePageJsonLd } from '@/lib/meta';

export const metadata = homeMetadata('no');

export default function Page() {
  return (
    <>
      <JsonLd data={profilePageJsonLd('no')} />
      <LangProvider lang="no">
        <Home />
      </LangProvider>
    </>
  );
}
