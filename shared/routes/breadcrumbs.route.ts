import { BreadCrumbType } from "@/components/layouts/breadcrumbs";
import {pageRoutes} from "@/shared/routes/pages.route";

export const breadcrumbsRoutes: BreadCrumbType[] = [
  {
    id: "1",
    href: pageRoutes.dashboard,
    title: "dashboard",
  },
  {
    id: "2",
    href: pageRoutes.products.list,
    title: "products",
  },
  {
    id: "3",
    href: pageRoutes.products.list,
    title: "productsList",
  },
  {
    id: "4",
    href: pageRoutes.sample.input,
    title: "samplePages",
  },
  {
    id: "5",
    href: pageRoutes.sample.input,
    title: "input",
  },
  {
    id: "6",
    href: pageRoutes.sample.grid,
    title: "samplePages",
  },
  {
    id: "7",
    href: pageRoutes.sample.grid,
    title: "grid",
  },
  {
    id: "8",
    href: pageRoutes.sample.multipleSelector,
    title: "samplePages",
  },{
    id: "9",
    href: pageRoutes.sample.multipleSelector,
    title: "multipleSelector",
  },
];
