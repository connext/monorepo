import Redis from "ioredis";
import {
  CrossChainTx,
  CrossChainTxStatus,
  BidStatus,
  SignedBid,
  StoredBid,
  Logger,
  getNtpTimeSeconds,
} from "@connext/nxtp-utils";
import { CacheParams, StoreChannel } from "../entities";
import { Cache } from "./";
/**
 * Redis Store Details:
 * Transaction Data by Domain & Nonce
   key: $domain:$nonce | value: JSON.stringify(CrossChainTx);
 * Transaction Status by TransactionId
   key: $txid | value CrossChainTxStatus as string
 */
export class TransactionsCache extends Cache {
  private readonly data!: Redis.Redis;
  public readonly logger = new Logger({ level: "debug" });

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
    return new Promise((res, rej) => {
      status.on("data", (txidMatch: string) => {
        this.logger.debug("found txid");
        const val = this.data.get(txidMatch);
        res(val as unknown as CrossChainTxStatus);
      });
      status.on("end", () => {
        res(undefined);
      });
    });
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
      match: `${domain}:*`,
    });
    return new Promise((res, rej) => {
      nonceStream.on("data", (data: string) => {
        //strip domain name from key
        if (data[0] !== undefined) {
          const nonceStr = data[0].substring(data[0].indexOf(":") + 1, data[0].length);
          const nonce = parseInt(nonceStr);
          //mark as highest
          nonce > highestNonce ? (highestNonce = nonce) : highestNonce;
        }
      });
      //return highest
      nonceStream.on("end", async () => {
        await this.publish(StoreChannel.NewHighestNonce, domain);
        res(highestNonce);
      });
      nonceStream.on("error", (error: string) => {
        this.logger.debug(error);
        rej();
      });
    });
  }

  public async storeTxData(txs: CrossChainTx[]): Promise<void> {
    for (const tx of txs) {
      const existing = await this.data.get(`${tx.originDomain}:${tx.nonce}`);
      // Update the status, regardless of whether the transaction already exists.
      await this.data.set(tx.transactionId, tx.status);
      await this.publish(StoreChannel.NewStatus, `${tx.originDomain} : ${tx.status}`);

      if (!existing) {
        // Store the transaction data, since it doesn't already exist.
        await this.data.set(`${tx.originDomain}:${tx.nonce}`, JSON.stringify(tx));
        // If it's a new pending tx, we should call `publish` to notify the subscribers.
        await this.publish(StoreChannel.NewPreparedTx, tx);
      }
    }
  }

  /**
   * Stores bid to redis
   *
   * @param bid The signed bid we're going to store
   * @returns success - true, failure - false
   */
  public async storeBid(bid: SignedBid): Promise<boolean> {
    const txid = bid.bid.transactionId;
    const router = bid.bid.data.router;
    const curTimeInSecs = await getNtpTimeSeconds();

    const stored = await this.data.hset(
      `${txid}:bid:${router}`,
      "data",
      JSON.stringify(bid),
      "status",
      BidStatus.Pending,
      "lastUpdate",
      curTimeInSecs.toString(),
    );

    await this.publish(StoreChannel.NewBid, bid);

    if (stored === 1) return true;
    else return false;
  }

  /**
   * Updates the status of bid
   *
   * @param bid The signed bid we're going to update
   * @param bidStatus The status of bid
   * @returns success - true, failure - false
   */
  public async updateBid(bid: SignedBid, bidStatus: BidStatus): Promise<boolean> {
    const txid = bid.bid.transactionId;
    const router = bid.bid.data.router;
    const curTimeInSecs = await getNtpTimeSeconds();

    const updated = await this.data.hset(
      `${txid}:bid:${router}`,
      "data",
      JSON.stringify(bid),
      "status",
      bidStatus,
      "lastUpdate",
      curTimeInSecs.toString(),
    );

    if (updated === 1) return true;
    else return false;
  }

  /**
   * Gets the bids by status
   *
   * @param status The status of the bids that we're going to get
   * @returns Auction bids that were stored for the status
   */

  public async getBids(status?: BidStatus): Promise<StoredBid[]> {
    const storedBids: StoredBid[] = [];

    return storedBids;
  }
}
