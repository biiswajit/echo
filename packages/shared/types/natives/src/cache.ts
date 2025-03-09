import { Author } from "@echo/database";

export type CacheReturnType<T> = { success: boolean; error?: string; data?: T };

export type CacheKeyType = string;

export type ConversationMessageType = { author: Author; content: string };

export type ConversationMetadataType = { id: string; createdAt: Date; updatedAt: Date; name: string };
