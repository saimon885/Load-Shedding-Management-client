"use client";
import { useForm, Controller } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ForgotPasswordFormData } from "@/types/auth/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/validation/form/auth/Otp-validation";
import { useRouter, useSearchParams } from "next/navigation";
import { UseResetPasswordHook } from "@/hooks/auth.hook";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ForgotPasswordHandle = () => {
  const { mutate: ResetPass, isPending: isLoading } = UseResetPasswordHook();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const email = searchParams.get("email") || "";
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email]);
  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
    const payload = {
      email: email,
      newPassword: data.newPassword,
      otp: data.otp,
    };
    console.log(payload);
    ResetPass(payload, {
      onSuccess: (res) => {
        toast.add({
          title: "Password Reset",
          description: "Password Reset Successfull",
          type: "success",
        });
        if (res.success) {
          router.push("/login");
        }
      },
      onError: (err) => {
        toast.add({
          title: "Password Reset Failure.",
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <span className="text-sm font-medium">Verification Code</span>

          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup className="gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="h-12 w-12 rounded-md border text-lg font-semibold"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.otp && (
            <span className="text-xs text-red-500 mt-1 block">
              {errors.otp.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="newPassword" className="text-sm font-medium">
            New Password
          </label>

          <div className="relative">
            <Input
              id="newPassword"
              className="h-10"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              {...register("newPassword")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <span className="text-xs text-red-500 mt-1 block">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <Button disabled={isLoading} type="submit" className="h-11 w-full">
          {isLoading ? (
            <>
              {" "}
              <Spinner /> submiting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordHandle;
