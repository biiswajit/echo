import exp from "constants";
import { type Request, type Response } from "express";

// TODO: Add proper data type
export type InitMessageReturnType = {
    success: boolean,
    data?: any,
    error?: string
}

// TODO: Implement this function
export default async function initMessage(req: Request, res: Response)
    : Promise<InitMessageReturnType> {

    return { success: true, data: "Init message" };
}