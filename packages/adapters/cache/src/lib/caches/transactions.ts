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
    const prevStatus = await this.getStatus(txid);
    if (prevStatus == status) {
      return false;
    } else {
      // Return value is OK if SET was executed correctly
      // if the SET operation was not performed because the user specified the NX or XX option but the condition was not met.
      await this.data.set(txid, status);
      return true;
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
    const res = await this.data.hget(`transactions:${domain}`, "latestNonce");
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
    const txDataStream = this.data.hscanStream(`transactions:${domain}`, {
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
    const txDataStream = this.data.hscanStream(`transactions:${domain}`, {
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
      const resSet = await this.data.hset(
        `transactions:${tx.originDomain}`,
        `${tx.nonce}:${tx.transactionId}`,
        JSON.stringify(tx),
      );
      if (resSet !== 0) {
        console.log(`successfully set the txdata`);
      } else {
        return;
      }
      //move pointer to latest Nonce
      const latestNonce = (await this.data.hget(`transactions:${tx.originDomain}`, "latestNonce")) ?? "0";
      if (tx.nonce > parseInt(latestNonce)) {
        //if this txns nonce is > the current pointer to latest nonce point to this one now
        await this.data.hset(`transactions:${tx.originDomain}`, "latestNonce", tx.nonce);
      }
      //dont think we need to set the status anymore.

      await this.data.publish(StoreChannel.NewPreparedTx, JSON.stringify(tx));
    }
  }
}
