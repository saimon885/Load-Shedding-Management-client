"use client";

import { Building2, Eye, Gauge, MapPin, Siren, Zap } from "lucide-react";
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
import { AllFeedersProps } from "@/types/dashboard/infrastructure";
import CreateEmergencyOutage from "./CreateEmergencyOutage";

const GetAllFeeders = ({ feeders }: AllFeedersProps) => {
  const router = useRouter();

  const handlegetAreas = (feederId: string) => {
    const areas = new URLSearchParams({ feederId: feederId });
    router.push(`/dashboard/infrastructure/area?${areas.toString()}`);
  };

  return (
    <div className="w-full">
      {/* Mobile & Tablet View (Responsive Cards Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {feeders.length > 0 ? (
          feeders.map((feeder) => (
            <div
              key={feeder.id}
              className="flex flex-col justify-between rounded-xl border bg-card p-4 sm:p-5 shadow-xs transition-all hover:shadow-md"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Zap className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="font-semibold text-sm sm:text-base text-card-foreground truncate"
                        title={feeder.name}
                      >
                        {feeder.name}
                      </p>
                      <span className="inline-block mt-0.5 font-mono text-[10px] sm:text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded truncate max-w-full">
                        {feeder.code}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-current" />
                    {feeder.status || "Active"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                  <Gauge className="size-4 shrink-0 text-muted-foreground/70" />
                  <span>Capacity:</span>
                  <span className="font-medium text-foreground truncate">
                    {feeder.capacity || "No capacity info"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-2 text-xs sm:text-sm text-muted-foreground">
                  <MapPin className="size-3.5 sm:size-4 shrink-0 text-primary/70" />
                  <span className="shrink-0">Connected Areas:</span>
                  <span className="font-semibold text-foreground">
                    {feeder.areas?.length ?? 0}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 border-t pt-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  type="button"
                  onClick={() => handlegetAreas(feeder.id)}
                  variant="outline"
                  size="sm"
                  className="h-9 w-full cursor-pointer justify-center gap-2 px-3 text-xs font-medium sm:w-auto"
                >
                  <Eye className="size-4" />
                  View Areas
                </Button>

                <CreateEmergencyOutage feederId={feeder.id} />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-xl border bg-card p-12 text-center text-sm text-muted-foreground">
            No feeders found.
          </div>
        )}
      </div>

      {/* Desktop View (Table Layout) */}
      <div className="hidden lg:block w-full overflow-hidden rounded-xl border bg-card shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-semibold">Feeder</TableHead>
              <TableHead className="font-semibold">Code</TableHead>
              <TableHead className="font-semibold">Capacity</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Areas</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {feeders.length > 0 ? (
              feeders.map((feeder) => (
                <TableRow
                  key={feeder.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Zap className="size-4.5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-card-foreground truncate">
                          {feeder.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="font-mono text-xs font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border">
                      {feeder.code}
                    </span>
                  </TableCell>

                  <TableCell>
                    <p className="max-w-[250px] truncate text-sm text-muted-foreground">
                      {feeder.capacity || "No capacity"}
                    </p>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-current" />
                      {feeder.status || "Active"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center justify-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                      {feeder.areas?.length ?? 0}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      onClick={() => handlegetAreas(feeder.id)}
                      variant="ghost"
                      size="sm"
                      className="inline-flex items-center gap-2 text-xs h-8 text-muted-foreground hover:text-foreground cursor-pointer font-medium"
                    >
                      <Eye className="size-4" />
                      View Areas
                    </Button>
                     <CreateEmergencyOutage feederId={feeder.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No feeders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GetAllFeeders;
