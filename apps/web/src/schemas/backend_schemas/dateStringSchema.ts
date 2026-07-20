import { z } from "zod";

export const datestring = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "Invalid date format. Expected format: yyyy-mm-dd",
});
