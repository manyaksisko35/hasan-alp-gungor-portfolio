import Home from '@/components/Home';
import { LangProvider } from '@/lib/i18n';
import { homeMetadata } from '@/lib/meta';

export const metadata = homeMetadata('no');

export default function Page() {
  return (
    <>
      <LangProvider lang="no">
        <Home />
      </LangProvider>
    </>
  );
}
