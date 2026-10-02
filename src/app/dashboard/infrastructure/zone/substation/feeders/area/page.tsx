"use client";

import LoadingTable from "@/components/dashboard/zone/LoadingTable";
import { getFeederWiseAreas } from "@/hooks/zone.hook";
import { useSearchParams } from "next/navigation";
import { Plus, Zap } from "lucide-react";
import GetAllAreas from "@/components/dashboard/areas/GetAllAreas";
import { Button } from "@/components/ui/button";
import { BiLeftArrow } from "react-icons/bi";
// import GetAllFeeders from "@/components/dashboard/feeders/GetAllFeeders";

const area = () => {
  const searchParams = useSearchParams();
  const feederId = searchParams.get("feederId") || "";
  const { data: areas, isLoading } = getFeederWiseAreas(feederId);
  if (isLoading || !areas) {
    return <LoadingTable />;
  }

  const area = areas?.data ?? [];
  console.log(area);
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
              Areas
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor their Areas.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
        >
          <Plus className="size-4" />
          Add Areas
        </button>
      </div>

      <GetAllAreas areas={area} />
    </section>
  );
};

export default area;
