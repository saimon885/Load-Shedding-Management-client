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
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Wrench } from "lucide-react";
import { useState } from "react";

import { OutageReportSchema } from "@/validation/form/dashboard/outageReport";
import { CreateOutageReportHook } from "@/hooks/outage-report";
import { toast } from "@/components/ui/toast";

type OutageReportFormValues = z.infer<typeof OutageReportSchema>;

type Props = {
  areaId: string;
};

const OutageReport = ({ areaId }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate: outageReport, isPending } = CreateOutageReportHook();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OutageReportFormValues>({
    resolver: zodResolver(OutageReportSchema),
    defaultValues: {
      description: "",
      areaId: areaId,
    },
  });

  const onSubmit = async (data: OutageReportFormValues) => {
    try {
      outageReport(data, {
        onSuccess: (res) => {
          toast.add({
            title: "OutageReport Created",
            description:
              res.message || "The Outage Report has been created successfully.",
            type: "success",
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
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) reset();
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold h-10 shadow-xs cursor-pointer border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:border-amber-900/50 dark:hover:bg-amber-950/30"
          >
            <AlertTriangle className="size-4 shrink-0 text-amber-500" />
            File Outage Report Create
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>File Outage Report</DialogTitle>
          <DialogDescription>
            Select a execution descriptions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Provide breakdown details or instructions..."
              rows={4}
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
};

export default OutageReport;
