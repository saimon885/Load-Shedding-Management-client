"use client";

import { Building2, Eye, MapPin, Zap } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AllSubstationsProps } from "@/types/dashboard/infrastructure";

const GetAllsubstation = ({ substations }: AllSubstationsProps) => {
  const router = useRouter();

  const handlegetFeeders = (substationId: string) => {
    const feeders = new URLSearchParams({ substationId: substationId });
    router.push(`/dashboard/infrastructure/feeders?${feeders.toString()}`);
  };

  return (
    <div className="w-full">
      {/* Mobile & Tablet View (Responsive Cards Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {substations.length > 0 ? (
          substations.map((substation) => (
            <div
              key={substation.id}
              className="flex flex-col justify-between rounded-xl border bg-card p-4 sm:p-5 shadow-xs transition-all hover:shadow-md"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Building2 className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="font-semibold text-sm sm:text-base text-card-foreground truncate"
                        title={substation.name}
                      >
                        {substation.name}
                      </p>
                      <span className="inline-block mt-0.5 font-mono text-[10px] sm:text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded truncate max-w-full">
                        {substation.code}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-current" />
                    {substation.status || "Active"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground min-h-[20px]">
                  <MapPin className="size-3.5 shrink-0 text-muted-foreground/70" />
                  <p className="truncate" title={substation.location || ""}>
                    {substation.location || "No location provided"}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-2 text-xs sm:text-sm text-muted-foreground">
                  <Zap className="size-3.5 sm:size-4 shrink-0 text-primary/70" />
                  <span className="shrink-0">Feeders:</span>
                  <span className="font-semibold text-foreground">
                    {substation.feeder?.length ?? 0}
                  </span>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 flex items-center justify-end border-t pt-3">
                <Button
                  onClick={() => handlegetFeeders(substation.id)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-xs h-8 sm:h-9 px-3 w-full sm:w-auto justify-center cursor-pointer font-medium"
                >
                  <Eye className="size-4" />
                  View Feeders
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-xl border bg-card p-12 text-center text-sm text-muted-foreground">
            No substations found.
          </div>
        )}
      </div>

      {/* Desktop View (Table Layout) */}
      <div className="hidden lg:block w-full overflow-hidden rounded-xl border bg-card shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-semibold">Substation</TableHead>
              <TableHead className="font-semibold">Code</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Feeders</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {substations.length > 0 ? (
              substations.map((substation) => (
                <TableRow
                  key={substation.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="size-4.5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-card-foreground truncate">
                          {substation.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="font-mono text-xs font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border">
                      {substation.code}
                    </span>
                  </TableCell>

                  <TableCell>
                    <p
                      className="max-w-[250px] truncate text-sm text-muted-foreground"
                      title={substation.location || ""}
                    >
                      {substation.location || "No location"}
                    </p>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-current" />
                      {substation.status || "Active"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center justify-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                      {substation.feeder?.length ?? 0}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      onClick={() => handlegetFeeders(substation.id)}
                      variant="ghost"
                      size="sm"
                      className="inline-flex items-center gap-2 text-xs h-8 text-muted-foreground hover:text-foreground cursor-pointer font-medium"
                    >
                      <Eye className="size-4" />
                      View Feeders
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No substations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GetAllsubstation;
