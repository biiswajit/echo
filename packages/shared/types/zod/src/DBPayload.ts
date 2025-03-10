import { z } from "zod";

export const DBPayloadSchema = z.object({
  author: z.enum(["USER", "ASSISTANT"]),
  content: z.string(),
  createdAt: z.date(),
  modelId: z.string().uuid().readonly(),
  conversationId: z.string().uuid().readonly(),
});

export type DBPayloadType = z.infer<typeof DBPayloadSchema>;
