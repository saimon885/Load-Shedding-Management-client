import { LucideIcon } from "lucide-react";

export interface SidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}
