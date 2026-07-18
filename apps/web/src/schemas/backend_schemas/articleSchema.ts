import { z } from "zod";
import { ArticleAuthorSchema } from "./authorSchema";
import { SanityImageSchema } from "./sanityImageSchema";
import { PortableTextContentSchema } from "./portableTextSchema";

export type { PortableTextContent } from "./portableTextSchema";
  
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
