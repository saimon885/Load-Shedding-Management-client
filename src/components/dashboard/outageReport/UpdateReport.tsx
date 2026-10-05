"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateOutageReportStatusHook } from "@/hooks/outage-report";
import { CheckCircle2, Settings2, ShieldAlert, XCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";

const UpdateReport = ({ report }: { report: any }) => {
  const { mutate, isPending } = UpdateOutageReportStatusHook();
  const queryClient = useQueryClient();

  const handleOutageStatus = (status: string) => {
    const data = {
      id: report.id,
      status,
    };

    mutate(data, {
      onSuccess: (res: any) => {
        toast.add({
          title: "Status Updated",
          description:
            res?.message ||
            `Outage report status has been updated to ${status}.`,
          type: "success",
        });

        queryClient.invalidateQueries({
          queryKey: ["outage-report"],
        });
      },

      onError: (err: any) => {
        toast.add({
          title: "Update Failed",
          description:
            err?.message ||
            "Failed to update outage report status. Please try again.",
          type: "error",
        });

        console.error("Status update error:", err);
      },
    });
  };

  const statuses = [
    {
      value: "PENDING",
      label: "PENDING",
      icon: ShieldAlert,
      className: "text-amber-600 focus:text-amber-700 focus:bg-amber-500/10",
    },
    {
      value: "INVESTIGATING",
      label: "INVESTIGATING",
      icon: Settings2,
      className: "text-blue-600 focus:text-blue-700 focus:bg-blue-500/10",
    },
    {
      value: "VERIFIED",
      label: "VERIFIED",
      icon: CheckCircle2,
      className:
        "text-emerald-600 focus:text-emerald-700 focus:bg-emerald-500/10",
    },
    {
      value: "RESOLVED",
      label: "RESOLVED",
      icon: CheckCircle2,
      className: "text-green-600 focus:text-green-700 focus:bg-green-500/10",
    },
    {
      value: "REJECTED",
      label: "REJECTED",
      icon: XCircle,
      className: "text-rose-600 focus:text-rose-700 focus:bg-rose-500/10",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            className="flex items-center gap-1.5 text-xs font-semibold h-9 cursor-pointer border-muted-foreground/20 hover:bg-muted"
          >
            <Settings2 className="size-4 text-muted-foreground" />
            {isPending ? "Updating..." : "Manage State"}
          </Button>
        }
      />

      <DropdownMenuContent
        align="end"
        className="w-52 p-1 rounded-xl shadow-md border-muted/80"
      >
        {statuses.map((item) => {
          const Icon = item.icon;

          return (
            <DropdownMenuItem
              key={item.value}
              disabled={isPending || report?.status === item.value}
              onClick={() => handleOutageStatus(item.value)}
              className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium cursor-pointer disabled:opacity-40 ${item.className}`}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpdateReport;
