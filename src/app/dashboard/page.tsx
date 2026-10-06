import Can from "@/components/auth/RoleCan";
import AdminStates from "@/components/dashboard/states/AdminStates";
import OperatorAndZoneMangerState from "@/components/dashboard/states/Oper-ZoneManState";

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Power Management Overview
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your power network, infrastructure, and outage activity from
          one place.
        </p>
      </div>

      <Can permission="states_admin:view">
        <AdminStates />
      </Can>

      <Can permission="states_znop:view">
        <OperatorAndZoneMangerState />
      </Can>
    </div>
  );
};

export default Page;
