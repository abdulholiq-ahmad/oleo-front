'use client';

import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import { LocaleSwitcher } from '@/widgets/header/ui/locale-switcher';
import { Button } from '@/widgets/button';

function Header() {
  return (
    <div className="sticky top-0 left-0 flex flex-row items-center justify-between bg-white py-5">
      <div className="flex flex-row items-center gap-12">
        <Image src={'/images/logo.png'} alt="Oleo logo image" width={88} height={70} />
        <Navbar />
      </div>
      <div className="flex flex-row items-center gap-3">
        <LocaleSwitcher />
        <Button text="Hamkorlik" />
      </div>
    </div>
  );
}

export default Header;
