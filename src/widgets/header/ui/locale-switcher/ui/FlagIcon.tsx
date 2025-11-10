import Image from 'next/image';

interface FlagIconProps {
  locale: 'uz' | 'ru' | 'en';
  size?: number;
  width?: number;
  height?: number;
}

export function FlagIcon({ locale, size = 24, width, height }: FlagIconProps) {
  const flagImages = {
    uz: '/images/flag-uz-icon.png',
    ru: '/images/flag-ru-icon.png',
    en: '/images/flag-en-icon.png',
  };

  const imgWidth = width || size;
  const imgHeight = height || size;

  return (
    <Image
      src={flagImages[locale]}
      alt={`${locale} flag`}
      width={imgWidth}
      height={imgHeight}
      className="rounded"
    />
  );
}
