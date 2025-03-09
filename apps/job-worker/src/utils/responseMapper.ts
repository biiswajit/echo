import { modelMapper } from "./modelMapper.js";
import { JobPayloadType } from "@echo/zod";
import { ConversationHistoryType } from "@echo/natives";

// TODO: if you add more features to model then change add here as well
export async function responseMapper(
	payload: JobPayloadType,
	messages: ConversationHistoryType[] | null,
): Promise<string> {
	const model = modelMapper(payload.modelId);
	if (!model) {
		return "";
	}

	switch (payload.jobType) {
		case "title":
			return await model.generateTitle(payload.prompt);
		case "reply":
			if (!payload.selectedText) {
				return "";
			}
			return await model.replyToSelection(payload.prompt, messages, payload.selectedText);
		case "response":
			return await model.generateResponse(payload.prompt, messages);
		default:
			return "";
	}
}
