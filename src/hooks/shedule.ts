import { CreateShedule } from "@/api/shedule";
import { useMutation } from "@tanstack/react-query";

export const CreateSheduleHook = () => {
  return useMutation({
    mutationFn: CreateShedule,
  });
};
