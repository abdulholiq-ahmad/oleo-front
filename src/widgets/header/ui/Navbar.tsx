'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

function Navbar() {
  const t = useTranslations('navigation');

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'products', href: '/products' },
    { key: 'news', href: '/news' },
  ];

  return (
    <ul className="flex flex-row gap-4">
      {navItems.map((item) => (
        <li key={item.key} className="px-6.5">
          <Link href={item.href} className="text-[18px] text-black hover:text-blue-600 transition">
            {t(item.key)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
