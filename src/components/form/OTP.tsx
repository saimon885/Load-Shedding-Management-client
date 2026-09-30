"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchema } from "@/validation/form/auth/Otp-validation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { UseVerifyEmailHook } from "@/hooks/auth.hook";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

type OTPFormValues = z.infer<typeof otpSchema>;

const OTP = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mutate: Verify, isPending: isLoading } = UseVerifyEmailHook();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const email = searchParams.get("email") || "";
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email]);

  const onSubmit = (data: OTPFormValues) => {
    const payload = {
      email,
      otp: data.otp,
    };
    Verify(payload, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again",
            type: "error",
          });
        }
        toast.add({
          title: "Verification Successful",
          description: "Welcome onboard",
          type: "success",
        });
        router.push("/");
      },
      onError: (err) => {
        toast.add({
          title: "Verification failure",
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
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
          disabled={isLoading}
          className="h-11 w-full font-medium"
        >
          {isLoading ? (
            <>
              {" "}
              <Spinner /> Verifying...
            </>
          ) : (
            "Verify Code"
          )}
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
