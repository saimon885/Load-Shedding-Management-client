import apiClient from "@/lib/ApiClient";

export const GetSingleZone = (id: string) => {
  return apiClient(`/substations/get/${id}`, { method: "GET" });
};
export const CreateSubstation = (payload: any) => {
  return apiClient(`/substations/create`, { method: "POST", body: payload });
};
