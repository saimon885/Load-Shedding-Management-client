import {
  BarChart3,
  Bell,
  Clock3,
  LayoutDashboard,
  ShieldCheck,
  ZapOff,
} from "lucide-react";

const features = [
  {
    title: "Outage Monitoring",
    description:
      "Monitor unexpected outages, reported issues, assigned technicians and restoration progress.",
    icon: ZapOff,
  },
  {
    title: "Load Shedding Schedule",
    description:
      "Manage planned load shedding schedules and provide customers with upcoming outage information.",
    icon: Clock3,
  },
  {
    title: "Smart Notifications",
    description:
      "Keep customers and responsible teams informed about outages, schedules and restoration updates.",
    icon: Bell,
  },
  {
    title: "Power Analytics",
    description:
      "Analyze outage history, restoration performance and power management data from one platform.",
    icon: BarChart3,
  },
  {
    title: "Infrastructure Management",
    description:
      "Organize zones, substations, feeders and areas through a centralized infrastructure system.",
    icon: LayoutDashboard,
  },
  {
    title: "Secure Access",
    description:
      "Role-based permissions provide controlled access for different users and operational teams.",
    icon: ShieldCheck,
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-slate-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-400">
            Platform Features
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything needed to manage power operations
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            PowerGrid brings outage management, infrastructure operations,
            scheduling and reporting into a single platform.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-1 hover:border-amber-400/20 hover:bg-white/[0.07]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                  <Icon className="h-5 w-5 text-amber-400" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
