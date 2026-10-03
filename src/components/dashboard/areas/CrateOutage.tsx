"use client";
import { useForm, Controller } from "react-hook-form";
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
import { Calendar as CalendarIcon, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import {
  createOutageSchema,
  outageTypes,
} from "@/validation/form/dashboard/Outage";
import { CreateOutageHook } from "@/hooks/outage.hook";
import { toast } from "@/components/ui/toast";

type CreateOutageFormValues = z.infer<typeof createOutageSchema>;

type Props = {
  areaId: string;
  feederId: string;
};

const CreateOutage = ({ feederId, areaId }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate: outage, isPending } = CreateOutageHook();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateOutageFormValues>({
    resolver: zodResolver(createOutageSchema),
    defaultValues: {
      type: "SCHEDULED",
      date: undefined,
      startTime: "",
      estimatedRestorationTime: "",
      reason: "",
      feederId,
      areaId,
    },
  });

  const onSubmit = async (data: CreateOutageFormValues) => {
    try {
      const dateString = format(data.date, "yyyy-MM-dd");

      const startDateTime = new Date(
        `${dateString}T${data.startTime}:00`,
      ).toISOString();

      const estimatedRestorationDateTime = new Date(
        `${dateString}T${data.estimatedRestorationTime}:00`,
      ).toISOString();

      const payload = {
        type: data.type,
        reason: data.reason,
        feederId: data.feederId,
        areaId: data.areaId,
        startTime: startDateTime,
        estimatedRestorationTime: estimatedRestorationDateTime,
      };
      outage(payload, {
        onSuccess: (res) => {
          toast.add({
            title: "OutageCreated",
            description:
              res.message || "The Outage has been created successfully.",
            type: "success",
          });
          reset({
            type: "SCHEDULED",
            date: undefined,
            startTime: "",
            estimatedRestorationTime: "",
            reason: "",
            feederId,
            areaId,
          });
          setOpen(false);
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: err.message || "Failed to create Outage.",
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
        type: "SCHEDULED",
        date: undefined,
        startTime: "",
        estimatedRestorationTime: "",
        reason: "",
        feederId,
        areaId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger
        render={
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold h-10 shadow-xs cursor-pointer bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <ShieldAlert className="size-4 shrink-0" />
            Trigger Outage Emergency
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Power Outage</DialogTitle>

          <DialogDescription>
            Provide the outage type, timing and restoration information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="type" className="text-sm font-medium">
              Outage Type
            </label>

            <select
              id="type"
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus:ring-2 focus:ring-ring"
              {...register("type")}
            >
              {outageTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {errors.type && (
              <p className="text-xs text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="text-sm font-medium">Outage Date</label>

            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger
                    className={cn(
                      "flex h-9 w-full cursor-pointer items-center justify-start rounded-md border border-input bg-background px-3 text-sm font-normal shadow-xs",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />

                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            {errors.date && (
              <p className="text-xs text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="estimatedRestorationTime"
                className="text-sm font-medium"
              >
                Estimated Restoration
              </label>

              <Input
                id="estimatedRestorationTime"
                type="time"
                className="h-9"
                {...register("estimatedRestorationTime")}
              />

              {errors.estimatedRestorationTime && (
                <p className="text-xs text-red-500">
                  {errors.estimatedRestorationTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reason" className="text-sm font-medium">
              Reason / Instructions
            </label>

            <Textarea
              id="reason"
              placeholder="e.g. Grid Maintenance and Line Servicing"
              rows={3}
              {...register("reason")}
            />

            {errors.reason && (
              <p className="text-xs text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <DialogClose className="inline-flex h-9 cursor-pointer items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">
              Cancel
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Outage"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOutage;
