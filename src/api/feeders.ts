import apiClient from "@/lib/ApiClient";

export const GetFeedersBySubstation = (id: string) => {
  return apiClient(`/feeders/get/${id}`, { method: "GET" });
};
export const CreateFeeder = (payload: any) => {
  return apiClient(`/feeders/create`, { method: "POST", body: payload });
};
