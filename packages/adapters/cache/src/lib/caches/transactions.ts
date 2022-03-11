import { CrossChainTx, CrossChainTxStatus } from "@connext/nxtp-utils";
import { BidStatus, SignedBid, StoredBid, getNtpTimeSeconds, Bid } from "@connext/nxtp-utils";
import { StoreChannel } from "../entities";
import { Cache } from ".";

/**
 * Redis Store Details:
 * Transaction Data by Domain & Nonce
   key: $domain:$nonce | value: JSON.stringify(CrossChainTx);
 * Transaction Status by TransactionId
   key: $txid | value CrossChainTxStatus as string
 */
export class TransactionsCache extends Cache {
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
   * Returns pointer to latest nonce for `domain` network
   * @param domain The chain's domain that we're going to get the latest nonce on
   * @returns latest nonce for that domain
   */
  public async getLatestNonce(domain: string): Promise<number> {
    const res = await this.data.hget(domain, "latestNonce");
    if (res) {
      return parseInt(res);
    }
    return 0;
  }

  /**
   * @dev Gets Transaction Data By Domain and Txid
   * @param domain The chain domain
   * @param txid TransactionId
   * @returns Transaction data
   */
  public async getTxDataByDomainAndTxID(domain: string, txid: string): Promise<CrossChainTx> {
    const txDataStream = await this.data.hscanStream(domain, {
      match: `*:${txid}`,
    });
    let txData: CrossChainTx;
    return new Promise((res, rej) => {
      txDataStream.on("data", (data: string) => {
        //should only be one txid,
        txData = JSON.parse(data) as CrossChainTx;
      });
      txDataStream.on("end", async () => {
        res(txData);
      });
      txDataStream.on("error", (e: string) => {
        this.logger.debug(`Error getting txdata by domain and txid`);
        rej();
      });
    });
  }

  public async getTxDataByDomainAndNonce(domain: string, nonce: string): Promise<CrossChainTx> {
    const txDataStream = await this.data.hscanStream(domain, {
      match: `${nonce}:*`,
    });
    let txData: CrossChainTx;
    return new Promise((res, rej) => {
      txDataStream.on("data", (data: string) => {
        //should only be one txid,
        txData = JSON.parse(data) as CrossChainTx;
      });
      txDataStream.on("end", async () => {
        res(txData);
      });
      txDataStream.on("error", (e: string) => {
        this.logger.debug(`Error getting txdata by domain and nonce`);
        rej();
      });
    });
  }

  public async storeTxData(txs: CrossChainTx[]): Promise<void> {
    for (const tx of txs) {
      //set transaction data at domain field in hash
      const resSet = await this.data.hset(tx.originDomain, `${tx.nonce}:${tx.transactionId}`, JSON.stringify(tx));
      if (resSet !== 0) {
        console.log(`successfully set the txdata`);
      } else {
        return;
      }
      //move pointer to latest Nonce
      const latestNonce = (await this.data.hget(tx.originDomain, "latestNonce")) ?? "0";
      if (tx.nonce > parseInt(latestNonce)) {
        //if this txns nonce is > the current pointer to latest nonce point to this one now
        await this.data.hset(tx.originDomain, "latestNonce", tx.nonce);
      }
      //dont think we need to set the status anymore.

      await this.data.publish(StoreChannel.NewPreparedTx, JSON.stringify(tx));
    }
  }
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

    //update by router per txid and update current time global per router as well
    const stored = await this.data.hset(
      `bids:${txid}`,
      "txdata",
      JSON.stringify({ bid: bid, status: BidStatus.Pending }),
      "lastUpdate",
      curTimeInSecs,
    );

    //hkeys is expensive
    const count = (await this.data.hkeys("bids")).length;

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
      `bids:${txid}`,
      "txdata",
      JSON.stringify({ bid: bid, status: bidStatus, lastUpdate: curTimeInSecs }),
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

    const bidStream = this.data.hscanStream(`bids:${transactionId}`, {
      match: `bids:${transactionId}`
    });

    return new Promise((res, rej) => {
      bidStream.on("data", async (k: string) => {
        const bidVal = await this.data.hget(k,"txdata");

        if (bidVal) {
          const bidIntermdiate = JSON.parse(bidVal);
          storedBids.push({
            payload: bidIntermdiate.bid as Bid,
            status: bidIntermdiate.bidStatus as BidStatus,
            lastUpdate: bidIntermdiate.lastUpdate,
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
