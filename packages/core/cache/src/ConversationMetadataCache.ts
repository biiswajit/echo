import {Cache} from "@echo/abstracts";
import { createClient, RedisClientType } from "redis";
import { ConversationMetadataType, CacheKeyType, CacheReturnType } from "@echo/natives";

export const CONVERSATION_METADATA_CACHE_PREFIX: string = "metadata";
export const CONVERSATION_METADATA_CACHE_TTL = 60 * 60; // 1 hour

/*
* ConversationMetadataCache is using hash map to store metadata about conversations
*/
export class ConversationMetadataCache extends Cache<ConversationMetadataType> {
    protected client: RedisClientType | null;
    private static instance: ConversationMetadataCache | null = null;

    private constructor() {
        super();
        this.client = createClient();
        this.client.on("error", () => {
            console.error("error while create redis client");
        });
    }

    static async getInstance()
    : Promise<ConversationMetadataCache> {
        if (!ConversationMetadataCache.instance) {
            ConversationMetadataCache.instance = new ConversationMetadataCache();
            await ConversationMetadataCache.instance.client?.connect();
        }
        return ConversationMetadataCache.instance;
    }

    async read(
        key: CacheKeyType
    ): Promise<CacheReturnType<ConversationMetadataType>> {
        try {
            if (!this.client || !key) {
                throw new Error("no client or conversation id found");
            }

            const data = await this.client.hGetAll(`${CONVERSATION_METADATA_CACHE_PREFIX}:${key}`);
            if (!data || Object.keys(data).length <= 0) {
                throw new Error("unable to read from cache");
            }

            return {
                success: true,
                data: {
                    id: data.id as string,
                    name: data.name as string,
                    createdAt: new Date(data.createdAt as string),
                    updatedAt: new Date(data.updatedAt as string)
                }
            };
        }
        catch(err) {
            console.error(err);
            return {success: false, error: "unable to read from cache, follow log for more info"};
        }
    }

    async write(
        key: CacheKeyType, 
        payload: ConversationMetadataType
    ): Promise<boolean> {
        try {
            if (!this.client || !key) {
                throw new Error("no client or conversation id found");
            }

            const value = await this.client.hSet(`${CONVERSATION_METADATA_CACHE_PREFIX}:${key}`, {
                id: payload.id,
                name: payload.name,
                createdAt: payload.createdAt.toISOString(),
                updatedAt: payload.updatedAt.toISOString()
            });
            if (value <= 0) {
                throw new Error("unable to write into the cache");
            }
            // delete this hash cache after 1 hour of creation
            await this.client.expire(`${CONVERSATION_METADATA_CACHE_PREFIX}:${key}`, CONVERSATION_METADATA_CACHE_TTL);

            return true;
        }
        catch(err) {
            console.error(err);
            return false;
        }
    }

    async delete(
        key: CacheKeyType
    ): Promise<boolean> {
        try {
            if (!this.client || !key) {
                throw new Error("no client or conversation id found");
            }

            const value = await this.client.del(`${CONVERSATION_METADATA_CACHE_PREFIX}:${key}`);
            if (value <= 0) {
                throw new Error("unavle to delete from cache");
            }

            return true;
        }
        catch(err) {
            console.error(err);
            return false;
        }
    }

    async disconnect(): Promise<void> {
        if (!ConversationMetadataCache.instance) {
            return;
        }

        if (this.client) {
            await this.client.disconnect();
        }
        
        ConversationMetadataCache.instance = null;
        console.log("cache disconnected");
    }
}