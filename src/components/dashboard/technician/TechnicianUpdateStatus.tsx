"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { UpdateTechnicianAssignHook } from "@/hooks/technician.assignment";
import { useQueryClient } from "@tanstack/react-query";

type TechnicianUpdateStatusProps = {
  assignment: {
    id: string;
  };
  currentStatus: string;
};

const TechnicianUpdateStatus = ({
  assignment,
  currentStatus,
}: TechnicianUpdateStatusProps) => {
  const { mutate, isPending } = UpdateTechnicianAssignHook();
  const queryClient = useQueryClient();

  const handleUpdateStatus = () => {
    const payload = {
      id: assignment.id,
      status: currentStatus,
    };

    mutate(payload, {
      onSuccess: (res: any) => {
        toast.add({
          title: "Status Updated",
          description:
            res?.message ||
            `Assignment status has been updated to ${currentStatus}.`,
          type: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["technician-assignments"],
        });
      },

      onError: (err: any) => {
        toast.add({
          title: "Update Failed",
          description:
            err?.message ||
            "Failed to update assignment status. Please try again.",
          type: "error",
        });

        console.error("Technician assignment status update error:", err);
      },
    });
  };

  return (
    <Button
      type="button"
      size="lg"
      variant="default"
      disabled={isPending}
      onClick={handleUpdateStatus}
    >
      {isPending ? "Updating..." : "Update"}
    </Button>
  );
};

export default TechnicianUpdateStatus;
