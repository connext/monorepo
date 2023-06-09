import { Cache } from "./cache";

/**
 * Redis Store Details:
 * Message Nonce:
 *   key: messages:nonce:$originDomain | value: number;
 */
export class MessagesCache extends Cache {
  private readonly prefix = "messages";

  /// MARK - Message Nonce
  /**
   * Gets the latest nonce for the given domain pair.
   * @param originDomain - The origin domain.
   * @param destinationDomain - The destination domain.
   * @returns The latest nonce of the given pair.
   */
  public async getNonce(originDomain: string, destinationDomain: string): Promise<number> {
    const res = await this.data.hget(`${this.prefix}:nonce`, `${originDomain}-${destinationDomain}`);
    return res ? +res : 0;
  }

  /**
   * Set the nonce for a given domain pair
   * @param originDomain - The origin domain.
   * @param destinationDomain - The destination domain.
   * @param nonce - The latest nonce of the given pair.
   * @returns 1 if added, 0 if updated.
   */
  public async setNonce(originDomain: string, destinationDomain: string, nonce: number): Promise<number> {
    return await this.data.hset(`${this.prefix}:nonce`, `${originDomain}-${destinationDomain}`, nonce.toString());
  }
}
