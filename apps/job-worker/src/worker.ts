import {JobQueue, DBQueue} from "@echo/queues";
import {ConversationMessagesCache} from "@echo/cache";
import { handleCacheMiss, responseMapper} from "./utils";
import { ConversationMessageType } from "@echo/natives";
import { v4 as uuidv4 } from 'uuid';

async function main(): Promise<void> {
    const jobQueue = await JobQueue.getInstance();
    const cache = await ConversationMessagesCache.getInstance();
    const dbQueue = await DBQueue.getInstance();

    while (true) {
        const dequeued = await jobQueue.dequeue();
        // TODO: no retry now, but in future design a retry mechanism
        if (!dequeued.success || !dequeued.data) {
            console.error(dequeued.error);
            continue;
        }
        const payload = dequeued.data;

        let response: string = "";
        if (payload.jobType === "title") {
            response = await responseMapper(payload, null);
        }
        else {
            let read = await cache.read(payload.conversationId);
            if (!read.success) {
                console.log("cache miss");
                await handleCacheMiss(payload.conversationId);
                read = await cache.read(payload.conversationId);
            }
            let messages: ConversationMessageType[] | null = read.data ? read.data : null;

            response = await responseMapper(payload, messages);
            
            const written = await cache.write(
                payload.conversationId, 
                [{author: "USER", content: payload.prompt}, {author: "ASSISTANT", content: response}]
            );
            if (!written) {
                console.error("falied to write user and assistant response into cache");
            }

            await dbQueue.enqueue({
                requestId: uuidv4(),
                author: "USER",
                content: payload.prompt,
                createdAt: new Date(),
                conversationId: payload.conversationId,
                modelId: payload.modelId
            });
            await dbQueue.enqueue({
                requestId: uuidv4(),
                author: "ASSISTANT",
                content: response,
                createdAt: new Date(),
                conversationId: payload.conversationId,
                modelId: payload.modelId
            });        
        }

        // TODO: stream this response back to web instead of just printing out
        console.log(`Response from model: ${response}`);
    }
}

main();