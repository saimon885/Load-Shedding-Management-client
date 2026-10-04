import { CreatePayment } from "@/api/payments";
import { useMutation } from "@tanstack/react-query";

export const CreatePaymentHook = () => {
  return useMutation({
    mutationFn: CreatePayment,
  });
};
