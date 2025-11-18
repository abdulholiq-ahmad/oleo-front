interface FooterLinkType {
  name: string;
  href: '/' | '/about' | '/products' | '/news' | '/contact';
}

interface SocialMediaLinkType {
  icon: 'instagram' | 'telegram' | 'facebook';
  link: string;
  label: string;
}

interface ContactInfoType {
  name: string;
  text: string;
}

export type { FooterLinkType, SocialMediaLinkType, ContactInfoType };
