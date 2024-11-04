import { ReactNode } from "react";
import {LocalesProvider} from "@/components/providers/locale-provider";
import {useLocale} from "next-intl";
import {Locale, locales} from "@/shared/configs/i18n/config";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function GuestLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = useLocale();

  if (!locales.includes(locale as Locale)) {
    return notFound();
  }

  setRequestLocale(locale);

  return <LocalesProvider locale={"vi"}>{children}</LocalesProvider>;
}
