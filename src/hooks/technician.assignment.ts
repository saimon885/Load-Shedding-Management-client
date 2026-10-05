import {
  CreateTechnicianAssignment,
  GetAllTechnician,
} from "@/api/technician-assignment";
import { useMutation, useQuery } from "@tanstack/react-query";

export const UsegetAllTechnicainHook = () => {
  return useQuery({
    queryKey: ["technician"],
    queryFn: GetAllTechnician,
    retry: false,
  });
};

export const CreateTechnicianAssignHook = () => {
  return useMutation({
    mutationFn: CreateTechnicianAssignment,
  });
};
