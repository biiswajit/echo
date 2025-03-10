import { prisma } from "@echo/database";
import { DBPayloadType } from "@echo/zod";

export async function storeIntoDB(messages: DBPayloadType[]) {
  if (!messages || messages.length <= 0) {
    console.log("no pending db requests found");
    return;
  }

  try {
    const stored = await prisma.message.createMany({ data: messages });

    if (!stored) {
      throw new Error("unable to store pending messages into database");
    }
  } catch (err) {
    console.log(err);
  }
}
