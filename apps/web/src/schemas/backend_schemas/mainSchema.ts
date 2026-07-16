import { z } from "zod";
import { SanityImageSchema } from "./sanityImageSchema";

export const ArticleSchema = z.object({
  _id: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  title: z.string(),
  oneLiner: z.string().nullable().optional(),
  featuredImage: SanityImageSchema.nullable().optional(),
  author: z.object({
    _id: z.string(),
    _type: z.string(),
    displayName: z.string(),
  }),
  tags: z.array(z.string()).nullable(),
  publishedAt: z.string().optional(),
});

export const articlesResultSchema = z.object({
  total: z.number(),
  articles: z.array(ArticleSchema),
})