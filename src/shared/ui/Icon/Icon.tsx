import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  width?: number;
  height?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', width = 24, height = 24 }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
};
