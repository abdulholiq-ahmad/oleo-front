import React from 'react';
import { type ButtonType } from '../types';
import Image from 'next/image';

function Button({ size }: ButtonType) {
  return (
    <button className={`${size == 'small' ? 'p-2' : ''} border- border`}>
      <Image src={'/images/arrow-right-icon.png'} alt="Arrow right icon" />
    </button>
  );
}

export default Button;
