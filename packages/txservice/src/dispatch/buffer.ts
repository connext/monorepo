import { TransactionServiceFailure } from "../error";

import { Transaction } from "./transaction";

/**
 * @classdesc Really basic class: manages a map/buffer like it's an ordered dictionary, essentially.
 */
export class TransactionBuffer {
  // TODO: Maps in TS technically maintain order based on order of insertion - but in order for us to
  // guarantee that that order will be sequential in terms of nonce, we'd have to enforce that
  // in set() (in other words, throw if there's an attempt to insert out of order). Is that what
  // we want to do? If so, orderedKeys() will become obsolete.
  private buffer: Map<number, Transaction> = new Map();

  public pending(): Transaction[] {
    // Use this opportunity to trim previous finished transactions.
    return this.trim()
      .map(nonce => this.get(nonce) ?? null)
      .filter(tx => tx != null) as Transaction[];
  }

  public insert(nonce: number, transaction: Transaction, overwrite = false) {
    if (!overwrite && this.get(nonce) !== undefined) {
      const existingTx = this.get(nonce)!;
      throw new TransactionServiceFailure(`Attempted to overwrite transaction at nonce ${nonce}!`, {
        method: this.insert.name,
        nonce,
        offendingTransaction: {
          id: transaction.id,
          nonce: transaction.nonce,
        },
        existingTransaction: {
          id: existingTx.id,
          nonce: existingTx.nonce,
        },
      });
    }
    this.buffer.set(nonce, transaction);
  }

  public get(nonce: number): Transaction | undefined {
    return this.buffer.get(nonce);
  }

  public getLastNonce(): number | undefined {
    return Math.max(...Array.from(this.buffer.keys()));
  }

  private orderedKeys() {
    return Array.from(this.buffer.keys()).sort();
  }

  /**
   *
   * @remarks It is okay if we trim all transactions in the buffer, and end up with none left;
   * it just means we'll use provider to get current nonce.
   *
   * @returns Remaining keys after trimming.
   */
  private trim(): number[] {
    // Once we've found the point where transactions stop being "finished",
    // we want to leave the rest in there.
    let highestIndex = -1;
    // Keys are ordered lowest to highest nonce values.
    const keys = this.orderedKeys();
    for (let i = 0; i < keys.length; i++) {
      const nonce = keys[i];
      const tx = this.get(nonce);
      if (!tx) {
        // For some reason, this tx is already missing. Not sure why this would happen (probably async
        // r/w), but we are ignoring it for now.
        continue;
      }
      if (tx.didFinish) {
        highestIndex = i;
      }
    }
    // We want to trim everything below the highest finished nonce's index.
    keys.splice(0, highestIndex).forEach(nonce => this.buffer.delete(nonce));
    // Return remaining keys.
    return keys;
  }
}
