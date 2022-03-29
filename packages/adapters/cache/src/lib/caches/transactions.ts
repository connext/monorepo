import { XTransfer, XTransferStatus } from "@connext/nxtp-utils";
import { StoreChannel } from "../entities";
import { Cache } from ".";

/**
 * Redis Store Details:
 * Transaction Data by Domain & Nonce
   key: $domain:$nonce | value: JSON.stringify(XTransfer);
 * Transaction Status by TransactionId
   key: $txid | value XTransferStatus as string
 */
export class TransactionsCache extends Cache {
  private readonly prefix = "transactions";
  /**
   *
   * @param txid TransactionId to store
   * @param status The status of the TranscationID
   * @returns true/false based on an "OK" from the store.
   * todo://getStatus() to verify that it's not already in the DB
   */
  public async storeStatus(txid: string, status: XTransferStatus): Promise<boolean> {
    const prevStatus = await this.getStatus(txid);
    if (prevStatus == status) {
      return false;
    } else {
      // Return value is OK if SET was executed correctly
      // if the SET operation was not performed because the user specified the NX or XX option but the condition was not met.
      await this.data.set(txid, status);
      this.data.publish(StoreChannel.NewStatus, `${txid}:${status}`);
      return true;
    }
  }
  /**
   *
   * @param txid TransacionId to search the cache for
   * @returns TransactionId's status or unfefined if it's not there.
   */
  public async getStatus(txid: string): Promise<XTransferStatus | undefined> {
    const status = this.data.scanStream({
      match: `${txid}`,
    });
    return new Promise((res) => {
      status.on("data", (txidMatch: string) => {
        this.logger.debug("found txid");
        const val = this.data.get(txidMatch);
        res(val as unknown as XTransferStatus);
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
    const res = await this.data.hget(`${this.prefix}:${domain}`, "latestNonce");
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
  public async getTxDataByDomainAndTxID(domain: string, txid: string): Promise<XTransfer | undefined> {
    const txDataStream = this.data.hscanStream(`${this.prefix}:${domain}`, {
      match: `*:${txid}`,
      count: 1,
    });
    let txData: XTransfer;
    return new Promise((res) => {
      txDataStream.on("data", async (data: string) => {
        const crossChainData = await this.data.hget(`${this.prefix}:${domain}`, data);
        txData = JSON.parse(crossChainData!) as XTransfer;
      });
      txDataStream.on("end", async () => {
        res(txData);
      });
    });
  }

  /**
   * Gets transfer data by transferId.
   *
   * @param transferId - transferId property
   * @returns XTransfer data
   */
  public async getTransferByTransferId(transferId: string): Promise<XTransfer | undefined> {
    const result = await this.data.hget(`${this.prefix}:transfers`, `${transferId}`);
    return result ? (JSON.parse(result) as XTransfer) : undefined;
  }

  public async getTxDataByDomainAndNonce(domain: string, nonce: string): Promise<XTransfer | undefined> {
    const txDataStream = this.data.hscanStream(`${this.prefix}:${domain}`, {
      match: `${nonce}:*`,
    });

    let txData: XTransfer;
    return new Promise((res) => {
      txDataStream.on("data", async (data: string) => {
        const crossChainData = await this.data.hget(`${this.prefix}:${domain}`, data);
        txData = JSON.parse(crossChainData!) as XTransfer;
      });
      txDataStream.on("end", async () => {
        res(txData);
      });
    });
  }

  public async storeTransfers(transfers: XTransfer[]): Promise<void> {
    const nonceDidIncreaseForDomain: { [domain: string]: boolean } = {};
    const highestNonceByDomain: { [domain: string]: number } = {};
    const newXCalls: { [transferId: string]: string } = {};
    for (let transfer of transfers) {
      const existing = await this.getTransferByTransferId(transfer.transferId);
      // TODO: Sanity check: no update needed if this transfer is same as the one already stored!

      // TODO: Sanity check: make sure that the existing transfer's metadata is the same as the old one!

      // Update the existing transfer with the data from the new one; this will collate the transfer across
      // domains, since our cache is indexed by transferId.
      transfer = existing ? { ...existing, ...transfer } : transfer;
      const { xcall, execute, reconcile, transferId, nonce: _nonce, originDomain } = transfer;
      const nonce = Number(_nonce);
      const stringified = JSON.stringify(transfer);

      // set transaction data at domain field in hash, hset returns the number of field that were added
      // gte(1) => added, 0 => updated,
      // reference: https://redis.io/commands/hset
      await this.data.hset(`${this.prefix}:transfers`, `${transferId}`, stringified);
      if (xcall.transactionHash && !execute?.transactionHash && !reconcile?.transactionHash) {
        // If xcall but no execute or reconcile, then it's possibly a new transfer.
        newXCalls[transferId] = stringified;
      } else if (execute?.transactionHash || reconcile?.transactionHash) {
        // If execute (or reconcile), then it's a stale xcall. In case we've previously recorded
        // the xcall as new in this batch, we need to remove it from the newXCalls list.
        delete newXCalls[transferId];
      }
      // Retrieve latest nonce for this domain.
      let currentNonce = highestNonceByDomain[originDomain];
      if (!currentNonce) {
        // If we don't have a nonce recorded yet for this domain, we need to retrieve it from the cache.
        currentNonce = (await this.getLatestNonce(originDomain)) ?? 0;
        highestNonceByDomain[originDomain] = currentNonce;
      }
      if (nonce > currentNonce) {
        // If the new nonce is higher than the current one, we'll record it to later update the cache.
        nonceDidIncreaseForDomain[originDomain] = true;
        highestNonceByDomain[originDomain] = nonce;
      }
    }
    // Publish NewXCall events for any new xcalls we found.
    for (const transfer of Object.values(newXCalls)) {
      await this.data.publish(StoreChannel.NewXCall, transfer);
    }
    // Set the new highest nonce, and publish NewHighestNonce events for any new highest nonces we found.
    for (const [domain, nonce] of Object.entries(highestNonceByDomain)) {
      if (nonceDidIncreaseForDomain[domain]) {
        await this.data.hset(`${this.prefix}:${domain}`, "latestNonce", nonce);
      }
    }
  }
}
