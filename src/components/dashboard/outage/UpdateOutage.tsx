import { Button } from "@/components/ui/button";
import { UpdateOutageHook } from "@/hooks/outage.hook";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShieldAlert, CheckCircle2, XCircle, Settings2 } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";

const ChangeOutageStatus = ({ outage }: { outage: any }) => {
  const { mutate: updateStatus, isPending } = UpdateOutageHook();
  const queryClient = useQueryClient();

  const handleStatusTransition = (
    newStatus: "ONGOING" | "RESTORED" | "CANCELLED",
  ) => {
    const statusLabels = {
      ONGOING: {
        title: "Set to Ongoing?",
        text: "This will mark the grid segment outage as currently active.",
        color: "#f59e0b",
      },
      RESTORED: {
        title: "Mark as Restored?",
        text: "This will log that grid power is successfully back online.",
        color: "#10b981",
      },
      CANCELLED: {
        title: "Cancel Outage Schedule?",
        text: "This will call off the planned load shedding sequence.",
        color: "#ef4444",
      },
    };

    const config = statusLabels[newStatus];

    Swal.fire({
      title: config.title,
      text: config.text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: config.color,
      cancelButtonColor: "#64748b",
      confirmButtonText: "Confirm Change",
      cancelButtonText: "Dismiss",
      background: "var(--background)",
      color: "var(--foreground)",
    }).then((result) => {
      if (result.isConfirmed) {
        const payloadData: any = { status: newStatus };

        if (newStatus === "RESTORED") {
          payloadData.actualRestorationTime = new Date().toISOString();
          payloadData.restorationNote =
            "Grid distribution lines normalized successfully.";
        }

        updateStatus(
          { id: outage.id, data: payloadData },
          {
            onSuccess: () => {
              toast.add({
                title: "Status Synchronized",
                description: `Grid profile state converted to ${newStatus} successfully.`,
                type: "success",
              });
              queryClient.invalidateQueries({ queryKey: ["outage"] });
              queryClient.invalidateQueries({
                queryKey: ["outage", outage.id],
              });
            },
            onError: (err: any) => {
              toast.add({
                title: "Transition Failed",
                description:
                  err.message || "Could not alter state configurations.",
                type: "error",
              });
            },
          },
        );
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            disabled={
              isPending ||
              outage.status === "RESTORED" ||
              outage.status === "CANCELLED"
            }
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-xs font-semibold h-9 cursor-pointer border-muted-foreground/20 hover:bg-muted"
          >
            <Settings2 className="size-4 animate-spin-slow text-muted-foreground" />
            {isPending ? "Transitioning..." : "Manage State"}
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 p-1 rounded-xl shadow-md border-muted/80"
      >
        <DropdownMenuItem
          disabled={outage.status === "ONGOING"}
          onClick={() => handleStatusTransition("ONGOING")}
          className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-amber-600 focus:text-amber-700 focus:bg-amber-500/10 cursor-pointer disabled:opacity-40"
        >
          <ShieldAlert className="size-4 shrink-0" />
          Mark Ongoing
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={outage.status === "RESTORED"}
          onClick={() => handleStatusTransition("RESTORED")}
          className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-emerald-600 focus:text-emerald-700 focus:bg-emerald-500/10 cursor-pointer disabled:opacity-40"
        >
          <CheckCircle2 className="size-4 shrink-0" />
          Mark Restored
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={outage.status === "CANCELLED"}
          onClick={() => handleStatusTransition("CANCELLED")}
          className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-rose-600 focus:text-rose-700 focus:bg-rose-500/10 cursor-pointer disabled:opacity-40"
        >
          <XCircle className="size-4 shrink-0" />
          Cancel Schedule
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeOutageStatus;
