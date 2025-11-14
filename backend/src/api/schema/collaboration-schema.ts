import { z } from "zod";
import { CollaborationRole } from "../../domain/entities/collaboration";

// Collaboration Create Input Schema
export const CollaborationCreateInputSchema = z.object({
  username: z.string().trim().nonempty("username is required"), // assuming UUID format, adjust if needed
  role: z.enum([CollaborationRole.VIEWER, CollaborationRole.EDITOR]),
});

// Collaboration Update Input Schema
export const CollaborationUpdateInputSchema = z.object({
  role: z.enum([CollaborationRole.VIEWER, CollaborationRole.EDITOR]).optional(),
  accepted: z.boolean().optional(),
});
