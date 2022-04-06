import { Logger } from "@connext/nxtp-utils";

import { MaxBufferLengthError, TransactionBackfilled } from "./errors";
import { OnchainTransaction } from "./transaction";

/**
 * @classdesc A data structure for managing the lifecycle of a (continuously rotating) batch of transactions.
 */
export class TransactionBuffer extends Array<OnchainTransaction> {
  public get isFull(): boolean {
    return this.maxLength ? this.length >= this.maxLength : false;
  }

  public get nonces(): number[] {
    const nonces = this.map((tx) => tx.nonce);
    if (this.lastShiftedTx) {
      nonces.unshift(this.lastShiftedTx.nonce);
    }
    return nonces;
  }

  // We use this to record the last tx that was shifted out of the buffer.
  private lastShiftedTx: OnchainTransaction | undefined;

  /**
   * A data structure used for management of the lifecycle of on-chain transactions.
   *
   * @param logger - Logger instance.
   * @param maxLength - The configured maximum number of transactions to hold in buffer. Leave undefined to disable.
   * @param id - Identification info to distinguish which buffer this is when logging.
   * @param id.name - A string name denomination.
   * @param id.chainId - A chain ID number denomination.
   */
  constructor(
    private readonly logger: Logger,
    public readonly maxLength: number | undefined,
    public readonly id: {
      name: string;
      chainId: number;
    },
  ) {
    super();
  }

  // TODO: Check to make sure no async mutex issues could occur. If so, we should probably use a serialized queue for mutex.
  /**
   * Adds a transaction to the buffer.
   * @param tx - The transaction to add to the buffer.
   * @returns number index.
   */
  public push(tx: OnchainTransaction): number {
    if (this.isFull) {
      throw new MaxBufferLengthError({
        maxLength: this.maxLength,
      });
    }

    let index;
    const nonces = this.nonces;
    const lastNonce = nonces[nonces.length - 1] ?? this.lastShiftedTx?.nonce ?? -1;
    const backfill = tx.nonce <= lastNonce;
    if (!backfill) {
      // If the nonce is greater than the last nonce, we can just push the tx to the end of the array.
      index = super.push(tx);
      if (lastNonce !== -1 && tx.nonce > lastNonce + 1) {
        // Log if this nonce increments from the last by more than 1. This could be normal in the event that
        // we're "catching up" to the correct nonce, thus having to skip a few nonces.
        this.log("Pushed transaction skipped nonce value(s).", {
          lastNonce,
          gap: tx.nonce - lastNonce - 1,
          transaction: tx.loggable,
        });
      }
    } else {
      // If the nonce is less than (or equal to) the last nonce, we need to find the correct index to insert the tx
      // for a backfill. If the nonce does exist already, we'll overwrite that transaction and error it out.
      let replacedTx;
      if (this.lastShiftedTx && this.lastShiftedTx.nonce === tx.nonce) {
        // If the lastShiftedTx (possibly being operated on by mine loop currently) is our replacement/backfill target,
        // we should error that tx out.
        super.unshift(tx);
        index = 0;
        replacedTx = this.lastShiftedTx;
      } else {
        let shouldReplace = false;
        // Loop through the array and find the correct index to insert the tx.
        for (index = 0; index < this.length; index++) {
          if (this[index].nonce > tx.nonce) {
            break;
          } else if (this[index].nonce === tx.nonce) {
            shouldReplace = true;
            break;
          }
        }
        // This splice operation will insert the new transaction into the correct position in the buffer,
        // and possibly replace an existing transaction with the same nonce.
        replacedTx = super.splice(index, shouldReplace ? 1 : 0, tx)[0];
      }
      // This error setting will cause any processes currently using this transaction to error out.
      replacedTx.error = new TransactionBackfilled({
        replacement: tx.loggable,
      });
    }

    this.log(undefined, { index, nonce: tx.nonce, backfill });
    return index;
  }

  /**
   * Shifts a transaction from the buffer.
   * @returns The last transaction in the buffer.
   */
  public shift(): OnchainTransaction | undefined {
    const tx = super.shift();
    this.lastShiftedTx = tx;
    this.log();
    return tx;
  }

  public getTxByNonce(nonce: number): OnchainTransaction | undefined {
    return this.lastShiftedTx?.nonce === nonce ? this.lastShiftedTx : this.find((tx) => tx.nonce === nonce);
  }

  private log(message?: string, context: any = {}, error = false) {
    const ctx = {
      chainId: this.id.chainId,
      length: this.length,
      maxLength: this.maxLength ?? "N/A",
      buffer: this.nonces,
      ...context,
    };
    const msg = message ? `${this.id.name} BUFFER: ${message}` : `${this.id.name} BUFFER`;
    if (error) {
      this.logger.error(msg, undefined, undefined, undefined, ctx);
    } else {
      this.logger.debug(msg, undefined, undefined, ctx);
    }
  }
}
