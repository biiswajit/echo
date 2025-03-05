import {Cache, CacheKeyType, CacheReturnType} from "@echo/abstracts";
import { createClient, RedisClientType } from "redis";

export type ConversationMetadataType = {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string
}

export const CONVERSATION_METADATA_CACHE_PREFIX: string = "metadata";

export class ConversationMetadataCache extends Cache<ConversationMetadataType> {
    protected client: RedisClientType | null;
    private static instance: ConversationMetadataCache | null = null;

    private constructor() {
        super();
        this.client = createClient();
        this.client.on("error", (err) => {
            console.error("error while create redis client");
        });
    }

    static async getInstance() {
        if (!ConversationMetadataCache.instance) {
            ConversationMetadataCache.instance = new ConversationMetadataCache();
            await ConversationMetadataCache.instance.client?.connect();
        }
        return ConversationMetadataCache.instance;
    }

    async read(key: CacheKeyType)
    : Promise<CacheReturnType<ConversationMetadataType>> {
        if (!this.client)
            return {success: false, error: "no instance found"};
        if (!key)
            return {success: false, error: "invalid key provided"};

        const redisRes = await this.client.hGetAll(`${CONVERSATION_METADATA_CACHE_PREFIX}:${key}`);
        if (!redisRes || Object.keys(redisRes).length <= 0)
            return {success: false, error: "no conversation metadata found"};

        // TODO: make this more robust
        const payload = {
            id: redisRes.id as string,
            name: redisRes.name as string,
            createdAt: new Date(redisRes.createdAt as string),
            updatedAt: new Date(redisRes.updatedAt as string)
        };

        return {success: true, data: payload}
    }

    async write(key: CacheKeyType, payload: ConversationMetadataType)
    : Promise<CacheReturnType<ConversationMetadataType>> {
        if (!this.client)
            return {success: false, error: "no instance found"};
        if (!key)
            return {success: false, error: "invalid key provided"};

        const redisRes = await this.client.hSet(`${CONVERSATION_METADATA_CACHE_PREFIX}:${key}`, {
            id: payload.id,
            name: payload.name,
            createdAt: payload.createdAt.toISOString(),
            updatedAt: payload.updatedAt.toISOString()
        });
        if (redisRes <= 0)
            return {success: false, error: "unable to write into cache"};

        return {success: true, data: payload}
    }

    async delete(key: CacheKeyType)
    : Promise<CacheReturnType<ConversationMetadataType>> {
        if (!this.client)
            return {success: false, error: "no instance found"};
        if (!key)
            return {success: false, error: "invalid key provided"};

        const redisRes = await this.client.del(`${CONVERSATION_METADATA_CACHE_PREFIX}:${key}`);
        if (redisRes <= 0)
            return {success: false, error: "unable to delete key"};

        return {success: true}
    }

    async disconnect(): Promise<void> {
        if (!ConversationMetadataCache.instance)
            return;

        if (this.client)
            await this.client.disconnect();
        ConversationMetadataCache.instance = null;
        console.log("job queue disconnected!");
    }
   
}