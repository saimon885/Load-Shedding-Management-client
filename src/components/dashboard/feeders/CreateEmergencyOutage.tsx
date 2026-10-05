"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Siren } from "lucide-react";

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
import { CreateOutageEmergencyHook } from "@/hooks/outage.hook";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

type EmergencyOutageFormValues = {
  durationInMinutes: number;
  reason: string;
};

interface CreateEmergencyOutageProps {
  feederId: string;
}

const CreateEmergencyOutage = ({ feederId }: CreateEmergencyOutageProps) => {
  const { mutate, isPending } = CreateOutageEmergencyHook();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmergencyOutageFormValues>({
    defaultValues: {
      durationInMinutes: 60,
      reason: "",
    },
  });

  const onSubmit = (data: EmergencyOutageFormValues) => {
    const payload = {
      feederId,
      durationInMinutes: Number(data.durationInMinutes),
      reason: data.reason,
    };

    mutate(payload, {
      onSuccess: (res: any) => {
        toast.add({
          title: "Emergency Outage Created",
          description:
            res?.message || "Emergency outage has been created successfully.",
          type: "success",
        });

        queryClient.invalidateQueries({
          queryKey: ["outage"],
        });

        reset();
        setOpen(false);
      },

      onError: (err: any) => {
        toast.add({
          title: "Creation Failed",
          description:
            err?.message ||
            "Failed to create emergency outage. Please try again.",
          type: "error",
        });

        console.error("Emergency outage error:", err);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          reset();
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="h-9 w-full cursor-pointer justify-center gap-2 px-3 text-xs font-medium sm:w-auto"
          >
            <Siren className="size-4" />
            Emergency Outage
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Emergency Outage</DialogTitle>

          <DialogDescription>
            Provide the outage duration and reason for this emergency.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="durationInMinutes" className="text-sm font-medium">
              Duration (Minutes)
            </label>

            <Input
              id="durationInMinutes"
              type="number"
              min={1}
              placeholder="Enter duration in minutes"
              {...register("durationInMinutes", {
                required: "Duration is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Duration must be at least 1 minute",
                },
              })}
            />

            {errors.durationInMinutes && (
              <p className="text-xs text-destructive">
                {errors.durationInMinutes.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">
              Reason
            </label>

            <Textarea
              id="reason"
              placeholder="e.g. Sudden National Grid Frequency Drop"
              rows={4}
              {...register("reason", {
                required: "Reason is required",
                minLength: {
                  value: 5,
                  message: "Reason must be at least 5 characters",
                },
              })}
            />

            {errors.reason && (
              <p className="text-xs text-destructive">
                {errors.reason.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />

            <Button type="submit" variant="destructive">
              <Siren className="mr-2 size-4" />
              Create Emergency Outage
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmergencyOutage;
