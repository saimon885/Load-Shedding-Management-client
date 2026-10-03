"use client";
import Can from "@/components/auth/RoleCan";
import { AddNewSubstation } from "@/components/dashboard/substation/CreateSubstation";
import GetAllsubstation from "@/components/dashboard/substation/GetAllsubstation";
import LoadingTable from "@/components/dashboard/zone/LoadingTable";
import ZoneNotFound from "@/components/dashboard/zone/ZoneNotFound";
import { Button } from "@/components/ui/button";
import { getZoneWiseSubstations } from "@/hooks/substation";
import { Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { BiLeftArrow } from "react-icons/bi";

const substation = () => {
  const searchParams = useSearchParams();

  const zoneId = searchParams.get("zoneId") || "";
  if (!zoneId) {
    return <ZoneNotFound />;
  }

  const { data: substationList, isLoading } = getZoneWiseSubstations(zoneId);
  if (isLoading || !substationList) {
    return <LoadingTable />;
  }

  const substation = substationList?.data ?? [];
  console.log(substation);
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
              substations
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor their substations.
          </p>
        </div>
        <Can permission="substation:create">
          <AddNewSubstation zoneId={zoneId} />
        </Can>
      </div>

      <GetAllsubstation substations={substation} />
    </section>
  );
};

export default substation;
