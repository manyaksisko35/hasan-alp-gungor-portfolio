import Home from '@/components/Home';
import LangRedirect from '@/components/LangRedirect';
import { LangProvider } from '@/lib/i18n';
import { homeMetadata } from '@/lib/meta';

export const metadata = homeMetadata('tr');

export default function Page() {
  return (
    <>
      <LangRedirect en="/en" no="/no" />
      <LangProvider lang="tr">
        <Home />
      </LangProvider>
    </>
  );
}
