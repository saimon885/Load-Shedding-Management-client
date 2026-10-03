import apiClient from "@/lib/ApiClient";

export const CreateShedule = (payload: any) => {
  return apiClient(`/schedules/create`, {
    method: "POST",
    body: payload,
  });
};
