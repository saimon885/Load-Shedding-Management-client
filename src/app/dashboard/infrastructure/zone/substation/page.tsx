"use client";
import { getZoneWiseSubstations } from "@/hooks/zone.hook";
import { useSearchParams } from "next/navigation";
import React from "react";

const substation = () => {
  const searchParams = useSearchParams();
  const zoneId = searchParams.get("zoneId") || "";

  const { data, isLoading } = getZoneWiseSubstations(zoneId);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  return <div>substation {zoneId}</div>;
};

export default substation;
