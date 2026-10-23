import Home from '@/components/Home';
import { LangProvider } from '@/lib/i18n';
import { homeMetadata } from '@/lib/meta';

export const metadata = homeMetadata('en');

export default function Page() {
  return (
    <>
      <LangProvider lang="en">
        <Home />
      </LangProvider>
    </>
  );
}
