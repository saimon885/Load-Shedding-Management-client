import apiClient from "@/lib/ApiClient";

export const CreateOutageReport = (payload: any) => {
  return apiClient(`/outage-reports/create-report`, {
    method: "POST",
    body: payload,
  });
};

export const GetOutageReport = () => {
  return apiClient(`/outage-reports/get-report`, { method: "GET" });
};
