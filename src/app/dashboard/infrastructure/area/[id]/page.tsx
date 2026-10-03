"use client";

import React, { use } from "react";
import { getSingleAreasOrDetailsHook } from "@/hooks/area";
import {
  Building2,
  Layers,
  FileText,
  ShieldAlert,
  AlertTriangle,
  Calendar,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BiLeftArrow } from "react-icons/bi";
import LoadingTable from "@/components/dashboard/zone/LoadingTable";
import DispatchService from "@/components/dashboard/areas/DispatchService";
import Can from "@/components/auth/RoleCan";
import OutageReport from "@/components/dashboard/areas/OutageReport";
import SheduleOutage from "@/components/dashboard/areas/SheduleOutage";
import CreageOutage from "@/components/dashboard/areas/CrateOutage";

interface AreaDetailsProps {
  params: Promise<{ id: string }> | { id: string };
}

const AreaDetails = ({ params }: AreaDetailsProps) => {
  const unwrappedParams = use(params as any) as { id: string };
  const id = unwrappedParams.id;

  const { data: response, isLoading } = getSingleAreasOrDetailsHook(id);

  if (isLoading) {
    return <LoadingTable />;
  }

  const area = response?.data;

  if (!area) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center text-destructive">
        Area details could not be found.
      </div>
    );
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority?.toUpperCase()) {
      case "HIGH":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      case "MEDIUM":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
    }
  };

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Top Header Section */}
      <Button onClick={() => window.history.back()}>
        <BiLeftArrow /> Back
      </Button>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-5">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <Building2 className="size-6 text-primary" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-card-foreground">
                {area.name}
              </h1>
              <span className="font-mono text-xs font-semibold bg-muted px-2 py-0.5 rounded border">
                {area.code}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="size-1.5 rounded-full bg-current" />
                {area.status}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityStyle(area.priority)}`}
              >
                {area.priority} Priority
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Information Card */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-5 shadow-xs space-y-5">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <FileText className="size-4 text-primary/70" />
              Description
            </h2>
            <p className="text-sm sm:text-base text-foreground bg-muted/30 rounded-lg p-4 border border-dashed leading-relaxed">
              {area.description || "No description provided for this area."}
            </p>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Layers className="size-4 text-primary/70" />
              Infrastructure Association
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/40 border">
                <span className="text-muted-foreground font-medium">
                  Feeder Link Reference
                </span>
                <span className="font-mono text-foreground select-all break-all">
                  {area.feederId}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/40 border">
                <span className="text-muted-foreground font-medium">
                  Area Entry Profile ID
                </span>
                <span className="font-mono text-foreground select-all break-all">
                  {area.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Quick Action Dashboard */}
        <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-card-foreground tracking-tight pb-2 border-b">
            Operations Management
          </h3>

          <div className="flex flex-col gap-2.5">
            <Can permission="outage:create">
              <CreageOutage feederId={area.feederId} areaId={area.id} />
            </Can>
            <Can permission="outage_report:create">
              <OutageReport areaId={area.id} />
            </Can>
            <Can permission="schedule:create">
              <SheduleOutage feederId={area.feederId} areaId={area.id} />
            </Can>

            <Can permission="service:create">
              <DispatchService areaId={area.id} feederId={area.feederId} />
            </Can>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaDetails;
