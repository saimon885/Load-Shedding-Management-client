"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Zap } from "lucide-react";

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
import { SidebarItems } from "@/types/dashboard/sidebar-types";

import { adminRoutes } from "../routes/admin-routes";
import { customerRoutes } from "../routes/customer-routes";
import { commonRoutes } from "../routes/common-routes";
import { TechnicianRoutes } from "../routes/Technician-routes";
import { operatorRoutes } from "../routes/Operator-routes";
import { zone_manager_Routes } from "../routes/Zone-manager-routes";

const roleRoutes: Partial<Record<UserRole, SidebarItems[]>> = {
  ADMIN: adminRoutes,
  ZONE_MANAGER: zone_manager_Routes,
  POWER_OPERATOR: operatorRoutes,
  TECHNICIAN: TechnicianRoutes,
  CUSTOMER: customerRoutes,
};

const roleLabels: Record<UserRole, string> = {
  ADMIN: "Administrator",
  ZONE_MANAGER: "Zone Manager",
  POWER_OPERATOR: "Power Operator",
  TECHNICIAN: "Field Technician",
  CUSTOMER: "Customer",
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const roleSpecificRoutes = roleRoutes[role] ?? [];
  const routes: SidebarItems[] = [...commonRoutes, ...roleSpecificRoutes];

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-r"
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-mobile": "18rem",
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="border-b px-3 py-3">
        <Link href={"/"}>
          <div className="flex items-center gap-3 rounded-xl px-1">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Zap className="size-[18px]" />
            </div>

            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-bold tracking-tight">
                Power Management
              </p>

              <p className="truncate text-[10px] text-muted-foreground">
                Load Shedding & Outage Control
              </p>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <div className="mb-2 rounded-xl border bg-muted/40 px-3 py-2 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-3.5" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold">
                {roleLabels[role]}
              </p>

              <p className="truncate text-[10px] text-muted-foreground">
                Authorized access
              </p>
            </div>

            <span className="ml-auto size-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        {routes.map((group) => (
          <SidebarGroup key={group.title} className="px-0 py-1.5">
            <SidebarGroupLabel className="h-7 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.url ||
                    pathname.startsWith(`${item.url}/`);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                        className={`
                          relative h-9 rounded-lg px-3
                          text-[12px] font-medium
                          transition-all duration-200
                          group-data-[collapsible=icon]:justify-center
                          group-data-[collapsible=icon]:px-0
                          ${
                            isActive
                              ? "bg-primary/10 text-primary shadow-sm hover:bg-primary/15 hover:text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }
                        `}
                      >
                        <Link
                          href={item.url}
                          className="flex min-w-0 items-center gap-2.5"
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                          )}

                          {Icon && (
                            <Icon
                              className={`size-[16px] shrink-0 ${
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          )}

                          <span className="truncate group-data-[collapsible=icon]:hidden">
                            {item.title}
                          </span>
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

      <div className="border-t p-3 group-data-[collapsible=icon]:hidden">
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Zap className="size-3.5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold">
              Power Operations
            </p>
            <p className="truncate text-[9px] text-muted-foreground">
              System is operational
            </p>
          </div>

          <span className="ml-auto size-1.5 shrink-0 rounded-full bg-emerald-500" />
        </div>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}
