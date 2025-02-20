import { z } from "zod";

export const conversationHistorySchema = z.object({
    role: z.enum(["user", "assistant"]),
    message: z.string().min(1, "there must be a message")
})