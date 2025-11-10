import { FC, SVGProps } from 'react';

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  sprite?: string;
}

export const SvgIcon: FC<SvgIconProps> = ({
  name,
  size = 24,
  sprite = '/icons/flags.svg',
  className = '',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <use href={`${sprite}#${name}`} />
    </svg>
  );
};
