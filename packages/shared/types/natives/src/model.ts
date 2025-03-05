import { Author } from "@echo/database";

export type ModelParamsType = Record<string, any>;

export type ConversationHistoryType =  {
    author: Author,
    content: string
}