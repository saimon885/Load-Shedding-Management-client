import {
  CreateUser,
  ForgotPassword,
  GetMe,
  googleOAuth,
  LogOut,
  ResetPassword,
  UserLogin,
  VerifyEmail,
} from "@/api/auth.api";
import { toast } from "@/components/ui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface ForgotPasswordOptions {
  onSuccessRedirect?: (res: any, variables: { email: string }) => void;
}

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

export const UseForgotPassword = (options?: ForgotPasswordOptions) => {
  const router = useRouter();

  return useMutation({
    mutationFn: ForgotPassword,
    onSuccess: (res: any, variables: { email: string }) => {
      if (!res.success) {
        toast.add({
          title: "Server Failure",
          description: res.message || "Something went wrong",
          type: "error",
        });
        return;
      }

      toast.add({
        title: "Forgot Password",
        description: "Check your mail and submit OTP",
        type: "success",
      });

      if (options?.onSuccessRedirect) {
        options.onSuccessRedirect(res, variables);
      } else {
        const params = new URLSearchParams({ email: variables.email });
        router.push(`/forgot-password?${params.toString()}`);
      }
    },
    onError: (err: any) => {
      toast.add({
        title: "Forgot Password failure",
        description: err.message || "Something went wrong. Please try again",
        type: "error",
      });
    },
  });
};

export const UseResetPasswordHook = () => {
  return useMutation({
    mutationFn: ResetPassword,
  });
};
export const UseGoogleOauthHook = () => {
  return useMutation({
    mutationFn: googleOAuth,
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
