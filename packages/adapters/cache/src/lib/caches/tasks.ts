import { getRandomBytes32, RelayerApiFee, RelayerTaskStatus } from "@connext/nxtp-utils";

import { Cache } from "./cache";

export type CachedTaskData = {
  chain: number;
  to: string;
  data: string;
  fee: RelayerApiFee;
  keeper: boolean;
};

/**
 * Redis Store Details:
 * Task Data:
 *   key: data:$taskId | value: CachedTaskData;
 *
 * Task Status:
 *   key: status:$taskId | value: RelayerApiTaskStatus;
 *
 * Task Errors:
 *   key: error:$taskId | value: JSON.stringify(NxtpError);
 *
 * Task Tx Hash:
 *   key: hash:$taskId | value: string;
 */
export class TasksCache extends Cache {
  private readonly prefix = "tasks";

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
    await this.addPending(taskId);
    await this.data.hset(key, taskId, JSON.stringify(params));
    await this.setStatus(taskId, RelayerTaskStatus.ExecPending);
    return taskId;
  }

  /**
   * Add a taskId to the pending list.
   *
   * @param taskId - The task's ID
   */
  private async addPending(taskId: string): Promise<void> {
    const dataKey = `${this.prefix}:data`;
    const taskData = await this.data.hget(dataKey, taskId);
    if (!taskData) {
      await this.data.rpush(`${this.prefix}:pending`, taskId);
    }
  }

  /**
   * Removes tasks from the pending list.
   *
   * @param taskIds - The list of taskId
   */
  public async removePending(taskIds: string[]): Promise<number> {
    const pendingKey = `${this.prefix}:pending`;
    const dataKey = `${this.prefix}:data`;
    let sum = 0;
    for (const taskId of taskIds) {
      const res = await this.data.lrem(pendingKey, 0, taskId);
      await this.data.hdel(dataKey, taskId);
      sum += res;
    }
    return sum;
  }

  /**
   * Retrieves pending tasks within a certain range.
   *
   * @param offset - The start index
   * @param limit - The number of tasks
   * @returns The list of pending taskIDs
   */
  public async getPending(offset: number, limit: number): Promise<string[]> {
    const pendingKey = `${this.prefix}:pending`;
    const leaves = await this.data.lrange(pendingKey, offset, offset + limit - 1);
    return leaves;
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
  public async setStatus(taskId: string, status: RelayerTaskStatus): Promise<number> {
    const finalStatuses = [RelayerTaskStatus.ExecSuccess, RelayerTaskStatus.ExecReverted, RelayerTaskStatus.Cancelled];
    if (finalStatuses.includes(status)) {
      await this.removePending([taskId]);
    }
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
    await this.removePending([taskId]);
    await this.setStatus(taskId, RelayerTaskStatus.ExecSuccess);
    return await this.data.hset(`${this.prefix}:hash`, taskId, txHash);
  }
}
