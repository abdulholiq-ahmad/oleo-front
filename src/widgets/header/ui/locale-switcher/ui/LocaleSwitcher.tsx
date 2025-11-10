'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { FlagIcon } from './FlagIcon';
import { useState, useRef, useEffect } from 'react';

interface Language {
  code: 'uz' | 'ru' | 'en';
  name: string;
}

const languages: Language[] = [
  { code: 'uz', name: 'UZB' },
  { code: 'ru', name: 'RUS' },
  { code: 'en', name: 'ENG' },
];

export function LocaleSwitcher() {
  const locale = useLocale() as 'uz' | 'ru' | 'en';
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: 'uz' | 'ru' | 'en') => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-[#F7F7F7] px-5 py-3 transition-colors hover:bg-gray-50"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <FlagIcon locale={locale} size={33} width={33} height={25} />
        <span className="text-base font-medium text-gray-700">
          {currentLanguage.name.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-5 rounded-lg bg-white px-5 py-2">
          {languages
            .filter((lang) => lang.code !== locale)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLocaleChange(lang.code)}
                className="flex w-full items-center gap-3 border-b-2 border-gray-200 px-5 py-3 transition-colors last:border-0 hover:bg-gray-50"
              >
                <FlagIcon locale={lang.code} size={24} />
                <div className="flex flex-col items-start">
                  <span className="text-base text-[var(--gray-dark)]">{lang.name}</span>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
