"use client";
import { getSubstationWiseFeeders } from "@/hooks/zone.hook";
import LoadingTable from "@/components/dashboard/zone/LoadingTable";
import { getZoneWiseSubstations } from "@/hooks/zone.hook";
import { Plus, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import GetAllFeeders from "@/components/dashboard/feeders/GetAllFeeders";
import { Button } from "@/components/ui/button";
import { BiLeftArrow } from "react-icons/bi";

const feeders = () => {
  const searchParams = useSearchParams();
  const substationId = searchParams.get("substationId") || "";
  const { data: feedersList, isLoading } =
    getSubstationWiseFeeders(substationId);
  if (isLoading || !feedersList) {
    return <LoadingTable />;
  }

  const feeders = feedersList?.data ?? [];
  console.log(feeders);

  return (
    <section className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      <Button onClick={() => window.history.back()}>
        <BiLeftArrow /> Back
      </Button>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="size-5" />

            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Feeders
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor their Feeders.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
        >
          <Plus className="size-4" />
          Add Feeders
        </button>
      </div>

      <GetAllFeeders feeders={feeders} />
    </section>
  );
};

export default feeders;
