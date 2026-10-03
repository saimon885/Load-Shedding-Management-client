/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import {
  daysOfWeek,
  scheduleOutageSchema,
} from "@/validation/form/dashboard/sheduleOutage";
import { CreateSheduleHook } from "@/hooks/shedule";
import { toast } from "@/components/ui/toast";

type ScheduleOutageFormValues = z.infer<typeof scheduleOutageSchema>;

type Props = {
  areaId: string;
  feederId: string;
};

const SheduleOutage = ({ feederId, areaId }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate: shedule, isPending } = CreateSheduleHook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleOutageFormValues>({
    resolver: zodResolver(scheduleOutageSchema),
    defaultValues: {
      dayOfWeek: "SUNDAY",
      startTime: "",
      endTime: "",
      reason: "",
      areaId,
      feederId,
    },
  });

  const onSubmit = async (data: ScheduleOutageFormValues) => {
    
    try {
      const payload = {
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
        endTime: data.endTime,
        reason: data.reason,
        areaId: data.areaId,
        feederId: data.feederId,
      };

      shedule(payload, {
        onSuccess: (res) => {
          toast.add({
            title: "Shedule Outage Created",
            description:
              res.message ||
              "The Shedule Outage has been created successfully.",
            type: "success",
          });
          reset({
            dayOfWeek: "SUNDAY",
            startTime: "",
            endTime: "",
            reason: "",
            areaId,
          });
          setOpen(false);
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: err.message || "Failed to create Outage Report.",
            type: "error",
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDialogChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      reset({
        dayOfWeek: "SUNDAY",
        startTime: "",
        endTime: "",
        reason: "",
        areaId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border bg-background px-4 text-xs font-semibold shadow-xs">
        <CalendarIcon className="size-4 shrink-0 text-primary" />
        Plan Maintenance Schedule
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Plan Maintenance Schedule</DialogTitle>

          <DialogDescription>
            Set the maintenance timeframe and execution details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Day of Week */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="dayOfWeek" className="text-sm font-medium">
              Day of Week
            </label>

            <select
              id="dayOfWeek"
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus:ring-2 focus:ring-ring"
              {...register("dayOfWeek")}
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            {errors.dayOfWeek && (
              <p className="text-xs text-red-500">{errors.dayOfWeek.message}</p>
            )}
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="startTime" className="text-sm font-medium">
                Start Time
              </label>

              <Input
                id="startTime"
                type="time"
                className="h-9"
                {...register("startTime")}
              />

              {errors.startTime && (
                <p className="text-xs text-red-500">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            {/* End Time */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="endTime" className="text-sm font-medium">
                End Time
              </label>

              <Input
                id="endTime"
                type="time"
                className="h-9"
                {...register("endTime")}
              />

              {errors.endTime && (
                <p className="text-xs text-red-500">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reason" className="text-sm font-medium">
              Reason / Instructions
            </label>

            <Textarea
              id="reason"
              placeholder="e.g. Weekly Grid Maintenance & Maintenance Check"
              rows={3}
              {...register("reason")}
            />

            {errors.reason && (
              <p className="text-xs text-red-500">{errors.reason.message}</p>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="pt-4">
            <DialogClose className="inline-flex h-9 cursor-pointer items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">
              Cancel
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SheduleOutage;
