"use client";

import Can from "@/components/auth/RoleCan";
import { AddNewZone } from "@/components/dashboard/zone/AddNewZone";
import AllZones from "@/components/dashboard/zone/AllZones";
import LoadingTable from "@/components/dashboard/zone/LoadingTable";

import { UseGetZoneHook } from "@/hooks/zone.hook";
import { Plus, Zap } from "lucide-react";
import React from "react";

const ZonePage = () => {
  const { data: zones, isLoading } = UseGetZoneHook();
 

  if (isLoading || !zones) {
    return <LoadingTable />;
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

        <Can permission="zone:create">
          <AddNewZone />
        </Can>
      </div>

      <AllZones zones={zoneList} />
    </section>
  );
};

export default ZonePage;
