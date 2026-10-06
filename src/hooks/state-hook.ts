import { GetAdminStates, GetOperAtorAndZonManState } from "@/api/states";
import { useQuery } from "@tanstack/react-query";

export const UsegetAdminState = () => {
  return useQuery({
    queryKey: ["all-states-admin"],
    queryFn: GetAdminStates,
    retry: false,
  });
};
export const UsegetOperAtorZoneMangState = () => {
  return useQuery({
    queryKey: ["all-states-OPZM"],
    queryFn: GetOperAtorAndZonManState,
    retry: false,
  });
};
