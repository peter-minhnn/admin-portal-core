import {
  IconComponents,
  IconHexagonNumber1,
  IconLayoutDashboard,
  IconSettings,
  IconUserShield,
  IconInputAi,
    IconTable
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

export const sideLinks = (t: any): SideLink[] => {
  return [
    {
      title: t("dashboard"),
      label: "",
      href: pageRoutes.dashboard,
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: t("products"),
      label: "",
      href: "",
      icon: <IconUserShield size={18} />,
      sub: [
        {
          title: t("productsList"),
          label: "",
          href: "/products/list",
          icon: <IconHexagonNumber1 size={18} />,
        },
      ],
    },
    {
      title: t("settings"),
      label: "",
      href: pageRoutes.settings,
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
          href: pageRoutes.sample.input,
          icon: <IconInputAi size={18} />,
        },
        {
          title: t("grid"),
          label: "",
          href: pageRoutes.sample.grid,
          icon: <IconTable size={18} />,
        },
      ],
    },
  ];
};
