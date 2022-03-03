import Redis from "ioredis";
import { CrossChainTx, TransactionData, CrossChainTxStatus } from "@connext/nxtp-utils";

import { CacheParams, StoreChannel, TxStatus } from "../entities";
import { Cache } from "./";
import { stat } from "fs";

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


  //Stats:
  //key: txid | value: "status"
  public async getStatus(txid: string): Promise<CrossChainTxStatus | undefined> {
    const status = this.status.get(txid);
    if (typeof(status) === "string") {
      return status as CrossChainTxStatus;
    }
    return;
  }

  /**
   * Returns latest nonce on `domain` network
   *
   * @param domain The network id that we're going to get the latest nonce on
   * Nonce should be implicitly the index of the last element in the ordered list
   * //todo: this implies we need to keep the highest score if we prune data

   */

  //Data
  //key: domain 
  public async getLatestNonce(domain: string): Promise<number> {
    //get highest score in reverse for a domain data's ordered set.
    const highestScore = await this.data.zrevrange(domain, 0, 0, "WITHSCORES");
    return Number(highestScore[0]);
  }


  public async storeStatus(status: CrossChainTxStatus, txid: string): Promise<string | number> {
    //todo:this dosent need to be ordered afaik.
    //get highest score (latest record) for the domain
    const highestScore = await this.status.zrevrange(txid, 0, 0, "WITHSCORES");
    //add to the sorted list and increment score
    const newScore = Number(highestScore[0]) + 1;
    const addRes = await this.status.zadd(txid, newScore, status);
    return addRes;
  
  }

  public async storeTxData(txs: CrossChainTx[]): Promise<void> {
    
    for (const tx of txs) {
      //get latest score of origin domain's ordered set
      

      const existing = await this.data.get(tx.transactionId);
      // Update the status, regardless of whether the transaction already exists.
      await this.status.set(tx.transactionId, tx.status.toString());
      if (!existing) {
        const highestScore = await this.status.zrevrange(tx.originDomain, 0, 0, "WITHSCORES");
        const newScore = Number(highestScore[0]) + 1;
        // Store the transaction data with score in order it was recieved since it doesn't already exist.
        await this.data.zadd(tx.transactionId, newScore, JSON.stringify(tx));
        //and update the status 
        await this.storeStatus(CrossChainTxStatus.Prepared, tx.transactionId)
        // If it's a new pending tx, we should call `publish` to notify the subscribers.
        this.publish(StoreChannel.NewPreparedTx, JSON.stringify(tx));


      }
    }
  }
}
