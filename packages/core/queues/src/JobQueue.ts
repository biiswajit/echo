import {Queue} from "@echo/abstracts";
import {JobPayloadSchema, JobPayloadType} from "@echo/zod";
import { RedisClientType, createClient } from "redis";
import { QueueReturnType } from "@echo/natives";

const JOB_QUEUE_NAME = "job_queue";
export class JobQueue extends Queue<JobPayloadType> {
    private static instance: JobQueue | null = null;
    protected queueName: string | null;
    protected client: RedisClientType | null;

    private constructor() {
        super();
        this.queueName = JOB_QUEUE_NAME;
        this.client = createClient();
        this.client.on("error", (err) => {
            console.error("error while create redis client!");
        });
    }

    /*
    Since JobQueue is a singleton class you can not be able to create instance of this class
    Use getInstance() function to get or create one single instance
    */
    static async getInstance()
    : Promise<JobQueue> {
        if (!JobQueue.instance) {
            JobQueue.instance = new JobQueue();
            await JobQueue.instance.client?.connect();
        }
        return JobQueue.instance;
    }

    async enqueue(payload: JobPayloadType
    ): Promise<boolean> {
        try {
            if (!this.queueName || !this.client) {
                throw new Error("no client or queue found")
            }

            const zod = JobPayloadSchema.safeParse(payload);
            if (!zod.success) {
                throw new Error(`invalid job schema received ${zod.error}`);
            }

            const value = await this.client.rPush(this.queueName, JSON.stringify(payload));
            if (!value || value <= 0) {
                throw new Error("failed to enqueue job");
            }

            return true;
        }
        catch(err) {
            console.error(err);
            return false;
        }
    }

    async dequeue()
    : Promise<QueueReturnType<JobPayloadType>> {
        try {
            if (!this.queueName || !this.client) {
                throw new Error("no client or queue found")
            }

            const value = await this.client.blPop(this.queueName, 0);
            if (!value || !value.element) {
                throw new Error("no valid job received from queue");
            }

            return {success: true, data: JSON.parse(value.element)};
        }
        catch(err) {
            console.error(err);
            return {success: false, error: "unable to get job from queue, check log for more info"};
        }
    }

    async disconnect(): Promise<void> {
        if (!JobQueue.instance) {
            return;
        }

        if (this.client) {
            await this.client.disconnect();
        }

        JobQueue.instance = null;
        console.log("job queue disconnected!");
    }

    async length(): Promise<number> {
        try {
            if (!this.queueName || !this.client) {
                throw new Error("no client or queue found")
            }

            return await this.client.lLen(this.queueName);
        }
        catch(err) {
            console.error(err);
            return -1;
        }
    }
}