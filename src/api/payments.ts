import apiClient from "@/lib/ApiClient";

export const CreatePayment = (payload: any) => {
  return apiClient("/payments/pay", { method: "POST", body: payload });
};

export const GetMyPayments = () => {
  return apiClient("/payments/my-payment-history", { method: "GET" });
};
export const GetallPayments = () => {
  return apiClient("/payments/all-payment-history", { method: "GET" });
};
