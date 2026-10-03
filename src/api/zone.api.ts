import apiClient from "@/lib/ApiClient";

export const CreateZone = (payload: any) => {
  return apiClient("/zones/create", { method: "POST", body: payload });
};
export const GetZone = () => {
  return apiClient("/zones", { method: "GET" });
};

export const UpdateZone = (payload: any) => {
  return apiClient(`/zones/update`, { method: "PATCH", body: payload });
};
