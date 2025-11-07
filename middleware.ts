import { routing } from './src/i18n/config';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(uz|ru|en)/:path*'],
};
