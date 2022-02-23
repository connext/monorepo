import Redis from "ioredis";
import { Logger, TransactionData } from "@connext/nxtp-utils";

import { Bid } from "../lib/types";

type StoreManagerParams = { redisUrl: string; logger: Logger; redis?: Redis.Redis };

export class StoreManager {
  private static instance: StoreManager | undefined;

  private readonly txData: Redis.Redis;
  private readonly txStatus: Redis.Redis;

  private readonly logger: Logger;

  private constructor({ redisUrl, logger, redis }: StoreManagerParams) {
    if (redis) {
    } else {
      this.txData = new Redis(redisUrl + "/1");
      this.txStatus = new Redis(redisUrl + "/2");
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

  public async getStatus(domain: string, nonce: string): Promise<Bid | undefined> {
    const status = this.txStatus.scanStream({
      match: `${domain}:${nonce}`,
      count: 1,
    });

    const recordStatus = await status.read(1);
    //todo: cast to status enum
    return recordStatus;
  }

  public async getLatestNonce(domain: string): Promise<TransactionData | undefined> {
    //assuming theres a guranetee it starts from latest record

    this.txData.zrevrangebyscore();
    const stream = this.txData.scanStream({
      // only returns keys following the pattern of `user:*`
      match: `${domain}:*`,
      // only return objects that match a given type,
      // (requires Redis >= 6.0)
      // returns approximately 100 elements per call
      count: 1,
    });

    const latestRecordForDomain = await stream.read(1);
    const parsedRecord = JSON.parse(latestRecordForDomain);

    return parsedRecord;
  }

  public async storeStatus(cache: any): Promise<void> {
    await this.redis.set(cache.nxtpId, JSON.stringify(cache.bid));
  }

  public async storeTxData(data: any): Promise<void> {}
}
