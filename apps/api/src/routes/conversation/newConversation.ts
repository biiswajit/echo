import { type Request, type Response } from "express";

// TODO: Add proper data type
export type NewConversationReturnType = {
    success: boolean,
    data?: any,
    error?: string
}

// TODO: Implement this function
export default async function newConversation(req: Request, res: Response)
    : Promise<NewConversationReturnType> {

    return { success: true, data: "New conversation" };
}