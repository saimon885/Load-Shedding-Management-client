import { Building2, LayoutDashboard } from "lucide-react";

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
        icon: Building2,
      },
      {
        title: "Substations",
        url: "/dashboard/infrastructure/substation",
        icon: Building2,
      },
      {
        title: "Feeders",
        url: "/dashboard/infrastructure/feeders",
        icon: Building2,
      },
      {
        title: "Area",
        url: "/dashboard/infrastructure/area",
        icon: Building2,
      },
    ],
  },
];
