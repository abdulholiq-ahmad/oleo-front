// src/i18n/config.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Qo'llab-quvvatlanadigan tillar
  locales: ['uz', 'ru', 'en'],

  // Default til
  defaultLocale: 'uz',

  // Locale prefix strategiyasi
  localePrefix: 'as-needed', // 'always' | 'as-needed' | 'never'
});

// Type helper
export type Locale = (typeof routing.locales)[number];
