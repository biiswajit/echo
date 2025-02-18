// this set contains all the model names supported in the platform 
const uniqueModels = new Set<string>();

// add more models as the platform grows
uniqueModels.add("Gemini 2.0 flash");

export const models: string[] = Array.from(uniqueModels);