import { Gemini2 } from "@echo/models";
import { Models } from "@echo/enums";

// TODO: add more models eventually
export function getModelInstance(modelName: string) {
    if (modelName == Models.GEMINI2)
        return Gemini2.getInstance();
    else
        return null;
}