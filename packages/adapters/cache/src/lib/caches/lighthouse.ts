import { LightHouseDataStatus, LightHouseData } from "@connext/nxtp-utils";

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
}
