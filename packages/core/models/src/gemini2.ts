import {Model} from "@echo/abstracts";
import { ModelParamsType, ConversationHistoryType} from "@echo/natives";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {TITLE_SYSTEM_PROMPT, RESPONSE_SYSTEM_PROMPT} from "@echo/prompts";
import {formatHistory, inlineEditor} from "@echo/functions";


export const MODEL_NAME = "gemini-2.0-flash";

export class Gemini2 extends Model<GoogleGenerativeAI> {
    protected client: GoogleGenerativeAI | null;
    private static instance: Gemini2 | null;

    private constructor() {
        super();

        const API_KEY = process.env.GEMINI_API_KEY;
        if (!API_KEY) {
            throw new Error("GEMINI_API_KEY environment variable is not set.");
        }

        this.client = new GoogleGenerativeAI(API_KEY);
    }

    static getInstance(): Gemini2 {
        if (!Gemini2.instance) {
            Gemini2.instance = new Gemini2();
        }

        return Gemini2.instance;
    }

    // TODO: do something with the modelParams
    async generateTitle(
        prompt: string,
        modelParams?: ModelParamsType
    ): Promise<string> {
        if (!this.client) {
            console.error("no client created");
            return "";
        }

        try {
            const model = this.client?.getGenerativeModel({
                model: MODEL_NAME,
                systemInstruction: TITLE_SYSTEM_PROMPT
            });
            if (!model) {
                throw new Error("no model created");
            }

            const result = await model.generateContent(prompt);
            if (!result) {
                return "";
            }

            return result.response.text();
        }
        catch (e) {
            console.error(e);
            return "";
        }
    }

    // TODO: do something with the modelParams
    async generateResponse(
        prompt: string,
        conversationHistory: ConversationHistoryType[] | null,
        modelParams?: ModelParamsType
    ): Promise<string> {
        if (!this.client) {
            console.error("no client created");
            return "";
        }

        if (conversationHistory && conversationHistory.length > 0) {
            prompt = formatHistory(conversationHistory) + prompt;
        }

        try {
            const model = this.client?.getGenerativeModel({
                model: MODEL_NAME,
                systemInstruction: RESPONSE_SYSTEM_PROMPT
            });
            if (!model) {
                throw new Error("no model created");
            }

            const result = await model.generateContentStream(prompt);
            if (!result) {
                console.error("unable to generate response");
                return "";
            }

            // TODO: figure out a way to send stream message
            let fullResponse = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullResponse += chunkText;
                process.stdout.write(chunkText);
            }

            return fullResponse;
        }
        catch (e) {
            console.error(e);
            return "";
        }
    }

    // TODO: do something with the modelParams
    async replyToSelection(
        prompt: string, 
        conversationHistory: ConversationHistoryType[] | null, 
        selectedText: string, 
        modelParams?: ModelParamsType
    ): Promise<string> {
        if (!this.client) {
            console.error("no client created");
            return "";
        }

        if (conversationHistory) {
            prompt = formatHistory(conversationHistory) + inlineEditor(selectedText, prompt);
        }
        else {
            prompt = inlineEditor(selectedText, prompt);
        }

        try {
            return await this.generateResponse(prompt, null);
        }
        catch (e) {
            console.error(e);
            return "";
        }
    }
}