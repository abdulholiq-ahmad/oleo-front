import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';

function Header() {
  return (
    <div className="flex flex-row items-center justify-between py-5">
      <div>
        <Image src={'/images/logo.png'} alt="Oleo logo image" width={88} height={70} />
        <Navbar />
      </div>
    </div>
  );
}

export default Header;
