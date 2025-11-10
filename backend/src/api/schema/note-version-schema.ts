import { z } from "zod";

// Note Version Creation Input Schema
export const NoteVersionCreateInputSchema = z.object({
  noteId: z.string().trim().nonempty("noteId is required"),
  content: z.string().trim(),
});

// Note Version Update Input Schema
export const NoteVersionUpdateInputSchema = z.object({
  content: z.string().trim().optional(),
});
