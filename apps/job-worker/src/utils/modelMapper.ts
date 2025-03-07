import {Gemini2} from "@echo/models";
import {models} from "./avaliableModels";

// TODO: as new model are addad to platform add here also
export function modelMapper(modelId: string) {
    switch(modelId) {
        case models["gemini-2.0-flash"]:
            return Gemini2.getInstance(process.env.GEMINI_API_KEY as string);
        default:
            return null;   
    }
}