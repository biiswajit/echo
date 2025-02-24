import { z } from "zod";

export const jobPayloadSchema = z.object({
    jobId: z.string().uuid(),
    conversationId: z.string().cuid(),
    prompt: z.string().min(1),
    modelName: z.enum(["gemini-2.0-flash"]).readonly(),
    requestedFor: z.enum(["generate-title", "response-on-prompt", "reply-to-selection"]).readonly(),
    selectedText: z.string().min(1).optional()
});