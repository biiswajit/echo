import { DBQueue } from "@echo/queues";
import { DBPayloadType } from "@echo/zod";

export async function dequeueFromDBQueue(interval: number, maxLength: number) {
	const messages: DBPayloadType[] = [];
	const queue = await DBQueue.getInstance();
	const startTimestamp = Date.now();
	while (Date.now() - startTimestamp < interval && messages.length < maxLength) {
		const dequeued = await queue.dequeue();
		if (!dequeued.success || !dequeued.data) {
			continue;
		}
		messages.push(dequeued.data);
	}
	return messages;
}
