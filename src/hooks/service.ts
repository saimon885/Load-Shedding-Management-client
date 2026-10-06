import { CreateService, GetAllServices, GetMyServices } from "@/api/service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateServieHook = () => {
  return useMutation({
    mutationFn: CreateService,
  });
};

export const UsegetMyServiceHook = () => {
  return useQuery({
    queryKey: ["all-service"],
    queryFn: GetMyServices,
    retry: false,
  });
};
export const UsegetAllServiceHook = () => {
  return useQuery({
    queryKey: ["all-service"],
    queryFn: GetAllServices,
    retry: false,
  });
};
