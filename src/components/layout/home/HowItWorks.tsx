import {
  CheckCircle2,
  ChevronRight,
  FileWarning,
  UserRound,
  Wrench,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const workflowSteps = [
  {
    number: "01",
    title: "Report Outage",
    description:
      "Customers report unexpected power outages with location and issue details.",
    icon: FileWarning,
  },
  {
    number: "02",
    title: "Assign Technician",
    description:
      "Operators review the issue and assign an available technician.",
    icon: UserRound,
  },
  {
    number: "03",
    title: "Repair & Resolve",
    description:
      "Technicians inspect the issue, perform repairs and update the status.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Restore Power",
    description: "After successful repair, the outage is marked as restored.",
    icon: CheckCircle2,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-500">
            How It Works
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From outage report to power restoration
          </h2>

          <p className="mt-4 text-muted-foreground">
            A structured workflow connects customers, operators and technicians
            throughout the restoration process.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <Card className="h-full border transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-amber-500">
                        {step.number}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mt-6 text-lg font-bold">{step.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {index < workflowSteps.length - 1 && (
                  <ChevronRight className="absolute -right-4 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
