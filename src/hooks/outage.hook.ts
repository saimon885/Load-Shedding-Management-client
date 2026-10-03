import { CreateOutage } from "@/api/outage";
import { useMutation } from "@tanstack/react-query";

export const CreateOutageHook = () => {
  return useMutation({
    mutationFn: CreateOutage,
  });
};
