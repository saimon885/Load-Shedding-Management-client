import apiClient from "@/lib/ApiClient";
import { LoginPayload } from "@/types/auth/login";
import {
  ForgotPasswordPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from "@/types/auth/register";

export const UserLogin = (payload: LoginPayload) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};
export const CreateUser = (payload: RegisterPayload) => {
  return apiClient("/auth/register", { method: "POST", body: payload });
};

export const VerifyEmail = (payload: VerifyEmailPayload) => {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
};
export const ForgotPassword = (payload: ForgotPasswordPayload) => {
  return apiClient("/auth/forgot-password", { method: "POST", body: payload });
};

export const ResetPassword = (payload: ResetPasswordPayload) => {
  return apiClient("/auth/reset-password", { method: "POST", body: payload });
};
export const GetMe = () => {
  return apiClient("/users/me", { method: "GET" });
};

export const LogOut = () => {
  return apiClient("/auth/logout", { method: "POST" });
};
