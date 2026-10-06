import apiClient from "@/lib/ApiClient";

export const GetMe = () => {
  return apiClient("/users/me", { method: "GET" });
};

export const UpdateUser = (payload: FormData) => {
  return apiClient("/users/update/me", { method: "PATCH", body: payload });
};
