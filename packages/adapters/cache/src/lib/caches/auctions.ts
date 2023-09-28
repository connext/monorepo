import { Bid, getNtpTimeSeconds, Auction, ExecStatus, MetaTxTask, Status } from "@connext/nxtp-utils";

import { Cache } from "./cache";

/**
 * Redis Store Details:
 * Auctions:
 *   key: $transferId | value: JSON.stringify(Auction);
 *
 * Auction Status:
 *   key: $transferId | value: JSON.stringify(ExecStatus);
 *
 * Auction Tasks:
 *   key: $transferId | value: JSON.stringify(MetaTxTask);
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

    return Number(res >= 1);
  }

  /// MARK - Meta TX Tasks
  /**
   * Gets the auction meta tx information for the given transfer ID.
   * @param transferId - The ID of the transfer we are auctioning.
   * @returns MetaTxTask if exists, undefined otherwise.
   */
  public async getMetaTxTask(transferId: string): Promise<MetaTxTask | undefined> {
    const res = await this.data.hget(`${this.prefix}:task`, transferId);
    return res ? (JSON.parse(res) as MetaTxTask) : undefined;
  }

  /**
   * Creates or updates the meta tx information for the given transfer ID.
   *
   * @param data.transferId - The ID of transfer we are auctioning.
   * @param data.taskId - Auction task ID from relayer.
   *
   * @returns 0 if updated, 1 if created
   */
  public async upsertMetaTxTask({ transferId, taskId }: { transferId: string; taskId: string }): Promise<number> {
    const existing = await this.getMetaTxTask(transferId);
    const task: MetaTxTask = {
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
   * @returns ExecStatus if exists, ExecStatus.None if no entry was found.
   */
  public async getExecStatus(transferId: string): Promise<ExecStatus> {
    const rawStatus = await this.data.hget(`${this.prefix}:status`, transferId);
    const res = rawStatus ? (JSON.parse(rawStatus) as Status).status : null;
    return res && Object.values(ExecStatus).includes(res as ExecStatus)
      ? ExecStatus[res as ExecStatus]
      : ExecStatus.None;
  }

  /// MARK - Auction Status with time
  /**
   * Gets the auction status with time for the given transfer ID.
   * @param transferId - The ID of the transfer we are auctioning.
   * @returns Status if exists, undefined if no entry was found.
   */
  public async getExecStatusWithTime(transferId: string): Promise<Status | undefined> {
    const rawStatus = await this.data.hget(`${this.prefix}:status`, transferId);
    return rawStatus ? (JSON.parse(rawStatus) as Status) : undefined;
  }

  public async setExecStatus(transferId: string, status: ExecStatus): Promise<number> {
    const currrentStatus: Status = {
      // Update the timestamp to current time
      timestamp: getNtpTimeSeconds().toString(),
      status: status.toString(),
    };
    return await this.data.hset(`${this.prefix}:status`, transferId, JSON.stringify(currrentStatus));
  }

  /**
   * Removes all the auction data/status for a given transferId.
   * @param transferId - The transferId to be removed
   */
  public async pruneAuctionData(transferId: string): Promise<void> {
    const dataKey = `${this.prefix}:auction`;
    await this.data.hdel(dataKey, transferId);
    const statusKey = `${this.prefix}:status`;
    await this.data.hdel(statusKey, transferId);
  }
}
