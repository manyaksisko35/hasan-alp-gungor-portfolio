import type { Metadata } from 'next';
import NotFoundView from '@/components/NotFoundView';

export const metadata: Metadata = { title: 'Sayfa bulunamadı · Page not found' };

export default function NotFound() {
  return <NotFoundView />;
}
