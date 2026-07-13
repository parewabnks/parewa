import { z } from "zod";

export const slideSchema = z.object({
  title: z.string(),
  author: z.string(),
});
