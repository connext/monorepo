import { XTransfer } from "@connext/nxtp-utils";

import { StoreChannel } from "../entities";
import { getHelpers } from "../helpers";

import { Cache } from ".";

/**
 * Redis Store Details:
 * Transfer Data by ID:
 *   key: $transferId | value: JSON.stringify(XTransfer);
 *
 * Pending Transfers (IDs):
 *   key: $domain | value: JSON.stringify(string[]);
 *
 * Latest Nonce:
 *   key: $domain | value: string;
 */
export class TransfersCache extends Cache {
  private readonly prefix = "transfers";

  /// MARK - Latest Nonce
  /**
   * Retrieve currently stored latest nonce for the specified domain. If no nonce is
   * stored, returns 0 by default.
   *
   * @param domain - The domain whose latest nonce we're retrieving.
   * @returns latest nonce we've recorded for that domain
   */
  public async getLatestNonce(domain: string): Promise<number> {
    const res = await this.data.hget(`${this.prefix}:nonce`, domain);
    if (res) {
      return parseInt(res);
    }
    return -1;
  }

  public async setLatestNonce(domain: string, nonce: number): Promise<number> {
    const res = await this.data.hset(`${this.prefix}:nonce`, domain, nonce);
    if (res) {
      return res;
    }
    return -1;
  }

  /// MARK - Transfer Data
  /**
   * Gets transfer data by transfer ID.
   *
   * @param transferId - transfer ID property
   * @returns XTransfer data
   */
  public async getTransfer(transferId: string): Promise<XTransfer | undefined> {
    const result = await this.data.hget(`${this.prefix}:transfers`, transferId);
    return result ? (JSON.parse(result) as XTransfer) : undefined;
  }

  //prune completed by domain could be v blocking, needs piping
  //returns int based on success or failure of internal pruning,
  //successful prune could be no prune, unsuccessful prune is one that failed where it shouldnt have ie. @ HDEL

  public async pruneTransfers(domain: number): Promise<boolean> {
    //is there pending transactions?
    const pending = await this.getPending(domain.toString());

    //dont delete pending
    if (pending) {
      return true;
    }
    //there is no pending txns
    //possible edge if status of new transfer changes during fn execution
    const latestCompleted = await this.getLatestNonce(domain.toString());
    {
      //search through all transactions w/ nonce lower than latst completed.
      //iterate through transfers jsonify, compare and delete if nonce < latestCompleted
      const transferIds = this.data.hgetall(`${this.prefix}:transfers`);
      for (const transferId in transferIds) {
        const transfer = await this.getTransfer(transferId);
        if (transfer?.xparams?.nonce) {
          const shouldBeDeleted = transfer.xparams.nonce < latestCompleted;
          if (shouldBeDeleted) {
            const deleted = await this.data.hdel(`${this.prefix}:transfers`, transferId);
            if (deleted !== 1) {
              return false;
            }
          }
        }
      }
      return true;
    }
  }

