import { conversationHistoryType } from "@echo/enums";

export abstract class Model {
    /*
    Based on the first prompt get the title for the new discussion.
    Parameters:
        - prompt: The user input for which a discussion title is required.
        - modelParams: A dictionary of parameters to configure the model (e.g., temperature, max tokens).
    Returns:
        - Promise<string>: the title
    */
    abstract generateTitle(
        prompt: string,
        modelParams?: Record<string, any>[]
    ): Promise<string>;

    /*
    Generate a new response for the given prompt.
    Parameters:
        - prompt: The user input for which a new response is required.
        - conversationHistory: A list containing previous interactions, useful for maintaining context.
        - modelParams: A dictionary of parameters to configure the model (e.g., temperature, max tokens).
    Returns:
        - Promise<string>: The regenerated response from the model.
    */
    abstract generateResponse(
        prompt: string,
        conversationHistory?: conversationHistoryType[],
        modelParams?: Record<string, any>[]
    ): Promise<string>;

    /*
    Generates a response explaining or expanding on the selected text from a previous response.
    Parameters:
        - selectedText: The specific part of the response the user wants explained or elaborated on.
        - prompt: Any extra instructions or context the user provides.
        - conversationHistory: Previous messages in the conversation to maintain context.
        - modelParams: Custom model parameters like temperature, max tokens, etc.
    Returns:
        - Promise<string>: The model's response explaining or elaborating on the selected text.
    */
    abstract replyToSelection(
        prompt: string,
        selectedText: string,
        conversationHistory?: conversationHistoryType[],
        modelParams?: Record<string, any>[]
    ): Promise<string>;
}