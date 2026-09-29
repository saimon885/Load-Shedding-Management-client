import React from "react";
import OTP from "@/components/form/OTP";
import { ShieldCheck, Zap } from "lucide-react";

const InputOTPDemo = () => {
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
                  Secure Email Verification
                </div>

                <h2 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                  Verify your email.
                  <br />
                  Secure your account.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                  Enter the verification code sent to your email address to
                  confirm your email and complete your account setup.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <Zap className="mb-3 h-5 w-5 text-amber-400" />

                  <p className="text-sm font-semibold text-white">
                    Quick Verification
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Verify your email with the 6-digit code we sent you.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <ShieldCheck className="mb-3 h-5 w-5 text-emerald-400" />

                  <p className="text-sm font-semibold text-white">
                    Account Protection
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Email verification helps keep your account secure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-md space-y-6">
              <div className="space-y-2 text-center lg:text-left">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Verify your email
                </h1>

                <p className="text-sm text-muted-foreground">
                  We&apos;ve sent a 6-digit verification code to your email.
                  Enter it below to confirm your email address.
                </p>
              </div>

              <OTP />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InputOTPDemo;
