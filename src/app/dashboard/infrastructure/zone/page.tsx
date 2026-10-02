"use client";

import AllZones from "@/components/dashboard/customer/zone/AllZones";
import { Spinner } from "@/components/ui/spinner";
import { UseGetZoneHook } from "@/hooks/zone.hook";
import { Plus, Zap } from "lucide-react";
import React from "react";

const ZonePage = () => {
  const { data: zones, isLoading } = UseGetZoneHook();
  console.log(zones);

  if (isLoading || !zones) {
    return (
      <div className="flex min-h-[400px] items-center justify-center gap-2">
        <Spinner />
        <span className="text-sm text-muted-foreground">Loading zones...</span>
      </div>
    );
  }

  const zoneList = zones?.data ?? [];

  return (
    <section className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="size-5" />

            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Distribution Zones
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor distribution zones and their substations.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
        >
          <Plus className="size-4" />
          Add Zone
        </button>
      </div>

      <AllZones zones={zoneList} />
    </section>
  );
};

export default ZonePage;
