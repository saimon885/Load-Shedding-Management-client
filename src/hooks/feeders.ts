import { CreateFeeder, GetFeedersBySubstation } from "@/api/feeders";
import { useMutation, useQuery } from "@tanstack/react-query";
export const CreateFeederHook = () => {
  return useMutation({
    mutationFn: CreateFeeder,
  });
};

export const getSubstationWiseFeeders = (id: string) => {
  return useQuery({
    queryKey: ["feeders", id],
    queryFn: () => GetFeedersBySubstation(id),
    retry: false,
  });
};
