"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import useBreadcrumbs from "@/hooks/use-breadcrumbs";
import {pageRoutes} from "@/shared/routes/pages.route";
import {usePathname} from "next/navigation";

export type BreadCrumbType = {
  id: string;
  href: string;
  title: string;
};

export default function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();
  const pathname = usePathname();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs?.map((item, index) => (
          <Fragment key={item.id}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
            {(breadcrumbs.length - 1) !== index && (<BreadcrumbSeparator>/</BreadcrumbSeparator>)}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
