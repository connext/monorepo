import { CrossChainTx, TransactionData, CrossChainTxStatus } from "@connext/nxtp-utils";
import Redis from "ioredis";

import { Cache, CacheParams, SubscriptionCallback, Subscriptions } from "../entities";

//Redis Store I

//domain:nonce
//value: JSON.stringify(transactionData);

//Redis Store II
//key: domain:nonce
//value: "Pending", "Completed", "Reconcilled" <txStatus>

export class TransactionsCache extends Cache {
  public readonly data!: Redis.Redis;
  public readonly status!: Redis.Redis;
  public readonly pending!: Redis.Redis;

  public constructor({ url }: CacheParams) {
    super({ url });
    this.data = new Redis(`${url}/1`);
    this.status = new Redis(`${url}/2`);
    this.pending = new Redis(`${url}/3`);
    this.initSubscribers();
  }

  protected initSubscribers(): void {
    this.pending.on("message", (channel, message) => {
      if (this.subscriptions.has(channel)) {
        const callbackFn = this.subscriptions.get(channel);
        if (callbackFn) callbackFn(message);
      }
    });
  }

  public async getStatus(domain: string, nonce: string): Promise<CrossChainTxStatus | undefined> {
    const status = this.status.scanStream({
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

    const stream = this.data.scanStream({
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
    await this.status.set(cache.nxtpId, JSON.stringify(cache.bid));
  }

  public async storeTxData(txs: CrossChainTx[]): Promise<void> {
    // TODO Basically it should save a new transaction or update transaction status if already exists.
    // Whenever a new pending tx arrives, it needs to call `publishToInstance` to be processed in router side
    // Key name needs to be matched with other types.
    for (const tx of txs) {
      await this.data.set(tx.transactionId, JSON.stringify(tx));
    }
  }

  /**
   * Publishes a message to the specified channel
   * @param channel The channel name that publishes messages to
   * @param message The message to publish
   */
  public async publish(channel: string, message: string): Promise<void> {
    if (!this.subscriptions.has(channel)) {
      throw new Error(`Channel ${channel} doesn't exist`);
    }
    this.pending.publish(channel, message);
  }

  /**
   * Subscribes to the specified channel, callback fn is called whenever a new message arrives
   * @param channel The channel name that publishes messages to
   * @param callback The callback function that is called whenever a new message arrives
   */
  public async subscribe(channel: string, callback: SubscriptionCallback): Promise<void> {
    this.subscriptions.set(channel, callback);
    await this.pending.subscribe(channel);
  }
}
