export type Locale = "en" | "vi" | "ko";

export const defaultLocale: Locale = "vi";

export const locales: Locale[] = ["en", "vi", "ko"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  vi: "Vietnamese",
  ko: "Korean",
};
