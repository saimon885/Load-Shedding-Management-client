import { GetSingleZone, GetZone } from "@/api/zone.api";
import { useQuery } from "@tanstack/react-query";

export const UseGetZoneHook = () => {
  return useQuery({
    queryKey: ["zones"],
    queryFn: GetZone,
    retry: false,
  });
};
export const getZoneWiseSubstations = (id: string) => {
  return useQuery({
    queryKey: ["substation", id],
    queryFn: () => GetSingleZone(id),
    retry: false,
  });
};
