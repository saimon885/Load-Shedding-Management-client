import React from "react";
import {
  AlertCircle,
  User,
  Mail,
  MapPin,
  Building2,
  FileText,
  Clock,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import UpdateReport from "./UpdateReport";

interface GetAllOutageReportProps {
  report: any;
}

const GetAllOutageReport = ({ report }: GetAllOutageReportProps) => {
  let cleanTime = "N/A";
  if (report.createdAt) {
    try {
      cleanTime = format(parseISO(report.createdAt), "dd MMM yyyy, hh:mm a");
    } catch (e) {
      cleanTime = report.createdAt.substring(0, 16).replace("T", " ");
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "RESOLVED":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-xl border bg-card p-5 shadow-xs transition-all hover:shadow-md border-muted/80">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
              <AlertCircle className="size-4.5 text-destructive" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  REPORT ID
                </span>
                <span className="font-mono text-xs font-bold text-foreground bg-muted px-1.5 py-0.5 rounded">
                  {report.id?.substring(0, 8)}...
                </span>
              </div>
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-muted-foreground">
                <Clock className="size-3" />
                {cleanTime}
              </span>
            </div>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(report.status)}`}
          >
            <span className="size-1 rounded-full bg-current" />
            {report.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-y py-3.5 bg-muted/20 px-3.5 rounded-xl border-dashed">
          <div className="space-y-2 min-w-0">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
              Complainant Info
            </p>
            <div className="flex items-center gap-2 text-foreground font-medium truncate">
              <User className="size-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">
                {report.customer?.name || "Anonymous"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground truncate">
              <Mail className="size-3.5 text-muted-foreground/60 shrink-0" />
              <span className="truncate select-all">
                {report.customer?.email || "N/A"}
              </span>
            </div>
          </div>

          <div className="space-y-2 min-w-0 border-t pt-3.5 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-3.5">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
              Grid Sector Scope
            </p>
            <div className="flex items-center gap-2 text-foreground font-medium truncate">
              <MapPin className="size-3.5 text-primary shrink-0" />
              <span className="truncate">
                Area: {report.area?.name || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground truncate">
              <Building2 className="size-3.5 text-muted-foreground/70 shrink-0" />
              <span className="truncate">
                Feeder: {report.area?.feeder?.name || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-muted/40 rounded-lg p-3.5 border">
          <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
            <FileText className="size-4 shrink-0 text-muted-foreground/60 mt-0.5" />
            <p className="text-foreground leading-relaxed">
              {report.description ||
                "No specific emergency notes provided by user."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end border-t pt-3.5">
        <UpdateReport report={report} />
      </div>
    </div>
  );
};

export default GetAllOutageReport;
