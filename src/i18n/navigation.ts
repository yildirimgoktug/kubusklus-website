import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// For client components rendered inside a NextIntlClientProvider (offerte).
// Server components should use Link from './link' instead.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
