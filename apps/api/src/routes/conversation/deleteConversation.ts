import { type Request, type Response } from "express";

// TODO: Add proper data type
export type DeleteConversationsReturnType = {
    success: boolean,
    data?: any,
    error?: string
}

// TODO: Implement this function
export default async function deleteConversations(req: Request, res: Response)
    : Promise<DeleteConversationsReturnType> {

    return { success: true, data: "Conversation deleted" };
}