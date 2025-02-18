import { z } from "zod";
import { models } from "@echo/utils";

export const newMessageBodySchema = z.object({
    // init message is used to start a new conversation, and figure out a suitable name for the conversation
    messageType: z.enum(["regular", "init"]),
    prompt: z.string().min(1, "Prompt is required"),
    model: z.enum(models as [string, ...string[]]).readonly(),
    conversationId: z.string().readonly().optional(),
});