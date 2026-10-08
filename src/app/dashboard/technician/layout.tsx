import RoleGuard from "@/components/auth/RoleGuard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <RoleGuard roles={["TECHNICIAN"]}>{children}</RoleGuard>;
};

export default Layout;
