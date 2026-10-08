import {
  CreateOutage,
  CreateOutageEmergency,
  DeleteOutage,
  GetAllOutage,
  GetNotification,
  GetOutageStates,
  GetScheduleOutage,
  GetSingleOutage,
  UpdateOutage,
} from "@/api/outage";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateOutageHook = () => {
  return useMutation({
    mutationFn: CreateOutage,
  });
};
export const CreateOutageEmergencyHook = () => {
  return useMutation({
    mutationFn: CreateOutageEmergency,
  });
};
export const UsegetMyNotification = () => {
  return useQuery({
    queryKey: ["my-notification"],
    queryFn: GetNotification,
    retry: false,
  });
};
export const UsegetAllOutageHook = (params?: {
  type?: string;
  status?: string;
  reason?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [
      "outages",
      params?.type,
      params?.status,
      params?.reason,
      params?.page,
    ],
    queryFn: () => GetAllOutage(params),
    retry: false,
  });
};
export const UsegetScheduleOutage = () => {
  return useQuery({
    queryKey: ["schedule-outage"],
    queryFn: GetScheduleOutage,
    retry: false,
  });
};
export const UsegetSingleOutageHook = (id: string) => {
  return useQuery({
    queryKey: ["outage", id],
    queryFn: () => GetSingleOutage(id),
    retry: false,
  });
};
export const UsegetOutageStates = () => {
  return useQuery({
    queryKey: ["outage-states"],
    queryFn: GetOutageStates,
    retry: false,
  });
};

export const UpdateOutageHook = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      UpdateOutage(id, data),
  });
};

export const DeleteOutageHook = (id: string) => {
  return useMutation({
    mutationFn: () => DeleteOutage(id),
  });
};
