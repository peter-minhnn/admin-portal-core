"use client";

import { FC, ReactNode, useEffect } from "react";
import dynamic from "next/dynamic";
import { UserNav } from "@/components/layouts/user-nav";
import { Layout } from "@/components/layouts/layout";
import Sidebar from "@/components/layouts/sidebar";
import Breadcrumbs from "@/components/layouts/breadcrumbs";
import GlobalModal from "@/components/layouts/global-modal";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import { getSession } from "@/actions/cookies.action";
import { useUserStore } from "@/states/common.state";
import QueryProvider from "@/components/providers/query-provider";
import {AuthUserType} from "@/types/user.type";
import get from "lodash/get";
import LocaleSwitcher from "@/components/layouts/locale-switcher";

const NextProgress = dynamic(
  () => import("@/components/layouts/next-progress"),
  {
    ssr: false,
  },
);

type Props = {
  children: ReactNode;
};

export const AdminLayout: FC<Props> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  const { setUserInfo } = useUserStore();

  useEffect(() => {
    getSession().then((session) => {
      const userInfo = get(session, "user", null) as AuthUserType;
      if (userInfo) {
        setUserInfo(userInfo);
      }
    });
  }, [setUserInfo]);

  return (
    <QueryProvider>
      <div className="relative h-full overflow-hidden bg-background">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main
          id="content"
          className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
        >
          <Layout>
            {/* ===== Top Heading ===== */}
            <Layout.Header>
              {/*<TopNav links={topNav} />*/}
              <div className="ml-auto flex items-center space-x-4">
                {/*<Search />*/}
                {/*<ThemeSwitch />*/}
                <LocaleSwitcher />
                <UserNav />
              </div>
            </Layout.Header>

            {/* ===== Main ===== */}
            <Layout.Body>
              <div className="mb-2">
                <Breadcrumbs />
              </div>
              {children}
            </Layout.Body>
          </Layout>
        </main>
      </div>
      <NextProgress />
      <GlobalModal />
    </QueryProvider>
  );
};

export default AdminLayout;
//
// const topNav = [
//   {
//     title: "Overview",
//     href: "dashboard/overview",
//     isActive: true,
//   },
//   {
//     title: "Customers",
//     href: "dashboard/customers",
//     isActive: false,
//   },
//   {
//     title: "Products",
//     href: "dashboard/products",
//     isActive: false,
//   },
//   {
//     title: "Settings",
//     href: "dashboard/settings",
//     isActive: false,
//   },
// ];
