import { models } from "@echo/utils";
import { Gemini2 } from "../models";

// TODO: add more models eventually
export function getInstance(modelName: string) {
    if (modelName == models.gemini2) return Gemini2.getInstance();
}