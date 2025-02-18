import { type Request, type Response } from "express";

// TODO: Add proper data type
export type NewMessageReturnType = {
    success: boolean,
    data?: any,
    error?: string
}

// TODO: Implement this function
export default async function (req: Request, res: Response)
    : Promise<NewMessageReturnType> {

    return { success: true, data: "New message" };
}