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
import { Textarea } from "@/components/ui/textarea";
import { CreateAreaHook } from "@/hooks/area";
import { areaSchema } from "@/types/dashboard/infrastructure/ZSFA";

type AreaFormValues = z.infer<typeof areaSchema>;

export function AddNewArea({ feederId }: { feederId: string }) {
  const [open, setOpen] = useState(false);
  const { mutate: createArea, isPending } = CreateAreaHook();
  const queryclient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AreaFormValues>({
    resolver: zodResolver(areaSchema),
    defaultValues: { name: "", code: "", description: "" },
  });

  const onSubmit = async (data: AreaFormValues) => {
    try {
      createArea(
        { feederId, ...data },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Area Created",
              description: "The Area has been created successfully.",
              type: "success",
            });
            queryclient.invalidateQueries({
              queryKey: ["areas", feederId],
            });
            setOpen(false);
          },
          onError: (err) => {
            toast.add({
              title: "Error",
              description: err.message || "Failed to create area.",
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
            <Plus className="size-4" /> Add Area
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Area</DialogTitle>
          <DialogDescription>
            Enter the details for the new area.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Area Name
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
              Area Code
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
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="e.g. Central area serving downtown"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
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
