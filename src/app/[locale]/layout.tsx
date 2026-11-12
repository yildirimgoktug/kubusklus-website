import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import EmergencyBar from '@/components/layout/EmergencyBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import TranslationGuard from '@/components/TranslationGuard';
import '../globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.home' });
  const tSite = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://www.kubusklus.nl'),
    title: {
      default: t('title'),
      template: `%s | ${tSite('siteName')}`,
    },
    description: t('description'),
    icons: { icon: '/favicon.svg' },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      url: `https://www.kubusklus.nl/${locale}`,
      siteName: tSite('siteName'),
      images: [{
        url: '/images/projects/hero-renovatie.webp',
        width: 1200,
        height: 630,
        alt: t('ogImageAlt'),
      }],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `https://www.kubusklus.nl/${locale}`,
      languages: {
        nl: 'https://www.kubusklus.nl/nl',
        en: 'https://www.kubusklus.nl/en',
        'x-default': 'https://www.kubusklus.nl/nl',
      },
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html lang={locale} translate="no" className={`${plusJakarta.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        <meta name="google" content="notranslate" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HomeAndConstructionBusiness',
              name: 'Kubus Klussenbedrijf',
              alternateName: 'Kubusklus',
              description: 'Vakkundig stukadoor, tegelwerk en schilderwerk in Amsterdam. Sinds 2006.',
              url: 'https://www.kubusklus.nl',
              telephone: '+31644331191',
              email: 'info@kubusklus.nl',
              foundingDate: '2006',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Overschiestraat 170-A28',
                addressLocality: 'Amsterdam',
                postalCode: '1062 XK',
                addressCountry: 'NL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 52.3905,
                longitude: 4.8285,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '07:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '08:00',
                  closes: '14:00',
                },
              ],
              areaServed: [
                { '@type': 'City', name: 'Amsterdam' },
                { '@type': 'Place', name: 'Randstad' },
              ],
              sameAs: ['https://www.kubusklus.nl'],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* No global NextIntlClientProvider: everything here is translated on the
            server. Client pages that need messages (offerte, projecten) get a
            provider in their own layout. */}
          <TranslationGuard />
          <EmergencyBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
      </body>
    </html>
  );
}
