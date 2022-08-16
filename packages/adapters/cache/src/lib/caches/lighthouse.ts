import { LightHouseDataStatus, LightHouseData, MetaTxTask, getNtpTimeSeconds } from "@connext/nxtp-utils";

import { Cache } from "./cache";

/**
 * Redis Store Details:
 * Lighthouse Data:
 *   key: data:$transferId | value: LightHouseData;
 *
 * Lighthouse tx Status:
 *   key: status:$transferId | value: LightHouseDataStatus;
 */
export class LightHouseCache extends Cache {
  private readonly prefix = "lighthouse";

  /// MARK - LightHouse Data
  /**
   * Stores lighthouse data in the cache. All lighthouse data will be stored (JSON stringfied)
   * and they're indexed by transferId
   *
   * @param params - LightHouse data to store
   * @returns 1 if added, 0 if updated.
   */
  public async storeLightHouseData(params: LightHouseData): Promise<number> {
    const key = `${this.prefix}:data`;
    return await this.data.hset(key, params.transferId, JSON.stringify(params));
  }

  /**
   * Get lighthouse data for a given transferId
   * @param transferId - Transfer Id
   */
  public async getLightHouseData(transferId: string): Promise<LightHouseData | undefined> {
    const key = `${this.prefix}:data`;
    const res = await this.data.hget(key, transferId);
    return res ? (JSON.parse(res) as LightHouseData) : undefined;
  }

  /**
   * Stores lighthouse data to the backup store.
   * @param params - The lighthouse data you're gonna store
   * @returns 1 if added, 0 if updated.
   */
  public async storeBackupData(params: LightHouseData): Promise<number> {}

  /**
   * Gets all the lighthouse data from the backup store for a given transfer id
   * @param transferId - The transfer id
   * @returns The array of lighthouse data.
   */
  public async getBackupData(transferId: string): Promise<LightHouseData[] | undefined> {}

  /// MARK - LightHouse Tx Status
  /**
   * Set the status for a given tranfer id
   * @param tranferId - Transfer Id
   * @param status - The status to set
   * @returns 1 if added, 0 if updated.
   */
  public async setLightHouseDataStatus(tranferId: string, status: LightHouseDataStatus): Promise<number> {
    const key = `${this.prefix}:status`;
    return await this.data.hset(key, tranferId, status.toString());
  }

  /**
   * Get the status for a given transfer id
   * @param transferId - Tranfer Id to get
   * @returns The lighthouse tx status.
   */
  public async getLightHouseDataStatus(transferId: string): Promise<LightHouseDataStatus> {
    const key = `${this.prefix}:status`;
    const res = await this.data.hget(key, transferId);
    return res && Object.values(LightHouseDataStatus).includes(res as LightHouseDataStatus)
      ? LightHouseDataStatus[res as LightHouseDataStatus]
      : LightHouseDataStatus.None;
  }

  /// MARK - Meta TX Tasks
  /**
   * Gets the auction meta tx information for the given transfer ID.
   * @param transferId - The ID of the transfer we are auctioning.
   * @returns AuctionTask if exists, undefined otherwise.
   */
  public async getTask(transferId: string): Promise<MetaTxTask | undefined> {
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
  public async upsertTask({ transferId, taskId }: { transferId: string; taskId: string }): Promise<number> {
    const existing = await this.getTask(transferId);
    const task: MetaTxTask = {
      // We update the timestamp each time here; it is intended to reflect when the *last* meta tx was sent.
      timestamp: getNtpTimeSeconds().toString(),
      taskId,
      attempts: existing ? existing.attempts + 1 : 1,
    };
    const res = await this.data.hset(`${this.prefix}:task`, transferId, JSON.stringify(task));
    return Number(res >= 1);
  }
}
