"use client";

import OutageStates from "@/components/dashboard/outage/OutageStates";
import Outage from "@/components/dashboard/outage/Outage";
import { UsegetAllOutageHook } from "@/hooks/outage.hook";
import Can from "@/components/auth/RoleCan";

const OutagePage = () => {
  const { data, isLoading } = UsegetAllOutageHook();
  const outages = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-card-foreground">
          Grid Outage Logs
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Monitor active, scheduled load-shedding sequences and system
          restoration windows.
        </p>
      </div>

      {/* Outage Statistics */}
      <Can permission="outage_states:view">
        <OutageStates />
      </Can>

      {/* Outage List */}
      <div className="w-full space-y-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-3">
        {outages.length > 0 ? (
          outages.map((outageItem: any) => (
            <Outage key={outageItem.id} outage={outageItem} />
          ))
        ) : (
          <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground bg-card">
            No grid anomaly log records detected.
          </div>
        )}
      </div>
    </div>
  );
};

export default OutagePage;
