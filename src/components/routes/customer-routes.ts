import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CalendarClock,
  ClipboardList,
  Gauge,
  LayoutDashboard,
  MapPin,
  Settings,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

export const customerRoutes = [
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
    title: "Power Management",
    items: [
      {
        title: "Scheduled Outages",
        url: "/dashboard/outages/scheduled",
        icon: CalendarClock,
      },
      {
        title: "Unexpected Outages",
        url: "/dashboard/outages/unexpected",
        icon: AlertTriangle,
      },
      {
        title: "Outage Reports",
        url: "/dashboard/outages/reports",
        icon: ClipboardList,
      },
    ],
  },

  {
    title: "Infrastructure",
    items: [
      {
        title: "Zones",
        url: "/dashboard/customer/zone",
        icon: MapPin,
      },
      {
        title: "Substations",
        url: "/dashboard/infrastructure/substations",
        icon: Building2,
      },
      {
        title: "Feeders",
        url: "/dashboard/infrastructure/feeders",
        icon: Zap,
      },
      {
        title: "Areas",
        url: "/dashboard/infrastructure/areas",
        icon: Gauge,
      },
    ],
  },

  {
    title: "Operations",
    items: [
      {
        title: "Technicians",
        url: "/dashboard/operations/technicians",
        icon: Wrench,
      },
      {
        title: "Assignments",
        url: "/dashboard/operations/assignments",
        icon: Users,
      },
      {
        title: "Restoration",
        url: "/dashboard/operations/restoration",
        icon: Activity,
      },
    ],
  },

  {
    title: "System",
    items: [
      {
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];
