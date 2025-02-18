import { z } from "zod";
import { newMessageBodySchema } from "../schema";

export type newMessageBodyType = z.infer<typeof newMessageBodySchema>;