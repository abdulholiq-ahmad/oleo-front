import React from 'react';
import { type ButtonType } from '../types';

function Button({ text, size }: ButtonType) {
  return <button className={`${size == 'small' ? 'p-2' : ''} border- border`}></button>;
}

export default Button;
