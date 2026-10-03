import apiClient from "@/lib/ApiClient";

export const CreateOutage = (payload: any) => {
  return apiClient(`/outages/create`, { method: "POST", body: payload });
};
