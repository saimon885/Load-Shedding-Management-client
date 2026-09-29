import { Clock3, Gauge, MapPin, ZapOff } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const powerStats = [
  {
    title: "Active Outages",
    value: "12",
    description: "Currently being monitored",
    icon: ZapOff,
    iconClass: "text-red-500",
    bgClass: "bg-red-500/10",
  },
  {
    title: "Scheduled Outages",
    value: "08",
    description: "Planned for today",
    icon: Clock3,
    iconClass: "text-amber-500",
    bgClass: "bg-amber-500/10",
  },
  {
    title: "Areas Covered",
    value: "48",
    description: "Connected service areas",
    icon: MapPin,
    iconClass: "text-blue-500",
    bgClass: "bg-blue-500/10",
  },
  {
    title: "Power Restored",
    value: "94%",
    description: "Successful restoration rate",
    icon: Gauge,
    iconClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
  },
];

const PowerOverview = () => {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {powerStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.title}
                className="border bg-background shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="flex items-start gap-4 p-5">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.bgClass}`}
                  >
                    <Icon className={`h-5 w-5 ${stat.iconClass}`} />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PowerOverview;
