import { Button } from "@/components/ui/button";
import { UpdateOutageHook } from "@/hooks/outage.hook";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { MdUpdate } from "react-icons/md";

const UpdateOutage = ({ outage }: { outage: any }) => {
  const { mutate: updateOutage, isPending } = UpdateOutageHook();
  const queryClient = useQueryClient();

  const handleRestoreStatus = () => {
    const payload = {
      status: "RESTORED",
    };

    updateOutage(
      {
        id: outage.id,
        data: payload,
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Grid Restored",
            description: "Outage status successfully updated to RESTORED.",
            type: "success",
          });
          queryClient.invalidateQueries({ queryKey: ["outage"] });
        },
        onError: (err: any) => {
          toast.add({
            title: "Operation Failed",
            description:
              err.message || "Could not update grid restoration status.",
            type: "error",
          });
          console.error(err);
        },
      },
    );
  };

  return (
    <Button
      onClick={handleRestoreStatus}
      disabled={isPending || outage.status === "RESTORED"}
      variant="ghost"
      size="sm"
      className="flex items-center gap-1.5 text-xs font-semibold h-9 text-primary hover:text-primary hover:bg-primary/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <MdUpdate className="size-4" />
      {isPending ? "Updating..." : "Restored"}
    </Button>
  );
};

export default UpdateOutage;
