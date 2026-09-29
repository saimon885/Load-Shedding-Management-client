import React from "react";
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
import { ArrowRight } from "lucide-react";

const LoginForm = () => {
  return (
    <div>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="h-11"
            />
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

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="h-11"
            />
          </Field>

          <Field>
            <Button type="submit" className="h-8 w-full">
              Sign in
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
      <FieldSeparator className="my-3">Or continue with</FieldSeparator>
      <Button className={"w-full h-8"}>Google</Button>
    </div>
  );
};

export default LoginForm;
