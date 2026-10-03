import apiClient from "@/lib/ApiClient";

export const CreateOutageReport = (payload: any) => {
  return apiClient(`/outage-reports/create-report`, {
    method: "POST",
    body: payload,
  });
};
