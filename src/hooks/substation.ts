import { CreateSubstation, GetSingleZone } from "@/api/substation";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateSubstationHook = () => {
  return useMutation({
    mutationFn: CreateSubstation,
  });
};
export const getZoneWiseSubstations = (payload: any) => {
  return useQuery({
    queryKey: [
      "substation",
      payload.id,
      payload.params?.searchTerm,
      payload.params?.page,
    ],
    queryFn: () => GetSingleZone(payload.id, payload.params),
    retry: false,
    enabled: !!payload.id,
  });
};
