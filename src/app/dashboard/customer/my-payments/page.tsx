"use client";
import { UsegetMyPayments } from "@/hooks/payments.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  DollarSign,
  Receipt,
} from "lucide-react";
import { format } from "date-fns";
import GetPaymentCard from "@/components/dashboard/payments/GetPayment";
import { Spinner } from "@/components/ui/spinner";

const MyPayments = () => {
  const { data, isLoading } = UsegetMyPayments();
  const payments = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-card-foreground">
          Payment History
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          View all your completed gateway transactions and receipt tracking
          codes.
        </p>
      </div>

      {payments.length > 0 ? (
        <div className="space-y-4">
          {/* Mobile & Tablet Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {payments.map((payment: any) => (
              <GetPaymentCard key={payment.id} payment={payment} />
            ))}
          </div>

          {/* Large Desktop Layout */}
          <div className="hidden lg:block w-full overflow-hidden rounded-xl border bg-card shadow-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold w-[180px]">
                    Transaction ID
                  </TableHead>
                  <TableHead className="font-semibold">Invoice No</TableHead>
                  <TableHead className="font-semibold">Gateway</TableHead>
                  <TableHead className="font-semibold">Paid Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment: any) => {
                  let formattedDate = "N/A";
                  if (payment.paidAt) {
                    try {
                      const cleanDateStr = payment.paidAt
                        .split(" GMT")[0]
                        .replace(/:(\d+)$/, ".$1");
                      formattedDate = format(
                        new Date(cleanDateStr),
                        "dd MMM yyyy, hh:mm a",
                      );
                    } catch (e) {
                      formattedDate = payment.paidAt.substring(0, 10);
                    }
                  }

                  return (
                    <TableRow
                      key={payment.id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Receipt className="size-4 text-muted-foreground/70 shrink-0" />
                          <span className="font-mono text-xs font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded border select-all">
                            {payment.trxID || "N/A"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p
                          className="max-w-[150px] truncate text-xs font-mono text-muted-foreground select-all"
                          title={payment.merchantInvoiceNumber}
                        >
                          {payment.merchantInvoiceNumber || "N/A"}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e11d48] bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded border border-rose-100 dark:border-rose-900/30">
                          {payment.gateway}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formattedDate}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <span className="size-1.5 rounded-full bg-current" />
                          {payment.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-bold text-foreground">
                        {payment.currency === "BDT" ? "৳" : "$"}
                        {payment.amount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground bg-card">
          No verified payment profiles detected.
        </div>
      )}
    </div>
  );
};

export default MyPayments;
