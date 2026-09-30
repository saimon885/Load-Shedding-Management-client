import { GetMe, UpdateUser } from "@/api/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const UsegetMeHook = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: GetMe,
    retry: false,
  });
};
export const UpdateUserHook = () => {
  return useMutation({
    mutationFn: UpdateUser,
  });
};
