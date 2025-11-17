import React from 'react';
import { Icon } from '@/shared/ui/Icon';

function Footer() {
  const footerLink = ['Asosiy', 'Biz haqimizda', 'Mahsulotlar', 'Yangiliklar'];
  const socialMediaLinks = [
    { icon: 'instagram', link: 'https://instagram.com', label: 'Instagram' },
    { icon: 'telegram', link: 'https://t.me', label: 'Telegram' },
    { icon: 'facebook', link: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <footer className="">
      <div className="container bg-red-300">
        <div>
          <div>
            <h2 className="text-gray-medium mb-3 text-sm">Oleo</h2>
            <ul className="flex flex-col gap-2">
              {footerLink.map((item, index) => (
                <li key={index}>
                  <p className="text-gray-dark text-base font-normal">{item}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h2 className="text-gray-medium mb-3 text-sm">Ijtimoiy tarmoqlar</h2>
              <ul className="flex gap-4">
                {socialMediaLinks.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-70"
                      aria-label={item.label}
                    >
                      <Icon name={item.icon} className="h-6 w-6 text-gray-dark" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <span className="bg-gray-light h-0.5 w-full" />
        <div></div>
      </div>
    </footer>
  );
}

export default Footer;
