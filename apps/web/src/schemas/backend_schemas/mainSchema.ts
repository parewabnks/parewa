import { z } from "zod";

export const mainArticleSchema = z.object({
  _id: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  title: z.string(),
  oneLiner: z.string().nullable().optional(),
  featuredImage: z.unknown().nullable().optional(),
  author: z.object({
    _id: z.string(),
    _type: z.string(),
    displayName: z.string(),
  }),
  tags: z.array(z.unknown()).nullable().optional(),
  publishedAt: z.string().nullable().optional(),
});

export const mainSchema = z.array(mainArticleSchema);
