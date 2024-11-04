"use client";

import {FC, ReactNode, useEffect} from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TopNav } from "@/components/layouts/top-nav";
import { UserNav } from "@/components/layouts/user-nav";
import { Layout } from "@/components/layouts/layout";
import Sidebar from "@/components/layouts/sidebar";
import Breadcrumbs from "@/components/layouts/breadcrumbs";
import GlobalModal from "@/components/layouts/global-modal";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import { getSession } from "@/actions/cookies.action";
import { useUserStore } from "@/states/common.state";

const NextProgress = dynamic(
  () => import("@/components/layouts/next-progress"),
  {
    ssr: false,
  },
);

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export const AdminLayout: FC<Props> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  const { setUserInfo } = useUserStore();

  useEffect(() => {
    getSession().then((session) => {
      if (session) setUserInfo({ phoneNumber: String(session?.phoneNumber ?? "") });
    });
  }, [setUserInfo]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative h-full overflow-hidden bg-background">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main
          id="content"
          className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
        >
          <Layout>
            {/* ===== Top Heading ===== */}
            <Layout.Header>
              <TopNav links={topNav} />
              <div className="ml-auto flex items-center space-x-4">
                {/*<Search />*/}
                {/*<ThemeSwitch />*/}
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
    </QueryClientProvider>
  );
};

export default AdminLayout;

const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
  },
];
