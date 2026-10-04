import React from "react";
import {
  Building2,
  CreditCard,
  Clock,
  CheckCircle2,
  HelpCircle,
  FileText,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentAdd from "./PaymentAdd";

const GetService = ({ service }: { service: any }) => {
  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "PENDING":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    }
  };

  const getPaymentStatusStyle = (status: string) => {
    return status?.toUpperCase() === "PAID"
      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
      : "bg-rose-500/10 text-rose-600 border-rose-500/20";
  };

  return (
    <div className="flex flex-col justify-between rounded-xl border bg-card p-5 shadow-xs transition-all hover:shadow-md border-muted/80">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="size-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm sm:text-base text-card-foreground truncate">
                {service.type?.replace("_", " ")}
              </p>
              <span className="inline-block mt-0.5 font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded truncate max-w-full">
                ID: {service.id?.substring(0, 8)}...
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border ${getStatusStyle(service.status)}`}
            >
              <span className="size-1 rounded-full bg-current" />
              {service.status}
            </span>
          </div>
        </div>

        <div className="bg-muted/40 rounded-lg p-3 space-y-2 border">
          <div className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground">
            <FileText className="size-4 shrink-0 text-muted-foreground/70 mt-0.5" />
            <p className="text-foreground leading-relaxed">
              {service.description || "No execution instructions provided."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 p-2.5 rounded-lg border bg-background">
            <DollarSign className="size-4 text-muted-foreground/70" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-medium">
                Billing Cost
              </span>
              <span className="font-bold text-foreground">
                ৳{service.amount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg border bg-background">
            <CreditCard className="size-4 text-muted-foreground/70" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-medium">
                Payment
              </span>
              <span
                className={`font-semibold text-xs mt-0.5 px-1.5 py-0.5 rounded-md border text-center ${getPaymentStatusStyle(service.paymentStatus)}`}
              >
                {service.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {service.paymentStatus?.toUpperCase() !== "PAID" && (
        <div className="mt-5 flex items-center justify-end border-t pt-3.5">
          <PaymentAdd serviceId={service.id} />
        </div>
      )}
    </div>
  );
};

export default GetService;
