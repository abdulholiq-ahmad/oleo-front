# SVG Icon System

SVG sprite tizimi - bayroqlar va boshqa ikonlar uchun.

## Fayllar

```
src/shared/ui/svg-icon/
├── SvgIcon.tsx      # Asosiy SVG komponent
├── FlagIcon.tsx     # Bayroq komponenti
├── types.ts         # TypeScript types
├── index.ts         # Exports
└── README.md        # Bu fayl

public/icons/
└── flags.svg        # SVG sprite fayl
```

## Ishlatish

### 1. FlagIcon (Bayroqlar uchun)

Eng oson usul - locale bo'yicha avtomatik bayroq ko'rsatish:

```tsx
import { FlagIcon } from '@/shared/ui';

export function Example() {
  return (
    <div>
      {/* O'zbekiston bayrog'i */}
      <FlagIcon locale="uz" />

      {/* Rossiya bayrog'i */}
      <FlagIcon locale="ru" />

      {/* Ingliz bayrog'i */}
      <FlagIcon locale="en" />

      {/* Custom o'lcham */}
      <FlagIcon locale="uz" size={50} />

      {/* Custom className */}
      <FlagIcon locale="uz" className="my-flag" />
    </div>
  );
}
```

### 2. SvgIcon (Umumiy ishlatish)

To'g'ridan-to'g'ri ikon nomini ishlatish:

```tsx
import { SvgIcon } from '@/shared/ui';

export function Example() {
  return (
    <div>
      {/* O'zbekiston bayrog'i */}
      <SvgIcon name="flag-uz" sprite="/icons/flags.svg" size={33} />

      {/* Boshqa sprite dan */}
      <SvgIcon name="icon-home" sprite="/icons/common.svg" size={24} />
    </div>
  );
}
```

### 3. Header da ishlatish

```tsx
'use client';

import { useLocale } from 'next-intl';
import { FlagIcon } from '@/shared/ui';

export function LanguageSwitcher() {
  const locale = useLocale();

  return (
    <button>
      <FlagIcon locale={locale as 'uz' | 'ru' | 'en'} size={24} />
      <span>{locale.toUpperCase()}</span>
    </button>
  );
}
```

## Yangi bayroq qo'shish

1. `public/icons/flags.svg` faylini oching
2. Yangi `<symbol>` qo'shing:

```xml
<symbol id="flag-new" viewBox="0 0 33 25">
  <g clip-path="url(#clip-new)">
    <!-- SVG path lar -->
  </g>
</symbol>
```

3. `src/shared/ui/svg-icon/types.ts` ga yangi tip qo'shing:

```typescript
export type FlagIcon = 'flag-uz' | 'flag-ru' | 'flag-en' | 'flag-new';
```

4. `FlagIcon.tsx` da mapping qo'shing:

```typescript
const localeToFlag: Record<string, FlagIconType> = {
  uz: 'flag-uz',
  ru: 'flag-ru',
  en: 'flag-en',
  new: 'flag-new', // Yangi
};
```

## Props

### FlagIcon Props

| Prop      | Type                 | Default  | Ta'rif        |
| --------- | -------------------- | -------- | ------------- |
| locale    | 'uz' \| 'ru' \| 'en' | required | Til kodi      |
| size      | number               | 33       | Ikon o'lchami |
| className | string               | ''       | CSS class     |

### SvgIcon Props

| Prop      | Type   | Default            | Ta'rif                |
| --------- | ------ | ------------------ | --------------------- |
| name      | string | required           | Ikon nomi (symbol id) |
| sprite    | string | '/icons/flags.svg' | SVG sprite fayl yo'li |
| size      | number | 24                 | Ikon o'lchami         |
| className | string | ''                 | CSS class             |

## Afzalliklari

- ✅ **Performans**: Bir marta yuklanadi, keyin cache da saqlanadi
- ✅ **SEO**: Semantic HTML
- ✅ **Accessibility**: `aria-hidden` va `focusable` parametrlari
- ✅ **TypeScript**: To'liq type safety
- ✅ **Reusable**: Bir necha joyda ishlatish mumkin
- ✅ **Maintainable**: Markazlashtirilgan icon management
