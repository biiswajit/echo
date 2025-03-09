import { Author } from "@echo/database";

export type ModelParamsType = Record<string, string>;

export type ConversationHistoryType =  {
    author: Author,
    content: string
}