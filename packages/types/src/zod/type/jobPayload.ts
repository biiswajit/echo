import { jobPayloadSchema } from "../schema";
import { z } from "zod";

export type jobPayloadType = z.infer<typeof jobPayloadSchema>;