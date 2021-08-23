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

  public get pending(): Transaction[] {
    return this.orderedKeys()
      .map((nonce) => this.get(nonce) ?? null)
      .filter(tx => tx != null && !tx.didFinish) as Transaction[];
  }

  public insert(nonce: number, transaction: Transaction, overwrite = false) {
    // TODO: detect gap in nonce? throw if there's an attempt to insert out of order?
    // TODO: Trim backend of buffer? Maybe keep a maximum of 1000 transactions?
    if (!overwrite && this.get(nonce) != null) {
      throw new TransactionServiceFailure(
        `Attempted to overwrite transaction at nonce ${nonce}!`,
        {
          method: this.insert.name,
          nonce,
          transaction,
          savedTransaction: this.get(nonce),
        }
      );
    }
    this.buffer.set(nonce, transaction);
  }

  public get(nonce: number): Transaction | undefined {
    return this.buffer.get(nonce);
  }

  public getLastNonce(): number | undefined {
    return this.orderedKeys().pop();
  }

  private orderedKeys() {
    return Array.from(this.buffer.keys()).sort();
  }
}