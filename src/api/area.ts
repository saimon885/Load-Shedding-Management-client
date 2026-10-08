import apiClient from "@/lib/ApiClient";

export const GetAreasByFeeder = (id: string, params: any) => {
  return apiClient(`/areas/get/${id}`, { params });
};
export const GetSingeArea = (id: string) => {
  return apiClient(`/areas/single/${id}`, { method: "GET" });
};
export const CreateArea = (payload: any) => {
  return apiClient(`/areas/create`, { method: "POSt", body: payload });
};
