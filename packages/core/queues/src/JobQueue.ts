import {Queue, QueueReturnType} from "@echo/abstracts";
import {JobPayloadSchema, JobPayloadType} from "@echo/zod";
import { RedisClientType, createClient } from "redis";

const JOB_QUEUE_NAME = "job-queue";
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
    static async getInstance(name: string) {
        if (!JobQueue.instance) {
            JobQueue.instance = new JobQueue();
            await JobQueue.instance.client?.connect();
        }
        return JobQueue.instance;
    }

    async enqueue(payload: JobPayloadType)
    : Promise<QueueReturnType<JobPayloadType>> {
        if (!this.queueName)
            return {success: false, error: "No queue found!"};
        if (!this.client) 
            return {success: false, error: "No queue instance found!"};

        const zodRes = JobPayloadSchema.safeParse(payload);
        if (!zodRes.success)
            return {success: false, error: "Job payload schema invalid"};

        const redisRes = await this.client.rPush(this.queueName, JSON.stringify(payload));
        if (!redisRes || redisRes <= 0) 
            return {success: false, error: "Faild to enqueue job payload"};

        return {success: true, data: payload};
    }

    async dequeue()
    : Promise<QueueReturnType<JobPayloadType>> {
        if (!this.queueName)
            return {success: false, error: "No queue found!"};
        if (!this.client) 
            return {success: false, error: "No queue instance found!"};

        const redisRes = await this.client.lPop(this.queueName);
        if (!redisRes)
            return {success: false, error: "Failed to dequeue job payload"};

        try {
            const parsedPayload = JSON.parse(redisRes);
            return {success: true, data: parsedPayload};
        }
        catch(err) {
            return {success: false, error: "Invalid job payload schema received"}
        }
    }

    async disconnect(): Promise<void> {
        if (!JobQueue.instance)
            return;

        if (this.client)
            await this.client.disconnect();
        JobQueue.instance = null;
        console.log("job queue disconnected!");
    }

    async length(): Promise<number> {
        if (!this.queueName)
            return -1;
        if (!this.client) 
            return -1;

        const length = await this.client.lLen(this.queueName);
        return length;
    }
}