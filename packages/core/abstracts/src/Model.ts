import { ModelParamsType, ConversationHistoryType } from "@echo/natives";

// TODO: as requirement grows more and more features will be added
export abstract class Model<ClientType> {
	protected abstract client: ClientType | null;

	abstract generateTitle(prompt: string, modelParams?: ModelParamsType): Promise<string>;

	abstract generateResponse(
		prompt: string,
		conversationHistory: ConversationHistoryType[] | null,
		modelParams?: ModelParamsType,
	): Promise<string>;

	abstract replyToSelection(
		prompt: string,
		conversationHistory: ConversationHistoryType[] | null,
		selectedText: string,
		modelParams?: ModelParamsType,
	): Promise<string>;
}
