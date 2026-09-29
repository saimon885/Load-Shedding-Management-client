"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { otpSchema } from "@/validation/form/auth/Otp-validation";

type OTPFormValues = z.infer<typeof otpSchema>;

const OTP = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: OTPFormValues) => {
    console.log("Submitted OTP:", data.otp);
  };

  const handleResend = () => {
    console.log("Resend OTP triggered");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FieldGroup>
          <Field className="flex flex-col items-center justify-center lg:items-start">
            <FieldLabel htmlFor="pin" className="mb-3 text-sm font-medium">
              Enter OTP Code
            </FieldLabel>

            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup className="gap-2 sm:gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="h-12 w-12 rounded-md border text-lg font-semibold sm:h-14 sm:w-14"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />

            {errors.otp && (
              <span className="mt-2 text-xs font-medium text-red-500">
                {errors.otp.message}
              </span>
            )}
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full font-medium"
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </Button>

        <FieldDescription className="text-center text-sm">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-blue-600 hover:underline dark:text-sky-400"
          >
            Resend OTP
          </button>
        </FieldDescription>
      </form>
    </div>
  );
};

export default OTP;
