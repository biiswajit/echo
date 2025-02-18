import { type Request, type Response } from "express";

// TODO: Add proper data type
export type AllMessagesReturnType = {
    success: boolean,
    data?: any,
    error?: string
}

// TODO: Implement this function
export default async function allMessages(req: Request, res: Response)
    : Promise<AllMessagesReturnType> {

    return { success: true, data: "All messages" };
}