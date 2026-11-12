import { defineRouting } from 'next-intl/routing';

// Kept free of createNavigation(): importing navigation here would register
// next-intl's client Link (and its message-formatting runtime) in every page's
// client bundle via the root layout. Navigation helpers live in ./navigation.
export const routing = defineRouting({
  locales: ['nl', 'en'],
  defaultLocale: 'nl',
});
