import { Bid, getNtpTimeSeconds, Auction, AuctionStatus, AuctionTask, BidData } from "@connext/nxtp-utils";

import { Cache } from "./cache";

/**
 * Redis Store Details:
 * Auctions:
 *   key: $transferId | value: JSON.stringify(Auction);
 *
 * Auction Status:
 *   key: $transferId | value: JSON.stringify(AuctionStatus);
 *
 * Auction Tasks:
 *   key: $transferId | value: JSON.stringify(AuctionTask);
 *
 * TODO: This a temporary solution to store the relevant data needed to encode
 * execute calldata for the meta tx. Should be deprecated once the sequencer
 * uses the subgraph to get the data needed.
 * BidData:
 *   key: $domain | value: string;
 */
export class AuctionsCache extends Cache {
  private readonly prefix = "auctions";

  /// MARK - Auction Data
  /**
   * Retrieve auction data for a given transfer ID.
   * @param transferId - The ID of the transfer we are auctioning.
   * @returns Auction data if exists, undefined otherwise.
   */
  public async getAuction(transferId: string): Promise<Auction | undefined> {
    const res = await this.data.hget(`${this.prefix}:auction`, transferId);
    return res ? (JSON.parse(res) as Auction) : undefined;
  }

  /**
   * Creates or updates an existing auction entry for the given transfer ID.
   *
   * @param data.transferId - The ID of transfer we are auctioning.
   * @param data.origin - The origin domain of the transfer.
   * @param data.destination - The destination domain of the transfer.
   * @param data.bid - The actual bid from the router, including signatures by round.
   *
   * @returns 0 if updated, 1 if created
   */
  public async upsertAuction({
    transferId,
    origin,
    destination,
    bid,
  }: {
    transferId: string;
    origin: string;
    destination: string;
    bid: Bid;
  }): Promise<number> {
    // If auction entry exists, add to it; otherwise, we'll create a new entry.
    const existing = await this.getAuction(transferId);

    const auction: Auction = {
      timestamp: existing?.timestamp ?? getNtpTimeSeconds().toString(),
      origin,
      destination,
      bids: {
        ...(existing?.bids ?? {}),
        [bid.router]: bid,
      },
    };
    const res = await this.data.hset(`${this.prefix}:auction`, transferId, JSON.stringify(auction));

    if (!existing) {
      // If the auction didn't previously exist, create an entry for status as well.
      await this.setStatus(transferId, AuctionStatus.Queued);
    }

    return Number(res >= 1);
  }

  /// MARK - Meta TX Tasks
  /**
   * Gets the auction meta tx information for the given transfer ID.
   * @param transferId - The ID of the transfer we are auctioning.
   * @returns AuctionTask if exists, undefined otherwise.
   */
  public async getTask(transferId: string): Promise<AuctionTask | undefined> {
    const res = await this.data.hget(`${this.prefix}:task`, transferId);
    return res ? (JSON.parse(res) as AuctionTask) : undefined;
  }

  /**
   * Creates or updates the meta tx information for the given transfer ID.
   *
   * @param data.transferId - The ID of transfer we are auctioning.
   * @param data.taskId - Auction task ID from relayer.
   *
   * @returns 0 if updated, 1 if created
   */
  public async upsertTask({ transferId, taskId }: { transferId: string; taskId: string }): Promise<number> {
    const existing = await this.getTask(transferId);
    const task: AuctionTask = {
      // We update the timestamp each time here; it is intended to reflect when the *last* meta tx was sent.
      timestamp: getNtpTimeSeconds().toString(),
      taskId,
      attempts: existing ? existing.attempts + 1 : 1,
    };
    const res = await this.data.hset(`${this.prefix}:task`, transferId, JSON.stringify(task));
    return Number(res >= 1);
  }

  /// MARK - Auction Status
  /**
   * Gets the auction status for the given transfer ID.
   * @param transferId - The ID of the transfer we are auctioning.
   * @returns AuctionStatus if exists, AuctionStatus.None if no entry was found.
   */
  public async getStatus(transferId: string): Promise<AuctionStatus> {
    const res = await this.data.hget(`${this.prefix}:status`, transferId);
    return res && Object.values(AuctionStatus).includes(res as AuctionStatus)
      ? AuctionStatus[res as AuctionStatus]
      : AuctionStatus.None;
  }

  public async setStatus(transferId: string, status: AuctionStatus): Promise<number> {
    return await this.data.hset(`${this.prefix}:status`, transferId, status.toString());
  }

  /// MARK - Queued Transfers
  /**
   * Retrieve all transfer IDs that have the AuctionStatus.Queued status.
   * @returns An array of transfer IDs.
   */
  public async getQueuedTransfers(): Promise<string[]> {
    const stream = this.data.hscanStream(`${this.prefix}:status`);
    const keys: string[] = [];
    await new Promise((res) => {
      stream.on("data", (resultKeys: string[] = []) => {
        // Note that resultKeys will sometimes contain duplicates due to SCAN's implementation in Redis
        // link : https://redis.io/commands/scan/#scan-guarantees
        for (const resultKey of resultKeys) {
          if (!keys.includes(resultKey)) keys.push(resultKey);
        }
      });
      stream.on("end", async () => {
        res(undefined);
      });
    });
    const filtered: string[] = [];
    for (const key of keys) {
      const status = await this.getStatus(key);
      if (status === AuctionStatus.Queued) {
        filtered.push(key);
      }
    }
    return filtered;
  }

  /// MARK - Bid Data
  /**
   * Gets the bid data for the given transfer ID.
   *
   * @notice This is temporary solution to store the relevant data needed to encode execute calldata.
   * Should be deprecated.
   *
   * @param transferId - The ID of the transfer we are auctioning.
   * @returns BidData if exists, undefined otherwise.
   */
  public async getBidData(transferId: string): Promise<BidData | undefined> {
    const res = await this.data.hget(`${this.prefix}:bidData`, transferId);
    return res ? (JSON.parse(res) as BidData) : undefined;
  }

  /**
   * Sets the bid data for the given transfer ID.
   *
   * @notice This is temporary solution to store the relevant data needed to encode execute calldata.
   * Should be deprecated.
   *
   * @param transferId - The ID of the transfer we are auctioning.
   * @param data - Bid data to store.
   *
   * @returns 0 if updated, 1 if created
   */
  public async setBidData(transferId: string, data: BidData): Promise<number> {
    return await this.data.hset(`${this.prefix}:bidData`, transferId, JSON.stringify(data));
  }

  /**
   * Flushes the entire cache.
   *
   * @returns string "OK"
   */
  public async clear(): Promise<"OK"> {
    return await this.data.flushall();
  }
}
