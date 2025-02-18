import { Router } from "express";
import allConversations from "./allConversations";
import initConversation from "./initConversation";
import newConversation from "./newConversation";
import deleteConversations from "./deleteConversation";
import renameConversations from "./renameConversation";

export const router: Router = Router();

router.get("/all", async (req, res) => {
    // TODO: Implement route
});

router.post("/init", async (req, res) => {
    // TODO: Implement route
});

router.post("/new", async (req, res) => {
    // TODO: Implement route
});

router.delete("/delete", async (req, res) => {
    // TODO: Implement route
});

router.put("/rename", async (req, res) => {
    // TODO: Implement route
});