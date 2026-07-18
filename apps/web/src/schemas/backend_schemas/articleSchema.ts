import { z } from "zod";

import { SanityImageSchema } from "./sanityImageSchema";
import { PortableTextContentSchema } from "./portableTextSchema";

export type { PortableTextContent } from "./portableTextSchema";

const ArticleAuthorSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  displayName: z.string(),
  batch: z.string().optional(),
  displayPicture: SanityImageSchema.nullable().optional(),
  email: z.string().optional().nullable(),
  fullName: z.string(),
  grade: z.string().optional().nullable(),
  roll: z.string().optional().nullable(),
  role: z.string(),
  position: z.string().optional().nullable(),
  graduatedYear: z.number().optional(),
  contactNumber: z.string().optional().nullable(),
  initials: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  house: z.string().optional().nullable(),
  organization: z.string().optional().nullable(),
});

const ArticleCategorySchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
});

export const SubArticleSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  oneLiner: z.string().nullable().optional(),
  content: PortableTextContentSchema.nullable().optional(),
  featuredImage: SanityImageSchema.nullable().optional(),
  imageDescription: z.string().nullable().optional(),
  author: ArticleAuthorSchema,
  category: ArticleCategorySchema,
  tags: z.array(z.string()).nullable().optional(),
  publishedAt: z.string(),
});

export const ArticleSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  oneLiner: z.string().nullable().optional(),
  content: PortableTextContentSchema.nullable().optional(),
  featuredImage: SanityImageSchema.nullable().optional(),
  imageDescription: z.string().nullable().optional(),
  author: ArticleAuthorSchema,
  category: ArticleCategorySchema,
  tags: z.array(z.string()).nullable().optional(),
  publishedAt: z.string(),
  relatedArticles: z.array(SubArticleSchema).nullable().optional(),
  latestArticles: z.array(SubArticleSchema).nullable().optional(),
});

export type Article = z.infer<typeof ArticleSchema>;
