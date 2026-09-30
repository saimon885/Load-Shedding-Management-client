import z from "zod";

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),

  address: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address must be less than 255 characters"),

  phone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid Bangladesh phone number"),

  areaId: z.string().uuid("Invalid area ID"),

  profileImage: z.custom<FileList>().optional(),
});

export type FormValues = z.infer<typeof UpdateUserSchema>;
