import { CreateArea, GetAreasByFeeder, GetSingeArea } from "@/api/area";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateAreaHook = () => {
  return useMutation({
    mutationFn: CreateArea,
  });
};

export const getFeederWiseAreas = (payload: any) => {
  return useQuery({
    queryKey: [
      "areas",
      payload.id,
      payload.params?.searchTerm,
      payload.params?.page,
    ],
    queryFn: () => GetAreasByFeeder(payload.id, payload.params),
    retry: false,
  });
};
export const getSingleAreasOrDetailsHook = (id: string) => {
  return useQuery({
    queryKey: ["areas", id],
    queryFn: () => GetSingeArea(id),
    retry: false,
  });
};
