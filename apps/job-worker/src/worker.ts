import {JobQueue} from "@echo/queues";
import {ConversationMessagesCache} from "@echo/cache";
import { handleCacheMiss, responseMapper} from "./utils";
import { ConversationMessageType } from "@echo/natives";

/*
- dequeue one job from job queue
- check for messages in cache (look using conversationId)
    - message not in cache then handle cache miss
    - get messages from db
    - store the message in cache
    - fetch the message again from cache
- send conversation history and job payload to llm
- get response and print the response
*/

// TODO: right now response from model is just printed out, figure out how to stream them to web
async function main(): Promise<void> {
    const JOB_QUEUE_NAME = "job_queue";
    const queue = await JobQueue.getInstance(JOB_QUEUE_NAME);
    const cache = await ConversationMessagesCache.getInstance();

    while (true) {
        const queueRes = await queue.dequeue();
        // TODO: no retry now, but in future design a retry mechanism
        if (!queueRes.success) {
            console.error(queueRes.error);
            continue;
        }

        const payload = queueRes.data;
        if (!payload) {
            console.error("received undefined from job queue");
            continue;
        }

        let cacheRes = await cache.read(payload.conversationId);
        if (!cacheRes.success) {
            console.log("cache miss");
            const missHandled = await handleCacheMiss(payload.conversationId);
            if (missHandled) {
                cacheRes = await cache.read(payload.conversationId);
            }
        }

        let messages: ConversationMessageType[] | null;
        if (!cacheRes.data) {
            messages = null;
        }
        else {
            messages = cacheRes.data;
        }
        
        const response = responseMapper(payload, messages);
        console.log(`\n\nModel is saying: ${response}\n\n`);
    }
}