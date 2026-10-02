"use client";

import Link from "next/link";
import { Building2, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

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



const GetAllFeeders = ({ feeders }: AllFeedersProps) => {
  const router = useRouter();
  const handlegetAreas = (feederId: string) => {
    const areas = new URLSearchParams({ feederId: feederId });
    router.push(
      `/dashboard/infrastructure/zone/substation/feeders/area?${areas.toString()}`,
    );
  };
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Feeders</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Areas</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {feeders.length > 0 ? (
            feeders.map((feeder) => (
              <TableRow key={feeder.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="size-4 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium">{feeder.name}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="font-mono text-xs text-muted-foreground">
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
                    {feeder.status}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{feeder.areas?.length ?? 0}</span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      onClick={() => handlegetAreas(feeder.id)}
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      title="View"
                    >
                      <Eye className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      title="Edit"
                      onClick={() => {
                        console.log("Update feeder:", feeder.id);
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive"
                      title="Delete"
                      onClick={() => {
                        console.log("Delete feeder:", feeder.id);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      title="More"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
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
                No feeders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GetAllFeeders;
