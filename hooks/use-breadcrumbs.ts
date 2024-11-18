import { useTranslations } from 'next-intl';
import { breadcrumbsRoutes } from '@/shared/routes/breadcrumbs.route';
import { BreadCrumbType } from '@/components/layouts/breadcrumbs';
import useCheckActiveNav from '@/hooks/use-check-active-nav';

export default function useBreadcrumbs() {
  const { checkActiveNav } = useCheckActiveNav();
  const t = useTranslations('MenuMessages');
  const breadcrumbs: BreadCrumbType[] = [];

  breadcrumbsRoutes.forEach((item) => {
    const activeNav = checkActiveNav(item.href);
    if (!activeNav) return;
    breadcrumbs.push({
      id: item.id,
      href:
        breadcrumbsRoutes.length - 1 === breadcrumbs.length ? item.href : '#',
      title: t(item.title as any),
    });
  });

  return { breadcrumbs };
}
