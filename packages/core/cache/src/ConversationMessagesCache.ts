import { Cache } from "@echo/abstracts";
import { createClient, RedisClientType } from "redis";
import { ConversationMessageType, CacheKeyType, CacheReturnType } from "@echo/natives";

export const CONVERSATION_MESSAGES_CACHE_PREFIX = "messages";
export const CONVERSATION_MESSAGES_CACHE_TTL = 30 * 60; // 30 minutes

/*
 * ConversationMessagesCache is using list to store all messages belongs to a conversation
 */
export class ConversationMessagesCache extends Cache<ConversationMessageType[]> {
  protected client: RedisClientType | null;
  private static instance: ConversationMessagesCache | null;

  private constructor() {
    super();
    this.client = createClient();
    this.client.on("error", () => {
      console.error("error while create redis client");
    });
  }

  static async getInstance(): Promise<ConversationMessagesCache> {
    if (!ConversationMessagesCache.instance) {
      ConversationMessagesCache.instance = new ConversationMessagesCache();
      await ConversationMessagesCache.instance.client?.connect();
    }
    return ConversationMessagesCache.instance;
  }

  async read(key: CacheKeyType): Promise<CacheReturnType<ConversationMessageType[]>> {
    try {
      if (!key || !this.client) {
        throw new Error("no conversation id or client found");
      }

      const messages = await this.client.lRange(`${CONVERSATION_MESSAGES_CACHE_PREFIX}:${key}`, 0, -1);
      if (!messages || messages.length <= 0) {
        throw new Error("no messages found from cache");
      }

      return { success: true, data: messages.map((item) => JSON.parse(item)) };
    } catch (err) {
      console.error(err);
      return { success: false, error: "unable to read from cache, follow log for more info" };
    }
  }

  async write(key: CacheKeyType, payload: ConversationMessageType[]): Promise<boolean> {
    try {
      if (!key || !this.client) {
        throw new Error("no conversation id or client found");
      }

      const multi = this.client.multi();
      for (const item of payload) {
        multi.rPush(`${CONVERSATION_MESSAGES_CACHE_PREFIX}:${key}`, JSON.stringify(item));
      }
      const value = await multi.exec();
      if (!value || value.length <= 0) {
        throw new Error("unable to write messages into cache");
      }
      // delete this messages list after 30 minutes from last update
      await this.client.expire(`${CONVERSATION_MESSAGES_CACHE_PREFIX}:${key}`, CONVERSATION_MESSAGES_CACHE_TTL);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async delete(key: CacheKeyType): Promise<boolean> {
    try {
      if (!key || !this.client) {
        throw new Error("no conversation id or client found");
      }

      const value = await this.client.del(`${CONVERSATION_MESSAGES_CACHE_PREFIX}:${key}`);
      if (value <= 0) {
        throw new Error("no messages deleted from cache");
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
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
