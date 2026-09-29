import { GetMe, LogOut, UserLogin } from "@/api/auth.api";
import { toast } from "@/components/ui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UseLoginHook = () => {
  return useMutation({
    mutationFn: UserLogin,
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
    mutationFn: LogOut, // apnar existing logout API function
    onSuccess: () => {
      queryClient.setQueryData(["user"], null); // key ta UsegetMeHook er key er sathe mile thakte hobe
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
