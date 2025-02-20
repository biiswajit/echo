import { createClient, RedisClientType } from "redis";
import { jobPayloadType } from "@echo/zod/type";

export class Queue {
    private static instances: Map<string, Queue> = new Map();
    private client: RedisClientType;
    private queueName: string;

    private constructor(queueName: string) {
        this.queueName = queueName;
        this.client = createClient();
        this.client.on("error", (err) => {
            console.error(`error connecting to redis client! here more info: ${err}`);
        });
    }

    static async getInstance(queueName: string): Promise<Queue> {
        if (!Queue.instances.has(queueName)) {
            const instance = new Queue(queueName);
            await instance.client.connect();
            Queue.instances.set(queueName, instance);
        }
        return Queue.instances.get(queueName) as Queue;
    }

    async enqueue(payload: jobPayloadType): Promise<boolean> {
        // TODO: later for db queue update this function
        const res = await this.client.rPush(this.queueName, JSON.stringify(payload));
        if (res <= 0) return false;
        return true;
    }

    async dequeue(): Promise<jobPayloadType | null> {
        // TODO: later for db queue update this function
        const res = await this.client.blPop(this.queueName, 0); // this will block forever if no elements there
        if (res) return JSON.parse(res.element);
        return null;
    }

    async disconnect(): Promise<void> {
        await this.client.disconnect();
        Queue.instances.delete(this.queueName);
    }
}