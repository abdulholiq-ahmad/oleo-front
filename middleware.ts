// src/middleware.ts
import { routing } from '@/i18n/config';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(uz|ru|en)/:path*'],
};
