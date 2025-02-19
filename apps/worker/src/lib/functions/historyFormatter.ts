import { conversationHistoryType } from "@echo/zod/type";

export function formatHistory(
    conversations: conversationHistoryType[]
): string {
    if (!history) return "";
    let formattedHistory: string = "Here's a conversation history: \n";
    for (const conversation of conversations) {
        formattedHistory += `${conversation.role}: ${conversation.message}`;
    }
    formattedHistory += "Based on the above conversation, answer the following question: \n";
    return formattedHistory;
}