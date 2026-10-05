"use client";

import GetService from "@/components/dashboard/services/GetService";
import { UsegetAllServiceHook } from "@/hooks/service";
import { Loader2, ServerCog } from "lucide-react";

const AllServices = () => {
  const { data, isLoading, isError } = UsegetAllServiceHook();

  const services = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-105 animate-pulse rounded-2xl border bg-muted/30"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-10 text-center">
        <ServerCog className="mx-auto mb-3 size-9 text-destructive/70" />

        <h3 className="font-semibold">Failed to Load Service Requests</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while loading service requests.
        </p>
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="rounded-2xl border border-dashed bg-background p-10 text-center">
        <ServerCog className="mx-auto mb-3 size-9 text-muted-foreground/50" />

        <h3 className="font-semibold">No Service Requests</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          There are currently no service requests available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Service Requests
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage customer service requests and their payment status.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 m-4">
        {services.map((service: any) => (
          <GetService key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default AllServices;
