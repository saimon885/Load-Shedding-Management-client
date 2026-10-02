export type Role =
  | "ADMIN"
  | "ZONE_MANAGER"
  | "POWER_OPERATOR"
  | "TECHNICIAN"
  | "CUSTOMER";
export type Resource = "zone" | "substation" | "feeder" | "area" | string;
export type Action = "view" | "create" | "update" | "delete";