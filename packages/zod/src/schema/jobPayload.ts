import { z } from "zod";
import { models } from "@echo/utils";

export const jobPayloadSchema = z.object({
    jobId: z.string().uuid("jobId must be of uuid type"),
    conversationId: z.string().cuid("conversationId must be of type cuid"),
    prompt: z.string().min(1, "prompt is reqired"),
    modelName: z.enum(Object.values(models) as [string, ...string[]]).readonly()
});