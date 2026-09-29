import React from "react";
import { KeyRound, ShieldCheck } from "lucide-react";

import ForgotPasswordHandle from "@/components/form/Forgot-Password";
import Logo from "@/components/layout/shared/Header/Logo";

const ForgotPassword = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-2xl border bg-background shadow-xl lg:grid-cols-2">
          <div className="relative hidden min-h-[680px] overflow-hidden bg-slate-950 lg:block">
            <img
              src="/images/verify-otp.png"
              alt="Power grid and electricity infrastructure"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/60 to-slate-900/30" />

            <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Account Recovery
                </div>

                <h2 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                  Reset your password.
                  <br />
                  Secure your account.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                  Verify your email with the one-time code and create a new
                  password to regain secure access to your account.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <KeyRound className="mb-3 h-5 w-5 text-amber-400" />

                  <p className="text-sm font-semibold text-white">
                    Easy Recovery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Reset your password using a secure verification code.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <ShieldCheck className="mb-3 h-5 w-5 text-emerald-400" />

                  <p className="text-sm font-semibold text-white">
                    Secure Access
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Protect your account with a new secure password.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-md space-y-6">
              <div className="mb-8">
                <div className="my-5">
                  <Logo></Logo>
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Reset your password
                </h1>

                <p className="text-sm text-muted-foreground">
                  Enter the verification code and your new password below.
                </p>
              </div>

              <ForgotPasswordHandle />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
