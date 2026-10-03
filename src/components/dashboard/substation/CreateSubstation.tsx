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
import { Plus } from "lucide-react";
import { CreateSubstationHook } from "@/hooks/substation";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { substationSchema } from "@/types/dashboard/infrastructure/ZSFA";

type SubstationFormValues = z.infer<typeof substationSchema>;

export function AddNewSubstation({ zoneId }: { zoneId: string }) {
  const [open, setOpen] = useState(false);
  const { mutate: createSubstation, isPending } = CreateSubstationHook();
  const queryclient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubstationFormValues>({
    resolver: zodResolver(substationSchema),
    defaultValues: { name: "", code: "", location: "" },
  });

  const onSubmit = async (data: SubstationFormValues) => {
    try {
      console.log("Submitted Data:", { zoneId, ...data });
      createSubstation(
        { zoneId, ...data },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Substation Created",
              description: "The substation has been created successfully.",
              type: "success",
            });
            queryclient.invalidateQueries({ queryKey: ["substation", zoneId] });
            setOpen(false);
          },
          onError: (err) => {
            toast.add({
              title: "Error",
              description: err.message || "Failed to create substation.",
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
            <Plus className="size-4" /> Add Substation
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Substation</DialogTitle>
          <DialogDescription>
            Enter the details for the new substation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Substation Name
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
              Substation Code
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
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Textarea
              id="location"
              placeholder="e.g. Chandpur distribution zone"
              rows={3}
              {...register("location")}
            />
            {errors.location && (
              <p className="text-xs text-red-500">{errors.location.message}</p>
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
