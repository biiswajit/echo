import { Queue, Cache } from "@echo/redis";
import { getResponse, handleCacheMiss } from "./functions";
import { conversationHistoryType } from "@echo/types/typescript";
import { Author } from "@echo/database";

async function main() {
    const queue = await Queue.getInstance(process.env.JOB_QUEUE_NAME || "job_queue");
    const cache = await Cache.getInstance();

    while (true) {
        const payload = await queue.dequeue();
        if (!payload) continue;

        let history = await cache.read(payload?.conversationId as string);

        if (history.length <= 0) {
            const success = await handleCacheMiss(payload.conversationId);
            if (success) history = await cache.read(payload.conversationId);
        }

        const res = await getResponse(payload, history);

        const toWrite: conversationHistoryType[] = [
            { author: Author.USER, content: payload.prompt },
            { author: Author.ASSISTANT, content: res }];

        await cache.write(payload.conversationId, toWrite);

        console.log(JSON.stringify(toWrite));
    }
}

main();