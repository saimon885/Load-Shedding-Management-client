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
import { MdAddHome, MdEdit } from "react-icons/md";
import { zoneSchema } from "@/types/dashboard/infrastructure/ZSFA";
import { CreateZoneHook, UpdateZoneHook } from "@/hooks/zone.hook";
import { toast } from "@/components/ui/toast";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

type ZoneFormValues = z.infer<typeof zoneSchema>;

interface AddNewZoneProps {
  mode?: "create" | "update";
  initialData?: ZoneFormValues & { zoneId: string };
}

export function AddNewZone({ mode = "create", initialData }: AddNewZoneProps) {
  const { mutate: ZoneCreate, isPending } = CreateZoneHook();
  const { mutate: ZoneUpdate, isPending: updateZonePending } = UpdateZoneHook();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ZoneFormValues>({
    resolver: zodResolver(zoneSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  });

  useEffect(() => {
    if (mode === "update" && initialData) {
      reset({
        name: initialData.name,
        code: initialData.code,
        description: initialData.description || "",
      });
    } else if (mode === "create" && !open) {
      reset({ name: "", code: "", description: "" });
    }
  }, [mode, initialData, open, reset]);

  const onSubmit = async (data: ZoneFormValues) => {
    try {
      if (mode === "update" && initialData?.zoneId) {
        ZoneUpdate(
          { zoneId: initialData.zoneId, ...data },
          {
            onSuccess: () => {
              toast.add({
                title: "Zone updated successfully",
                description: "The zone details have been modified.",
                type: "success",
              });
              queryClient.invalidateQueries({ queryKey: ["zones"] });
              setOpen(false);
            },
            onError: (err: any) => {
              toast.add({
                title: "Error updating zone",
                description: "An error occurred while updating the zone.",
                type: "error",
              });
              console.error(err);
            },
          },
        );
      } else {
        ZoneCreate(data, {
          onSuccess: () => {
            toast.add({
              title: "Zone created successfully",
              description: "The new zone has been added.",
              type: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["zones"] });
            reset();
            setOpen(false);
          },
          onError: (err) => {
            toast.add({
              title: "Error creating zone",
              description: "An error occurred while creating the zone.",
              type: "error",
            });
            console.error(err);
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          mode === "update" ? (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <MdEdit className="size-4" />
              <span className="sr-only">Edit Zone</span>
            </Button>
          ) : (
            <Button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto">
              <MdAddHome /> Add Zone
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "update" ? "Update Zone" : "Add New Zone"}
          </DialogTitle>
          <DialogDescription>
            {mode === "update"
              ? "Modify the details for the existing zone."
              : "Enter the details for the new zone."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Zone Name
            </label>
            <Input
              id="name"
              placeholder="e.g. Lokkhipur Zone"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="code" className="text-sm font-medium">
              Zone Code
            </label>
            <Input
              id="code"
              placeholder="e.g. LKP-ZONE-02"
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
              placeholder="e.g. Lokkhipur distribution zone"
              rows={3}
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

            <Button type="submit">
              {mode === "update" && updateZonePending
                ? "Updating..."
                : mode === "update"
                  ? "Update Zone"
                  : mode === "create" && isPending
                    ? "Adding..."
                    : "Add Zone"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
