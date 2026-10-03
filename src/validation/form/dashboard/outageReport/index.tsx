import z from "zod";

export const OutageReportSchema = z.object({
  description: z.string().min(1, "Description is required"),
  areaId: z.string(),
});
