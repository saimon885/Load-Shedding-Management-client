import React from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import {
  AlertTriangle,
  Clock,
  ArrowRight,
  FileText,
  CheckCircle2,
  Building2,
  MapPin,
  Trash2,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UpdateOutage from "./UpdateOutage";
import DeleteOutage from "./DeleteOutage";

const Outage = ({ outage }: { outage: any }) => {
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

  const formatGridDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      return format(parseISO(dateStr), "dd MMM yyyy, hh:mm a");
    } catch (e) {
      return dateStr.substring(0, 16).replace("T", " ");
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-xl border bg-card p-5 shadow-xs transition-all hover:shadow-md border-muted/80">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              {outage.status === "RESTORED" ? (
                <CheckCircle2 className="size-5 text-emerald-500" />
              ) : (
                <AlertTriangle className="size-5 text-primary" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-card-foreground">
                  {outage.type || "LOAD SHEDDING"}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  ID: {outage.id?.substring(0, 8)}...
                </span>
              </div>
              <p className="text-xs font-semibold text-primary mt-1 flex items-center gap-1.5">
                <MapPin className="size-3.5 shrink-0 text-primary/70" />
                Area: {outage.area?.name || "N/A"}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border uppercase tracking-wider ${getStatusConfig(
              outage.status,
            )}`}
          >
            <span className="size-1.5 rounded-full bg-current" />
            {outage.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 p-3 rounded-lg border bg-background/50">
            <Building2 className="size-4 text-muted-foreground/80 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">
                Substation Grid
              </span>
              <span className="font-medium text-foreground mt-0.5 truncate">
                {outage.feeder?.substation?.name || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-lg border bg-background/50">
            <Clock className="size-4 text-muted-foreground/80 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">
                Feeder Name
              </span>
              <span className="font-medium text-foreground mt-0.5 truncate">
                {outage.feeder?.name || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-muted/40 rounded-lg p-3.5 space-y-2 border border-dashed">
          <div className="flex items-start gap-2 text-xs sm:text-sm">
            <FileText className="size-4 shrink-0 text-muted-foreground/70 mt-0.5" />
            <p className="text-foreground leading-relaxed italic">
              "{outage.reason || "No specification criteria notes provided."}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 p-3 rounded-lg border bg-background">
            <Clock className="size-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">
                Window Open Time
              </span>
              <span className="font-medium text-foreground mt-0.5">
                {formatGridDate(outage.startTime)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-lg border bg-background">
            <Clock className="size-4 text-muted-foreground/80" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">
                Est. Restoration Time
              </span>
              <span className="font-medium text-foreground mt-0.5">
                {formatGridDate(outage.estimatedRestorationTime)}
              </span>
            </div>
          </div>
        </div>
      </div>
      ```tsx
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between border-t pt-3.5 gap-2">
        <div className="flex items-center gap-2">
          {/* Remove */}
          <DeleteOutage outageId={outage.id} />

          {/* Update */}
          <UpdateOutage outage={outage} />
        </div>

        {/* Detailed Analytics */}
        <Link
          href={`/dashboard/outages/${outage.id}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-md border bg-background px-3 text-xs font-semibold h-9 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
        >
          Detailed Analytics
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      ```
    </div>
  );
};

export default Outage;
