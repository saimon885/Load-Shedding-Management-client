import { CreateService, GetMyServices } from "@/api/service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateServieHook = () => {
  return useMutation({
    mutationFn: CreateService,
  });
};

export const UsegetMyServiceHook = () => {
  return useQuery({
    queryKey: ["my-service"],
    queryFn: GetMyServices,
    retry: false,
  });
};
