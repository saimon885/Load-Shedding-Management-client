import { Button } from "@/components/ui/button";
import { DeleteOutageHook } from "@/hooks/outage.hook";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";

const DeleteOutage = ({ outageId }: { outageId: string }) => {
  const { mutate: deleteOutage, isPending } = DeleteOutageHook(outageId);
  const queryClient = useQueryClient();

  const handleDeleteClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this outage log!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
      background: "var(--background)",
      color: "var(--foreground)",
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        deleteOutage(undefined, {
          onSuccess: () => {
            toast.add({
              title: "Record Deleted",
              description:
                "The outage log record has been removed successfully.",
              type: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["outage"] });
          },
          onError: (err: any) => {
            toast.add({
              title: "Error",
              description: err.message || "Failed to remove the outage log.",
              type: "error",
            });
          },
        });
      }
    });
  };

  return (
    <Button
      onClick={() => handleDeleteClick()}
      disabled={isPending}
      variant="ghost"
      size="sm"
      className="flex items-center gap-1.5 text-xs font-semibold h-9 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer disabled:opacity-50"
    >
      <Trash2 className="size-4" />
      {isPending ? "Removing..." : "Remove"}
    </Button>
  );
};

export default DeleteOutage;
