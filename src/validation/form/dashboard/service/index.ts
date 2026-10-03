import z from "zod";

export const ServiceTypeEnum = z.enum([
  "NEW_CONNECTION",
  "METER_INSTALLATION",
  "METER_REPLACEMENT",
  "TECHNICAL_SERVICE",
]);

export const serviceSchema = z.object({
  type: ServiceTypeEnum,
  description: z.string().min(1, "Description is required"),
  areaId: z.string(),
  feederId: z.string(),
});
