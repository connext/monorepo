import { ExecStatus, RelayerType, XMessage, getNtpTimeSeconds } from "@connext/nxtp-utils";

import { Cache } from "./cache";

const PUB_LOCK_KEY = "pub";

/**
 * Redis Store Details:
 * Message Nonce:
 *   key: messages:nonce:$domain | value: number;
 */
export class MessagesCache extends Cache {
  private readonly prefix = "messages";

  /// MARK - Message Nonce
  /**
   * Gets the latest nonce for the given domain.
   * @param domain - The domain ID.
   * @returns The latest nonce of the given domain.
   */
  public async getNonce(domain: string): Promise<number> {
    const res = await this.data.hget(`${this.prefix}:nonce`, domain);
    return res ? +res : 0;
  }

  /**
   * Set the nonce for a given domain.
   * @param domain - The domain ID.
   * @param nonce - The latest nonce of the given domain.
   * @returns 1 if added, 0 if updated.
   */
  public async setNonce(domain: string, nonce: number): Promise<number> {
    return await this.data.hset(`${this.prefix}:nonce`, domain, nonce.toString());
  }

  /**
   * Stores the messages in the cache.
   * @param messages - The messages to store
   */
  public async storeMessages(messages: XMessage[]): Promise<void> {
    for (const message of messages) {
      const _message = await this.getMessage(message.leaf);
      if (!_message) {
        await this.storeMessage(message);
      }
    }
  }

  /**
   * Gets a message for a given leaf
   * @param leaf - The given leaf
   */
  public async getMessage(
    leaf: string,
  ): Promise<{ data: XMessage; status: ExecStatus; attempt: number; timestamp: number } | undefined> {
    const result = await this.data.hget(`${this.prefix}:data`, leaf);
    return result
      ? (JSON.parse(result) as { data: XMessage; status: ExecStatus; attempt: number; timestamp: number })
      : undefined;
  }

  /**
   * Stores a message with `attempt` value
   * @param message - The target message to store
   * @param attempt - The retry count
   */
  private async storeMessage(message: XMessage, status?: ExecStatus, attempt?: number): Promise<number> {
    await this.addPending(message.originDomain, message.destinationDomain, message.leaf);
    return await this.data.hset(
      `${this.prefix}:data`,
      message.leaf,
      JSON.stringify({
        status: status ?? ExecStatus.None,
        data: message,
        attempt: attempt ?? 0,
        timestamp: getNtpTimeSeconds(),
      }),
    );
  }

  /**
   * Updates the message status to prevent the duplication for a given leaf.
   */
  public async setStatus(values: { leaf: string; status: ExecStatus }[]): Promise<void> {
    for (const value of values) {
      const message = await this.getMessage(value.leaf);
      if (message) {
        await this.storeMessage(message.data, value.status, message.attempt);
      }
    }
  }

  /**
   * Increases `attempt` by 1 if processing fails.
   * @param leaf - The given leaf
   */
  public async increaseAttempt(leaf: string): Promise<void> {
    const message = await this.getMessage(leaf);
    if (message) {
      await this.storeMessage(message.data, message.status, message.attempt + 1);
    }
  }

  /**
   * Returns all message leaves that should be processed for a given domain pair.
   *
   * @param originDomain - The origin domain.
   * @param destinationDomain - The destination domain.
   */
  public async getPending(originDomain: string, destinationDomain: string, offset = 0, limit = 100): Promise<string[]> {
    const pendingKey = `${originDomain}-${destinationDomain}`;
    const leaves = await this.data.lrange(`${this.prefix}:pending:${pendingKey}`, offset, offset + limit - 1);
    return leaves;
  }

  /**
   * Add a message leaf to the list of pending leaves for a given domain pair.
   *
   * @param originDomain - The origin domain
   * @param destinationDomain - The destination domain
   * @param leaf - The leaf to add to the list of pending leaves.
   */
  private async addPending(originDomain: string, destinationDomain: string, leaf: string) {
    const pendingKey = `${originDomain}-${destinationDomain}`;
    await this.data.rpush(`${this.prefix}:pending:${pendingKey}`, leaf);
  }

