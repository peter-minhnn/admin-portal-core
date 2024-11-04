import { ReactNode } from "react";
import AdminLayout from "@/components/layouts/admin-layout";
import { Locale, locales } from "@/shared/configs/i18n/config";
import { notFound } from "next/navigation";
import { LocalesProvider } from "@/components/providers/locale-provider";
import { setRequestLocale } from "next-intl/server";
import { useLocale } from "next-intl";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AuthorizationLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = useLocale();

  if (!locales.includes(locale as Locale)) {
    return notFound();
  }

  setRequestLocale(locale);

  return (
    <LocalesProvider locale={locale as Locale}>
      <AdminLayout>{children}</AdminLayout>
    </LocalesProvider>
  );
}
