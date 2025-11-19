# Locale Switcher Widget

Til o'zgartirish uchun dropdown komponent - Bayroqlar va til nomlari bilan.

## Xususiyatlar

- ✅ **Dropdown menu** - 3 ta til (O'zbek, Русский, English)
- ✅ **Bayroqlar** - FlagIcon komponentidan foydalanadi
- ✅ **Routing** - next-intl routing bilan to'liq integratsiya
- ✅ **Accessibility** - ARIA attributes
- ✅ **Click outside** - Tashqarida bosish bilan yopiladi
- ✅ **Current locale highlight** - Joriy til belgilanadi
- ✅ **Smooth animations** - Yumshoq animatsiyalar

## Struktura

```
src/widgets/locale-switcher/
├── ui/
│   ├── LocaleSwitcher.tsx  # Asosiy komponent
│   └── index.ts            # Exports
├── index.ts                # Public exports
└── README.md               # Bu fayl
```

## Ishlatish

### 1. Header da (allaqachon qo'shilgan)

```tsx
import { LocaleSwitcher } from '@/widgets/locale-switcher';

function Header() {
  return (
    <header>
      <nav>{/* ... */}</nav>
      <LocaleSwitcher />
    </header>
  );
}
```

### 2. Istalgan joyda

```tsx
import { LocaleSwitcher } from '@/widgets/locale-switcher';

export function MyComponent() {
  return (
    <div>
      <h1>My Page</h1>
      <LocaleSwitcher />
    </div>
  );
}
```

## Qanday ishlaydi

1. **Joriy tilni aniqlaydi** - `useLocale()` hook orqali
2. **Dropdown menu** - Toggle button bilan ochiladi/yopiladi
3. **Til o'zgarishi** - `router.replace()` bilan yangi locale ga o'tadi
4. **URL saqlanadi** - Foydalanuvchi qaysi sahifada bo'lsa, o'sha sahifada qoladi

### Misol:

```
/uz/products → /ru/products (Rus tiliga o'tganda)
/en/about    → /uz/about    (O'zbek tiliga o'tganda)
```

## Komponent tuzilishi

```tsx
<div className="relative">
  {/* Toggle Button */}
  <button>
    <FlagIcon locale={locale} />
    <span>{locale}</span>
    <ChevronIcon />
  </button>

  {/* Dropdown Menu */}
  {isOpen && (
    <div className="dropdown">
      {languages.map((lang) => (
        <button onClick={handleChange}>
          <FlagIcon locale={lang.code} />
          <div>
            <span>{lang.nativeName}</span>
            <span>{lang.name}</span>
          </div>
          {isActive && <CheckIcon />}
        </button>
      ))}
    </div>
  )}
</div>
```

## Tillar

| Kod | Native Name | English Name |
| --- | ----------- | ------------ |
| uz  | O'zbek      | Uzbek        |
| ru  | Русский     | Russian      |
| en  | English     | English      |

## Customization

### Custom styling

LocaleSwitcher komponentida Tailwind CSS classlar ishlatilgan. O'zgartirishlar:

```tsx
// Button styling
className = 'flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-gray-50';

// Dropdown styling
className = 'absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg';
```

### Yangi til qo'shish

1. `languages` arrayiga qo'shing:

```tsx
const languages: Language[] = [
  { code: 'uz', name: 'Uzbek', nativeName: "O'zbek" },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' }, // Yangi
];
```

2. `src/i18n/routing.ts` da locale qo'shing:

```typescript
export const routing = defineRouting({
  locales: ['uz', 'ru', 'en', 'de'],
  defaultLocale: 'uz',
});
```

3. Bayroq qo'shing `public/icons/flags.svg` ga
4. Translation faylini qo'shing `src/messages/de.json`

## Bog'liqliklar

- **FlagIcon** - `@/shared/ui` dan bayroqlar
- **useLocale** - `next-intl` dan joriy til
- **useRouter, usePathname** - `@/i18n/routing` dan routing
- **React hooks** - useState, useRef, useEffect

## Accessibility

- `aria-label="Change language"` - Screen reader uchun
- `aria-expanded={isOpen}` - Dropdown holati
- Keyboard navigation qo'llab-quvvatlanadi
- Focus management

## Performance

- ✅ **Client-side navigation** - Sahifa reload bo'lmaydi
- ✅ **Click outside detection** - Optimized event listener
- ✅ **Cleanup** - useEffect cleanup function
- ✅ **Memoization** - currentLanguage computed once

## Browser Support

Barcha zamonaviy brauzerlar qo'llab-quvvatlanadi:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+
