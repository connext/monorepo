import { Redis } from "ioredis";
import { Logger } from "@connext/nxtp-utils";

export type StoreManagerParams = { redis: { url: string; instance?: Redis }; logger: Logger; };

export type CacheParams = { url: string; };
