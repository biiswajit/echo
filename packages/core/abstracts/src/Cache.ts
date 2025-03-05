import { RedisClientType } from "redis";

export type CacheReturnType<T> = {
    success: boolean;
    error?: string;
    data?: T;
}

export type CacheKeyType = string;

export abstract class Cache<PayloadType> {
    protected abstract client: RedisClientType | null;

    abstract read(key: CacheKeyType): Promise<CacheReturnType<PayloadType>>;
    abstract write(key: CacheKeyType, payload: PayloadType): Promise<CacheReturnType<PayloadType>>;
    abstract delete(key: CacheKeyType): Promise<CacheReturnType<PayloadType>>;
    abstract disconnect(): Promise<void>;
}