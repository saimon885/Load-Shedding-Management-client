import apiClient from "@/lib/ApiClient";

export const GetAllTechnician = () => {
  return apiClient("/assignments/all-technician", { method: "GET" });
};
export const GetTechnicianAssignment = () => {
  return apiClient("/assignments/technician-assignment", { method: "GET" });
};

export const CreateTechnicianAssignment = (payload: any) => {
  return apiClient("/assignments/create", { method: "POST", body: payload });
};
export const UpdateTechnicianAssignment = (payload: any) => {
  return apiClient(`/assignments/status/${payload.id}`, {
    method: "PATCH",
    body: payload,
  });
};
