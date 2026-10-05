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

export const TechnicianRoutes = [
  {
    title: "Services & Payments",
    items: [
      {
        title: "Assignments",
        url: "/dashboard/technician-assignments",
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
