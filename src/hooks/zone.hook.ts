import { GetAreasByFeeder, GetFeedersBySubstation, GetSingleZone, GetZone } from "@/api/zone.api";
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
export const getSubstationWiseFeeders = (id: string) => {
  return useQuery({
    queryKey: ["feeders", id],
    queryFn: () => GetFeedersBySubstation(id),
    retry: false,
  });
};
export const getFeederWiseAreas = (id: string) => {
  return useQuery({
    queryKey: ["areas", id],
    queryFn: () => GetAreasByFeeder(id),
    retry: false,
  });
};
