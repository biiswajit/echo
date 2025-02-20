import { createClient, RedisClientType } from "redis";
import { conversationHistoryType } from "@echo/zod/type";

export class Cache {
    private static instance: Cache;
    private client: RedisClientType;

    private constructor() {
        this.client = createClient();
        this.client.on("error", (err) => {
            console.error(`error connecting to redis client! here more info: ${err}`);
        });
    }

    static async getInstance(): Promise<Cache> {
        if (!Cache.instance) {
            Cache.instance = new Cache();
            await Cache.instance.client.connect();
        }
        return Cache.instance;
    }

    async read(conversationId: string): Promise<conversationHistoryType[]> {
        // TODO: implement this function
        return []
    }

    async write(conversationId: string, payload: conversationHistoryType): Promise<boolean> {
        // TODO: implement this function
        return true;
    }

    async delete(conversationId: string): Promise<boolean> {
        // TODO: implement this function
        return true;
    }
}