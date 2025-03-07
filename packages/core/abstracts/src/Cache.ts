import { RedisClientType } from "redis";
import {CacheKeyType, CacheReturnType} from "@echo/natives";

export abstract class Cache<PayloadType> {
    protected abstract client: RedisClientType | null;

    abstract read(key: CacheKeyType): Promise<CacheReturnType<PayloadType>>;
    abstract write(key: CacheKeyType, payload: PayloadType): Promise<boolean>;
    abstract delete(key: CacheKeyType): Promise<boolean>;
    abstract disconnect(): Promise<void>;
}