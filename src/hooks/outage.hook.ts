import { CreateOutage, GetNotification } from "@/api/outage";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateOutageHook = () => {
  return useMutation({
    mutationFn: CreateOutage,
  });
};
export const UsegetMyNotification = () => {
  return useQuery({
    queryKey: ["my-notification"],
    queryFn: GetNotification,
    retry: false,
  });
};
