import apiClient from "@/lib/ApiClient";

export const CreateOutage = (payload: any) => {
  return apiClient(`/outages/create`, { method: "POST", body: payload });
};
export const CreateOutageEmergency = (payload: any) => {
  return apiClient(`/outages/emergency`, { method: "POST", body: payload });
};

export const GetNotification = () => {
  return apiClient(`/notifications`, { method: "GET" });
};

export const GetScheduleOutage = () => {
  return apiClient(`/schedules/get`, { method: "GET" });
};
export const GetAllOutage = () => {
  return apiClient(`/outages/get`, { method: "GET" });
};

export const GetSingleOutage = (id: string) => {
  return apiClient(`/outages/get/${id}`, { method: "GET" });
};
export const UpdateOutage = (id: string, payload: any) => {
  return apiClient(`/outages/status/${id}`, { method: "PATCH", body: payload });
};
export const DeleteOutage = (id: string) => {
  return apiClient(`/outages/del/${id}`, { method: "DELETE" });
};

export const GetOutageStates = () => {
  return apiClient(`/outages/analytics/outage-stats`, { method: "GET" });
};
