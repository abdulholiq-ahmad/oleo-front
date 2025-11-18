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
        className="flex items-center gap-2 rounded-full border border-gray-50 px-5 py-3 transition-colors"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <FlagIcon locale={locale} size={33} width={33} height={25} />
        <span className="text-base font-medium text-gray-700">
          {currentLanguage.name.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-5 rounded-lg bg-white shadow-lg">
          <div className="flex flex-col p-3">
            {languages
              .filter((lang) => lang.code !== locale)
              .map((lang, index, array) => (
                <button
                  key={lang.code}
                  onClick={() => handleLocaleChange(lang.code)}
                  className={`hover:bg-opacity-90 flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                    index !== array.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <FlagIcon locale={lang.code} size={24} />
                  <span className="text-gray-dark text-base font-medium">{lang.name}</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
