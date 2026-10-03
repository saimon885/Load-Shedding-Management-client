import apiClient from "@/lib/ApiClient";

export const GetFeedersBySubstation = (id: string) => {
  return apiClient(`/feeders/get/${id}`, { method: "GET" });
};