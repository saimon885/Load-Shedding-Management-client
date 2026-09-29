import apiClient from "@/lib/ApiClient";
import { LoginPayload } from "@/types/auth/login";

export const UserLogin = (payload: LoginPayload) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};

export const GetMe = () => {
  return apiClient("/users/me", { method: "GET" });
};

export const LogOut = () => {
  return apiClient("/auth/logout", { method: "POST" });
};
