"use client";

import { UsegetAllTechnicainHook } from "@/hooks/technician.assignment";
import React, { useState } from "react";
import { Check, Copy, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const GetAllTechnician = () => {
  const { data, isLoading } = UsegetAllTechnicainHook();
  const technicians = data?.data ?? [];

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="size-7 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!technicians.length) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/20 p-8 text-center">
        <UserRound className="mx-auto mb-3 size-8 text-muted-foreground/60" />
        <p className="text-sm font-semibold">No Technician Found</p>
        <p className="mt-1 text-xs text-muted-foreground">
          There are currently no technicians available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {technicians.map((technician: any) => (
        <div
          key={technician.id}
          className="rounded-xl border bg-background p-4 transition-colors hover:bg-muted/30"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UserRound className="size-5" />
              </div>

              <div className="min-w-0 space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {technician.name}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Mail className="size-3.5" />
                  <span>{technician.email}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <code className="max-w-55 truncate rounded-md bg-muted px-2.5 py-1.5 text-[11px] text-muted-foreground">
                {technician.id}
              </code>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0 gap-1.5"
                onClick={() => handleCopy(technician.id)}
              >
                {copiedId === technician.id ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy ID
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetAllTechnician;
