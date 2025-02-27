import { createClient, RedisClientType } from "redis";
import { jobPayloadSchema } from "@echo/zod/schemas";
import { jobPayloadType } from "@echo/zod/types";


export class Queue {
    private static instance: Queue | null = null;
    private client: RedisClientType;
    private queueName: string;

    private constructor(queueName: string) {
        this.queueName = queueName;
        this.client = createClient();
        this.client.on("error", (err) => {
            console.error(`Error connecting to Redis: ${err.stack || err}`);
        });
    }

    static async getInstance(queueName: string): Promise<Queue> {
        if (!Queue.instance) {
            Queue.instance = new Queue(queueName);
            await Queue.instance.client.connect();
        }
        return Queue.instance;
    }

    async enqueue(payload: jobPayloadType): Promise<boolean> {
        try {
            const zodRes = jobPayloadSchema.safeParse(payload);
            if (!zodRes.success) {
                console.error("Invalid job payload schema:", zodRes.error.format());
                return false;
            }

            const res = await this.client.rPush(this.queueName, JSON.stringify(zodRes.data));
            if (res <= 0) throw new Error("Failed to add job to queue.");

            return true;
        } catch (err) {
            console.error(`Enqueue Error: ${err}`);
            return false;
        }
    }

    async dequeue(): Promise<jobPayloadType | null> {
        try {
            const res = await this.client.blPop(this.queueName, 0);
            if (!res) return null;

            const payload = JSON.parse(res.element);
            const zodRes = jobPayloadSchema.safeParse(payload);
            if (!zodRes.success) {
                console.error("Invalid job payload schema received:", zodRes.error.format());
                return null;
            }

            return zodRes.data;
        } catch (err) {
            console.error(`Dequeue Error: ${err}`);
            return null;
        }
    }

    async disconnect(): Promise<void> {
        if (Queue.instance) {
            console.log(`Disconnecting queue: ${this.queueName}`);
            await this.client.disconnect();
            Queue.instance = null;
        }
    }
}