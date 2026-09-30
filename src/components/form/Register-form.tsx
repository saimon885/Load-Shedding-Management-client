"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { RegisterPayload } from "@/types/auth/register";
import { RegisterSchema } from "@/validation/form/auth/RegisterValidation";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { UserRegisterHook } from "@/hooks/auth.hook";
import { email } from "zod";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { mutate: Register, isPending: isLoading } = UserRegisterHook();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = (value: RegisterPayload) => {
    console.log("Validation Successful! Data:", value);
    // const payload = {
    //   name: value.name,
    //   email: value.email,
    //   password: value.password,
    // };
    Register(value, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again",
            type: "error",
          });
        }
        toast.add({
          title: "6 digit Pin Submit",
          description: " Please Check your Email and send to OTP.",
          type: "success",
        });

        const params = new URLSearchParams({ email: value.email });
        router.push(`/verify-email?${params.toString()}`);
      },
      onError: (err) => {
        toast.add({
          title: "Authorization failure",
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)} noValidate>
        <FieldGroup>
          {/* Full Name */}
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input
              id="name"
              {...register("name")}
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              className="h-11"
            />
            {errors.name && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.name.message}
              </span>
            )}
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="h-11"
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.email.message}
              </span>
            )}
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                autoComplete="new-password"
                className="h-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.password.message}
              </span>
            )}
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
            <div className="relative">
              <Input
                id="confirmPassword"
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                autoComplete="new-password"
                className="h-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.confirmPassword.message}
              </span>
            )}
          </Field>

          <Field>
            <Button disabled={isLoading} type="submit" className="h-11 w-full">
              {isLoading ? (
                <>
                  {" "}
                  <Spinner /> Submiting...
                </>
              ) : (
                "Create account"
              )}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline dark:text-sky-400"
              >
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default RegisterForm;
