import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Zap } from "lucide-react";
import React from "react";

const LoadingTable = () => {
  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="w-full overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableRow key={index} className="animate-pulse">
                {/* Zone Name Column */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    {/* Icon Skeleton */}
                    <div className="size-9 shrink-0 rounded-lg bg-muted" />
                    <div className="min-w-0 w-24">
                      {/* Text Skeleton */}
                      <div className="h-4 rounded bg-muted w-full" />
                    </div>
                  </div>
                </TableCell>

                {/* Zone Code Column */}
                <TableCell>
                  <div className="h-4 rounded bg-muted w-12 font-mono" />
                </TableCell>

                {/* Description Column */}
                <TableCell>
                  <div className="h-4 rounded bg-muted max-w-[200px] w-full" />
                </TableCell>

                {/* Status Column */}
                <TableCell>
                  {/* Badge Skeleton */}
                  <div className="h-6 rounded-full bg-muted w-16" />
                </TableCell>

                {/* Substation Count Column */}
                <TableCell>
                  <div className="h-4 rounded bg-muted w-6" />
                </TableCell>

                {/* Actions Column */}
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    {/* 4 Action Buttons Skeletons */}
                    <div className="size-8 rounded bg-muted" />
                    <div className="size-8 rounded bg-muted" />
                    <div className="size-8 rounded bg-muted" />
                    <div className="size-8 rounded bg-muted" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LoadingTable;
