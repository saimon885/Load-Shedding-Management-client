"use client";
import { useForm, Controller } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ForgotPasswordFormData } from "@/types/auth/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/validation/form/auth/Otp-validation";

const ForgotPasswordHandle = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
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

          <Input
            id="newPassword"
            className="h-10"
            type="password"
            placeholder="Enter your new password"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <span className="text-xs text-red-500 mt-1 block">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <Button type="submit" className="h-11 w-full">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordHandle;
