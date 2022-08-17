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
   * @returns 2 if skipped, 1 if added, 0 if updated.
   */
  public async storeBackupData(params: LightHouseData): Promise<number> {
    const rawData = JSON.stringify(params);
    const currentPending = await this.getBackupData(params.transferId);
    const convertedPendings = currentPending.map((pending) => JSON.stringify(pending));

    if (convertedPendings.indexOf(rawData) === -1) {
      return await this.data.hset(
        `${this.prefix}:backup`,
        params.transferId,
        JSON.stringify([...currentPending, params]),
      );
    } else {
      // We don't need to store the exact lighthouse data in the backup cache
      return 2;
    }
  }

  /**
   * Gets all the lighthouse data from the backup store for a given transfer id
   * @param transferId - The transfer id
   * @returns The array of lighthouse data.
   */
  public async getBackupData(transferId: string): Promise<LightHouseData[]> {
    return JSON.parse((await this.data.hget(`${this.prefix}:backup`, transferId)) ?? "[]");
  }

  /**
   * Removes all the lighthouse data including backup items for a given transferId.
   * @param tranferId - The transferId you're gonna remove for
   */
  public async pruneLighthouseData(tranferId: string): Promise<void> {
    const dataKey = `${this.prefix}:data`;
    const backupKey = `${this.prefix}:backup`;
    await this.data.hdel(dataKey, tranferId);
    await this.data.hdel(backupKey, tranferId);

    await this.setLightHouseDataStatus(tranferId, LightHouseDataStatus.None);
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

  /// MARK - Meta TX Tasks
  /**
   * Gets the meta tx information for the given transfer ID.
   * @param transferId - The ID of the transfer we are relaying.
   * @returns MetaTxTask if exists, undefined otherwise.
   */
  public async getTask(transferId: string): Promise<MetaTxTask | undefined> {
    const res = await this.data.hget(`${this.prefix}:task`, transferId);
    return res ? (JSON.parse(res) as MetaTxTask) : undefined;
  }

  /**
   * Creates or updates the meta tx information for the given transfer ID.
   *
   * @param data.transferId - The ID of transfer we are relaying.
   * @param data.taskId - MetaTx task ID from relayer.
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

  /**
   * Gets all the transferIds which are already transferred to the exernal relayer
   */
  public async getSentTransfers(): Promise<string[]> {
    const stream = this.data.hscanStream(`${this.prefix}:task`);
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
    return keys;
  }
}
