import React from "react";
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  DollarSign,
  Receipt,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

const GetPaymentCard = ({ payment }: { payment: any }) => {
  let formattedDate = "N/A";
  if (payment.paidAt) {
    try {
      const cleanDateStr = payment.paidAt
        .split(" GMT")[0]
        .replace(/:(\d+)$/, ".$1");
      formattedDate = format(new Date(cleanDateStr), "dd MMM yyyy, hh:mm a");
    } catch (e) {
      formattedDate = payment.paidAt.substring(0, 10);
    }
  }

  return (
    <div className="flex flex-col justify-between rounded-xl border bg-card p-4 sm:p-5 shadow-xs transition-all hover:shadow-md border-muted/80">
      <div className="space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="size-4.5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  TRX ID
                </span>
                <span className="font-mono text-xs font-bold text-foreground select-all bg-muted px-1.5 py-0.5 rounded">
                  {payment.trxID || "N/A"}
                </span>
              </div>
              <span className="inline-block mt-1 text-[10px] font-bold text-[#e11d48] bg-rose-50 dark:bg-rose-950/20 px-1.5 py-0.5 rounded border border-rose-100 dark:border-rose-900/30">
                {payment.gateway} Gateway
              </span>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="size-1.5 rounded-full bg-current" />
            {payment.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 border-y py-3 text-xs text-muted-foreground bg-muted/20 px-3 rounded-lg border-dashed">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="size-3.5 shrink-0 text-muted-foreground/60" />
            <span
              className="truncate select-all"
              title={payment.merchantInvoiceNumber}
            >
              Invoice:{" "}
              <span className="font-mono text-foreground font-medium">
                {payment.merchantInvoiceNumber || "N/A"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <Calendar className="size-3.5 shrink-0 text-muted-foreground/60" />
            <span className="truncate">
              Paid:{" "}
              <span className="text-foreground font-medium">
                {formattedDate}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-lg border bg-background">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <DollarSign className="size-4 text-muted-foreground/70" />
            <span className="font-medium">Total Captured Amount</span>
          </div>
          <span className="font-bold text-sm sm:text-base text-foreground">
            {payment.currency === "BDT" ? "৳" : "$"}
            {payment.amount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GetPaymentCard;
