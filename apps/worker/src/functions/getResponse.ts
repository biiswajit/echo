import { jobPayloadType } from "@echo/types/zod";
import { getInstance } from "./getInstance";
import { requests } from "@echo/utils";
import { conversationHistoryType } from "@echo/types/typescript";

// TODO: write logic to stream data to pub-sub
export async function getResponse(
    payload: jobPayloadType,
    conversations: conversationHistoryType[]
): Promise<string> {
    const model = getInstance(payload.modelName);
    if (!model) return "";

    if (payload.requestedFor == requests.title)
        return await model.generateTitle(payload.prompt);

    else if (payload.requestedFor == requests.response)
        return await model.generateResponse(payload.prompt, conversations);

    else if (payload.requestedFor == requests.reply) {
        if (!payload.selectedText) return "";
        return await model.replyToSelection(payload.prompt, payload.selectedText, conversations);
    }

    else return "";
}