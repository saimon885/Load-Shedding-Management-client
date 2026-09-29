import { ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import RegisterForm from "@/components/form/Register-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Register = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-2xl border bg-background shadow-xl lg:grid-cols-2">
          <div className="relative hidden min-h-[680px] overflow-hidden bg-slate-950 lg:block">
            <img
              src="/images/register.png"
              alt="Power grid and electricity infrastructure"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/60 to-slate-900/30" />

            <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Smart Power Management
                </div>

                <h2 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                  Manage power.
                  <br />
                  Stay informed.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                  Create your account and get access to outage monitoring, load
                  shedding schedules, reports, and power management features.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <Zap className="mb-3 h-5 w-5 text-amber-400" />

                  <p className="text-sm font-semibold text-white">
                    Power Monitoring
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Track outages and power status from one place.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <ShieldCheck className="mb-3 h-5 w-5 text-emerald-400" />

                  <p className="text-sm font-semibold text-white">
                    Secure Platform
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Secure access with role-based system controls.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <Link href="/" className="mb-7 inline-flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-amber-400">
                    <Zap className="h-6 w-6 fill-current" strokeWidth={2.5} />
                  </span>

                  <div className="leading-none">
                    <p className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                      Power<span className="text-amber-500">Grid</span>
                    </p>

                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Load Management
                    </p>
                  </div>
                </Link>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Create your account
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Join the PowerGrid platform to monitor outages and manage your
                  power information.
                </p>
              </div>

              <Card className="border-0 bg-transparent shadow-none">
                <CardHeader className="hidden p-0">
                  <CardTitle>Create account</CardTitle>
                </CardHeader>

                <CardContent className="p-3">
                  <RegisterForm></RegisterForm>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
