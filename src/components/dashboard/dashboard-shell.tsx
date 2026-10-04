"use client";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { UsegetMeHook } from "@/hooks/profile.hook";
export default function DashboardShell({ children }: { children: ReactNode }) {
  const { data, isLoading } = UsegetMeHook();

  const role = data?.data?.role;

  if (isLoading || !role) {
    return null;
  }

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />

      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="h-5" />

          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              Power Management
            </span>

            <span className="text-xs text-muted-foreground">
              Load Shedding & Outage Control
            </span>
          </div>
        </header>

        <main className="flex-1 bg-muted/20">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
