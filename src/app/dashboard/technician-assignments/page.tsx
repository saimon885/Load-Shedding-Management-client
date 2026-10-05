import GetTechnicianAssignments from "@/components/dashboard/technician/GetTechnicianAssignments";

const technicianAssignments = () => {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Technician Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage and track your assigned outage tasks.
        </p>
      </div>

      <GetTechnicianAssignments />
    </div>
  );
};

export default technicianAssignments;
