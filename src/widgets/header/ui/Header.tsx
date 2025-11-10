'use client';

import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import { LocaleSwitcher } from '@/widgets/locale-switcher';

function Header() {
  return (
    <div className="flex flex-row items-center justify-between py-5">
      <div className="flex flex-row items-center gap-12">
        <Image src={'/images/logo.png'} alt="Oleo logo image" width={88} height={70} />
        <Navbar />
      </div>
      <div className="flex flex-row items-center gap-3">
        <LocaleSwitcher />
      </div>
    </div>
  );
}

export default Header;
