export type Locale = "en" | "vi";

export const defaultLocale: Locale = "vi";

export const locales: Locale[] = ["en", "vi"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  vi: "Vietnamese",
};
