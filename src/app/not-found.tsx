"use client";

import Link from "next/link";
import { ArrowLeft, Home, MapPinOff, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/20 px-4 py-10">
      <div className="w-full max-w-lg text-center">
        <div className="relative mx-auto mb-6 flex size-24 items-center justify-center rounded-3xl border bg-background shadow-sm">
          <MapPinOff className="size-11 text-muted-foreground" />

          <div className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <SearchX className="size-4" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Power Management
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Page Not Found
          </h1>

          <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            The requested page or resource could not be found. It may have been
            removed, moved, or the address may be incorrect.
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="default" className="gap-2">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </Button>
        </div>

        <div className="mt-10 rounded-xl border bg-background/70 p-4 text-left">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <SearchX className="size-4 text-primary" />
            </div>

            <div>
              <p className="text-sm font-medium">Looking for something?</p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Check the dashboard navigation for outages, schedules, service
                requests, notifications, and other power management resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
