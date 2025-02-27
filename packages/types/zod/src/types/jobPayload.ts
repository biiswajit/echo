import { jobPayloadSchema } from "../schemas";
import { z } from "zod";

export type jobPayloadType = z.infer<typeof jobPayloadSchema>;