import NextLink from 'next/link';
import { useLocale } from 'next-intl';

type Props = Omit<React.ComponentProps<typeof NextLink>, 'href'> & { href: string };

/**
 * Server-only locale-aware link. Resolves the locale on the server and renders
 * a plain next/link, so pages don't need next-intl's client runtime (and its
 * provider) just to render navigation links. Client components that already
 * sit inside a NextIntlClientProvider can keep using Link from './navigation'.
 */
export function Link({ href, ...rest }: Props) {
  const locale = useLocale();
  const localized = href === '/' ? `/${locale}` : href.startsWith('/') ? `/${locale}${href}` : href;
  return <NextLink href={localized} {...rest} />;
}
