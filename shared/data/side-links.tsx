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
  IconUser,
} from '@tabler/icons-react';
import { ReactElement } from 'react';
import { pageRoutes } from '@/shared/routes/pages.route';
import { useUserStore } from '@/states/common.state';
import { useLocale, useTranslations } from 'next-intl';

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: ReactElement;
  hidden?: boolean;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export default function useSideLinks(): SideLink[] {
  const { userInfo } = useUserStore();
  const t = useTranslations('MenuMessages');
  const locale = useLocale();

  if (
    userInfo?.userName === process.env.NEXT_PUBLIC_AUTH_ID &&
    userInfo?.pwd === process.env.NEXT_PUBLIC_AUTH_PWD
  ) {
    return [...sideLinks(t, locale), ...sideLinksAuth(t, locale)];
  }
  return [...sideLinks(t, locale)];
}

export const sideLinks = (t: any, locale: string): SideLink[] => {
  const path = `/${locale}`;
  return [
    {
      title: t('dashboard'),
      label: '',
      href: path + pageRoutes.dashboard,
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: t('products'),
      label: '',
      href: '',
      icon: <IconPackages size={18} />,
      sub: [
        {
          title: t('productList'),
          label: '',
          href: path + pageRoutes.products.list,
          icon: <IconComponents size={18} />,
        },
        {
          title: t('productPrice'),
          label: '',
          href: path + pageRoutes.products.price,
          icon: <IconComponents size={18} />,
        },
        {
          title: t('productOrder'),
          label: '',
          href: path + pageRoutes.products.order,
          icon: <IconComponents size={18} />,
        },
      ],
    },
    {
      title: t('customers'),
      label: '',
      href: path + pageRoutes.customers,
      icon: <IconUser size={18} />,
    },
  ];
};

export const sideLinksAuth = (t: any, locale: string): SideLink[] => {
  const path = `/${locale}`;
  return [
    {
      title: t('rolesPermissions'),
      label: '',
      href: path + pageRoutes.rolesPermissions,
      icon: <IconShield size={18} />,
    },
    {
      title: t('settings'),
      label: '',
      href: path + pageRoutes.settings,
      icon: <IconSettings size={18} />,
    },
    {
      title: t('samplePages'),
      label: '',
      href: '',
      icon: <IconComponents size={18} />,
      sub: [
        {
          title: t('input'),
          label: '',
          href: path + pageRoutes.sample.input,
          icon: <IconInputAi size={18} />,
        },
        {
          title: t('grid'),
          label: '',
          href: path + pageRoutes.sample.grid,
          icon: <IconTable size={18} />,
        },
        {
          title: t('multipleSelector'),
          label: '',
          href: path + pageRoutes.sample.multipleSelector,
          icon: <IconBoxMultiple size={18} />,
        },
        {
          title: t('datePicker'),
          label: '',
          href: path + pageRoutes.sample.datePicker,
          icon: <IconCalendar size={18} />,
        },
      ],
    },
  ];
};
