"use client";

import React, { startTransition, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { routing, usePathname, useRouter } from "@/shared/configs/i18n/routing";
import { Locale } from "@/shared/configs/i18n/config";
import { useLocaleStore } from "@/states/common.state";
import { CookieEnums } from "@/shared/enums";
import { setCookie } from "cookies-next";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcherMessages");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { locale: localeStore, setLocaleStore } = useLocaleStore();

  const onSelectChange = (locale: Locale) => {
    setLocaleStore(locale);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: locale },
      );
    });
  };

  useEffect(() => {
    const getLocaleCookie = getCookie(CookieEnums.NEXT_LOCALE);
    if (!getLocaleCookie) {
      setCookie(CookieEnums.NEXT_LOCALE, routing.defaultLocale);
      onSelectChange(routing.defaultLocale);
      return;
    }
    onSelectChange(getLocaleCookie as any);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className="hidden sm:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <GlobeIcon className="h-5 w-5" />
              <span>{t(localeStore as any)}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel title="" className="hidden" />
            {routing.locales.map((cur) => (
              <DropdownMenuItem
                key={cur}
                onClick={() => onSelectChange(cur)}
                className="flex items-center justify-between cursor-pointer"
              >
                <span>{t(cur)}</span>
                {localeStore === cur && <CheckIcon className="h-5 w-5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="block sm:hidden">
        <Drawer fadeFromIndex={0} snapPoints={[1.02]}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <GlobeIcon className="h-5 w-5" />
              <span>{localeStore?.toLocaleUpperCase()}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="grid gap-4 p-4">
              <DrawerTitle>
                <div className="flex items-center justify-between">
                  {t("title")}
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <XIcon className="h-5 w-5" />
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerTitle>
              <DrawerDescription>{t("select")}</DrawerDescription>
              <div className="grid gap-2">
                {routing.locales.map((cur) => (
                  <Button
                    variant="ghost"
                    className="justify-start gap-2"
                    key={cur}
                    onClick={() => onSelectChange(cur)}
                    title={t(cur)}
                    type="button"
                  >
                    <GlobeIcon className="h-5 w-5" />
                    <span>{t(cur)}</span>
                    {localeStore === cur && (
                      <CheckIcon className="h-5 w-5 ml-auto" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </React.Fragment>
  );
}

function CheckIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronDownIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function GlobeIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function XIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
