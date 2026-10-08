import { CreateZone, GetZone, UpdateZone } from "@/api/zone.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateZoneHook = () => {
  return useMutation({
    mutationFn: CreateZone,
  });
};

export const UseGetZoneHook = (params: any) => {
  console.log("hook", params);
  return useQuery({
    queryKey: ["zones", params],
    queryFn: () => GetZone(params),
    retry: false,
  });
};

export const UpdateZoneHook = () => {
  return useMutation({
    mutationFn: UpdateZone,
  });
};
