"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { LoginPayload } from "@/types/auth/login";
import { LoginSchema } from "@/validation/form/auth/LoginValidation";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { UseLoginHook } from "@/hooks/auth.hook";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import ForgotPasswordComponent from "./ForgotPasswordComponent";
import GoogleLoginResponse from "../google/GoogleLogin";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: login, isPending: isLoading } = UseLoginHook();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "admin@gmail.com",
    },
  });

  const handleLogin = (data: LoginPayload) => {
    login(data, {
      onSuccess: (res) => {
        toast.add({
          title: "Login Success",
          description: "Welcome back",
          type: "success",
        });
        if (res.success) {
          router.push("/");
        }
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
      <form onSubmit={handleSubmit(handleLogin)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="h-11"
              {...register("email")}
            />
            {errors.email && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <ForgotPasswordComponent
                trigger={trigger}
                getValues={getValues}
              />
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="h-11 pr-11"
                {...register("password")}
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
            {errors.password && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </Field>

          <Field>
            <Button disabled={isLoading} type="submit" className="h-10 w-full">
              {isLoading ? (
                <>
                  <Spinner /> submitting..
                </>
              ) : (
                "LogIn"
              )}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline dark:text-sky-400"
              >
                Create an account
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>

      <FieldSeparator className="mt-3">Or continue with</FieldSeparator>

      <GoogleLoginResponse />
    </div>
  );
};

export default LoginForm;
