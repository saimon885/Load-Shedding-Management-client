import { CreatePayment, GetMyPayments } from "@/api/payments";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreatePaymentHook = () => {
  return useMutation({
    mutationFn: CreatePayment,
  });
};

export const UsegetMyPayments = () => {
  return useQuery({
    queryKey: ["my-payment-history"],
    queryFn: GetMyPayments,
    retry: false,
  });
};
