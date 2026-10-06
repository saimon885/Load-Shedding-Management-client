/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: <explanation> */
"use client";

import {
  Activity,
  AlertTriangle,
  Building2,
  FileWarning,
  Map,
  Network,
  Server,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { UsegetAdminState } from "@/hooks/state-hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CHART_COLORS = ["#2563eb", "#7c3aed", "#059669", "#f59e0b", "#ef4444"];

const infrastructureColors = ["#2563eb", "#7c3aed", "#06b6d4", "#f59e0b"];

const serviceColors = ["#ef4444", "#f97316", "#8b5cf6", "#10b981"];

const AdminStates = () => {
  const { data, isLoading } = UsegetAdminState();

  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-56 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-80 animate-pulse rounded bg-muted" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Card key={index}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                  </div>

                  <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="h-[430px]">
            <CardContent className="h-full p-6">
              <div className="h-full animate-pulse rounded-xl bg-muted/50" />
            </CardContent>
          </Card>

          <Card className="h-[430px]">
            <CardContent className="h-full p-6">
              <div className="h-full animate-pulse rounded-xl bg-muted/50" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="flex min-h-[300px] flex-col items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <Server className="h-7 w-7 text-muted-foreground" />
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            Dashboard data unavailable
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            We couldn't load the system statistics.
          </p>
        </CardContent>
      </Card>
    );
  }

  const infrastructureData = [
    {
      name: "Zones",
      value: stats.totalZone,
    },
    {
      name: "Substations",
      value: stats.totalSubstation,
    },
    {
      name: "Feeders",
      value: stats.totalFeeder,
    },
    {
      name: "Areas",
      value: stats.totalArea,
    },
  ];

  const userRoleData = [
    {
      name: "Admin",
      value: stats.totalAdmin,
    },
    {
      name: "Zone Manager",
      value: stats.totalZone_manager,
    },
    {
      name: "Operator",
      value: stats.totalOperator,
    },
    {
      name: "Technician",
      value: stats.totalTechnician,
    },
    {
      name: "Customer",
      value: stats.totalCustomar,
    },
  ];

  const serviceData = [
    {
      name: "Outages",
      value: stats.totalOutages,
    },
    {
      name: "Reports",
      value: stats.outageReports,
    },
    {
      name: "Requests",
      value: stats.totalServiceRequest,
    },
    {
      name: "Payments",
      value: stats.totalPayment,
    },
  ];

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      description: "Registered accounts",
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Infrastructure",
      value:
        stats.totalZone +
        stats.totalSubstation +
        stats.totalFeeder +
        stats.totalArea,
      description: "Connected assets",
      icon: Network,
      iconColor: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-500/10",
    },
    {
      title: "Active Outages",
      value: stats.totalOutages,
      description: "Recorded outages",
      icon: Zap,
      iconColor: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-500/10",
    },
    {
      title: "Service Requests",
      value: stats.totalServiceRequest,
      description: "Customer requests",
      icon: Wrench,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
  ];

  const infrastructureTotal = infrastructureData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  const roleTotal = userRoleData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-7">
      {/* Header */}

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Activity className="h-5 w-5" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Power Management Dashboard
          </h1>
        </div>

        <p className="text-sm text-muted-foreground">
          Monitor power infrastructure, outages, users and service activity.
        </p>
      </div>

      {/* Primary Statistics */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="border-border/60 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight">
                      {item.value}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Infrastructure + User Distribution */}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Infrastructure */}

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="border-b border-border/50 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Network className="h-4 w-4" />
                  </div>
                  Infrastructure Distribution
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Power infrastructure across the distribution network
                </p>
              </div>

              <div className="hidden rounded-lg bg-muted/60 px-3 py-2 text-right sm:block">
                <p className="text-xs text-muted-foreground">Total Assets</p>

                <p className="text-lg font-bold">{infrastructureTotal}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="h-[330px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={infrastructureData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 10,
                  }}
                  barCategoryGap="28%"
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(37, 99, 235, 0.06)",
                    }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--background))",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    }}
                  />

                  <Bar
                    dataKey="value"
                    name="Assets"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={65}
                  >
                    {infrastructureData.map((item, index) => (
                      <Cell
                        key={item.name}
                        fill={infrastructureColors[index]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {infrastructureData.map((item, index) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-border/60 bg-muted/20 p-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: infrastructureColors[index],
                      }}
                    />

                    <span className="text-xs text-muted-foreground">
                      {item.name}
                    </span>
                  </div>

                  <p className="mt-1 text-lg font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Distribution */}

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Users className="h-4 w-4" />
              </div>
              User Distribution
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              System users by role
            </p>
          </CardHeader>

          <CardContent className="pt-5">
            <div className="relative h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoleData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    stroke="hsl(var(--background))"
                    strokeWidth={4}
                  >
                    {userRoleData.map((item, index) => (
                      <Cell key={item.name} fill={CHART_COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--background))",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{roleTotal}</span>

                <span className="text-xs text-muted-foreground">
                  Total Users
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {userRoleData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: CHART_COLORS[index],
                      }}
                    />

                    <span className="text-sm">{item.name}</span>
                  </div>

                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Activity */}

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                Outage & Service Activity
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Current system activity and customer service operations
              </p>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-red-600 dark:text-red-400">
                <Zap className="h-4 w-4" />

                <span className="text-sm font-medium">
                  {stats.totalOutages} Outages
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={serviceData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 10,
                }}
                barCategoryGap="25%"
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  className="stroke-muted"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(239, 68, 68, 0.05)",
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "hsl(var(--background))",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                  }}
                />

                <Bar
                  dataKey="value"
                  name="Activity"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={70}
                >
                  {serviceData.map((item, index) => (
                    <Cell key={item.name} fill={serviceColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {serviceData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: serviceColors[index],
                    }}
                  />

                  <span className="text-sm text-muted-foreground">
                    {item.name}
                  </span>
                </div>

                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Infrastructure Summary */}

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-blue-500/20 bg-blue-500/[0.03] shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Map className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Distribution Zones
              </p>

              <p className="text-xl font-bold">{stats.totalZone}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-emerald-500/[0.03] shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Building2 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Substations</p>

              <p className="text-xl font-bold">{stats.totalSubstation}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-orange-500/[0.03] shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <FileWarning className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Outage Reports</p>

              <p className="text-xl font-bold">{stats.outageReports}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStates;
