import { CalendarClock, ClipboardList } from "lucide-react";
import { MdReport } from "react-icons/md";

export const operatorRoutes = [
  {
    title: "Services & Payments",
    items: [
      {
        title: "All Outages",
        url: "/dashboard/outages",
        icon: CalendarClock,
      },
      {
        title: "Schedule Outages",
        url: "/dashboard/schedule-outage",
        icon: ClipboardList,
      },
      {
        title: "All Reports",
        url: "/dashboard/reports",
        icon: MdReport,
      },
    ],
  },
];
