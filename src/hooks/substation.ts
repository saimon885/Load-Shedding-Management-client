import { GetSingleZone } from "@/api/substation";
import { useQuery } from "@tanstack/react-query";

export const getZoneWiseSubstations = (id: string) => {
  return useQuery({
    queryKey: ["substation", id],
    queryFn: () => GetSingleZone(id),
    retry: false,
  });
};
