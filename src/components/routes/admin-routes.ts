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

export const adminRoutes = [
  {
    title: "Power Management",
    items: [
      {
        title: "All Outages",
        url: "/dashboard/outages",
        icon: CalendarClock,
      },
      // {
      //   title: "Unexpected Outages",
      //   url: "/dashboard/outages/unexpected",
      //   icon: AlertTriangle,
      // },
      {
        title: "Outage Reports",
        url: "/dashboard/outages/reports",
        icon: ClipboardList,
      },
    ],
  },
  // {
  //   title: "Operations",
  //   items: [
  //     {
  //       title: "Technicians",
  //       url: "/dashboard/operations/technicians",
  //       icon: Wrench,
  //     },
  //     {
  //       title: "Assignments",
  //       url: "/dashboard/operations/assignments",
  //       icon: Users,
  //     },
  //     {
  //       title: "Restoration",
  //       url: "/dashboard/operations/restoration",
  //       icon: Activity,
  //     },
  //   ],
  // },
];
