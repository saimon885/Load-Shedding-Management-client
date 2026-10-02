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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="size-5" />

            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              loading....
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground"></p>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
        >
          <Plus className="size-4" />
        </button>
      </div>
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
