import Redis from "ioredis";
import { CrossChainTx, Logger, TransactionData } from "@connext/nxtp-utils";

import { AuctionCache } from "./auction";
import { CachedTransaction } from "./lib/entities/cache";

//Redis Store I

//domain:nonce
//value: JSON.stringify(transactionData);

//Redis Store II
//key: domain:nonce
//value: "Pending", "Completed", "Reconcilled" <txStatus>

// TODO:
export type Bid = any;
export type ChainCache = {
  auctions: AuctionCache;
};

export type CallbackFn = (msg: any, err?: any) => void;

type StoreManagerParams = { redisUrl: string; logger: Logger; redis?: Redis.Redis };

export enum RedisChannels {
  NEW_PREPARED_TX = "NewPreparedTransaction",
}

export class StoreManager {
  private readonly cache: Map<string, ChainCache> = new Map();
  private readonly subscriptions: Map<string, CallbackFn> = new Map();

  private static instance: StoreManager | undefined;

  private readonly txData!: Redis.Redis;
  private readonly txStatus!: Redis.Redis;
  private readonly pendingTxData!: Redis.Redis;

  private readonly logger: Logger;

  private constructor({ redisUrl, logger, redis }: StoreManagerParams) {
    if (redis) {
    } else {
      this.txData = new Redis(redisUrl + "/1");
      this.txStatus = new Redis(redisUrl + "/2");
      this.pendingTxData = new Redis(redisUrl + "/3");
      this.initSubscribers();
    }
    this.logger = logger;
  }

  /**
   * Initialize channels and handlers
   */
  private initSubscribers() {
    this.pendingTxData.on("message", (channel, message) => {
      if (this.subscriptions.has(channel)) {
        const callbackFn = this.subscriptions.get(channel);
        if (callbackFn) callbackFn(message);
      }
    });
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

    // TODO: add arguments
    // this.txData.zrevrangebyscore();

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
    await this.txStatus.set(cache.nxtpId, JSON.stringify(cache.bid));
  }

  public async storeTxData(crossChainTxs: CrossChainTx[]): Promise<void> {
    // TODO Basically it should save a new transaction or update transaction status if already exists.
    // Whenever a new pending tx arrives, it needs to call `publishToInstance` to be processed in router side
    // Key name needs to be matched with other types.
    for (const crossChainTx of crossChainTxs) {
      await this.txData.set(crossChainTx.transactionId, JSON.stringify(crossChainTx));
    }
  }

  /**
   * Publishes a message to the specified channel
   * @param channelName The channel name that publishes messages to
   * @param message The message to publish
   */
  public async publishToInstance(channelName: string, message: string): Promise<void> {
    if (!this.subscriptions.has(channelName)) {
      throw new Error(`Channel ${channelName} doesn't exist`);
    }
    this.pendingTxData.publish(channelName, message);
  }

  /**
   * Subscribes to the specified channel, callback fn is called whenever a new message arrives
   * @param channelName The channel name that publishes messages to
   * @param callbackFn The callback function that is called whenever a new message arrives
   */
  public async subscribeToInstance(channelName: string, callbackFn: CallbackFn): Promise<void> {
    this.subscriptions.set(channelName, callbackFn);
    await this.pendingTxData.subscribe(channelName);
  }
}
