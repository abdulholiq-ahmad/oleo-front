'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

function Navbar() {
  const t = useTranslations('navigation');

  const navItems = [
    { key: 'home', href: '/' as const },
    { key: 'about', href: '/about' as const },
    { key: 'products', href: '/products' as const },
    { key: 'news', href: '/news' as const },
  ];

  return (
    <ul className="flex flex-row gap-4">
      {navItems.map((item) => (
        <li
          key={item.key}
          className="group hover:bg-primary/5 flex items-center rounded-lg px-4 py-2 hover:cursor-pointer"
        >
          <Link
            href={item.href}
            className="group-hover:text-primary text-[18px] text-black transition-all duration-100"
          >
            {t(item.key)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
