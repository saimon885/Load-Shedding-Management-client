import { CreateZone, GetZone, UpdateZone } from "@/api/zone.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateZoneHook = () => {
  return useMutation({
    mutationFn: CreateZone,
  });
};

export const UseGetZoneHook = () => {
  return useQuery({
    queryKey: ["zones"],
    queryFn: GetZone,
    retry: false,
  });
};

export const UpdateZoneHook = () => {
  return useMutation({
    mutationFn: UpdateZone,
  });
};
