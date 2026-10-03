import { CreateSubstation, GetSingleZone } from "@/api/substation";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateSubstationHook = () => {
  return useMutation({
    mutationFn: CreateSubstation,
  });
};

export const getZoneWiseSubstations = (id: string) => {
  return useQuery({
    queryKey: ["substation", id],
    queryFn: () => GetSingleZone(id),
    retry: false,
  });
};
