import { GetFeedersBySubstation } from "@/api/feeders";
import { useQuery } from "@tanstack/react-query";

export const getSubstationWiseFeeders = (id: string) => {
  return useQuery({
    queryKey: ["feeders", id],
    queryFn: () => GetFeedersBySubstation(id),
    retry: false,
  });
};
