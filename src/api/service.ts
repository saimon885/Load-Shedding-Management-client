import apiClient from "@/lib/ApiClient";

export const CreateService = (payload: any) => {
  return apiClient(`/service/create-requests`, {
    method: "POST",
    body: payload,
  });
};
