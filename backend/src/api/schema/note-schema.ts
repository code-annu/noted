import { z } from "zod";

// Note Creation Input Schema
export const NoteCreateInputSchema = z.object({
  title: z.string().trim().nonempty("title is required"),
  content: z.string().trim().nonempty("content is required"),
});

// Note Update Input Schema
export const NoteUpdateInputSchema = z.object({
  title: z.string().trim().optional(),
  content: z.string().trim().optional(),
});
