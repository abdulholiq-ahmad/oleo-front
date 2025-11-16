import React from 'react';
import { type ButtonType } from '../types';
import Image from 'next/image';

function Button({ size, text }: ButtonType) {
  return (
    <button
      className={`${size == 'small' ? 'min-w-44 p-2' : ''} group flex flex-row items-center justify-start gap-3 rounded-full border border-[#E0E0E0] bg-white hover:cursor-pointer`}
    >
      <span className="relative flex flex-row items-center gap-3 overflow-hidden rounded-full">
        <span className="bg-primary absolute inset-0 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></span>
        <span className="bg-primary relative z-10 rounded-full p-2.5 transition-transform duration-300 group-hover:rotate-45">
          <Image src={'/images/arrow-right-icon.png'} alt="Arrow right icon" width={20} height={20} />
        </span>
        <span className="relative z-10 pr-4 text-base font-semibold leading-[140%] text-black transition-colors duration-300 group-hover:text-white">
          {text}
        </span>
      </span>
    </button>
  );
}

export default Button;
