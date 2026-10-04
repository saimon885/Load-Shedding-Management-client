"use client";

import GetAllOutageReport from "@/components/dashboard/outageReport/GetAllOutageReport";
import { UsegetOutageReportHook } from "@/hooks/outage-report";

const OutageReportPage = () => {
  const { data, isLoading } = UsegetOutageReportHook();
  const reports = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-card-foreground">
          Customer Outage Reports
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review emergency outage complaints submitted by customers and dispatch
          maintenance profiles.
        </p>
      </div>

      {reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report: any) => (
            <GetAllOutageReport key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground bg-card">
          No live consumer outage complaints located.
        </div>
      )}
    </div>
  );
};

export default OutageReportPage;
