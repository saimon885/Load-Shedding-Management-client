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
    title: "Services & Payments",
    items: [
      {
        title: "My-Services",
        url: "/dashboard/customer/service",
        icon: GitPullRequest,
      },
      {
        title: "My-Payment-History",
        url: "/dashboard/customer/my-payments",
        icon: MdPayment,
      },
    ],
  },
];
