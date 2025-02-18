import { type Request, type Response } from "express";

// TODO: Add proper data type
export type AllConversationsReturnType = {
    success: boolean,
    data?: any,
    error?: string
}

// TODO: Implement this function
export default async function allConversations(req: Request, res: Response)
    : Promise<AllConversationsReturnType> {

    return { success: true, data: "All conversations" };
}