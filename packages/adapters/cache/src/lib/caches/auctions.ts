import { BidStatus, SignedBid, StoredBid, getNtpTimeSeconds, Bid } from "@connext/nxtp-utils";

import { StoreChannel } from "../entities";
import { TransactionsCache } from ".";

export class AuctionsCache extends TransactionsCache {
  /**
   * Stores bid to redis
   *
   * @param bid The signed bid we're going to store
   * @returns Returns the number of bids for a txId
   */
  public async storeBid(bid: Bid): Promise<number> {
    const txid = bid.transactionId;
    const router = bid.data.router;
    const curTimeInSecs = await getNtpTimeSeconds();

    await this.data.hset(
      `bids:${txid}:${router}`,
      "payload",
      JSON.stringify(bid),
      "status",
      BidStatus.Pending,
      "lastUpdate",
      curTimeInSecs,
    );

    const count = (await this.data.keys(`${txid}:bid:*`)).length;

    await this.data.publish(StoreChannel.NewBid, JSON.stringify(bid));

    return count;
  }

  /**
   * Updates the status of bid
   *
   * @param bid The signed bid we're going to update
   * @param bidStatus The status of bid
   * @returns success - true, failure - false
   */
  public async updateBid(bid: Bid, bidStatus: BidStatus): Promise<boolean> {
    const txid = bid.transactionId;
    const router = bid.data.router;
    const curTimeInSecs = await getNtpTimeSeconds();

    const updated = await this.data.hset(
      `bids:${txid}:${router}`,
      "payload",
      JSON.stringify(bid),
      "status",
      bidStatus,
      "lastUpdate",
      curTimeInSecs,
    );

    if (updated === 1) return true;
    else return false;
  }

  /**
   * Gets the bids by transactionId
   *
   * @param transactionId The transactionId of the bids that we're going to get
   * @returns Auction bids that were stored with the status
   */
  public async getBidsByTransactionId(transactionId: string): Promise<StoredBid[]> {
    const storedBids: StoredBid[] = [];

    const bidStream = this.data.scanStream({
      match: `bids:${transactionId}:*`,
    });

    return new Promise((res, rej) => {
      bidStream.on("data", async (resultKeys: string) => {
        for (const key of resultKeys) {
          // 1 - "data" - key
          // 2 - value for the `data`
          // 3 - "status" - key
          // 4 - value for the `status`
          // 5 - `lastUpdate` - key
          // 6 - value for the `lastUpdate`
          const record = await this.data.hgetall(key);
          const bidStatus = record["status"];
          const lastUpdate = Number(record["lastUpdate"]);

          storedBids.push({
            payload: JSON.parse(record["payload"]) as Bid,
            status: bidStatus as BidStatus,
            lastUpdate,
          });
        }
      });
      bidStream.on("end", async () => {
        res(storedBids);
      });
      bidStream.on("error", (error: string) => {
        this.logger.debug(error);
        rej(error);
      });
    });
  }
}
