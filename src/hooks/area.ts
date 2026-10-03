import { GetAreasByFeeder } from "@/api/area";
import { useQuery } from "@tanstack/react-query";

export const getFeederWiseAreas = (id: string) => {
  return useQuery({
    queryKey: ["areas", id],
    queryFn: () => GetAreasByFeeder(id),
    retry: false,
  });
};
