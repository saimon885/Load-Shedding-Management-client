import apiClient from "@/lib/ApiClient";

export const GetSingleZone = (id: string) => {
  return apiClient(`/substations/get/${id}`, { method: "GET" });
};
