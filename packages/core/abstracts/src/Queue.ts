import {RedisClientType} from "redis";
import { QueueReturnType } from "@echo/natives";

// TODO: if you want to add more features with then feel free to modify this
export abstract class Queue<PayloadType> {
    protected abstract client: RedisClientType | null;
    protected abstract queueName: string | null;

    abstract enqueue(payload: PayloadType): Promise<boolean>;
    abstract dequeue(): Promise<QueueReturnType<PayloadType>>;
    abstract disconnect(): Promise<void>;
    abstract length(): Promise<number>;
}