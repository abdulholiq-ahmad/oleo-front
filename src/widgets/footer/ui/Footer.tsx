import React from 'react';
import { Icon } from '@/shared/ui/Icon';
import Link from 'next/link';
import { ContactInfoType, SocialMediaLinkType, type FooterLinkType } from '../types';
import { Link as I18Link } from '@/i18n/routing';

function Footer() {
  const footerLink: FooterLinkType[] = [
    { name: 'Asosiy', href: '/' },
    { name: 'Biz haqimizda', href: '/about' },
    { name: 'Mahsulotlar', href: '/products' },
    { name: 'Yangiliklar', href: '/news' },
  ];

  const socialMediaLinks: SocialMediaLinkType[] = [
    { icon: 'instagram', link: 'https://instagram.com' as const, label: 'Instagram' },
    { icon: 'telegram', link: 'https://t.me' as const, label: 'Telegram' },
    { icon: 'facebook', link: 'https://facebook.com' as const, label: 'Facebook' },
  ];

  const contactList: ContactInfoType[] = [
    { name: 'Telefon raqam', text: '+998 (90) 045-35-35' },
    { name: 'Email', text: 'barakafood.oleo1@gmail.com' },
    { name: 'Manzil', text: "Toshkent shaxar, Chilonzor tumani, A.Temur ko'chasi, 108-uy" },
  ];

  return (
    <footer className="flex flex-col py-6">
      <div className="container grid grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-gray-medium mb-3 text-sm">Oleo</h2>
            <ul className="flex flex-col gap-2">
              {footerLink.map((item, index) => (
                <li key={index}>
                  <I18Link href={item.href} className="text-gray-dark text-base font-normal">
                    {item.name}
                  </I18Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h2 className="text-gray-medium mb-3 text-sm">Ijtimoiy tarmoqlar</h2>
              <ul className="flex gap-4">
                {socialMediaLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-70"
                      aria-label={item.label}
                    >
                      <Icon name={item.icon} className="text-gray-dark h-6 w-6" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-gray-medium mb-3 text-sm">Aloqa</h2>
            <ul className="flex flex-col gap-2">
              {contactList.map((item, index) => (
                <li key={index}>
                  <p className="text-gray-dark text-base font-normal">{item?.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <span className="bg-gray-light my-10 h-0.5 w-full" />
      <div className="container flex flex-row items-center justify-between">
        <span className="text-gray-dark">© 2025 Oleo. Barcha huquqlar himoyalangan.</span>
        <span className="text-gray-dark">
          Developed by{' '}
          <Link href={'https://t.me/abdulxoliq_axmad'} target="_blank" className="font-semibold">
            Abdulxoliq Axmad
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
