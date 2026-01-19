import { z } from "zod";

export const projectIdSchema = z.object({
  projectId: z.string().length(24, "Invalid project ID"),
});

export const analysisStartSchema = z.object({
  projectId: z.string().length(24),
});
