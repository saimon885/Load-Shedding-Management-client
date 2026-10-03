import apiClient from "@/lib/ApiClient";

export const GetAreasByFeeder = (id: string) => {
  return apiClient(`/areas/get/${id}`, { method: "GET" });
};
export const CreateArea = (payload: any) => {
  return apiClient(`/areas/create`, { method: "POSt", body: payload });
};
