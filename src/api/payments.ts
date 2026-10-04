import apiClient from "@/lib/ApiClient";

export const CreatePayment = (payload: any) => {
  return apiClient("/payments/pay", { method: "POST", body: payload });
};
