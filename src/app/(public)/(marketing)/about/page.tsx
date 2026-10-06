"use client";

import {
  Activity,
  BarChart3,
  Bell,
  CheckCircle2,
  Clock3,
  Database,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Load Shedding Management",
      description:
        "Plan, monitor, and manage scheduled and emergency power outages across different areas.",
    },
    {
      icon: Activity,
      title: "Outage Monitoring",
      description:
        "Track outage status, restoration progress, affected areas, and operational activities.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Keep customers and responsible teams informed about scheduled and unexpected outages.",
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description:
        "Separate system access for administrators, zone managers, operators, technicians, and customers.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description:
        "Monitor outage history, service performance, restoration activity, and operational insights.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Management",
      description:
        "Protect system operations through authentication, authorization, and controlled access.",
    },
  ];

  const roles = [
    "ADMIN",
    "ZONE_MANAGER",
    "POWER_OPERATOR",
    "TECHNICIAN",
    "CUSTOMER",
  ];

  return (
    <div className="min-h-screen bg-muted/20 mt-15">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border bg-background px-6 py-12 shadow-sm sm:px-10 lg:px-16">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Zap className="size-8" />
            </div>

            <Badge variant="outline" className="mb-4">
              Power Management System
            </Badge>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Load Shedding & Outage Control
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              A centralized power management platform designed to monitor load
              shedding, manage outages, coordinate technicians, handle service
              requests, and improve communication between power operators and
              customers.
            </p>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-background p-6">
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Activity className="size-5" />
            </div>

            <p className="text-2xl font-bold">24/7</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Power Operations Monitoring
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-6">
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="size-5" />
            </div>

            <p className="text-2xl font-bold">5</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Dedicated User Roles
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-6">
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Database className="size-5" />
            </div>

            <p className="text-2xl font-bold">Centralized</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Infrastructure & Service Data
            </p>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold text-primary">
              Core Capabilities
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              Everything in one power management platform
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              The system brings outage management, infrastructure monitoring,
              service requests, and operational workflows together in a single
              dashboard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border bg-background p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-muted text-primary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-background p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">User Roles</h2>

                <p className="text-xs text-muted-foreground">
                  Controlled access based on responsibilities
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Badge key={role} variant="secondary" className="px-3 py-1">
                  {role.replace("_", " ")}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-background p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock3 className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">Outage Workflow</h2>

                <p className="text-xs text-muted-foreground">
                  From outage detection to restoration
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                "Outage Created",
                "Area & Feeder Identified",
                "Technician Assigned",
                "Repair / Maintenance",
                "Power Restored",
              ].map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </div>

                  <span className="text-sm">{step}</span>

                  {index === 4 && (
                    <CheckCircle2 className="ml-auto size-4 text-emerald-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-background p-6 text-center sm:p-8">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>

          <h2 className="mt-4 text-xl font-bold">
            Built for Reliable Power Operations
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            The platform provides a structured environment for managing power
            infrastructure, coordinating field operations, handling customer
            requests, and maintaining reliable outage information.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
