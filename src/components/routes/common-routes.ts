import { Building2, Gauge, LayoutDashboard, MapPin, Zap } from "lucide-react";

export const commonRoutes = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      {
        title: "Zones",
        url: "/dashboard/infrastructure/zone",
        icon: MapPin,
      },
      {
        title: "Substations",
        url: "/dashboard/infrastructure/substation",
        icon: Building2,
      },
      {
        title: "Feeders",
        url: "/dashboard/infrastructure/feeders",
        icon: Zap,
      },
      {
        title: "Area",
        url: "/dashboard/infrastructure/area",
        icon: Gauge,
      },
    ],
  },
];
