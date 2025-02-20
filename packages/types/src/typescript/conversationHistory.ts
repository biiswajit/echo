import { Author, Message } from "@echo/database"

export type conversationHistoryType = {
    author: Author,
    content: Message["content"]
}