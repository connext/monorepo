import { getRandomBytes32, RelayerApiFee, RelayerTaskStatus } from "@connext/nxtp-utils";

import { Cache } from "./cache";

export type CachedTaskData = {
  chain: number;
  data: string;
  fee: RelayerApiFee;
  status: RelayerTaskStatus;
};

/**
 * Redis Store Details:
 * Task Data:
 *   key: data:$taskId | value: CachedTaskData;
 *
 * Task Status:
 *   key: status:$taskId | value: RelayerApiTaskStatus;
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
   * Set recorded liquidity amount for a given router on a given domain for a given asset.
   * @param params.chain - Chain number.
   * @param params.data - Execute calldata.
   * @param params.fee - Relayer fee info.
   * @returns New task's ID.
   * @throws Error if task already exists.
   */
  public async createTask(params: Omit<CachedTaskData, "status">): Promise<string> {
    // TODO: Make the Task ID a hash of the calldata to add an additional recovery vector.
    const taskId = getRandomBytes32();
    const key = `${this.prefix}:data`;
    await this.data.hset(key, taskId, JSON.stringify(params));
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
      : RelayerTaskStatus.None;
  }

  /**
   * Set the status of a given task.
   * @param taskId - The ID of the task we are setting the status of.
   * @param status - The status to set.
   * @returns Number indicating whether the status was updated.
   */
  public async setStatus(taskId: string, status: RelayerTaskStatus): Promise<number> {
    return await this.data.hset(`${this.prefix}:status`, taskId, status.toString());
  }

  /// MARK - Pending Tasks
  /**
   * Retrieve all task IDs that are pending action, based on status marked RelayerTaskStatus.Pending.
   *
   * @returns An array of task IDs.
   */
  public async getPendingTasks(): Promise<string[]> {
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
      if (status === RelayerTaskStatus.Pending) {
        filtered.push(key);
      }
    }
    return filtered;
  }
}
