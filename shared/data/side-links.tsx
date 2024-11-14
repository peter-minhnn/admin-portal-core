import {
  IconComponents,
  IconLayoutDashboard,
  IconInputAi,
  IconTable,
  IconBoxMultiple,
  IconCalendar,
  IconPackages,
  IconSettings,
  IconShield,
} from "@tabler/icons-react";
import { ReactElement } from "react";
import { pageRoutes } from "@/shared/routes/pages.route";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: ReactElement;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sideLinks = (t: any, locale: string): SideLink[] => {
  const path = `/${locale}`;
  return [
    {
      title: t("dashboard"),
      label: "",
      href: path + pageRoutes.dashboard,
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: t("products"),
      label: "",
      href: path + pageRoutes.products,
      icon: <IconPackages size={18} />,
    },
    {
      title: t("rolesPermissions"),
      label: "",
      href: path + pageRoutes.rolesPermissions,
      icon: <IconShield size={18} />,
    },
    {
      title: t("settings"),
      label: "",
      href: path + pageRoutes.settings,
      icon: <IconSettings size={18} />,
    },
    {
      title: t("samplePages"),
      label: "",
      href: "",
      icon: <IconComponents size={18} />,
      sub: [
        {
          title: t("input"),
          label: "",
          href: path + pageRoutes.sample.input,
          icon: <IconInputAi size={18} />,
        },
        {
          title: t("grid"),
          label: "",
          href: path + pageRoutes.sample.grid,
          icon: <IconTable size={18} />,
        },
        {
          title: t("multipleSelector"),
          label: "",
          href: path + pageRoutes.sample.multipleSelector,
          icon: <IconBoxMultiple size={18} />,
        },
        {
          title: t("datePicker"),
          label: "",
          href: path + pageRoutes.sample.datePicker,
          icon: <IconCalendar size={18} />,
        },
      ],
    },
  ];
};
