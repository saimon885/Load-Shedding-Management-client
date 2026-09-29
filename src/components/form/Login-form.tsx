"use client";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginPayload } from "@/types/auth/login";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/validation/form/auth/LoginValidation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({ resolver: zodResolver(LoginSchema) });
  const handleLogin = (data: LoginPayload) => {
    console.log("Login Data:", data);
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
              required
              className="h-11"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.email.message}
              </span>
            )}
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-sky-400"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="h-11"
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
              <span className="text-xs text-red-500 mt-1 block">
                {errors.password.message}
              </span>
            )}
          </Field>

          <Field>
            <Button type="submit" className="h-8 w-full">
              Sign in <ArrowRight className="ml-2 h-4 w-4" />
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
      <FieldSeparator className="mt-2">Or continue with</FieldSeparator>
      <Button className={"w-full h-8 my-3"}>Google</Button>
    </div>
  );
};

export default LoginForm;
