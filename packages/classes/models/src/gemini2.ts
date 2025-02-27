import { GoogleGenerativeAI } from "@google/generative-ai";
import {Model} from "@echo/abstract-models";
import {TITLE_SYSTEM_PROMPT, RESPONSE_SYSTEM_PROMPT} from "@echo/prompts";
import { formatHistory, inlineEditor } from "@echo/functions";
import { conversationHistoryType, Models } from "@echo/enums";

export class Gemini2 extends Model {
    private static instance: Gemini2;
    private gemini: GoogleGenerativeAI | null = null;

    private constructor() {
        super();
    }

    static getInstance(): Gemini2 {
        if (!Gemini2.instance) {
            const API_KEY = process.env.GEMINI_API_KEY;
            if (!API_KEY) {
                throw new Error("GEMINI_API_KEY environment variable is not set.");
            }

            Gemini2.instance = new Gemini2();
            Gemini2.instance.gemini = new GoogleGenerativeAI(API_KEY);
        }

        return Gemini2.instance;
    }

    // TODO: do something with the modelParams
    async generateTitle(
        prompt: string,
        modelParams?: Record<string, any>[]
    ): Promise<string> {
        try {
            const model = this.gemini?.getGenerativeModel({
                model: Models.GEMINI2,
                systemInstruction: TITLE_SYSTEM_PROMPT
            });
            if (!model) throw new Error("no model created!");

            const result = await model.generateContent(prompt);
            if (!result) return "";

            return result.response.text();
        }
        catch (e) {
            console.error(`error! function- generateTitle(), model- gemini2. more info- ${e}`);
            return "";
        }
    }

    // TODO: do something with the modelParams
    async generateResponse(
        prompt: string,
        conversationHistory?: conversationHistoryType[],
        modelParams?: Record<string, any>[]
    ): Promise<string> {
        if (conversationHistory && conversationHistory.length > 0)
            prompt = formatHistory(conversationHistory) + prompt;

        try {
            const model = this.gemini?.getGenerativeModel({
                model: Models.GEMINI2,
                systemInstruction: RESPONSE_SYSTEM_PROMPT
            });
            if (!model) throw new Error("no model created!");

            const result = await model.generateContentStream(prompt);
            if (!result) return "";

            // TODO: figure out is this the way to send stream message
            let fullResponse = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullResponse += chunkText;
                process.stdout.write(chunkText);
            }

            return fullResponse;
        }
        catch (e) {
            console.error(`error! function- generateTitle(), model- gemini2. more info- ${e}`);
            return "";
        }
    }

    // TODO: do something with the modelParams
    async replyToSelection(
        prompt: string,
        selectedText: string,
        conversationHistory?: conversationHistoryType[],
        modelParams?: Record<string, any>[]
    ): Promise<string> {
        if (conversationHistory) prompt = formatHistory(conversationHistory) + inlineEditor(selectedText, prompt);
        else prompt = inlineEditor(selectedText, prompt);

        try {
            return await this.generateResponse(prompt);
        }
        catch (e) {
            console.error(`error! function- generateTitle(), model- gemini2. more info- ${e}`);
            return "";
        }
    }
}