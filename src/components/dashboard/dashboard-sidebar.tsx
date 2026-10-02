"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserRole } from "@/types/user/User.role.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../layout/shared/Header/Logo";
import { SidebarItems } from "@/types/dashboard/sidebar-types";

import { adminRoutes } from "../routes/admin-routes";
import { customerRoutes } from "../routes/customer-routes";
import { commonRoutes } from "../routes/common-routes";

const roleRoutes: Partial<Record<UserRole, SidebarItems[]>> = {
  ADMIN: adminRoutes,
  ZONE_MANAGER: customerRoutes,
  POWER_OPERATOR: customerRoutes,
  TECHNICIAN: customerRoutes,
  CUSTOMER: customerRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();

  // const roleSpecificRoutes = roleRoutes[role] ?? [];

  // const routes: SidebarItems[] = [...commonRoutes, ...roleSpecificRoutes];
  const routes: SidebarItems[] = [...commonRoutes];

  return (
    <Sidebar
      style={
        {
          "--sidebar-width": "15rem",
          "--sidebar-width-mobile": "12rem",
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="h-14 border-b px-3">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="py-1">
            <SidebarGroupLabel className="h-7 px-2 text-[11px] font-medium text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.url ||
                    pathname.startsWith(`${item.url}/`);

                  return (
                    <SidebarMenuItem key={item.title} className="w-full">
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                        className="h-8 w-full min-w-0 px-2 text-xs"
                      >
                        <Link
                          href={item.url}
                          className="flex min-w-0 items-center gap-2"
                        >
                          {Icon && <Icon className="size-3.5 shrink-0" />}

                          <span className="truncate">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
