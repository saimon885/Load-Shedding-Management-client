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
        url: "/dashboard/infrastructure/zone/substation",
        icon: Building2,
      },
    ],
  },
];
