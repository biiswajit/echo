import { createClient, RedisClientType } from "redis";
import { conversationHistoryType } from "@echo/enums";

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

    async read(conversationId: string): Promise<conversationHistoryType[] | null> {
        try {
            const res = await this.client.lRange(`conversation:${conversationId}`, 0, -1);
            if (!res || res.length <= 0) return null;
            return res.map((item) => JSON.parse(item));
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    async write(conversationId: string, payload: conversationHistoryType[]): Promise<boolean> {
        try {
            if (payload.length <= 0) return false;

            const multi = this.client.multi();
            for (const item of payload) {
                multi.rPush(`conversation:${conversationId}`, JSON.stringify(item));
            }

            const res = await multi.exec();
            if (!res) return false;
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }

    async delete(conversationId: string): Promise<boolean> {
        try {
            const res = await this.client.del(`conversation:${conversationId}`);
            if (res <= 0) return false;
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }

    async disconnect(): Promise<void> {
        await this.client.disconnect();
    }
}