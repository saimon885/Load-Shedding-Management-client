import {
  CreateOutage,
  DeleteOutage,
  GetAllOutage,
  GetNotification,
  GetOutageStates,
  GetSingleOutage,
  UpdateOutage,
} from "@/api/outage";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateOutageHook = () => {
  return useMutation({
    mutationFn: CreateOutage,
  });
};
export const UsegetMyNotification = () => {
  return useQuery({
    queryKey: ["my-notification"],
    queryFn: GetNotification,
    retry: false,
  });
};
export const UsegetAllOutageHook = () => {
  return useQuery({
    queryKey: ["outage"],
    queryFn: GetAllOutage,
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
