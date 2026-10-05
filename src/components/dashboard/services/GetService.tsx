"use client";

import {
  Building2,
  CreditCard,
  DollarSign,
  FileText,
  MapPin,
  RadioTower,
  Zap,
} from "lucide-react";

import PaymentAdd from "./PaymentAdd";

type Service = {
  id: string;
  userId: string;
  areaId: string;
  type: string;
  description: string;
  amount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;

  area?: {
    id: string;
    name: string;
    code: string;

    feeder?: {
      id: string;
      name: string;
      code: string;

      substation?: {
        id: string;
        name: string;
      };
    };
  };
};

const GetService = ({ service }: { service: Service }) => {
  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";

      case "PENDING":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";

      case "IN_PROGRESS":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";

      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPaymentStatusStyle = (status: string) => {
    return status?.toUpperCase() === "PAID"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
  };

  const serviceType = service.type
    ?.toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-card shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="size-5 text-primary" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">
                {serviceType}
              </p>

              <span className="mt-0.5 inline-block max-w-full truncate rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ID: {service.id?.substring(0, 8)}...
              </span>
            </div>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusStyle(
              service.status,
            )}`}
          >
            <span className="size-1 rounded-full bg-current" />
            {service.status}
          </span>
        </div>

        <div className="rounded-xl border bg-muted/30 p-3.5">
          <div className="flex items-start gap-2">
            <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <p className="text-sm leading-relaxed text-foreground">
              {service.description || "No description provided."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-lg border bg-background p-2.5">
            <DollarSign className="size-4 shrink-0 text-muted-foreground" />

            <div className="min-w-0">
              <p className="text-[10px] font-medium text-muted-foreground">
                Billing Cost
              </p>

              <p className="font-bold text-foreground">
                ৳{service.amount?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-background p-2.5">
            <CreditCard className="size-4 shrink-0 text-muted-foreground" />

            <div className="min-w-0">
              <p className="text-[10px] font-medium text-muted-foreground">
                Payment
              </p>

              <span
                className={`mt-0.5 inline-flex rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${getPaymentStatusStyle(
                  service.paymentStatus,
                )}`}
              >
                {service.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Service Location
          </p>

          <div className="space-y-2 rounded-xl border bg-muted/20 p-3">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />

              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground">Area</p>

                <p className="truncate text-sm font-semibold">
                  {service.area?.name || "Unknown Area"}
                </p>

                <p className="text-[11px] text-muted-foreground">
                  {service.area?.code || "No area code"}
                </p>
              </div>
            </div>

            <div className="border-t pt-2">
              <div className="flex items-start gap-2.5">
                <Zap className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground">Feeder</p>

                  <p className="truncate text-sm font-semibold">
                    {service.area?.feeder?.name || "Unknown Feeder"}
                  </p>

                  <p className="text-[11px] text-muted-foreground">
                    {service.area?.feeder?.code || "No feeder code"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-2">
              <div className="flex items-start gap-2.5">
                <RadioTower className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground">
                    Substation
                  </p>

                  <p className="truncate text-sm font-semibold">
                    {service.area?.feeder?.substation?.name ||
                      "Unknown Substation"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {service.paymentStatus?.toUpperCase() !== "PAID" && (
        <div className="flex items-center justify-end border-t bg-muted/10 px-5 py-3.5">
          <PaymentAdd serviceId={service.id} />
        </div>
      )}
    </div>
  );
};

export default GetService;
