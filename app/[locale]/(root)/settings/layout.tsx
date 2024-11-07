import { Separator } from "@/components/ui/separator";
import SidebarNav from "@/app/[locale]/(root)/settings/_components/sidebar-nav";
import { IconTool, IconUser } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
import { metaObject } from "@/shared/configs";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { pageRoutes } from "@/shared/routes/pages.route";

export async function generateMetadata() {
  "use server";
  const t = await getTranslations("MetaDataMessages");

  return {
    ...metaObject(t("settingsTitle")),
  };
}

export default function SettingsPage({
  children,
}: Readonly<{ children: ReactNode }>) {
  const t = useTranslations("SettingsMessages");

  return (
    <>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full p-1 pr-4 md:overflow-y-hidden">
          {children}
        </div>
      </div>
    </>
  );
}

const sidebarNavItems = [
  {
    title: "profile",
    icon: <IconUser size={18} />,
    href: pageRoutes.settings,
  },
  {
    title: "account",
    icon: <IconTool size={18} />,
    href: pageRoutes.settingsAccount,
  },
  // {
  //   title: 'Appearance',
  //   icon: <IconPalette size={18} />,
  //   href: '/settings/appearance',
  // },
  // {
  //   title: 'Notifications',
  //   icon: <IconNotification size={18} />,
  //   href: '/settings/notifications',
  // },
  // {
  //   title: 'Display',
  //   icon: <IconBrowserCheck size={18} />,
  //   href: '/settings/display',
  // },
  // {
  //   title: 'Error Example',
  //   icon: <IconExclamationCircle size={18} />,
  //   href: '/settings/error-example',
  // },
];
