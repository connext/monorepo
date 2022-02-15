
import { jsonifyError, Logger } from "@connext/nxtp-utils";
import Redis from "ioredis";
import { Bid } from "../lib/types";

// import { Batch } from "../../lib";

type StoreManagerParams = { redisUrl: string; logger: Logger; redis?: Redis.Redis };

export class StoreManager {
  private static instance: StoreManager | undefined;

  private readonly redis: Redis.Redis;

  private readonly logger: Logger;

  private constructor({ redisUrl, logger, redis }: StoreManagerParams) {
    if (redis) {
      this.redis = redis;
    } else {
      this.redis = new Redis(redisUrl);
    }
    this.logger = logger;
  }

  public static getInstance({ redisUrl, logger, redis }: StoreManagerParams): StoreManager {
    if (StoreManager.instance) {
      return StoreManager.instance;
    } else {
      const store = new StoreManager({ redis, redisUrl, logger });
      StoreManager.instance = store;
      return store;
    }
  }

  public async getCache(nxtpId: string): Promise<Bid>{
    const _cache = await this.redis.get(nxtpId);
    let cache: Bid | undefined;
    try {
      cache = JSON.parse(_cache as string);
    } catch (e) {
      this.logger.error(`Get Cache Error`, undefined, undefined, jsonifyError(e));
    }
    return cache;
    
  }

  public async save(cache: any): Promise<void> {
    await this.redis.set(cache.nxtpId, JSON.stringify(cache.bid));
  }
}
