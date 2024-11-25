export type Locale = 'vi' | 'ko';
export type LocaleCurrency = 'vi-VN' | 'ko-KR';
export type LocaleUnitCurrency = 'VND' | 'KRW';

export const defaultLocale: Locale = 'vi';

export const locales: Locale[] = ['vi', 'ko'];

export const localeNames: Record<Locale, string> = {
  // en: "English",
  vi: 'Vietnamese',
  ko: 'Korean',
};
