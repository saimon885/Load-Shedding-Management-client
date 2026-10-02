"use client";

import React from "react";
import { UsegetMeHook } from "@/hooks/profile.hook";
import { permissions } from "@/lib/permissions";

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
  | "area:delete";

interface CanProps {
  permission: Permission;
  children: React.ReactNode;
}

const Can = ({ permission, children }: CanProps) => {
  const { data } = UsegetMeHook();

  const role = data?.data?.role;

  if (!role) {
    return null;
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
