"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Power,
  RadioTower,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { UsegetScheduleOutage } from "@/hooks/outage.hook";

const formatDay = (day: string) => {
  return day
    .toLowerCase()
    .replace("_", " ")
    .replace(/^\w/, (char) => char.toUpperCase());
};

const formatTime = (time: string) => {
  if (!time) return "N/A";

  const [hours, minutes] = time.split(":");
  const date = new Date();

  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const ScheduleOutage = () => {
  const { data, isLoading, isError } = UsegetScheduleOutage();

  const schedules = data?.data ?? [];

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
        <Power className="mx-auto mb-3 size-9 text-destructive/70" />

        <h3 className="font-semibold">Failed to Load Schedules</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Unable to retrieve scheduled outage information.
        </p>
      </div>
    );
  }

  if (!schedules.length) {
    return (
      <div className="rounded-2xl border border-dashed bg-background p-10 text-center">
        <CalendarDays className="mx-auto mb-3 size-10 text-muted-foreground/50" />

        <h3 className="font-semibold">No Scheduled Outages</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          There are currently no scheduled outage records.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 m-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Scheduled Outages
          </h2>

          <p className="text-sm text-muted-foreground">
            View and monitor planned power outage schedules.
          </p>
        </div>

        <Badge variant="outline" className="w-fit gap-1.5">
          <CalendarDays className="size-3.5" />
          {schedules.length} Schedule
          {schedules.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {schedules.map((schedule: any) => (
          <div
            key={schedule.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="border-b bg-muted/20 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CalendarDays className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {formatDay(schedule.dayOfWeek)}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Scheduled Outage
                    </p>
                  </div>
                </div>

                <Badge variant={schedule.isActive ? "default" : "secondary"}>
                  {schedule.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl border bg-background p-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Clock3 className="size-4 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Outage Time</p>

                  <p className="text-sm font-semibold">
                    {formatTime(schedule.startTime)} —{" "}
                    {formatTime(schedule.endTime)}
                  </p>
                </div>
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
                    {schedule.area?.name || "Unknown Area"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {schedule.area?.code || "No area code"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Zap className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Feeder</p>

                  <p className="truncate text-sm font-semibold">
                    {schedule.feeder?.name || "Unknown Feeder"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {schedule.feeder?.code || "No feeder code"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <RadioTower className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Schedule</p>

                  <p className="text-sm font-medium leading-5">
                    {schedule.reason || "No reason provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t bg-muted/10 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-muted-foreground">Created</p>

                  <p className="mt-0.5 text-xs font-medium">
                    {new Date(schedule.createdAt).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[11px] text-muted-foreground">
                    Schedule ID
                  </p>

                  <code className="mt-0.5 block max-w-32 truncate text-[10px] text-muted-foreground">
                    {schedule.id}
                  </code>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleOutage;
