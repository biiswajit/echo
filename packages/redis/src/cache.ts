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
        const res = await this.client.lRange(`conversation:${conversationId}`, 0, -1);
        return res.map((item) => JSON.parse(item));
    }

    async write(conversationId: string, payload: conversationHistoryType[]): Promise<boolean> {
        const multi = this.client.multi();
        for (const item of payload) {
            multi.rPush(`conversation:${conversationId}`, JSON.stringify(item));
        }

        const res = await multi.exec();
        if (!res) return false;
        return true;
    }

    async delete(conversationId: string): Promise<boolean> {
        const res = await this.client.del(`conversation:${conversationId}`);
        if (res <= 0) return false;
        return true;
    }

    async disconnect(): Promise<void> {
        await this.client.disconnect();
    }
}