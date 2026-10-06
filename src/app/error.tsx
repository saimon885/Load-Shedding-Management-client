"use client";

import {
  AlertTriangle,
  Home,
  RefreshCcw,
  ServerCrash,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/20 px-4 py-10">
      <div className="w-full max-w-lg text-center">
        <div className="relative mx-auto mb-6 flex size-24 items-center justify-center rounded-3xl border bg-background shadow-sm">
          <ServerCrash className="size-11 text-destructive" />

          <div className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
            <AlertTriangle className="size-4" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="flex items-center justify-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-destructive">
            <Zap className="size-4" />
            System Error
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Something Went Wrong
          </h1>

          <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            We couldn&apos;t complete this request. The power management system
            encountered an unexpected error.
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={() => reset()} className="gap-2">
            <RefreshCcw className="size-4" />
            Try Again
          </Button>

          <Button  variant="outline" className="gap-2">
            <Link href="/dashboard">
              <Home className="size-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-left">
            <p className="mb-2 text-xs font-semibold text-destructive">
              Development Error
            </p>

            <p className="break-words font-mono text-xs leading-5 text-muted-foreground">
              {error.message || "Unknown error"}
            </p>

            {error.digest && (
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Zap className="size-3.5" />
          <span>Power Management — Load Shedding &amp; Outage Control</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
