/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import {
  Activity,
  AlertTriangle,
  Building2,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
  Map,
  Network,
  Zap,
} from "lucide-react";

import { UsegetOperAtorZoneMangState } from "@/hooks/state-hook";
import { Card, CardContent } from "@/components/ui/card";

const OperatorAndZoneMangerState = () => {
  const { data, isLoading } = UsegetOperAtorZoneMangState();

  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-8 w-14 animate-pulse rounded bg-muted" />
                </div>

                <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="flex min-h-32 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No statistics available.
          </p>
        </CardContent>
      </Card>
    );
  }

  const statistics = [
    {
      title: "Distribution Zones",
      value: stats.totalZone,
      description: "Managed zones",
      icon: Map,
      iconClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      borderClass: "border-blue-500/20",
    },
    {
      title: "Substations",
      value: stats.totalSubstation,
      description: "Power substations",
      icon: Building2,
      iconClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      borderClass: "border-violet-500/20",
    },
    {
      title: "Feeders",
      value: stats.totalFeeder,
      description: "Distribution feeders",
      icon: Network,
      iconClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
      borderClass: "border-cyan-500/20",
    },
    {
      title: "Service Areas",
      value: stats.totalArea,
      description: "Connected areas",
      icon: Activity,
      iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      borderClass: "border-emerald-500/20",
    },
    {
      title: "Total Outages",
      value: stats.totalOutages,
      description: "Recorded outages",
      icon: Zap,
      iconClass: "bg-red-500/10 text-red-600 dark:text-red-400",
      borderClass: "border-red-500/20",
    },
    {
      title: "Outage Reports",
      value: stats.outageReports,
      description: "Reported incidents",
      icon: AlertTriangle,
      iconClass: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      borderClass: "border-orange-500/20",
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight">
          Power Network Overview
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your power infrastructure and outage activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className={`group overflow-hidden border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${item.borderClass}`}
            >
              <CardContent className="relative p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight">
                      {item.value}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${item.iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-current opacity-[0.025]" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OperatorAndZoneMangerState;
