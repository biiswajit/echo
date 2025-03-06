import {z} from "zod";

// TODO: update this schema later if needed
export const JobPayloadSchema = z.object({
    jobId: z.string().uuid().readonly(),
    prompt: z.string().min(1),
    conversationId: z.string().uuid().readonly(),
    modelId: z.string().uuid().readonly(),
    jobType: z.enum(["reply", "response", "title"]),
    selectedText: z.string().optional()
});

export type JobPayloadType = z.infer<typeof JobPayloadSchema>;