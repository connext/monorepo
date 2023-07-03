import { ExecStatus, XMessage, getNtpTimeSeconds } from "@connext/nxtp-utils";

import { Cache } from "./cache";
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
   * @returns 1 if added, 0 if not.
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
}
