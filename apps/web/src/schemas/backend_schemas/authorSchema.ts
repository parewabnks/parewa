import { z } from "zod";
import { SanityImageSchema } from "./sanityImageSchema";

export const ArticleAuthorSchema = z.object({
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
