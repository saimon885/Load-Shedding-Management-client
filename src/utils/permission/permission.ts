export type Role =
  | "ADMIN"
  | "ZONE_MANAGER"
  | "POWER_OPERATOR"
  | "TECHNICIAN"
  | "CUSTOMER";
export type Resource =
  | "zone"
  | "substation"
  | "feeder"
  | "area"
  | "service"
  | "outage_report"
  | "schedule"
  | "outage"
  | "assigments"
  | "emergency"
  | "outage_states"
  | "technician_assign"
  | "technician"
  | "states_admin"
  | "states_znop"
  | string;
export type Action = "view" | "create" | "update" | "delete";
