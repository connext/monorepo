import Redis from "ioredis";
import { CrossChainTx, TransactionData, CrossChainTxStatus } from "@connext/nxtp-utils";

import { CacheParams, StoreChannel } from "../entities";
import { Cache } from "./";
import { Stream } from "stream";
/**
 * Redis Store Details:
 * Transaction Data by Domain & Nonce
   key: $domain:$nonce | value: JSON.stringify(CrossChainTx);
 * Transaction Status by TransactionId
   key: $txid | value CrossChainTxStatus as string
 */
export class TransactionsCache extends Cache {

  private readonly data!: Redis.Redis;

  public constructor({ url, subscriptions }: CacheParams) {
    super({ url, subscriptions });
    if (url.split("//").pop() === "mock") {
      const IoRedisMock = require("ioredis-mock");
      this.data = new IoRedisMock();
    } else {
      this.data = new Redis(`${url}`);
    }
  }
  /**
   *
   * @param txid TransactionId to store
   * @param status The status of the TranscationID
   * @returns true/false based on an "OK" from the store.
   * todo://getStatus() to verify that it's not already in the DB
   */
  public async storeStatus(txid: string, status: CrossChainTxStatus): Promise<boolean> {
    const stored = await this.data.set(txid, status);
    if (stored === "OK") {
      return true;
    } else {
      return false;
    }
  }
  /**
   *
   * @param txid TransacionId to search the cache for
   * @returns TransactionId's status or unfefined if it's not there.
   */
  public async getStatus(txid: string): Promise<CrossChainTxStatus | undefined> {
    const status = this.data.scanStream({
      match: `${txid}`,
    });
    status.on("data", (txidMatch) => {
      console.log("found txid");
      return txidMatch as CrossChainTx;
    });
    //todo: cast to status enum
    console.log("no txid found");
    return undefined;
  }

  /**
   * Returns latest nonce on `domain` network
   *
   * @param domain The chain's domain that we're going to get the latest nonce on
   * @returns latest nonce for that domain
   */
  public async getLatestNonce(domain: string): Promise<number> {
    let highestNonce: number = 0;

    const nonceStream = await this.data.scanStream({
      //search all records for the domain across all nonces.
      match: `${domain}:*}`,
    });
    return new Promise((res, rej) => {
      nonceStream.on("data", (data: string) => {
        //strip domain name from key
        const nonce = parseInt(data.substring(0, data.indexOf(":")));
        //mark as highest
        nonce > highestNonce ? (highestNonce = nonce) : highestNonce;
      });
      //return highest
      nonceStream.on("end", () => {
        this.publish(StoreChannel.NewHighestNonce, domain);
        res(highestNonce);
      });
      nonceStream.on("error", () => {
        rej();
      });
    });
  }

  public async storeTxData(txs: CrossChainTx[]): Promise<void> {
    for (const tx of txs) {
      const existing = await this.data.get(tx.transactionId);
      // Update the status, regardless of whether the transaction already exists.
      await this.data.set(`${tx.transactionId}`, tx.status.toString());
      if (!existing) {
        // Store the transaction data, since it doesn't already exist.
        await this.data.set(`${tx.originDomain}:${tx.nonce}`, JSON.stringify(tx));
        // If it's a new pending tx, we should call `publish` to notify the subscribers.
        this.publish(StoreChannel.NewPreparedTx, tx);
      }
    }
  }
}
