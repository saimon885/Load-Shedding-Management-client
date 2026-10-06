"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Bell, ChevronRight, Zap } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { UsegetMeHook } from "@/hooks/profile.hook";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { data, isLoading } = UsegetMeHook();

  const role = data?.data?.role;

  if (isLoading || !role) {
    return null;
  }

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />

      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background/90 px-3 backdrop-blur-xl sm:px-5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <SidebarTrigger className="size-9 rounded-lg" />

            <Separator orientation="vertical" className="hidden h-5 sm:block" />

            <div className="hidden min-w-0 items-center gap-2 sm:flex">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[11px] text-muted-foreground">
                  Load Shedding & Outage Control
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground sm:hidden">
              <Zap className="size-3.5 text-primary" />
              <span className="font-medium">Power Management</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative size-9 rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Notifications"
            >
              <Link href="/dashboard/notification">
                <Bell className="size-[18px]" />

                <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
              </Link>
            </Button>

            <div className="hidden h-7 w-px bg-border sm:block" />

            <div className="hidden items-center gap-1 text-xs text-muted-foreground md:flex">
              <span>Dashboard</span>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-foreground">Overview</span>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] bg-muted/20 p-3 sm:p-5 lg:p-6">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
