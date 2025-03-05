import {ConversationHistoryType} from "@echo/natives";

export function formatHistory(
    conversations: ConversationHistoryType[]
): string {
    if (!history) return "";
    let formattedHistory: string = "Here's a conversation history: \n";
    for (const conversation of conversations) {
        formattedHistory += `${conversation.author}: ${conversation.content}`;
    }
    formattedHistory += "Based on the above conversation, answer the following question: \n";
    return formattedHistory;
}