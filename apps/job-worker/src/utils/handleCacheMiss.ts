import { ConversationMessagesCache } from "@echo/cache";
import { prisma } from "@echo/database";

/*
fetch messages from database
write data back into cache
*/
export async function handleCacheMiss(conversationId: string): Promise<void> {
  try {
    const dbRes = await prisma.conversation.findFirst({
      where: { id: conversationId },
      select: { messages: { select: { author: true, content: true } } },
    });
    if (!dbRes || !dbRes.messages || dbRes.messages.length <= 0) {
      throw new Error("no messages found in the database");
    }

    const cache = await ConversationMessagesCache.getInstance();
    const written = await cache.write(conversationId, dbRes.messages);
    if (!written) {
      throw new Error("unable to write messages into cahce");
    }
  } catch (err) {
    console.error(err);
  }
}
