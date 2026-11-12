import { useLocale, useTranslations } from 'next-intl';
import NavbarClient from './NavbarClient';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const tCommon = useTranslations('Common');
  const locale = useLocale();

  return (
    <NavbarClient
      locale={locale}
      labels={{
        services: t('services'),
        portfolio: t('portfolio'),
        howWeWork: t('howWeWork'),
        about: t('about'),
        faq: t('faq'),
        contact: t('contact'),
        cta: t('cta'),
        toggleMenu: t('toggleMenu'),
      }}
      switcher={{ switchToEN: tCommon('switchToEN'), switchToNL: tCommon('switchToNL') }}
    />
  );
}
