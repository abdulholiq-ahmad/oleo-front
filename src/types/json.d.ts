// JSON fayllar uchun global type declaration
declare module '*.json' {
  const value: any;
  export default value;
}

// Yoki aniqroq:
declare module '@/messages/*.json' {
  const value: Record<string, any>;
  export default value;
}
