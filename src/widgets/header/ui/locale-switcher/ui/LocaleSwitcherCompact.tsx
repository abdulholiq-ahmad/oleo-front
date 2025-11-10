'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { FlagIcon } from './FlagIcon';

// Compact version - faqat bayroqlar, text yo'q
export function LocaleSwitcherCompact() {
  const locale = useLocale() as 'uz' | 'ru' | 'en';
  const router = useRouter();
  const pathname = usePathname();

  const locales: Array<'uz' | 'ru' | 'en'> = ['uz', 'ru', 'en'];

  const handleLocaleChange = (newLocale: 'uz' | 'ru' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`rounded-lg p-1.5 transition-all ${
            loc === locale
              ? 'scale-110 ring-2 ring-blue-500 ring-offset-2'
              : 'opacity-60 hover:scale-105 hover:opacity-100'
          }`}
          aria-label={`Switch to ${loc}`}
          aria-pressed={loc === locale}
        >
          <FlagIcon locale={loc} size={28} />
        </button>
      ))}
    </div>
  );
}
