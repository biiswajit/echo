import { createClient, RedisClientType } from "redis";

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

    async enqueue(): Promise<boolean> {
        // TODO: implement this function
        return true;
    }

    async dequeue(): Promise<void> {
        // TODO: implement this function
    }

    async disconnect(): Promise<void> {
        await this.client.disconnect();
        Queue.instances.delete(this.queueName);
    }
}