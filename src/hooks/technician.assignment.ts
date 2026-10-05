import {
  CreateTechnicianAssignment,
  GetAllTechnician,
  GetTechnicianAssignment,
  UpdateTechnicianAssignment,
} from "@/api/technician-assignment";
import { useMutation, useQuery } from "@tanstack/react-query";

export const UsegetAllTechnicainHook = () => {
  return useQuery({
    queryKey: ["technician"],
    queryFn: GetAllTechnician,
    retry: false,
  });
};
export const UsegetTechnicianAssignment = () => {
  return useQuery({
    queryKey: ["technician-assignments"],
    queryFn: GetTechnicianAssignment,
    retry: false,
  });
};

export const CreateTechnicianAssignHook = () => {
  return useMutation({
    mutationFn: CreateTechnicianAssignment,
  });
};
export const UpdateTechnicianAssignHook = () => {
  return useMutation({
    mutationFn: UpdateTechnicianAssignment,
  });
};
