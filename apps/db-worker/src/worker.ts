import { storeIntoDB, dequeueFromDBQueue } from "./utils/index.js";

const BATCH_INTERVAL = 30000;
const MAX_NUMBER_OF_MESSAGES = 50;

async function main() {
  try {
    console.log("Dequeuing messages...");
    const messages = await dequeueFromDBQueue(BATCH_INTERVAL, MAX_NUMBER_OF_MESSAGES);

    console.log(`Dequeued ${messages.length} messages. Storing in DB...`);
    await storeIntoDB(messages);
  } catch (err) {
    console.error("Error processing queue:", err);
  }

  // Schedule next run after BATCH_INTERVAL
  setTimeout(main, BATCH_INTERVAL);
}

main();
