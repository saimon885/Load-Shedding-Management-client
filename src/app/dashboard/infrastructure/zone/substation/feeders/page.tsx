"use client";
import { getSubstationWiseFeeders } from "@/hooks/zone.hook";
import { useSearchParams } from "next/navigation";
import React from "react";

const feeders = () => {
  const searchParams = useSearchParams();
  const substationId = searchParams.get("substationId") || "";
  const { data: feedersList, isLoading } =
    getSubstationWiseFeeders(substationId);
  console.log(feedersList);

  return <div>this is feeders page</div>;
};

export default feeders;
