import Redis from "ioredis";
import { CrossChainTx, TransactionData, CrossChainTxStatus } from "@connext/nxtp-utils";

import { CacheParams, StoreChannel } from "../entities";
import { Cache } from "./";

export class TransactionsCache extends Cache {
  // Redis Store I
  // domain:nonce
  // value: JSON.stringify(transactionData);
  private readonly data!: Redis.Redis;
  // Redis Store II
  // key: domain:nonce
  // value: "Pending", "Completed", "Reconcilled" <txStatus>
  private readonly status!: Redis.Redis;

  public constructor({ url, subscriptions }: CacheParams) {
    super({ url, subscriptions });
    if (url.split("//").pop() === "mock") {
      const IoRedisMock = require("ioredis-mock");
      this.data = new IoRedisMock();
      this.status = new IoRedisMock();
    } else {
      this.data = new Redis(`${url}/1`);
      this.status = new Redis(`${url}/2`);
    }
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

  /**
   * Returns latest nonce on `domain` network
   *
   * @param domain The network id that we're going to get the latest nonce on
   */
  public async getLatestNonce(domain: string): Promise<number> {
    const keys = await this.data.keys("*");
    const crossChainTxs: CrossChainTx[] = [];
    for (const key of keys) {
      const value = await this.data.get(key);
      if (value) {
        const crossChainTx = JSON.parse(value) as CrossChainTx;
        if (crossChainTx.originDomain === domain) crossChainTxs.push(crossChainTx);
      }
    }

    const sortedCrossChainTxs = crossChainTxs
      .filter((tx) => tx.status === CrossChainTxStatus.Prepared)
      .sort((a, b) => a.nonce - b.nonce);

    const latestNonce = sortedCrossChainTxs.length > 0 ? sortedCrossChainTxs[0].nonce : 0;
    return latestNonce;
  }

  public async storeStatus(cache: any): Promise<void> {
    await this.status.set(cache.nxtpId, JSON.stringify(cache.bid));
  }

  public async storeTxData(txs: CrossChainTx[]): Promise<void> {
    for (const tx of txs) {
      const existing = await this.data.get(tx.transactionId);
      // Update the status, regardless of whether the transaction already exists.
      await this.status.set(tx.transactionId, tx.status.toString());
      if (!existing) {
        // Store the transaction data, since it doesn't already exist.
        await this.data.set(tx.transactionId, JSON.stringify(tx));
        // If it's a new pending tx, we should call `publish` to notify the subscribers.
        this.publish(StoreChannel.NewPreparedTx, tx);
      }
    }
  }
}
