import { CreateOutageReport, GetOutageReport } from "@/api/outage-report";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CreateOutageReportHook = () => {
  return useMutation({
    mutationFn: CreateOutageReport,
  });
};

export const UsegetOutageReportHook= () => {
  return useQuery({
    queryKey: ["outage-report"],
    queryFn: GetOutageReport,
    retry: false,
  });
};
