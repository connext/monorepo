import { getRandomBytes32, RelayerApiFee, LightHouseTxStatus } from "@connext/nxtp-utils";

import { Cache } from "./cache";

export type CachedTaskData = {
  chain: number;
  to: string;
  data: string;
  fee: RelayerApiFee;
};

export type LightHouseData = {
  relayerFee: {
    amount: string;
    asset: string;
  };
  encodedData: string;
};

/**
 * Redis Store Details:
 * Lighthouse Data:
 *   key: data:$transferId | value: LightHouseData;
 *
 * Lighthouse tx Status:
 *   key: status:$transferId | value: LightHouseTxStatus;
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
  public async storeLightHouseData(params: LightHouseData): Promise<number> {}

  /**
   * Get lighthouse data for a given transferId
   * @param transferId - Transfer Id
   */
  public async getLightHouseData(transferId: string): Promise<LightHouseData> {}

  /// MARK - LightHouse Tx Status
  /**
   * Set the status for a given tranfer id
   * @param tranferId - Transfer Id
   * @param status - The status to set
   * @returns 1 if added, 0 if updated.
   */
  public async setLightHouseTxStatus(tranferId: string, status: LightHouseTxStatus): Promise<number> {}

  /**
   * Get the status for a given transfer id
   * @param transferId - Tranfer Id to get
   * @returns The lighthouse tx status.
   */
  public async getLightHouseTxStatus(transferId: string): Promise<LightHouseTxStatus> {}
}
