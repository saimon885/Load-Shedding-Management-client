"use client";
import { UsegetMeHook } from "@/hooks/profile.hook";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import AuthLoading from "./Auth-Loading";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { data, isPending, isError } = UsegetMeHook();
  const router = useRouter();

  const user = data?.data;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }
  return <>{children}</>;
};

export default AuthGuard;
