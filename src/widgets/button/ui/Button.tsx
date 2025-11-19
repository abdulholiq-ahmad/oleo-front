import React from 'react';
import { type ButtonType } from '../types';
import Image from 'next/image';

function Button({ text, className }: ButtonType) {
  return (
    <button
      className={`group border-gray-light flex min-w-36 flex-row items-center justify-start gap-3 rounded-full border bg-white p-2 hover:cursor-pointer ${className}`}
    >
      <span className="relative flex w-full flex-row items-center gap-3 overflow-hidden rounded-full">
        <span className="bg-primary absolute inset-0 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></span>
        <span className="bg-primary relative z-10 rounded-full p-2.5 transition-transform duration-300 group-hover:rotate-45">
          <Image
            src={'/images/arrow-right-icon.png'}
            alt="Arrow right icon"
            width={20}
            height={20}
          />
        </span>
        <span className="relative z-10 pr-4 text-base leading-[140%] font-semibold text-black transition-colors duration-300 group-hover:text-white">
          {text}
        </span>
      </span>
    </button>
  );
}

export default Button;
