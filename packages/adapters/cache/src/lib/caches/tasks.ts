import { getRandomBytes32, RelayerApiFee, RelayerTaskStatus, getNtpTimeSeconds } from "@connext/nxtp-utils";

import { Cache } from "./cache";

export type CachedTaskData = {
  chain: number;
  to: string;
  data: string;
  fee: RelayerApiFee;
};

/**
 * Redis Store Details:
 * Task Data:
 *   key: data:$taskId | value: CachedTaskData;
 *
 * Task Status:
 *   key: status:$taskId | value: RelayerApiTaskStatus;
 *
 * Task Timestamp:
 *   key: timestamp:$taskId | value: string;
 *
 * Task Errors:
 *   key: error:$taskId | value: JSON.stringify(NxtpError);
 *
 * Task Tx Hash:
 *   key: hash:$taskId | value: string;
 */
export class TasksCache extends Cache {
  private readonly prefix = "tasks";
  private readonly defaultExpiryLen = 3600 * 3;

  /// MARK - Task Data
  /**
   * Get recorded liquidity amount for a given router on a given domain for a given asset.
   * @param taskId - Task ID string.
   * @returns CachedTaskData value if found, undefined if not found.
   */
  public async getTask(taskId: string): Promise<CachedTaskData | undefined> {
    const key = `${this.prefix}:data`;
    const res = await this.data.hget(key, taskId);
    return res ? (JSON.parse(res) as CachedTaskData) : undefined;
  }

  /**
   * Set recorded liquidity amount for a given router on a given domain for a given asset. Will also set
   * the status of the task to be RelayerTaskStatus.ExecPending.
   *
   * @param params.chain - Chain number.
   * @param params.data - Execute calldata.
   * @param params.fee - Relayer fee info.
   * @returns New task's ID.
   * @throws Error if task already exists.
   */
  public async createTask(params: CachedTaskData): Promise<string> {
    // TODO: Make the Task ID a hash of the calldata to add an additional recovery vector.
    const taskId = getRandomBytes32();
    const key = `${this.prefix}:data`;
    await this.data.hset(key, taskId, JSON.stringify(params));
    await this.setStatus(taskId, RelayerTaskStatus.ExecPending);
    return taskId;
  }

  /// MARK - Task Status
  /**
   * Gets the task status for the given task ID.
   * @param taskId - The ID of the task.
   * @returns TaskStatus if exists, TaskStatus.None if no entry was found.
   */
  public async getStatus(taskId: string): Promise<RelayerTaskStatus> {
    const res = await this.data.hget(`${this.prefix}:status`, taskId);
    return res && Object.values(RelayerTaskStatus).includes(res as RelayerTaskStatus)
      ? RelayerTaskStatus[res as RelayerTaskStatus]
      : RelayerTaskStatus.NotFound;
  }

  /**
   * Set the status of a given task.
   * @param taskId - The ID of the task we are setting the status of.
   * @param status - The status to set.
   * @returns 1 if added, 0 if updated.
   */
  private async setStatus(taskId: string, status: RelayerTaskStatus): Promise<number> {
    await this.setTimestamp(taskId);
    return await this.data.hset(`${this.prefix}:status`, taskId, status.toString());
  }

  /// MARK - Task Errors
  /**
   * Get the error saved to a given task.
   * @param taskId - The ID of the task.
   * @returns The error string if found, undefined if not found.
   */
  public async getError(taskId: string): Promise<string | undefined> {
    const res = await this.data.hget(`${this.prefix}:error`, taskId);
    return res ?? undefined;
  }

  /**
   * Sets the error of a given task. Additionally, will update the status of the task to RelayerTaskStatus.Error.
   * @param taskId - The ID of the task.
   * @param error - The error to set.
   * @returns Number indicating whether the error was updated.
   */
  public async setError(taskId: string, error: string): Promise<number> {
    await this.setStatus(taskId, RelayerTaskStatus.Cancelled);
    return await this.data.hset(`${this.prefix}:error`, taskId, error);
  }

  /// MARK - Transaction Hash
  /**
   * Get the transaction hash for a given task.
   * @param taskId - The ID of the task.
   * @returns The transaction hash if found, undefined if not found.
   * @returns The transaction hash if found, undefined if not found.
   */
  public async getHash(taskId: string): Promise<string | undefined> {
    const res = await this.data.hget(`${this.prefix}:hash`, taskId);
    return res ?? undefined;
  }

  /**
   * Set the transaction hash for a given task. Will also set the status of the task to RelayerTaskStatus.ExecSuccess.
   * @param taskId - The ID of the task.
   * @param txHash - The transaction hash to set.
   * @returns Number indicating whether the transaction hash was updated.
   */
  public async setHash(taskId: string, txHash: string): Promise<number> {
    await this.setStatus(taskId, RelayerTaskStatus.ExecSuccess);
    return await this.data.hset(`${this.prefix}:hash`, taskId, txHash);
  }

  /// MARK - Pending Tasks
  /**
   * Retrieve all task IDs that are pending action, based on status marked RelayerTaskStatus.ExecPending.
   *
   * @returns An array of task IDs.
   */
  public async getPending(): Promise<string[]> {
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
      if (status === RelayerTaskStatus.ExecPending) {
        filtered.push(key);
      }
    }
    return filtered;
  }

  /// MARK - Task Timestamp
  /**
   * Update the timestamp of the task to avoid a memory leak by deleteing expired tasks periodically
   * @param taskId - Task Id
   * @returns 1 if added, 0 if updated.
   */
  public async setTimestamp(taskId: string): Promise<number> {
    const curTime = getNtpTimeSeconds();
    return await this.data.hset(`${this.prefix}:timestamp`, taskId, curTime.toString());
  }

  /**
   * Returns the latest update time of the task
   *
   * @param taskId - The task id you wanna get the latest timestamp for
   * @returns The latest timestamp of the task in seconds
   */
  public async getTimestamp(taskId: string): Promise<number> {
    const res = await this.data.hget(`${this.prefix}:timestamp`, taskId);
    return res ? Number(res) : 0;
  }

  /**
   * Prunes all records which have been expired within a given length
   *
   * @param expiryLen - The length of expire time
   */
  public async pruneTasks(expiryLen?: number): Promise<void> {
    const _expiryLen = expiryLen ?? this.defaultExpiryLen;
    const curTimeStamp = getNtpTimeSeconds();

    const taskIds = this.data.hgetall(`${this.prefix}:timestamp`);
    for (const taskId in taskIds) {
      const taskStatus = await this.getStatus(taskId);
      const completedStatuses = [
        RelayerTaskStatus.ExecSuccess,
        RelayerTaskStatus.ExecReverted,
        RelayerTaskStatus.Cancelled,
      ];
      const lastUpdated = await this.getTimestamp(taskId);

      const shouldBeDeleted = curTimeStamp - lastUpdated > _expiryLen && completedStatuses.includes(taskStatus);
      if (shouldBeDeleted) {
        for (const tb of ["data", "status", "hash", "timestamp", "error"]) {
          await this.data.hdel(`${this.prefix}:${tb}`, taskId);
        }
      }
    }
  }
}
