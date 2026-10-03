import { CreateService } from "@/api/service";
import { useMutation } from "@tanstack/react-query";

export const CreateServieHook = () => {
  return useMutation({
    mutationFn: CreateService,
  });
};
