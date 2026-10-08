"use client";

import React from "react";
import { UsegetMeHook } from "@/hooks/profile.hook";
import { permissions } from "@/lib/permissions";
import { Spinner } from "../ui/spinner";

type Permission =
  | "zone:view"
  | "zone:create"
  | "zone:update"
  | "zone:delete"
  | "substation:view"
  | "substation:create"
  | "substation:update"
  | "substation:delete"
  | "feeder:view"
  | "feeder:create"
  | "feeder:update"
  | "feeder:delete"
  | "area:view"
  | "area:create"
  | "area:update"
  | "area:delete"
  | "service:create"
  | "outage_report:create"
  | "outage_report:update"
  | "schedule:create"
  | "outage:create"
  | "outage:delete"
  | "outage:update"
  | "emergency:create"
  | "outage_states:view"
  | "technician_assign:create"
  | "technician_assign:update"
  | "technician:view"
  | "states_admin:view"
  | "states_znop:view";

interface CanProps {
  permission: Permission;
  children: React.ReactNode;
}

const Can = ({ permission, children }: CanProps) => {
  const { data, isLoading } = UsegetMeHook();

  const role = data?.data?.role;

  if (!role) {
    return null;
  }
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-4xl text-destructive">
          <Spinner /> Loading...
        </p>
      </div>
    );
  }

  const [resource, action] = permission.split(":") as [
    keyof (typeof permissions)["ADMIN" | "ZONE_MANAGER" | "CUSTOMER"],
    "view" | "create" | "update" | "delete",
  ];

  const userRolePermissions = permissions[role as keyof typeof permissions];
  const allowed = userRolePermissions?.[resource]?.[action] ?? false;

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
};

export default Can;
