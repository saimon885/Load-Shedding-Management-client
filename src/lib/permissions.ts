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
    outage: { view: true, create: true, update: true, delete: true },
    emergency: { view: false, create: true, update: false, delete: false },
    outage_states: { view: true, create: true, update: false, delete: false },
    states_admin: { view: true, create: true, update: false, delete: false },
    technician_assign: {
      view: false,
      create: true,
      update: false,
      delete: false,
    },
    technician: {
      view: true,
      create: true,
      update: false,
      delete: false,
    },
  },
  ZONE_MANAGER: {
    zone: { view: true, create: true, update: true, delete: true },
    substation: { view: true, create: true, update: true, delete: true },
    feeder: { view: true, create: true, update: true, delete: true },
    area: { view: true, create: true, update: true, delete: true },
    outage: { view: true, create: true, update: false, delete: false },
    outage_states: { view: true, create: true, update: false, delete: false },
    outage_report: { view: false, create: true, update: false, delete: false },
    emergency: { view: false, create: true, update: false, delete: false },
    states_znop: { view: true, create: true, update: false, delete: false },
  },
  POWER_OPERATOR: {
    zone: { view: true, create: false, update: false, delete: false },
    substation: { view: true, create: false, update: false, delete: false },
    feeder: { view: true, create: false, update: false, delete: false },
    area: { view: true, create: false, update: false, delete: false },
    outage: { view: true, create: true, update: false, delete: false },
    states_znop: { view: true, create: true, update: false, delete: false },
    technician_assign: {
      view: false,
      create: true,
      update: false,
      delete: false,
    },
    technician: {
      view: true,
      create: true,
      update: false,
      delete: false,
    },
  },
  TECHNICIAN: {
    zone: { view: true, create: false, update: false, delete: false },
    substation: { view: true, create: false, update: false, delete: false },
    feeder: { view: true, create: false, update: false, delete: false },
    area: { view: true, create: false, update: false, delete: false },
    assigments: { view: true, create: false, update: true, delete: false },
    outage: { view: true, create: false, update: true, delete: false },
  },
  CUSTOMER: {
    zone: { view: true, create: false, update: false, delete: false },
    substation: { view: true, create: false, update: false, delete: false },
    feeder: { view: true, create: false, update: false, delete: false },
    area: { view: true, create: false, update: false, delete: false },
    service: { view: false, create: true, update: false, delete: false },
    outage_report: { view: false, create: true, update: false, delete: false },
    outage: { view: true, create: false, update: false, delete: false },
  },
};
