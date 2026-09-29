import Link from "next/link";
import { ShieldCheck, Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Logo from "@/components/layout/shared/Header/Logo";
import LoginForm from "@/components/form/Login-form";

const Login = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-2xl border bg-background shadow-xl lg:grid-cols-2">
          <div className="relative hidden min-h-[620px] overflow-hidden bg-slate-950 lg:block">
            <img
              src="https://images.openai.com/static-rsc-4/fUFo10JgP9fGAVAAKcjZbL367nuwD9zoqSENtUV3-hJqTbIgYO1cMDvOem7FFHUQiqTJ-E89rOgV2lWmvL7fd3d4h0Dhm6qQlVIk7ZSNl7cyxmvuG7jNPFBwCb1eUB-4pqfBzw4BUzNIJGQYDxfnAdbvnM8ZWmd-uMfYSRpYeHY?purpose=inline"
              alt="Power grid and electricity infrastructure"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/60 to-slate-900/30" />

            <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Power Management Platform
                </div>

                <h2 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                  Stay informed.
                  <br />
                  Stay connected.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                  Monitor scheduled load shedding, track unexpected outages,
                  report power issues, and keep your community informed.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <Zap className="mb-3 h-5 w-5 text-amber-400" />

                  <p className="text-sm font-semibold text-white">
                    Smart Monitoring
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Real-time outage and power status tracking.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <ShieldCheck className="mb-3 h-5 w-5 text-emerald-400" />

                  <p className="text-sm font-semibold text-white">
                    Secure Access
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Role-based access for every system user.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <div className="my-5">
                  <Logo></Logo>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Welcome back
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Sign in to monitor power outages, manage schedules, and access
                  your dashboard.
                </p>
              </div>

              <Card className="border-0 bg-transparent shadow-none">
                <CardHeader className="hidden p-0">
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to continue.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-3">
                  <LoginForm></LoginForm>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
