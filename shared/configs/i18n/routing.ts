import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/shared/configs/i18n/config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,
  // Used when no locale matches
  defaultLocale: defaultLocale,
  localeDetection: false,
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
