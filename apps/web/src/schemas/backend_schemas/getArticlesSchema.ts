import { z } from "zod";
import { datestring } from "./dateStringSchema";

export const getArticlesSchema = z.object({
  search_string: z.string(),
  startDate: datestring,
  endDate: datestring,
})