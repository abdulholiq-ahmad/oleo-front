interface FooterLinkType {
  name: string;
  href: string;
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

export type { FooterLinkType,SocialMediaLinkType,ContactInfoType };