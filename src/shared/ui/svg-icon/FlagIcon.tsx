import { FC } from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';
import { FlagIcon as FlagIconType } from './types';

interface FlagIconProps extends Omit<SvgIconProps, 'name' | 'sprite'> {
  locale: 'uz' | 'ru' | 'en';
}

const localeToFlag: Record<string, FlagIconType> = {
  uz: 'flag-uz',
  ru: 'flag-ru',
  en: 'flag-en',
};

export const FlagIcon: FC<FlagIconProps> = ({ locale, size = 33, ...props }) => {
  const flagName = localeToFlag[locale] || 'flag-uz';

  return (
    <SvgIcon
      name={flagName}
      sprite="/icons/flags.svg"
      size={size}
      style={{ aspectRatio: '33/25' }}
      {...props}
    />
  );
};
