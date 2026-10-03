import z from "zod";

export const outageTypes = ["SCHEDULED", "UNEXPECTED"] as const;

export const createOutageSchema = z
  .object({
    type: z.enum(outageTypes),
    date: z.date("A date is required."),
    startTime: z.string().min(1, "Start time is required"),
    estimatedRestorationTime: z
      .string()
      .min(1, "Estimated restoration time is required"),
    reason: z.string().min(1, "Reason is required"),
    feederId: z.string().min(1, "Feeder is required"),
    areaId: z.string().min(1, "Area is required"),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.estimatedRestorationTime) {
        return true;
      }

      const [startHour, startMinute] = data.startTime.split(":").map(Number);
      const [restorationHour, restorationMinute] = data.estimatedRestorationTime
        .split(":")
        .map(Number);

      const startMinutes = startHour * 60 + startMinute;
      const restorationMinutes = restorationHour * 60 + restorationMinute;

      return restorationMinutes > startMinutes;
    },
    {
      message: "Estimated restoration time must be after start time",
      path: ["estimatedRestorationTime"],
    },
  );