  /**
   * Remove leaves from the list of pending leaves for a given domain pair.
   *
   * @param originDomain - The origin domain
   * @param destinationDomain - The destination domain
   * @param leaves - The leaves to remove from the list of pending leaves.
   */
  public async removePending(originDomain: string, destinationDomain: string, leaves: string[]): Promise<boolean> {
    const pendingKey = `${originDomain}-${destinationDomain}`;
    let sum = 0;
    for (const leaf of leaves) {
      const res = await this.data.lrem(`${this.prefix}:pending:${pendingKey}`, 0, leaf);
      await this.data.hdel(`${this.prefix}:data`, leaf);
      sum += res;
    }
    if (sum > 0) return true;
    else return false;
  }

  /**
   * Add pending task to the `tasks` list.
   *
   * @param taskId - The taskId.
   * @param relayer - The relayer type which can be either Gelato or Connext.
   * @param leaves - The leaves that the task includes.
   */
  public async addTaskPending(
    taskId: string,
    relayer: RelayerType,
    originDomain: string,
    destinationDomain: string,
    leaves: string[],
  ) {
    await this.data.rpush(`${this.prefix}:tasks`, taskId);
    return await this.data.hset(
      `${this.prefix}:task`,
      taskId,
      JSON.stringify({
        relayer,
        originDomain,
        destinationDomain,
        leaves,
      }),
    );
  }

  /**
   * Retrieves pending tasks in a range.
   *
   * @param offset - The starting point.
   * @param limit - The number of tasks you're gonna retrieve
   */
  public async getPendingTasks(
    offset = 0,
    limit = 100,
  ): Promise<{ taskId: string; relayer: string; originDomain: string; destinationDomain: string; leaves: string[] }[]> {
    const result: {
      taskId: string;
      relayer: string;
      originDomain: string;
      destinationDomain: string;
      leaves: string[];
    }[] = [];
    const tasks = await this.data.lrange(`${this.prefix}:tasks`, offset, offset + limit - 1);
    for (const task of tasks) {
      const rawTask = await this.data.hget(`${this.prefix}:task`, task);
      if (!rawTask) continue;
      const taskDetail = JSON.parse(rawTask) as {
        relayer: string;
        originDomain: string;
        destinationDomain: string;
        leaves: string[];
      };
      result.push({ taskId: task, ...taskDetail });
    }
    return result;
  }

  /**
   * Remove pending tasks from both `tasks` and `task` data.
   * @param taskIds - The list of task you wanna remove from the store
   * @returns 1 if anything deleted, 0 if nothing
   */
  public async removePendingTasks(taskIds: string[]): Promise<boolean> {
    let sum = 0;
    for (const taskId of taskIds) {
      const res = await this.data.lrem(`${this.prefix}:tasks`, 0, taskId);
      await this.data.hdel(`${this.prefix}:task`, taskId);
      sum += res;
    }
    if (sum > 0) return true;
    else return false;
  }

  /**
   * Stores leaf of a domain at index.
   *
   * @param domain - Domain.
   * @param index - Index.
   * @param node - Leaf string.
   * @returns 1 if added, 0 if updated.
   */
  public async putNode(domain: string, index: number, node: string): Promise<number> {
    return await this.data.hset(`${this.prefix}:${domain}`, index, node);
  }

  /**
   * Retrieves leaf of a domain at index.
   *
   * @param domain - Domain.
   * @param index - Index.
   * @returns leaf if exists, undefined if not.
   */
  public async getNode(domain: string, index: number): Promise<string | undefined> {
    return (await this.data.hget(`${this.prefix}:${domain}`, index.toString())) ?? undefined;
  }

  /**
   * Deletes leaf of a domain at index.
   *
   * @param domain - Domain.
   * @param index - Index.
   * @returns leaf if exists, undefined if not.
   */
  public async delNode(domain: string, index: number): Promise<number> {
    return await this.data.hdel(`${this.prefix}:${domain}`, index.toString());
  }

