import { z } from "zod";
import { conversationHistorySchema } from "../schema";

export type conversationHistoryType = z.infer<typeof conversationHistorySchema>;