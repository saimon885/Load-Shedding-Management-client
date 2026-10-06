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
import { Wrench } from "lucide-react";
import { useState } from "react";
import { serviceSchema } from "@/validation/form/dashboard/service";
import { CreateServieHook } from "@/hooks/service";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

type ServiceFormValues = z.infer<typeof serviceSchema>;

type Props = {
  areaId: string;
  feederId: string;
};

const DispatchService = ({ areaId, feederId }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate: createService, isPending } = CreateServieHook();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      type: "TECHNICAL_SERVICE",
      description: "",
      areaId: areaId,
      feederId: feederId,
    },
  });

  const onSubmit = async (data: ServiceFormValues) => {
    try {
      createService(data, {
        onSuccess: (res) => {
          toast.add({
            title: "Service Created",
            description: "The service has been created successfully.",
            type: "success",
          });
          queryClient.invalidateQueries({
            queryKey: ["all-service"],
          });
          setOpen(false);
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: err.message || "Failed to create service.",
            type: "error",
          });
          setOpen(false);
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
            variant="secondary"
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold h-10 shadow-xs cursor-pointer"
          >
            <Wrench className="size-4 shrink-0" />
            Dispatch Service
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dispatch Service</DialogTitle>
          <DialogDescription>
            Select a service category and add execution descriptions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="type" className="text-sm font-medium">
              Service Type
            </label>
            <select
              id="type"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register("type")}
            >
              <option value="NEW_CONNECTION">New Connection</option>
              <option value="METER_INSTALLATION">Meter Installation</option>
              <option value="METER_REPLACEMENT">Meter Replacement</option>
              <option value="TECHNICAL_SERVICE">Technical Service</option>
            </select>
            {errors.type && (
              <p className="text-xs text-red-500">{errors.type.message}</p>
            )}
          </div>

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

export default DispatchService;
