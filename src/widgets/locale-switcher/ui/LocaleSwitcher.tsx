'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { FlagIcon } from '@/shared/ui';
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
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <FlagIcon locale={locale} size={33} width={33} height={25} />
        <span className="text-base font-medium text-gray-700">
          {currentLanguage.name.toUpperCase()}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLocaleChange(lang.code)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gray-50 ${
                lang.code === locale ? 'bg-blue-50' : ''
              }`}
            >
              <FlagIcon locale={lang.code} size={24} />
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500">{lang.name}</span>
              </div>
              {lang.code === locale && (
                <svg
                  className="ml-auto h-5 w-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
