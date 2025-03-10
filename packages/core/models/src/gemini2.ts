import { Model } from "@echo/abstracts";
import { ConversationHistoryType } from "@echo/natives";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TITLE_SYSTEM_PROMPT, RESPONSE_SYSTEM_PROMPT } from "@echo/prompts";
import { formatHistory, inlineEditor } from "@echo/functions";

export const MODEL_NAME = "gemini-2.0-flash";

export class Gemini2 extends Model<GoogleGenerativeAI> {
  protected client: GoogleGenerativeAI | null;
  private static instance: Gemini2 | null;

  private constructor(key: string) {
    super();
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not set.");
    }
    this.client = new GoogleGenerativeAI(key);
  }

  static getInstance(key: string): Gemini2 {
    if (!Gemini2.instance) {
      Gemini2.instance = new Gemini2(key);
    }
    return Gemini2.instance;
  }

  // TODO: do something with the modelParams
  async generateTitle(prompt: string): Promise<string> {
    try {
      if (!this.client) {
        throw new Error(`no ${MODEL_NAME} client found`);
      }

      const model = this.client.getGenerativeModel({ model: MODEL_NAME, systemInstruction: TITLE_SYSTEM_PROMPT });
      if (!model) {
        throw new Error("no model created");
      }

      const result = await model.generateContent(prompt);
      if (!result) {
        throw new Error("unable to generate response");
      }

      return result.response.text();
    } catch (err) {
      console.error(err);
      return "";
    }
  }

  // TODO: do something with the modelParams
  async generateResponse(prompt: string, conversationHistory: ConversationHistoryType[] | null): Promise<string> {
    try {
      if (!this.client) {
        throw new Error(`no ${MODEL_NAME} client found`);
      }

      if (conversationHistory && conversationHistory.length > 0) {
        prompt = formatHistory(conversationHistory) + prompt;
      }

      const model = this.client.getGenerativeModel({ model: MODEL_NAME, systemInstruction: RESPONSE_SYSTEM_PROMPT });
      if (!model) {
        throw new Error("no model created");
      }

      const result = await model.generateContentStream(prompt);
      if (!result) {
        throw new Error("unable to generate response");
      }

      // TODO: figure out a way to send stream message
      let fullResponse = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        process.stdout.write(chunkText);
      }
      return fullResponse;
    } catch (err) {
      console.error(err);
      return "";
    }
  }

  // TODO: do something with the modelParams
  async replyToSelection(
    prompt: string,
    conversationHistory: ConversationHistoryType[] | null,
    selectedText: string,
  ): Promise<string> {
    try {
      if (!this.client) {
        throw new Error(`no ${MODEL_NAME} client found`);
      }

      if (conversationHistory) {
        prompt = formatHistory(conversationHistory) + inlineEditor(selectedText, prompt);
      } else {
        prompt = inlineEditor(selectedText, prompt);
      }

      return await this.generateResponse(prompt, null);
    } catch (err) {
      console.error(err);
      return "";
    }
  }
}
