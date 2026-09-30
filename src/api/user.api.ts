import apiClient from "@/lib/ApiClient";
import { FormValues } from "@/types/user/User.type";

export const GetMe = () => {
  return apiClient("/users/me", { method: "GET" });
};

export const UpdateUser = (payload: FormData) => {
  return apiClient("/users/update/me", { method: "PATCH", body: payload });
};
