'use client';

import { useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import LanguageSwitcher, { type LanguageSwitcherLabels } from './LanguageSwitcher';

export type NavbarLabels = {
  services: string;
  portfolio: string;
  howWeWork: string;
  about: string;
  faq: string;
  contact: string;
  cta: string;
  toggleMenu: string;
};

// Labels are resolved on the server (see Navbar.tsx) so the translation
// runtime never has to ship to the browser.
export default function NavbarClient({
  locale,
  labels,
  switcher,
}: {
  locale: string;
  labels: NavbarLabels;
  switcher: LanguageSwitcherLabels;
}) {
  // Plain next/link with an explicit locale prefix keeps next-intl's client
  // runtime out of the bundle for every page.
  const localize = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);
  const t = (key: keyof NavbarLabels) => labels[key];
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/diensten', label: t('services') },
    { href: '/projecten', label: t('portfolio') },
    { href: '/werkwijze', label: t('howWeWork') },
    { href: '/over-ons', label: t('about') },
    { href: '/faq', label: t('faq') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-auto py-2 md:py-3 items-center justify-between">
          {/* Logo */}
          <NextLink href={localize('/')} className="flex items-center">
            <Image src="/images/kubus-logo-vectorized.svg" alt="Kubusklus" width={220} height={145} className="max-w-full h-auto" style={{ objectFit: 'contain' }} priority />
          </NextLink>

          {/* Desktop nav links */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-6">
            {navLinks.map((link) => (
              <NextLink
                key={link.href}
                href={localize(link.href)}
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                {link.label}
              </NextLink>
            ))}
          </div>

          {/* Desktop right side: language + CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-4">
            <LanguageSwitcher locale={locale} labels={switcher} />
            <NextLink
              href={localize('/offerte')}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
            >
              {t('cta')}
            </NextLink>
          </div>

          {/* Mobile hamburger + language */}
          <div className="flex items-center gap-x-3 lg:hidden">
            <LanguageSwitcher locale={locale} labels={switcher} />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label={t('toggleMenu')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            {navLinks.map((link) => (
              <NextLink
                key={link.href}
                href={localize(link.href)}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
              >
                {link.label}
              </NextLink>
            ))}
            <div className="pt-3 px-3">
              <NextLink
                href={localize('/offerte')}
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-lg bg-red-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
              >
                {t('cta')}
              </NextLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
