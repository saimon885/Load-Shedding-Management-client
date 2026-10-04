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
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";
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
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />

            <Separator orientation="vertical" className="h-5" />

            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Power Management
              </span>
              <span className="text-xs text-muted-foreground">
                Load Shedding & Outage Control
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mr-5">
            <Link href="/dashboard/notification">
              <Button
                variant="ghost"
                size="icon"
                className="relative size-9 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                title="Notifications"
              >
                <Bell className="size-5" />
                <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-destructive ring-2 ring-background animate-pulse" />
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 bg-muted/20">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
