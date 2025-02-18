import { type Request, type Response } from "express";

// TODO: Add proper data type
export type InitConversationReturnType = {
    success: boolean,
    data?: any,
    error?: string
}

// TODO: Implement this function
export default async function initConversation(req: Request, res: Response)
    : Promise<InitConversationReturnType> {

    return { success: true, data: "Init conversation" };
}