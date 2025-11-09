import { getRequestConfig } from 'next-intl/server';
import { routing } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Hozirgi locale ni olish
  let locale = await requestLocale;

  // Agar locale mavjud bo'lmasa, default ni ishlatish
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
