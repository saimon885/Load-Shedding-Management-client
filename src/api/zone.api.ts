import apiClient from "@/lib/ApiClient";

export const CreateZone = (payload: any) => {
  return apiClient("/zones/create", { method: "POST", body: payload });
};
export const GetZone = (params: any) => {

  return apiClient("/zones", { params });
};

export const UpdateZone = (payload: any) => {
  return apiClient(`/zones/update`, { method: "PATCH", body: payload });
};
