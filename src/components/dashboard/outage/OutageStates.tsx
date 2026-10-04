/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { UsegetOutageStates } from "@/hooks/outage.hook";
import {
  Activity,
  CalendarDays,
  AlertOctagon,
  Radio,
  CheckCircle2,
  Timer,
} from "lucide-react";

const OutageStates = () => {
  const { data, isLoading } = UsegetOutageStates();
  const outageState = data?.data;

  if (isLoading) {
    return (
      <div className="w-full rounded-xl border bg-card p-5 shadow-xs space-y-4">
        <div className="h-4 w-40 bg-muted animate-pulse rounded" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!outageState) return null;

  return (
    <div className="w-full rounded-xl border bg-card p-5 shadow-xs space-y-4">
      <div>
        <h2 className="text-sm font-bold text-card-foreground tracking-tight">
          Grid Status Summary
        </h2>

        <p className="text-[11px] text-muted-foreground mt-0.5">
          Real-time diagnostics and load tracking stats.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border bg-muted/20">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="size-4 text-slate-500" />
            <span className="text-xs font-medium truncate">
              Total Incidents
            </span>
          </div>

          <span className="text-xl font-bold tracking-tight text-foreground">
            {outageState.totalOutages}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border bg-muted/20">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="size-4 text-blue-500" />
            <span className="text-xs font-medium truncate">Scheduled</span>
          </div>

          <span className="text-xl font-bold tracking-tight text-foreground">
            {outageState.scheduledOutages}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border bg-muted/20">
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertOctagon className="size-4 text-amber-500" />
            <span className="text-xs font-medium truncate">Unexpected</span>
          </div>

          <span className="text-xl font-bold tracking-tight text-foreground">
            {outageState.unexpectedOutages}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border bg-rose-500/5 border-rose-500/10">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <Radio className="size-4 text-rose-500 animate-pulse" />
            <span className="text-xs font-medium truncate">Live Outages</span>
          </div>

          <span className="text-xl font-bold tracking-tight text-rose-600 dark:text-rose-400">
            {outageState.ongoingOutages}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border bg-emerald-500/5 border-emerald-500/10">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span className="text-xs font-medium truncate">Restored Grid</span>
          </div>

          <span className="text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
            {outageState.restoredOutages}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border bg-muted/20">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer className="size-4 text-indigo-500" />
            <span className="text-xs font-medium truncate">Avg Recovery</span>
          </div>

          <span className="text-sm font-bold tracking-tight text-foreground mt-1">
            {outageState.averageRestorationTime} mins
          </span>
        </div>
      </div>
    </div>
  );
};

export default OutageStates;
