import RoleGuard from "@/components/auth/RoleGuard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard
      roles={[
        "CUSTOMER",
        "POWER_OPERATOR",
        "TECHNICIAN",
        "ZONE_MANAGER",
        "ADMIN",
      ]}
    >
      {/** biome-ignore lint/a11y/useValidAriaRole: <explanation> */}
      <DashboardShell role="CUSTOMER">{children}</DashboardShell>
    </RoleGuard>
  );
};

export default Layout;
