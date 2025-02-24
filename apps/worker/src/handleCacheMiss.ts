import { prisma } from "@echo/database";
import { Cache } from "@echo/redis";

export async function handleCacheMiss(conversationId: string): Promise<boolean> {
    try {
        const prismaRes = await prisma.conversation.findFirst({
            where: { id: conversationId },
            orderBy: { createdAt: "asc" },
            select: {
                messages: {
                    select: {
                        author: true,
                        content: true
                    }
                }
            }
        });

        if (!prismaRes || !prismaRes.messages) return false;

        const cache = await Cache.getInstance();
        const success = await cache.write(conversationId, prismaRes.messages);
        if (!success) return false;

        return true;
    }
    catch (err) {
        console.error(`error! while fetching conversation history! for more info ${err}`);
        return false;
    }
}