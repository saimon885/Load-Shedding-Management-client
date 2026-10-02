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
  },
};
