import {RedisClientType} from "redis";

export type QueueReturnType<PayloadType> = {
    success: boolean;
    error?: string;
    data?: PayloadType;
}

// TODO: if you want to add more features with then feel free to modify this
export abstract class Queue<PayloadType> {
    protected abstract client: RedisClientType | null;
    protected abstract queueName: string | null;

    abstract enqueue(payload: PayloadType): Promise<QueueReturnType<PayloadType>>;
    abstract dequeue(): Promise<QueueReturnType<PayloadType>>;
    abstract disconnect(): Promise<void>;
    abstract length(): Promise<number>;
}