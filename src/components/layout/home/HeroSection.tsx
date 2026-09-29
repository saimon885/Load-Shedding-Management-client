import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Zap,
  ZapOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.12),transparent_30%),radial-gradient(circle_at_10%_40%,rgba(14,165,233,0.08),transparent_28%)]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-2 text-xs font-semibold shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Smart Power Management Platform
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              Smarter way to manage
              <span className="block text-amber-500">power outages.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              PowerGrid helps power authorities monitor outages, manage load
              shedding schedules, coordinate field operations and keep customers
              informed from one centralized platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 px-6">
                <Link href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="h-12 px-6">
                <Link href="/outages/report">Report an Outage</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Centralized power management
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Secure role-based operations
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 -z-10 rounded-full bg-amber-400/10 blur-3xl" />

            <Card className="overflow-hidden rounded-[28px] border-slate-200/80 bg-slate-950 text-white shadow-2xl">
              <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      POWERGRID CONTROL CENTER
                    </p>

                    <h2 className="mt-1 text-lg font-semibold">
                      Network Overview
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-emerald-400">
                      Operational
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="space-y-4 p-5 sm:p-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-400">
                        Power Availability
                      </p>

                      <p className="mt-2 text-4xl font-bold tracking-tight">
                        82%
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                      <Zap className="h-5 w-5 text-amber-400" />
                    </div>
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[82%] rounded-full bg-amber-400" />
                  </div>

                  <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                    <span>Network capacity</span>
                    <span>82 / 100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">Active Outages</p>
                      <ZapOff className="h-4 w-4 text-red-400" />
                    </div>

                    <p className="mt-3 text-2xl font-bold">12</p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Under monitoring
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">Scheduled</p>
                      <Clock3 className="h-4 w-4 text-amber-400" />
                    </div>

                    <p className="mt-3 text-2xl font-bold">08</p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Planned today
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      Distribution Network
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      Zones • Substations • Feeders • Areas
                    </p>
                  </div>

                  <div className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
