"use client";

import { Building2, Eye, MapPin } from "lucide-react";
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
import { AllZonesProps } from "@/types/dashboard/infrastructure";
import { AddNewZone } from "@/components/dashboard/zone/AddNewZone";
import Can from "@/components/auth/RoleCan";

const AllZones = ({ zones }: AllZonesProps) => {
  const router = useRouter();

  const handlegetSubstation = (zoneId: string) => {
    const params = new URLSearchParams({ zoneId: zoneId });
    router.push(`/dashboard/infrastructure/substation?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="grid sm:grid-cols-2 gap-4 lg:hidden">
        {zones.length > 0 ? (
          zones.map((zone) => (
            <div
              key={zone.id}
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
                        title={zone.name}
                      >
                        {zone.name}
                      </p>
                      <span className="inline-block mt-0.5 font-mono text-[10px] sm:text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded truncate max-w-full">
                        {zone.code}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-current" />
                    {zone.status || "Active"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 min-h-[36px] sm:min-h-[40px]">
                  {zone.description || "No description provided for this zone."}
                </p>

                <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-2 text-xs sm:text-sm text-muted-foreground">
                  <MapPin className="size-3.5 sm:size-4 shrink-0 text-primary/70" />
                  <span className="shrink-0">Substations:</span>
                  <span className="font-semibold text-foreground">
                    {zone.substation?.length ?? 0}
                  </span>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 flex items-center justify-end gap-2 border-t pt-3">
                <Button
                  onClick={() => handlegetSubstation(zone.id)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5 text-xs h-8 sm:h-9 cursor-pointer"
                >
                  <Eye className="size-3.5" />
                  <span>View Substation</span>
                </Button>

                <Can permission="zone:update">
                  <AddNewZone
                    mode="update"
                    initialData={{
                      zoneId: zone.id,
                      name: zone.name,
                      code: zone.code,
                      description: zone.description || "",
                    }}
                  />
                </Can>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-xl border bg-card p-12 text-center text-sm text-muted-foreground">
            No zones found.
          </div>
        )}
      </div>

      <div className="hidden lg:block w-full overflow-hidden rounded-xl border bg-card shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-semibold">Zone</TableHead>
              <TableHead className="font-semibold">Code</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Substations</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {zones.length > 0 ? (
              zones.map((zone) => (
                <TableRow
                  key={zone.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="size-4.5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-card-foreground truncate">
                          {zone.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="font-mono text-xs font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border">
                      {zone.code}
                    </span>
                  </TableCell>

                  <TableCell>
                    <p
                      className="max-w-[250px] truncate text-sm text-muted-foreground"
                      title={zone.description || ""}
                    >
                      {zone.description || "No description"}
                    </p>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-current" />
                      {zone.status || "Active"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center justify-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                      {zone.substation?.length ?? 0}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={() => handlegetSubstation(zone.id)}
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-foreground cursor-pointer"
                        title="View Substations"
                      >
                        <Eye className="size-4" />
                        <span className="sr-only">View Substations</span>
                      </Button>

                      <Can permission="zone:update">
                        <AddNewZone
                          mode="update"
                          initialData={{
                            zoneId: zone.id,
                            name: zone.name,
                            code: zone.code,
                            description: zone.description || "",
                          }}
                        />
                      </Can>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No zones found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllZones;
