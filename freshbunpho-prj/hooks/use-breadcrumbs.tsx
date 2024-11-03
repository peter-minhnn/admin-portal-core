import { BreadcrumbsRoutes } from "@/shared/routes";
import { BreadCrumbType } from "@/components/layouts/breadcrumbs";
import useCheckActiveNav from "@/hooks/use-check-active-nav";

export default function useBreadcrumbs() {
  const { checkActiveNav } = useCheckActiveNav();
  const breadcrumbs: BreadCrumbType[] = [];

  BreadcrumbsRoutes.forEach((item) => {
    const activeNav = checkActiveNav(item.href);
    if (!activeNav) return;
    breadcrumbs.push({
      id: item.id,
      href:
        BreadcrumbsRoutes.length - 1 === breadcrumbs.length ? item.href : "#",
      title: item.title,
    });
  });

  return { breadcrumbs };
}
