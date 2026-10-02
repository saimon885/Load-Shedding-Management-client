import apiClient from "@/lib/ApiClient";

export const CreateZone = (payload) => {
  return apiClient("/zones/create", { method: "POST", body: payload });
};
export const GetZone = () => {
  return apiClient("/zones", { method: "GET" });
};
export const GetSingleZone = (id: string) => {
  return apiClient(`/substations/get/${id}`, { method: "GET" });
};
export const GetFeedersBySubstation = (id: string) => {
  return apiClient(`/feeders/get/${id}`, { method: "GET" });
};
export const UpdateZone = (payload) => {
  return apiClient(`/zones/update`, { method: "PATCH", body: payload });
};
