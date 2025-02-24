import { Queue } from "@echo/redis";
import { Cache } from "@echo/redis";
import { handleCacheMiss } from "./handleCacheMiss";
import { getResponse } from "./getResponse";

async function main() {
    const queueName = process.env.JOB_QUEUE_NAME;
    if (!queueName) throw new Error("queue name not provided!");
    const queue = await Queue.getInstance(queueName);
    const cache = await Cache.getInstance();

    while (true) {
        const payload = await queue.dequeue();
        if (!payload) continue;

        let history = await cache.read(payload.conversationId);
        // cache miss
        if (!history || history.length <= 0) {
            const success = await handleCacheMiss(payload.conversationId);
            if (success)
                history = await cache.read(payload.conversationId);
        }

        const response = await getResponse(payload, history);
        console.log(`response from llm: ${response}`)
    }
}

main();