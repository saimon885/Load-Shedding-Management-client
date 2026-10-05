import { CreatePayment, GetallPayments, GetMyPayments } from "@/api/payments";
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
export const UsegetAllPayments = () => {
  return useQuery({
    queryKey: ["all-payment-history"],
    queryFn: GetallPayments,
    retry: false,
  });
};