  /**
   * Stores a batch of transfers in the cache. All transfer data will be stored (JSON
   * stringified). Transfers are indexed by their transferId. Additionally, adds new pending transfers
   * to the cached array of pending transfer IDs.
   *
   * @param transfers - Transfers to store. All overlapping transfers (with same ID) either
   * within the same batch or existing in the current cache will be collated upon storage.
   * @returns XTransfer data
   */
  public async storeTransfers(transfers: XTransfer[]): Promise<void> {
    const { sanitizeNull } = getHelpers();
    const nonceDidIncreaseForDomain: { [domain: string]: boolean } = {};
    const highestNonceByDomain: { [domain: string]: number } = {};
    for (let transfer of transfers) {
      const existing = await this.getTransfer(transfer.transferId);
      // Sanity check: no update needed if this transfer is same as the one already stored.
      if (JSON.stringify(transfer) === JSON.stringify(existing)) {
        continue;
      }

      // Update the existing transfer with the data from the new one; this will collate the transfer across
      // domains, since our cache is indexed by transferId.
      transfer = existing
        ? {
            // Collate core properties.
            ...sanitizeNull(existing),
            ...sanitizeNull(transfer),

            // Origin may exist on existing and/or input transfer, old one needs to be replaced because users could bump a transfer
            origin: transfer.origin,

            // Destination may exist on both existing and input transfer, we need to do a nested collation in case
            // the new transfer has new information (e.g. existing has Executed data, new transfer includes Reconcile).
            destination:
              existing.destination || transfer.destination
                ? {
                    ...sanitizeNull(existing.destination ?? {}),
                    ...sanitizeNull(transfer.destination ?? {}),
                  }
                : undefined,
          }
        : transfer;
      const { transferId, xparams, origin, destination } = transfer;
      const { originDomain } = xparams;
      const nonce = Number(xparams.nonce);
      const stringified = JSON.stringify(transfer);

      // set transaction data at domain field in hash, hset returns the number of field that were added
      // gte(1) => added, 0 => updated,
      // reference: https://redis.io/commands/hset
      const added = (await this.data.hset(`${this.prefix}:transfers`, transferId, stringified)) >= 1;
      if (added && origin?.xcall.transactionHash && !destination) {
        // XCall defined but Execute and Reconcile are not defined => pending transfer.
        // If the transfer was added (previously not recorded) and it's a pending transfer, add it to the
        // pending transfers list.
        await this.addPending(originDomain, transferId);
      } else if (destination?.execute?.transactionHash || destination?.reconcile?.transactionHash) {
        // If either execute or reconcile are present, then the transfer is no longer pending. Remove it from
        // the list of pending transfers for the origin domain.
        await this.removePending(originDomain, transferId);
      }

      // Retrieve latest nonce for this domain.
      let currentNonce = highestNonceByDomain[originDomain];
      if (!currentNonce) {
        // If we don't have a nonce recorded yet for this domain, we need to retrieve it from the cache.
        currentNonce = (await this.getLatestNonce(originDomain)) ?? 0;
        highestNonceByDomain[originDomain] = currentNonce;
        nonceDidIncreaseForDomain[originDomain] = true;
      }
      if (nonce > currentNonce) {
        // If the new nonce is higher than the current one, we'll record it to later update the cache.
        highestNonceByDomain[originDomain] = nonce;
        nonceDidIncreaseForDomain[originDomain] = true;
      }
    }
    // Set the new highest nonce, and publish NewHighestNonce events for any new highest nonces we found.
    for (const [domain, nonce] of Object.entries(highestNonceByDomain)) {
      if (nonceDidIncreaseForDomain[domain]) {
        await this.data.hset(`${this.prefix}:nonce`, domain, nonce);
        await this.data.publish(StoreChannel.NewHighestNonce, JSON.stringify({ domain, nonce }));
      }
      //prune old cache by domain
      await this.pruneTransfers(parseInt(domain));
    }
  }

  /// MARK - Pending Transfers
  /**
   * Returns all transfer IDs belonging to transfers that are pending auction for the specified
   * domain.
   *
   * @param domain - Domain to get pending transfers for.
   */
  public async getPending(domain: string): Promise<string[]> {
    return JSON.parse((await this.data.hget(`${this.prefix}:pending`, domain)) ?? "[]");
  }

  /**
   * Add a transfer ID to the list of pending transfers for the specified domain.
   *
   * @param domain - The domain to add the transfer ID to.
   * @param transferId - The transfer ID to add to the list of pending transfers.
   */
  private async addPending(domain: string, transferId: string) {
    const currentPending = await this.getPending(domain);
    if (!currentPending.includes(transferId)) {
      await this.data.hset(`${this.prefix}:pending`, domain, JSON.stringify([...currentPending, transferId]));
    }
  }

  /**
   * Remove a transfer ID from the list of pending transfers for the specified domain.
   *
   * @param domain - The domain to remove the transfer ID from.
   * @param transferId - The transfer ID to remove from the list of pending transfers.
   * @returns boolean indicating whether the transfer ID was successfully removed from the
   * list of pending transfers.
   */
  private async removePending(domain: string, transferId: string): Promise<boolean> {
    const currentPending = await this.getPending(domain);
    const index = currentPending.findIndex((id) => id === transferId);
    if (index >= 0) {
      currentPending.splice(index, 1);
      await this.data.hset(`${this.prefix}:pending`, domain, JSON.stringify(currentPending));
      return true;
    }
    return false;
  }

  /// MARK - Errors
  /**
   * Returns a list of all error strings for the specified transfer ID.
   *
   * @param transferId
   */
  private async getErrors(transferId: string): Promise<string[]> {
    return JSON.parse((await this.data.hget(`${this.prefix}:errors`, transferId)) ?? "[]");
  }

  /**
   * Record an error that occurred for a transfer. This is used to track all different errors that
   * occur for a given transfer and prevent redundant logging during retries.
   *
   * @param transferId - The transfer ID to add to the list of pending transfers.
   * @param error - String error message to save.
   *
   * @returns boolean indicating true if the error is a new error and was added to the errors array,
   * and false if it already exists.
   */
  public async saveError(transferId: string, error: string): Promise<boolean> {
    const currentErrors = await this.getErrors(transferId);
    const isNewError = !currentErrors.includes(error);
    if (isNewError) {
      await this.data.hset(`${this.prefix}:errors`, transferId, JSON.stringify([...currentErrors, error]));
    }
    return isNewError;
  }
}
