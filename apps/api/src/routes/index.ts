import { Router } from "express";
import { router as conversation_router } from "./conversation";
import { router as message_router } from "./message";

export const router: Router = Router();

router.use("/conversation", conversation_router);
router.use("/message", message_router);