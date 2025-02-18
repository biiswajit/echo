import { Router } from "express";
import newMessage from "./newMessage";
import allMessages from "./allMessages";
import initMessage from "./initMessage";

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