"use client";

import LoadingTable from "@/components/dashboard/zone/LoadingTable";
import { Plus, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import GetAllFeeders from "@/components/dashboard/feeders/GetAllFeeders";
import { Button } from "@/components/ui/button";
import { BiLeftArrow } from "react-icons/bi";
import { getSubstationWiseFeeders } from "@/hooks/feeders";
import { AddNewFeeder } from "@/components/dashboard/feeders/CreateFeeder";
import { SubstationNotFound } from "@/components/dashboard/substation/SubstationNotFound";
import Can from "@/components/auth/RoleCan";

const feeders = () => {
  const searchParams = useSearchParams();
  const substationId = searchParams.get("substationId") || "";
  if (!substationId) {
    return <SubstationNotFound />;
  }
  const { data: feedersList, isLoading } =
    getSubstationWiseFeeders(substationId);
  if (isLoading || !feedersList) {
    return <LoadingTable />;
  }

  const feeders = feedersList?.data ?? [];


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
        <Can permission="feeder:create">
          <AddNewFeeder substationId={substationId} />
        </Can>
      </div>

      <GetAllFeeders feeders={feeders} />
    </section>
  );
};

export default feeders;
