import express from "express";
import { router as app_router } from "./routes";

const app = express();

app.use("/api", app_router);

app.listen(3000, () => {
    console.log("apps/api is running on port 3000");
})