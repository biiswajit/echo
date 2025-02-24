import { Gemini2 } from "../models/gemini2";
import { Models } from "@echo/types/typescript";

// TODO: add more models eventually
export function getModelInstance(modelName: string) {
    if (modelName == Models.GEMINI2)
        return Gemini2.getInstance();
    else
        return null;
}