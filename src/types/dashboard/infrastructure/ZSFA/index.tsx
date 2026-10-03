import z from "zod";

export const zoneSchema = z.object({
  name: z.string().min(1, "Zone name is required"),
  code: z.string().min(1, "Zone code is required"),
  description: z.string().optional(),
});

export const substationSchema = z.object({
  name: z.string().min(1, "Substation name is required"),
  code: z.string().min(1, "Substation code is required"),
  location: z.string().optional(),
});

export const feederSchema = z.object({
  name: z.string().min(1, "Feeder name is required"),
  code: z.string().min(1, "Feeder code is required"),
  capacity: z.number().min(1, "Feeder capacity is required"),
});

export const areaSchema = z.object({
  name: z.string().min(1, "Area name is required"),
  code: z.string().min(1, "Area code is required"),
  description: z.string().min(1, "Area description is required"),
});
