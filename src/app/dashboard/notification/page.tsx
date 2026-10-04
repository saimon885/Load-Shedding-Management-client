"use client";

import { UsegetMyNotification } from "@/hooks/outage.hook";
import { format, parseISO } from "date-fns";
import {
  Bell,
  AlertTriangle,
  Info,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Clock,
  CalendarDays,
} from "lucide-react";

const NotificationPage = () => {
  const { data, isLoading } = UsegetMyNotification();
  const notifications = data?.data || [];

  const getAlertConfig = (type: string) => {
    switch (type?.toUpperCase()) {
      case "OUTAGE_ALERT":
        return {
          icon: (
            <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
          ),
          containerBg:
            "bg-amber-500/5 border-amber-500/20 dark:border-amber-500/30",
          iconBg: "bg-amber-500/10 border-amber-500/20",
          badge:
            "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
          lineGlow: "before:bg-amber-500",
        };
      case "EMERGENCY":
        return {
          icon: (
            <ShieldAlert className="size-4 text-rose-600 dark:text-rose-400" />
          ),
          containerBg:
            "bg-rose-500/5 border-rose-500/20 dark:border-rose-500/30",
          iconBg: "bg-rose-500/10 border-rose-500/20",
          badge:
            "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
          lineGlow: "before:bg-rose-500",
        };
      case "MAINTENANCE":
        return {
          icon: <Zap className="size-4 text-blue-600 dark:text-blue-400" />,
          containerBg:
            "bg-blue-500/5 border-blue-500/20 dark:border-blue-500/30",
          iconBg: "bg-blue-500/10 border-blue-500/20",
          badge:
            "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
          lineGlow: "before:bg-blue-500",
        };
      default:
        return {
          icon: <Info className="size-4 text-slate-600 dark:text-slate-400" />,
          containerBg: "bg-slate-500/5 border-slate-200 dark:border-slate-800",
          iconBg:
            "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
          badge:
            "bg-slate-100 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700",
          lineGlow: "before:bg-slate-400",
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-xs font-medium text-muted-foreground animate-pulse">
            Loading your alert dispatch feed...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-muted/80 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <Bell className="size-4.5 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-foreground">
              Notification Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
            Real-time grid updates, planned maintenance sequences, and urgent
            local infrastructure status monitoring broadcasts.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-muted/60 border px-3 py-1.5 text-xs font-semibold text-foreground self-start sm:self-auto shadow-2xs">
            <Clock className="size-3.5 text-muted-foreground" />
            Active Logs:{" "}
            <span className="text-primary font-bold">
              {notifications.length}
            </span>
          </div>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((item: any) => {
            let cleanTime = "N/A";
            try {
              cleanTime = format(
                parseISO(item.createdAt),
                "dd MMM yyyy • hh:mm a",
              );
            } catch (e) {
              cleanTime =
                item.createdAt?.substring(0, 16).replace("T", " ") || "N/A";
            }

            const config = getAlertConfig(item.type);

            return (
              <div
                key={item.id}
                className={`relative flex items-start gap-4 rounded-xl border p-4 sm:p-5 shadow-xs transition-all duration-200 hover:shadow-sm before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] before:rounded-l-xl overflow-hidden ${config.containerBg} ${config.lineGlow}`}
              >
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg border shadow-2xs ${config.iconBg}`}
                >
                  {config.icon}
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold border uppercase tracking-wider ${config.badge}`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap shrink-0 flex items-center gap-1 bg-muted/60 px-2 py-0.5 rounded border border-muted-foreground/10">
                      <CalendarDays className="size-3 text-muted-foreground/70" />
                      {cleanTime}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-foreground leading-relaxed break-words pr-2">
                    {item.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-dashed rounded-2xl bg-muted/20 p-12 text-center max-w-xl mx-auto shadow-2xs">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 mb-4 animate-bounce">
            <CheckCircle2 className="size-6" />
          </div>
          <h3 className="text-sm font-bold text-foreground tracking-tight">
            All Grid Sectors Operational
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
            No unexpected power distribution anomalies, maintenance schedules,
            or emergency outage alerts recorded.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
