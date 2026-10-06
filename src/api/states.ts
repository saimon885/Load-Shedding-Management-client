import apiClient from "@/lib/ApiClient";

export const GetAdminStates = () => {
  return apiClient(`/states/admin-state`, { method: "GET" });
};
export const GetOperAtorAndZonManState = () => {
  return apiClient(`/states/operator-zoneManager-state`, { method: "GET" });
};
