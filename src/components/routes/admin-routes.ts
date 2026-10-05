import { CalendarClock, ClipboardList } from "lucide-react";
import { MdDesignServices, MdOutlinePayments } from "react-icons/md";

export const adminRoutes = [
  {
    title: "Power Management",
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
        url: "/dashboard/all-services",
        icon: MdDesignServices,
      },
      {
        title: "All Payment History",
        url: "/dashboard/all-payments",
        icon: MdOutlinePayments,
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
