"use client";

import GetService from "@/components/dashboard/services/GetService";
import { UsegetMyServiceHook } from "@/hooks/service";

const ServicePage = () => {
  const { data, isLoading } = UsegetMyServiceHook();
  const services = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-card-foreground">
          My Service Requests
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor your dispatched service tickets and check transaction records.
        </p>
      </div>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service: any) => (
            <GetService key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground bg-card">
          No service history profiles detected.
        </div>
      )}
    </div>
  );
};

export default ServicePage;
