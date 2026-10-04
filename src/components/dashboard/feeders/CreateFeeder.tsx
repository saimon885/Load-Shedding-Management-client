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

import { Plus } from "lucide-react";

import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CreateFeederHook } from "@/hooks/feeders";
import { feederSchema } from "@/types/dashboard/infrastructure/ZSFA";

type feederFormValues = z.infer<typeof feederSchema>;

export function AddNewFeeder({ substationId }: { substationId: string }) {
  const [open, setOpen] = useState(false);
  const { mutate: createFeeder, isPending } = CreateFeederHook();
  const queryclient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<feederFormValues>({
    resolver: zodResolver(feederSchema),
    defaultValues: { name: "", code: "", capacity: 0 },
  });

  const onSubmit = async (data: feederFormValues) => {
    try {
      createFeeder(
        { substationId, ...data },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Feeder Created",
              description: "The feeder has been created successfully.",
              type: "success",
            });
            queryclient.invalidateQueries({
              queryKey: ["feeders", substationId],
            });
            setOpen(false);
          },
          onError: (err) => {
            toast.add({
              title: "Error",
              description: err.message || "Failed to create feeder.",
              type: "error",
            });
          },
        },
      );
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
          >
            <Plus className="size-4" /> Add Feeder
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Feeder</DialogTitle>
          <DialogDescription>
            Enter the details for the new feeder.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Feeder Name
            </label>
            <Input
              id="name"
              placeholder="e.g. Chandpur Substation"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="code" className="text-sm font-medium">
              feeder Code
            </label>
            <Input
              id="code"
              placeholder="e.g. CDP-SUB-01"
              {...register("code")}
            />
            {errors.code && (
              <p className="text-xs text-red-500">{errors.code.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="capacity" className="text-sm font-medium">
              Feeder Capacity (MW)
            </label>
            <Input
              id="capacity"
              type="number"
              placeholder="e.g. 10.5"
              {...register("capacity", { valueAsNumber: true })}
            />
            {errors.capacity && (
              <p className="text-xs text-red-500">{errors.capacity.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
