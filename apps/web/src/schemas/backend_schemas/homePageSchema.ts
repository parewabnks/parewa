import { z } from "zod";
import { ArticleSchema } from "./articleSchema";

export const slideSchema = z.object({
  title: z.string(),
  author: z.string(),
});

export const categoriesSchema = z.object({
  slug: z.string(),
  title: z.string(),
});

export const rlinkSchema = z.object({
  label: z.string(),
  openInNewTab: z.boolean(),
  url: z.string(),
});

export const articlesResultSchema = z.object({
  total: z.number(),
  articles: z.array(ArticleSchema),
});