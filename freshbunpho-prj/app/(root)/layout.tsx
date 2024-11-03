import { ReactNode } from "react";
import AdminLayout from "@/components/layouts/admin-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";

export default function AuthorizationLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
