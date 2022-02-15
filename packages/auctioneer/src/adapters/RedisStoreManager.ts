
import { jsonifyError, Logger } from "@connext/nxtp-utils";
import Redis from "ioredis";

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

  private getKey(chain: number, id: string) {
    return `${chain}-${id}`;
  }

  public async getBatch(chain: number, id: string): Promise<any> {
    const _stored = await this.redis.get(this.getKey(chain, id));
    // let stored: Batch | undefined;
    let stored: any | undefined;
    try {
      stored = JSON.parse(_stored as string);
    } catch (error: any) {
      this.logger.error("Error parsing JSON", undefined, undefined, jsonifyError(error));
    }
    if (!stored) {
      // If entry doesn't exist, create it.
      stored = {
        id,
        chain,
        transactions: {},
        history: [],
      };
      await this.save(stored);
    }
    return stored;
  }

  public async save(batch: any): Promise<void> {
    await this.redis.set(this.getKey(batch.chain, batch.id), JSON.stringify(batch));
  }
}
