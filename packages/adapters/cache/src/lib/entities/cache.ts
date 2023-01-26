import { Logger } from "@connext/utils";

export type CacheParams = { host?: string; port?: number; mock: boolean; logger: Logger };

export type TimestampedCacheValue<T> = {
  value: T;
  timestamp: number;
};
