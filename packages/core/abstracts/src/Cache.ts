import { RedisClientType } from "redis";
import {CacheKeyType, CacheReturnType} from "@echo/natives";

export abstract class Cache<PayloadType> {
    protected abstract client: RedisClientType | null;

    abstract read(key: CacheKeyType): Promise<CacheReturnType<PayloadType>>;
    abstract write(key: CacheKeyType, payload: PayloadType): Promise<CacheReturnType<PayloadType>>;
    abstract delete(key: CacheKeyType): Promise<CacheReturnType<PayloadType>>;
    abstract disconnect(): Promise<void>;
}