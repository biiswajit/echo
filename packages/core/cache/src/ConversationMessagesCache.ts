import { Cache } from "@echo/abstracts";
import { createClient, RedisClientType } from "redis";
import { ConversationMessageType, CacheKeyType, CacheReturnType } from "@echo/natives";


export const CONVERSATION_MESSAGES_CACHE_PREFIX = "messages";

/*
* ConversationMessagesCache is using list to store all messages belongs to a conversation
*/
export class ConversationMessagesCache extends Cache<ConversationMessageType[]> {
    protected client: RedisClientType | null;
    private static instance: ConversationMessagesCache | null;

    private constructor() {
        super();
        this.client = createClient();
        this.client.on("error", (err) => {
            console.error("error while create redis client");
        });
    }

    static async getInstance()
    : Promise<ConversationMessagesCache> {
        if (!ConversationMessagesCache.instance) {
            ConversationMessagesCache.instance = new ConversationMessagesCache();
            await ConversationMessagesCache.instance.client?.connect();
        }
        return ConversationMessagesCache.instance;
    }

    async read(key: CacheKeyType)
    : Promise<CacheReturnType<ConversationMessageType[]>> {
        if (!this.client) {
            return {success: false, error: "no instance found"};
        }
        if (!key) {
            return {success: false, error: "invalid key provided"};
        }

        const redisRes = await this.client.lRange(`${CONVERSATION_MESSAGES_CACHE_PREFIX}:${key}`, 0, -1);
        if (!redisRes || redisRes.length <= 0) {
            return {success: false, error: "no messages found in the cache"};
        }

        try {
            return {success: true, data: redisRes.map(item => JSON.parse(item))};
        }
        catch(err) {
            return {success: false, error: "invalid message payload"};
        }
    }

    async write(key: CacheKeyType, payload: ConversationMessageType[])
    : Promise<CacheReturnType<ConversationMessageType[]>> {
        if (!this.client) {
            return {success: false, error: "no instance found"};
        }
        if (!key) {
            return {success: false, error: "invalid key provided"};
        }

        try {
            const multi = this.client.multi();
            for (const item of payload) {
                multi.rPush(`${CONVERSATION_MESSAGES_CACHE_PREFIX}:${key}`, JSON.stringify(item));
            }

            const redisRes = await multi.exec();
            if (!redisRes || redisRes.length <= 0) {
                return {success: false, error: "unable to write given payload"};
            }
            return {success: true, data: payload};
        }
        catch(err) {
            return {success: false, error: "invalid payload provided"};
        }
    }

    async delete(key: CacheKeyType)
    : Promise<CacheReturnType<ConversationMessageType[]>> {
        if (!this.client) {
            return {success: false, error: "no instance found"};
        }
        if (!key) {
            return {success: false, error: "invalid key provided"};
        }
        
        const redisRes = await this.client.del(`${CONVERSATION_MESSAGES_CACHE_PREFIX}:${key}`);
        if (redisRes <= 0) {
            return {success: false, error: "unable to delete key"};
        }
        
        return {success: true}
    }

    async disconnect(): Promise<void> {
        if (!ConversationMessagesCache.instance) {
            return;
        }

        if (this.client) {
            await this.client.disconnect();
        }
        ConversationMessagesCache.instance = null;
        console.log("cache disconnected");
    }
}