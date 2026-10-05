"use client";

import React from "react";
import { UsegetSingleOutageHook } from "@/hooks/outage.hook";
import { format, parseISO } from "date-fns";
import {
  Clock,
  CalendarDays,
  FileText,
  Layers,
  CheckCircle2,
  Building2,
  ShieldAlert,
  HelpCircle,
  Timer,
  MapPin,
  Zap,
  UserRoundCog,
  UserPlus,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BiLeftArrow } from "react-icons/bi";
import GetAllTechnician from "@/components/dashboard/technician/GetAllTechnician";
import TechnicianAssign from "@/components/dashboard/technician/TechnicianAssign";

interface OutageDetailsProps {
  params: Promise<{ id: string }> | { id: string };
}

const OutageDetails = ({ params }: OutageDetailsProps) => {
  const unwrappedParams = React.use(params as any) as { id: string };
  const id = unwrappedParams.id;

  const { data: response, isLoading } = UsegetSingleOutageHook(id);
  const outage = response?.data;

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!outage) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center text-destructive">
          Outage record could not be located.
        </div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status?.toUpperCase()) {
      case "SCHEDULED":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";

      case "ONGOING":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 animate-pulse";

      case "RESTORED":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";

      default:
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    }
  };

  const formatGridDate = (dateStr?: string | null) => {
    if (!dateStr) return "N/A";

    try {
      return format(parseISO(dateStr), "dd MMMM yyyy • hh:mm a");
    } catch {
      return dateStr.substring(0, 16).replace("T", " ");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <Button
        variant="outline"
        onClick={() => window.history.back()}
        className="gap-2"
      >
        <BiLeftArrow />
        Back
      </Button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-5">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
            {outage.status === "RESTORED" ? (
              <CheckCircle2 className="size-6 text-emerald-500" />
            ) : (
              <ShieldAlert className="size-6 text-primary" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-foreground">
                {outage.type || "LOAD SHEDDING"} INCIDENT
              </h1>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border uppercase tracking-wider ${getStatusConfig(
                  outage.status,
                )}`}
              >
                <span className="size-1.5 rounded-full bg-current" />
                {outage.status || "UNKNOWN"}
              </span>
            </div>

            <p className="font-mono text-xs text-muted-foreground select-all bg-muted px-2 py-0.5 rounded border inline-block">
              UUID: {outage.id}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 border-b pb-2">
              <FileText className="size-4 text-primary/70" />
              Reason & Operational Scope
            </h2>

            <p className="text-sm sm:text-base text-foreground bg-muted/40 rounded-lg p-4 border border-dashed leading-relaxed font-medium">
              {outage.reason ||
                "No specification criteria notes provided for this operational sequence."}
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 border-b pb-2">
              <Clock className="size-4 text-primary/70" />
              Timeframe Windows
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 p-3.5 rounded-xl border bg-background">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight flex items-center gap-1">
                  <CalendarDays className="size-3.5 text-blue-500" />
                  Start Time
                </span>

                <p className="text-sm font-semibold text-foreground">
                  {formatGridDate(outage.startTime)}
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 rounded-xl border bg-background">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight flex items-center gap-1">
                  <Timer className="size-3.5 text-indigo-500" />
                  Estimated Recovery
                </span>

                <p className="text-sm font-semibold text-foreground">
                  {formatGridDate(outage.estimatedRestorationTime)}
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 rounded-xl border bg-background">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight flex items-center gap-1">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  Actual Completion
                </span>

                <p className="text-sm font-semibold text-foreground">
                  {outage.actualRestorationTime
                    ? formatGridDate(outage.actualRestorationTime)
                    : "Awaiting Restoration"}
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 rounded-xl border bg-background">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight flex items-center gap-1">
                  <HelpCircle className="size-3.5 text-slate-500" />
                  Restoration Note
                </span>

                <p className="text-sm font-semibold text-muted-foreground italic">
                  {outage.restorationNote || "No notes available"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 border-b pb-2">
              <Zap className="size-4 text-primary/70" />
              Power Infrastructure
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border bg-background p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-primary/70" />
                  Area
                </span>

                <p className="text-sm font-semibold text-foreground">
                  {outage.area?.name || "N/A"}
                </p>
              </div>

              <div className="rounded-xl border bg-background p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground flex items-center gap-1.5">
                  <Layers className="size-3.5 text-primary/70" />
                  Feeder
                </span>

                <p className="text-sm font-semibold text-foreground">
                  {outage.feeder?.name || "N/A"}
                </p>
              </div>

              <div className="rounded-xl border bg-background p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-primary/70" />
                  Substation
                </span>

                <p className="text-sm font-semibold text-foreground">
                  {outage.feeder?.substation?.name || "N/A"}
                </p>
              </div>

              <div className="rounded-xl border bg-background p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary/70" />
                  Substation Location
                </span>

                <p className="text-sm font-semibold text-foreground">
                  {outage.feeder?.substation?.location ||
                    "Location not available"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-3">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Wrench className="size-4 text-primary/70" />
                  Technician Assignment
                </h2>

                <p className="text-xs text-muted-foreground mt-1">
                  Assign a technician to handle this outage restoration.
                </p>
              </div>

              <TechnicianAssign outageId={outage.id} />
            </div>

            <div className="rounded-xl border border-dashed bg-muted/20 p-2 text-center">
              <GetAllTechnician />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-xs space-y-4 md:col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-card-foreground pb-2 border-b">
            Metadata Details
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/40 border">
              <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                <CalendarDays className="size-3.5 text-primary/70" />
                Created At
              </span>

              <span className="text-foreground font-medium mt-1">
                {formatGridDate(outage.createdAt)}
              </span>
            </div>

            <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/40 border">
              <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary/70" />
                Last Updated
              </span>

              <span className="text-foreground font-medium mt-1">
                {formatGridDate(outage.updatedAt)}
              </span>
            </div>

            <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/40 border">
              <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                <ShieldAlert className="size-3.5 text-primary/70" />
                Outage Status
              </span>

              <span className="text-foreground font-semibold mt-1">
                {outage.status || "N/A"}
              </span>
            </div>

            <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/40 border">
              <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                <UserRoundCog className="size-3.5 text-primary/70" />
                Technician
              </span>

              {outage?.assignments?.length > 0 ? (
                <div className="mt-1 space-y-2">
                  {outage.assignments.map((assignment: any) => (
                    <div key={assignment.technician.email}>
                      <p className="text-foreground font-semibold">
                        {assignment.technician?.name || "Unknown Technician"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {assignment.technician?.email || "No email available"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground font-medium mt-1">
                  Not Assigned
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutageDetails;
