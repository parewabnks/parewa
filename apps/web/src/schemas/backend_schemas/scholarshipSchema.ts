import { z } from "zod";
import { ArticleAuthorSchema } from "./authorSchema";
import { SanityImageSchema } from "./sanityImageSchema";

const ScholarshipDonorSchema = z.object({
  _key: z.string(),
  donor: ArticleAuthorSchema.optional(),
  amount: z.number(),
  donatedAt: z.string(),
});

export const ScholarshipSchema = z.object({
  _id: z.string(),
  _type: z.literal("scholarship"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  name: z.string(),
  roll: z.string(),
  slug: z.string(),
  raised: z.number().optional(),
  amount: z.number().optional(),
  deadline: z.string().optional(),
  picture: SanityImageSchema,
  videoLink: z.url(),
  background: z.string().optional(),
  goals: z.string().optional(),
  reasonForAid: z.string().optional(),
  donors: z.array(ScholarshipDonorSchema).optional(),
});

export type Scholarship = z.infer<typeof ScholarshipSchema>;
