import * as z from "zod";

export const daysOfWeek = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

export const scheduleOutageSchema = z
  .object({
    dayOfWeek: z.enum(daysOfWeek),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    reason: z.string().min(1, "Reason is required"),
    areaId: z.string(),
    feederId: z.string(),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) {
        return true;
      }

      const start = timeToMinutes(data.startTime);
      const end = timeToMinutes(data.endTime);
      const duration = end - start;

      return duration >= 1 * 60;
    },
    {
      message:
        "End time must be after start time and outage duration must be at least 4 hours",
      path: ["endTime"],
    },
  );
