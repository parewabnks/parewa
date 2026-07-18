import { z } from "zod";

export const eventSchema = z.object({
  title: z.string(),
  date: z.string(),
  slug: z.string(),
  location: z.string().optional(),
});

export const eventsResponseSchema = z.object({
  success: z.boolean(),
  events: z.array(eventSchema),
});

export type Event = z.infer<typeof eventSchema>;
