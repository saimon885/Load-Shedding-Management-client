import {
  CreateUser,
  GetMe,
  LogOut,
  UserLogin,
  VerifyEmail,
} from "@/api/auth.api";
import { toast } from "@/components/ui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UseLoginHook = () => {
  return useMutation({
    mutationFn: UserLogin,
  });
};
export const UserRegisterHook = () => {
  return useMutation({
    mutationFn: CreateUser,
  });
};
export const UseVerifyEmailHook = () => {
  return useMutation({
    mutationFn: VerifyEmail,
  });
};

export const UsegetMeHook = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: GetMe,
    retry: false,
  });
};

export const UseLogOutHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      toast.add({
        title: "Logged out",
        description: "You have been logged out successfully",
        type: "success",
      });
    },
    onError: () => {
      toast.add({
        title: "Logout failed",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    },
  });
};
