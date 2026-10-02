"use client";
import GetAllsubstation from "@/components/dashboard/substation/GetAllsubstation";
import LoadingTable from "@/components/dashboard/zone/LoadingTable";
import { getZoneWiseSubstations } from "@/hooks/zone.hook";
import { Plus, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const substation = () => {
  const searchParams = useSearchParams();
  const zoneId = searchParams.get("zoneId") || "";

  const { data: substationList, isLoading } = getZoneWiseSubstations(zoneId);
  if (isLoading || !substationList) {
    return <LoadingTable />;
  }

  const substation = substationList?.data ?? [];
  console.log(substation);
  return (
    <section className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="size-5" />

            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              substations
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor their substations.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
        >
          <Plus className="size-4" />
          Add substation
        </button>
      </div>

      <GetAllsubstation substations={substation} />
    </section>
  );
};

export default substation;
