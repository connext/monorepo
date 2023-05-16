import { ExecStatus, ExecutorData, MetaTxTask, getNtpTimeSeconds } from "@connext/nxtp-utils";

import { Cache } from "./cache";

/**
 * Redis Store Details:
 * Executor Data:
 *   key: data:$transferId | value: ExecutorData;
 *
 * Executor tx Status:
 *   key: status:$transferId | value: ExecStatus;
 */
export class ExecutorCache extends Cache {
  private readonly prefix = "executor";

  /// MARK - Executor Data
  /**
   * Stores executor data in the cache. All executor data will be stored (JSON stringfied)
   * and they're indexed by transferId
   *
   * @param params - Executor data to store
   * @returns 1 if added, 0 if updated.
   */
  public async storeExecutorData(params: ExecutorData): Promise<number> {
    const key = `${this.prefix}:data`;
    return await this.data.hset(key, params.transferId, JSON.stringify(params));
  }

  /**
   * Get executor data for a given transferId
   * @param transferId - Transfer Id
   */
  public async getExecutorData(transferId: string): Promise<ExecutorData | undefined> {
    const key = `${this.prefix}:data`;
    const res = await this.data.hget(key, transferId);
    return res ? (JSON.parse(res) as ExecutorData) : undefined;
  }

  /**
   * Stores executor data to the backup store.
   * @param params - The executor data you're gonna store
   * @returns 2 if skipped, 1 if added, 0 if updated.
   */
  public async storeBackupData(params: ExecutorData): Promise<number> {
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
      // We don't need to store the exact executor data in the backup cache
      return 2;
    }
  }

  /**
   * Gets all the executor data from the backup store for a given transfer id
   * @param transferId - The transfer id
   * @returns The array of executor data.
   */
  public async getBackupData(transferId: string): Promise<ExecutorData[]> {
    return JSON.parse((await this.data.hget(`${this.prefix}:backup`, transferId)) ?? "[]");
  }

  /**
   * Removes all the executor data including backup items for a given transferId.
   * @param transferId - The transferId you're gonna remove for
   */
  public async pruneExecutorData(transferId: string): Promise<void> {
    const dataKey = `${this.prefix}:data`;
    const backupKey = `${this.prefix}:backup`;
    await this.data.hdel(dataKey, transferId);
    await this.data.hdel(backupKey, transferId);

    await this.setExecStatus(transferId, ExecStatus.None);
  }

  /// MARK - Executor Tx Status
  /**
   * Set the status for a given tranfer id
   * @param transferId - Transfer Id
   * @param status - The status to set
   * @returns 1 if added, 0 if updated.
   */
  public async setExecStatus(transferId: string, status: ExecStatus): Promise<number> {
    const key = `${this.prefix}:status`;
    await this.setExecStatusTime(transferId);
    return await this.data.hset(key, transferId, status.toString());
  }

  /**
   * Get the status for a given transfer id
   * @param transferId - Tranfer Id to get
   * @returns The executor tx status.
   */
  public async getExecStatus(transferId: string): Promise<ExecStatus> {
    const key = `${this.prefix}:status`;
    const res = await this.data.hget(key, transferId);
    return res && Object.values(ExecStatus).includes(res as ExecStatus)
      ? ExecStatus[res as ExecStatus]
      : ExecStatus.None;
  }

  /**
   * Set the exec timestamp for a given tranfer id
   * @param transferId - Transfer Id
   * @returns 1 if added, 0 if updated.
   */
  public async setExecStatusTime(transferId: string): Promise<number> {
    const key = `${this.prefix}:timestamp`;
    const timestamp = getNtpTimeSeconds().toString();
    return await this.data.hset(key, transferId, timestamp);
  }

  /**
   * Get the exec timestamp for a given transfer id
   * @param transferId - Tranfer Id to get
   * @returns The last update time in seconds.
   */
  public async getExecStatusTime(transferId: string): Promise<number> {
    const key = `${this.prefix}:timestamp`;
    const res = await this.data.hget(key, transferId);
    return res ? Number(res) : 0;
  }

  /// MARK - Meta TX Tasks
  /**
   * Gets the meta tx information for the given transfer ID.
   * @param transferId - The ID of the transfer we are relaying.
   * @returns MetaTxTask if exists, undefined otherwise.
   */
  public async getMetaTxTask(transferId: string): Promise<MetaTxTask | undefined> {
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
