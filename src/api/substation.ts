import apiClient from "@/lib/ApiClient";

export const GetSingleZone = (id: string, params: any) => {
  console.log(id, params);
  return apiClient(`/substations/get/${id}`, { params });
};
export const CreateSubstation = (payload: any) => {
  return apiClient(`/substations/create`, { method: "POST", body: payload });
};