  /**
   * Stores leafs of a domain at in a range.
   *
   * @param domain - Domain.
   * @param start - Range start.
   * @param end - Range end.
   * @param nodes - Leaf string array.
   * @returns 1 if added, 0 if updated.
   */
  public async putNodes(domain: string, start: number, end: number, nodes: string[]): Promise<number> {
    return await this.data.hset(`${this.prefix}:${domain}`, `${start}-${end}`, JSON.stringify(nodes));
  }

  /**
   * Retrieves leafs of a domain in a range.
   *
   * @param domain - Domain.
   * @param start - Range start.
   * @param end - Range end.
   * @returns leafs array if exists, undefined if not.
   */
  public async getNodes(domain: string, start: number, end: number): Promise<string[] | undefined> {
    const result = await this.data.hget(`${this.prefix}:${domain}`, `${start}-${end}`);
    return result ? (JSON.parse(result) as string[]) : undefined;
  }

  /**
   * Deletes leafs of a domain at in a range.
   *
   * @param domain - Domain.
   * @param start - Range start.
   * @param end - Range end.
   * @param nodes - Leaf string array.
   * @returns 1 if deleted, 0 if not.
   */
  public async delNodes(domain: string, start: number, end: number): Promise<number> {
    return await this.data.hdel(`${this.prefix}:${domain}`, `${start}-${end}`);
  }

  /**
   * Stores root of a domain at path.
   *
   * @param domain - Domain.
   * @param path - Path in the tree to the root.
   * @param root - root string.
   * @returns 1 if added, 0 if updated.
   */
  public async putRoot(domain: string, path: string, root: string): Promise<number> {
    return await this.data.hset(`${this.prefix}:${domain}`, path, root);
  }

  /**
   * Retrieves root of a domain at path.
   *
   * @param domain - Domain.
   * @param path - Path in the tree to the root.
   * @returns root if exists, undefined if not.
   */
  public async getRoot(domain: string, path: string): Promise<string | undefined> {
    return (await this.data.hget(`${this.prefix}:${domain}`, path)) ?? undefined;
  }

  /**
   * Deletes root of a domain at path.
   *
   * @param domain - Domain.
   * @param path - Path in the tree to the root.
   * @param root - root string.
   * @returns 1 if deleted, 0 if not.
   */
  public async delRoot(domain: string, path: string): Promise<number> {
    return await this.data.hdel(`${this.prefix}:${domain}`, path);
  }

  /**
   * Clears all leaf and roots of a domain in the cache.
   *
   * @param domain - Domain.
   * @returns 1 if removed, 0 if not.
   */
  public async clearDomain(domain: string): Promise<number> {
    return await this.data.del(`${this.prefix}:${domain}`);
  }

  /**
   * Gets current lock.
   *
   * @returns lock object if exists, undefined if not.
   */
  public async getCurrentLock(): Promise<{ timestamp: number; id: string } | undefined> {
    const result = await this.data.hget(`${this.prefix}:lock`, PUB_LOCK_KEY);
    if (result) {
      const { timestamp, id } = JSON.parse(result) as { timestamp: number; id: string };

      return { timestamp, id };
    }
    return undefined;
  }

  /**
   * Sets lock regardless of current lock state.
   *
   * @param requestContextId - ID of the request context of the caller.
   * @returns 1 if added, 0 if updated.
   */
  public async acquireLock(requestContextId: string): Promise<number> {
    return await this.data.hset(
      `${this.prefix}:lock`,
      PUB_LOCK_KEY,
      JSON.stringify({ timestamp: getNtpTimeSeconds(), id: requestContextId }),
    );
  }

  /**
   * Deletes lock regardless of current lock state.
   *
   * @returns 1 if deleted, 0 if not.
   */
  public async releaseLock(): Promise<number> {
    return await this.data.hdel(`${this.prefix}:lock`, PUB_LOCK_KEY);
  }
}
