import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['uz', 'ru', 'en'],
  defaultLocale: 'uz',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/contact': '/contact',
    '/news': '/news',
    '/products': '/products',
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
