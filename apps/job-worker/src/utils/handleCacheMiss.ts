import { ConversationMessagesCache } from "@echo/cache";
import { prisma } from "@echo/database";

export async function handleCacheMiss(conversationId: string): Promise<boolean> {
    const dbRes = await prisma.conversation.findFirst({
        where: {
            id: conversationId
        },
        select: {
            messages: {
                select: {
                    author: true,
                    content: true
                }
            }
        }
    });

    if (!dbRes || !dbRes.messages || dbRes.messages.length <= 0) {
        return false;
    }
    
    const cache = await ConversationMessagesCache.getInstance();

    const writeRes = await cache.write(conversationId, dbRes.messages);
    if (!writeRes.success) {
        console.error("unable to write into cahce");
        return false;
    }

    return true;
}