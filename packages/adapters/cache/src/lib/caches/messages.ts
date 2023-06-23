import { XMessage, getNtpTimeSeconds } from "@connext/nxtp-utils";
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
  public async getMessage(leaf: string): Promise<{ data: XMessage; attempt: number; timestamp: number } | undefined> {
    const result = await this.data.hget(`${this.prefix}:data`, leaf);
    return result ? (JSON.parse(result) as { data: XMessage; attempt: number; timestamp: number }) : undefined;
  }

  /**
   * Stores a message with `attempt` value
   * @param message - The target message to store
   * @param attempt - The retry count
   */
  private async storeMessage(message: XMessage, attempt?: number): Promise<number> {
    await this.addPending(message.originDomain, message.destinationDomain, message.leaf);
    return await this.data.hset(
      `${this.prefix}:data`,
      message.leaf,
      JSON.stringify({
        data: message,
        attempt: attempt ?? 0,
        timestamp: getNtpTimeSeconds(),
      }),
    );
  }

  /**
   * Increases `attempt` by 1 if processing fails.
   * @param leaf - The given leaf
   */
  public async increaseAttempt(leaf: string): Promise<void> {
    const message = await this.getMessage(leaf);
    if (message) {
      await this.storeMessage(message.data, message.attempt + 1);
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
}
