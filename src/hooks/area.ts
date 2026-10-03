import { CreateArea, GetAreasByFeeder } from "@/api/area";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateAreaHook = () => {
  return useMutation({
    mutationFn: CreateArea,
  });
};

export const getFeederWiseAreas = (id: string) => {
  return useQuery({
    queryKey: ["areas", id],
    queryFn: () => GetAreasByFeeder(id),
    retry: false,
  });
};
