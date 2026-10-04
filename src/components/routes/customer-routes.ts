import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CalendarClock,
  ClipboardList,
  Gauge,
  GitPullRequest,
  MapPin,
  Settings,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { MdPayment } from "react-icons/md";

export const customerRoutes = [
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
    title: "Services & Payments",
    items: [
      {
        title: "My-Services",
        url: "/dashboard/service",
        icon: GitPullRequest,
      },
      {
        title: "My-Payment-History",
        url: "/dashboard/my-payments",
        icon: MdPayment,
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
];
