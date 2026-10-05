"use client";

import { useState } from "react";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UsegetTechnicianAssignment } from "@/hooks/technician.assignment";
import TechnicianUpdateStatus from "./TechnicianUpdateStatus";

const formatDate = (date?: string | null) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "default";

    case "IN_PROGRESS":
      return "secondary";

    case "ACCEPTED":
      return "outline";

    case "PENDING":
      return "outline";

    default:
      return "outline";
  }
};

const TechnicianAssignments = () => {
  const { data, isLoading, isError } = UsegetTechnicianAssignment();

  const assignments = data?.data ?? [];

  const [statusUpdates, setStatusUpdates] = useState<Record<string, string>>(
    {},
  );

  const handleStatusChange = (assignmentId: string, status: string) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [assignmentId]: status,
    }));
  };

  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-80 animate-pulse rounded-2xl border bg-muted/30"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
        <p className="text-sm font-medium text-destructive">
          Failed to load technician assignments.
        </p>
      </div>
    );
  }

  if (!assignments.length) {
    return (
      <div className="rounded-2xl border border-dashed bg-background p-10 text-center">
        <CheckCircle2 className="mx-auto mb-3 size-9 text-muted-foreground/50" />

        <h3 className="font-semibold">No Assignments</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          You currently have no assigned outage tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {assignments.map((assignment: any) => {
        const outage = assignment.outage;

        const currentStatus = statusUpdates[assignment.id] ?? assignment.status;

        return (
          <div
            key={assignment.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="border-b bg-muted/20 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{outage.type}</Badge>

                    <Badge variant={getStatusVariant(outage.status)}>
                      {outage.status}
                    </Badge>
                  </div>

                  <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-6">
                    {outage.reason}
                  </h3>
                </div>

                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  {currentStatus === "COMPLETED" ? (
                    <CheckCircle2 className="size-5 text-emerald-500" />
                  ) : (
                    <Clock3 className="size-5 text-amber-500" />
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Badge
                  variant={getStatusVariant(currentStatus)}
                  className="text-[11px]"
                >
                  Assignment: {currentStatus}
                </Badge>
              </div>
            </div>

            <div className="flex-1 space-y-4 p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <MapPin className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Area</p>

                  <p className="truncate text-sm font-semibold">
                    {outage.area?.name || "Unknown"}
                  </p>

                  {outage.area?.description && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                      {outage.area.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Zap className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Feeder</p>

                  <p className="truncate text-sm font-semibold">
                    {outage.feeder?.name || "Unknown"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {outage.feeder?.code || "No code"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Activity className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Substation</p>

                  <p className="truncate text-sm font-semibold">
                    {outage.feeder?.substation?.name || "Unknown"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {outage.feeder?.substation?.code || "No code"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Capacity</p>

                  <p className="mt-1 text-sm font-semibold">
                    {outage.feeder?.capacity
                      ? `${outage.feeder.capacity} MW`
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Scheduled</p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatDate(outage.startTime)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t bg-muted/10 px-5 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    Assigned
                  </div>

                  <p className="mt-1 text-xs font-medium">
                    {formatDate(assignment.assignedAt)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="size-3.5" />
                    Resolved
                  </div>

                  <p className="mt-1 text-xs font-medium">
                    {formatDate(assignment.resolvedAt)}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Update Assignment Status
                </p>

                <div className="flex gap-2">
                  <select
                    value={currentStatus}
                    onChange={(e) =>
                      handleStatusChange(assignment.id, e.target.value)
                    }
                    className="h-9 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="PENDING">Pending</option>

                    <option value="ACCEPTED">Accepted</option>

                    <option value="IN_PROGRESS">In Progress</option>

                    <option value="COMPLETED">Completed</option>
                  </select>

                  <TechnicianUpdateStatus
                    assignment={assignment}
                    currentStatus={currentStatus}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechnicianAssignments;
