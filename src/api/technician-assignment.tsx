import apiClient from "@/lib/ApiClient";

export const GetAllTechnician = () => {
  return apiClient("/assignments/all-technician", { method: "GET" });
};

export const CreateTechnicianAssignment = (payload: any) => {
  return apiClient("/assignments/create", { method: "POST", body: payload });
};
