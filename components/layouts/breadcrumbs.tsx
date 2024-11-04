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

export type BreadCrumbType = {
  id: string;
  href: string;
  title: string;
};

export default function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/public">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs?.map((item) => (
          <Fragment key={item.id}>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
