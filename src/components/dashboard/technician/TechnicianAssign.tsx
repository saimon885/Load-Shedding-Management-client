"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { CreateTechnicianAssignHook } from "@/hooks/technician.assignment";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

const technicianSchema = z.object({
  technicianId: z.string().min(1, "technicianId is required"),
});

interface TechnicianAssignProps {
  outageId: string;
}

interface TechnicianAssignFormValues {
  technicianId: string;
}

const TechnicianAssign = ({ outageId }: TechnicianAssignProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: assignTechnician, isPending } = CreateTechnicianAssignHook();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TechnicianAssignFormValues>({
    resolver: zodResolver(technicianSchema),
    defaultValues: {
      technicianId: "",
    },
  });

  const onSubmit = (data: TechnicianAssignFormValues) => {
    const payload = {
      outageId,
      technicianId: data.technicianId,
    };

    assignTechnician(payload, {
      onSuccess: (res: any) => {
        toast.add({
          title: "Technician Assigned",
          description:
            res?.message ||
            "The technician has been successfully assigned to this ticket.",
          type: "success",
        });
        reset();
        queryClient.invalidateQueries({ queryKey: ["outage"] });
        setOpen(false);
      },
      onError: (err: any) => {
        toast.add({
          title: "Assignment Failed",
          description:
            err?.message || "Failed to assign technician. Please try again.",
          type: "error",
        });
        console.error(err);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm" className="gap-1.5 cursor-pointer">
            <UserPlus className="size-4" />
            Assign Technician
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Technician</DialogTitle>
          <DialogDescription>
            Enter the technician ID to assign this outage.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="technicianId">Technician ID</Label>

            <Input
              id="technicianId"
              placeholder="Enter technician ID"
              {...register("technicianId", {
                required: "Technician ID is required",
              })}
            />

            {errors.technicianId && (
              <p className="text-sm text-destructive">
                {errors.technicianId.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button disabled={isPending} type="submit" className="gap-1.5">
              <UserPlus className="size-4" />
              {isPending ? "Assigning..." : " Assign Technician"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TechnicianAssign;
