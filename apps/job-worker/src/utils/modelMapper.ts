import {Gemini2} from "@echo/models";
import {models} from "./avaliableModels";

export function modelMapper(modelId: string) {
    switch(modelId) {
        case models["gemini-2.0-flash"]:
            return Gemini2.getInstance();
        default:
            return null;   
    }
}