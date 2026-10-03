import { CreateOutageReport } from "@/api/outage-report";
import { useMutation } from "@tanstack/react-query";

export const CreateOutageReportHook = () => {
  return useMutation({
    mutationFn: CreateOutageReport,
  });
};
