import { Logger } from "@connext/nxtp-utils";

export type CacheParams = { host?: string; port?: number; mock: boolean; logger: Logger };

export type TimestampedCacheValue<T> = {
  value: T;
  timestamp: number;
};
