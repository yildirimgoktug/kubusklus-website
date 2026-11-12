import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/pageMetadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.projecten' });
  return { title: t('title'), description: t('description'), ...buildPageMetadata(locale, '/projecten') };
}

export default async function ProjectenLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={{ ProjectenPage: messages.ProjectenPage }}>
      {children}
    </NextIntlClientProvider>
  );
}
