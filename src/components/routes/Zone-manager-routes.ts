import { CalendarClock, ClipboardList } from "lucide-react";
import { MdReport } from "react-icons/md";

export const zone_manager_Routes = [
  {
    title: "Services & Payments",
    items: [
      {
        title: "All Outages",
        url: "/dashboard/outages",
        icon: CalendarClock,
      },

      {
        title: "All Reports",
        url: "/dashboard/reports",
        icon: MdReport,
      },
    ],
  },
];
