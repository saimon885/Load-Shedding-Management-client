import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export interface SidebarItems {
  title: string;

  items: {
    title: string;
    url: string;
    icon?: LucideIcon | IconType;
  }[];
}
