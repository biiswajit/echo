import { type Request, type Response } from "express";

// TODO: Add proper data type
export type RenameConversationsReturnType = {
    success: boolean,
    data?: any,
    error?: string
}

// TODO: Implement this function
export default async function renameConversations(req: Request, res: Response)
    : Promise<RenameConversationsReturnType> {

    return { success: true, data: "Conversation renamed" };
}