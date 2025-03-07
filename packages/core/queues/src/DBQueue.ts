import { Queue } from "@echo/abstracts";
import { DBPayloadSchema, DBPayloadType } from "@echo/zod";
import { createClient, RedisClientType } from "redis";
import { QueueReturnType } from "@echo/natives";

export const DB_QUEUE_NAME = "db_queue";

export class DBQueue extends Queue<DBPayloadType> {
    private static instance: DBQueue | null = null;
    protected queueName: string | null;
    protected client: RedisClientType | null;

    private constructor() {
        super();
        this.queueName = DB_QUEUE_NAME;
        this.client = createClient();
        this.client.on("error", (err) => {
            console.error("error while create redis client!");
        });
    }

    static async getInstance()
    : Promise<DBQueue> {
        if (!DBQueue.instance) {
            DBQueue.instance = new DBQueue();
            await DBQueue.instance.client?.connect();
        }
        return DBQueue.instance;
    }

    async enqueue(payload: DBPayloadType): Promise<boolean> {
        try {
            if (!this.queueName || !this.client) {
                throw new Error("no client or queue found")
            }

            const zod = DBPayloadSchema.safeParse(payload);
            if (!zod.success) {
                throw new Error(`invalid db schema received ${zod.error}`);
            }

            const value = await this.client.rPush(this.queueName, JSON.stringify(payload));
            if (!value || value <= 0) {
                throw new Error("failed to enqueue job");
            }

            return true;
        }
        catch(err) {
            console.error(err);
            return false;
        }
    }

    async dequeue(): Promise<QueueReturnType<DBPayloadType>> {
        try {
            if (!this.queueName || !this.client) {
                throw new Error("no client or queue found")
            }

            const value = await this.client.blPop(this.queueName, 0);
            if (!value || !value.element) {
                throw new Error("no valid db request received from queue");
            }

            return {success: true, data: JSON.parse(value.element)};
        }
        catch(err) {
            console.error(err);
            return {success: false, error: "unable to get db request from queue, check log for more info"};
        }
    }

    async disconnect(): Promise<void> {
        if (!DBQueue.instance) {
            return;
        }

        if (this.client) {
            await this.client.disconnect();
        }

        DBQueue.instance = null;
        console.log("db queue disconnected!");
    }

    async length(): Promise<number> {
        try {
            if (!this.queueName || !this.client) {
                throw new Error("no client or queue found")
            }

            return await this.client.lLen(this.queueName);
        }
        catch(err) {
            console.error(err);
            return -1;
        }
    }
}