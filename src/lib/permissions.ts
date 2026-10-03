import { Action, Resource } from "@/utils/permission/permission";

export const permissions: Record<
  string,
  Record<Resource, Record<Action, boolean>>
> = {
  ADMIN: {
    zone: { view: true, create: true, update: true, delete: true },
    substation: { view: true, create: true, update: true, delete: true },
    feeder: { view: true, create: true, update: true, delete: true },
    area: { view: true, create: true, update: true, delete: true },
    schedule: { view: false, create: true, update: false, delete: false },
  },
  ZONE_MANAGER: {
    zone: { view: true, create: true, update: true, delete: true },
    substation: { view: true, create: true, update: true, delete: true },
    feeder: { view: true, create: true, update: true, delete: true },
    area: { view: true, create: true, update: true, delete: true },
  },
  POWER_OPERATOR: {
    zone: { view: true, create: false, update: false, delete: false },
    substation: { view: true, create: false, update: false, delete: false },
    feeder: { view: true, create: false, update: false, delete: false },
    area: { view: true, create: false, update: false, delete: false },
  },
  TECHNICIAN: {
    zone: { view: true, create: false, update: false, delete: false },
    substation: { view: true, create: false, update: false, delete: false },
    feeder: { view: true, create: false, update: false, delete: false },
    area: { view: true, create: false, update: false, delete: false },
  },
  CUSTOMER: {
    zone: { view: true, create: false, update: false, delete: false },
    substation: { view: true, create: false, update: false, delete: false },
    feeder: { view: true, create: false, update: false, delete: false },
    area: { view: true, create: false, update: false, delete: false },
    service: { view: false, create: true, update: false, delete: false },
    outage_report: { view: false, create: true, update: false, delete: false },
  },
};
