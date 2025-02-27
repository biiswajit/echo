import { jobPayloadType } from "@echo/zod/types";
import { getModelInstance } from "./getModelInstance";
import { conversationHistoryType, Requests } from "@echo/enums";

// TODO: write logic to stream data to pub-sub
export async function getResponse(
    payload: jobPayloadType,
    conversations: conversationHistoryType[] | null
): Promise<string> {
    const model = getModelInstance(payload.modelName);
    if (!model) return "";

    if (payload.requestedFor == Requests.GENERATE_TITLE)
        return await model.generateTitle(payload.prompt);

    else if (payload.requestedFor == Requests.RESPONSE_ON_PROMPT)
        return await model.generateResponse(
            payload.prompt,
            conversations ? conversations : undefined
        );

    else if (payload.requestedFor == Requests.REPLY_TO_SELECTION) {
        if (!payload.selectedText) return "";

        return await model.replyToSelection(
            payload.prompt,
            payload.selectedText,
            conversations ? conversations : undefined
        );
    }

    else return "";
}