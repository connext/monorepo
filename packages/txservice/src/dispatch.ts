import { BigNumber } from "ethers";
import { BaseLogger } from "pino";
import PriorityQueue from "p-queue";

import { ChainRpcProvider } from "./provider";
import { GasPrice, WriteTransaction } from "./types";
import { Transaction } from "./transaction";
import { TimeoutError, TransactionReverted } from "./error";

// TODO: sep file
// Thread safe stack manager.
class TransactionBuffer {
  // Both of the following are functionally treated as stacks (LIFO).
  private validated: Transaction[] = [];
  private pending: Transaction[] = [];
  // Should be used to access either of the stacks.
  private readonly accessQueue: PriorityQueue = new PriorityQueue({ concurrency: 1 });

  // Push a new tx to pending.
  public async push(transaction: Transaction) {
    // TODO: We may want to cap the pending stack here.
    await this.accessQueue.add(() => {
      this.pending.push(transaction);
    });
  }

  // Move latest pending to completed.
  // @returns boolean whether operation was successful, or if there was no pending tx to shift.
  public async shift(id: string): Promise<boolean> {
    // TODO: Trim the validated stack when it gets "too long" to save memory space.
    return await this.accessQueue.add((): boolean => {
      const transaction = this.pending.find((transaction) => transaction.id === id);
      if (transaction == null) {
        return false;
      }
      this.validated.push(transaction);
      return true;
    });
  }

  /**
   * Get the current nonce value.
   *
   * @remarks
   * Caller should still be prepared to get the incorrect nonce back. For instance,
   * if the provider that just handled our sent tx has suddenly gone offline, this
   * method may give the wrong nonce. This can be solved by making additional calls to
   * submit the tx.
   *
   * @returns A number value for the current nonce.
   */
  public async getNonce(): Promise<number | undefined> {
    // Update nonce value to greatest of all nonce values retrieved.
    return (await this.getLastTx())?.nonce;
  }

  private async getLastTx(): Promise<Transaction | null> {
    return await this.accessQueue.add((): Transaction | null => {
      if (this.pending.length > 0) {
        return this.pending[this.pending.length - 1];
      } else if (this.validated.length > 0) {
        return this.validated[this.validated.length - 1];
      }
      return null;
    });
  }
}

// TODO: We may want to remodel dispatch to either extend ChainRpcProvider or just move all the ChainRpcProvider functionality over here.
// For now, a sep. class for simplicity of introducing new functionality.
/**
 * @classdesc Dispatches and monitors transaction queue.
 */
export class TransactionDispatch {
  public readonly chainId: number;

  private readonly submitQueue: PriorityQueue = new PriorityQueue({ concurrency: 1 });
  // A queue for execution of transaction validation. When it completes, we'll shift the transaction from
  // pending stack -> validated stack in the buffer.
  private readonly validateQueue: PriorityQueue = new PriorityQueue({ concurrency: 1 });
  private readonly buffer: TransactionBuffer = new TransactionBuffer();

  /**
   * Centralized transaction dispatch management class.
   *
   * @param logger The pino.BaseLogger instance we use for logging.
   * @param provider The ChainRpcProvider instance we use for interfacing with the chain.
   */
  constructor(private readonly logger: BaseLogger, private readonly provider: ChainRpcProvider) {
    this.chainId = this.provider.chainId;
  }

  public async submit(minTx: WriteTransaction): Promise<Transaction> {
    const method = this.submit.name;
    // get gas estimate
    let gasLimit: BigNumber;
    let result = await this.provider.estimateGas(minTx);
    if (result.isErr()) {
      if (result.error instanceof TransactionReverted) {
        // If we get a TransactionReverted error, that means the gas estimate call
        // indicated our transaction would fail on-chain. The details of the failure will
        // be included in the error.
        throw result.error;
      }
      this.logger.warn(
        {
          method,
          transaction: minTx,
          error: result.error,
        },
        "Estimate gas failed due to an unexpected error.",
      );
      throw result.error;
    } else {
      gasLimit = result.value;
    }

    // get gas price
    result = await this.provider.getGasPrice();
    if (result.isErr()) {
      throw result.error;
    }
    const gasPrice = new GasPrice(result.value, gasLimit);

    // Queue up the transaction with these values.
    const submitResult = await this.submitQueue.add(
      async (): Promise<{ value: Transaction | Error; success: boolean }> => {
        // NOTE: This call must be here, serialized within the queue, as it is depenedent on pending transaction count.
        // If transaction buffer returns null, that indicates the buffer is empty; meaning we haven't sent any transactions yet.
        let nonce = await this.buffer.getNonce();
        if (!nonce) {
          const result = await this.provider.getTransactionCount();
          if (result.isErr()) {
            throw result.error;
          } else {
            nonce = result.value;
          }
        }
        try {
          // Create a new transaction instance to track lifecycle.
          const transaction = new Transaction(this.logger, this.provider, minTx, nonce, gasPrice);
          // Send transaction. Initial submit ought to be done in the queue for priority reasons.
          await transaction.submit();
          // Push to the pending stack, which will handle validation for this transaction.
          await this.buffer.push(transaction);
          // NOTE: We asyncronously add to validation queue here. This will ensure it gets validated in the right
          // order, yet we don't sit around and wait for validation here.
          this.addToValidation(transaction);
          return { value: transaction, success: true };
        } catch (e) {
          // validate that the transaction failed on chain?
          // didn't fail on chain? log this occurrence w/ error but ignore error ?!? -> WTF?
          // if it did fail on chain, THROW
          return { value: e, success: false };
        }
      },
    );
    if (submitResult.success) {
      return submitResult.value as Transaction;
    } else {
      throw submitResult.value;
    }
  }

  private async addToValidation(transaction: Transaction) {
    this.validateQueue.add(async () => {
      // wait for 1 confirmation, aka validation
      try {
        await transaction.validate();
        // **shift from pending stack, push to validated stack
        const success = await this.buffer.shift(transaction.id);
        if (!success) {
          this.logger.warn({
            id: transaction.id,
          }, "Failed to locate transaction in pending buffer.");
        }
      } catch (error) {
        if (error instanceof TimeoutError) {
          // TODO: (optional sanity check): getTransaction, check that it exists on chain
            // doesn't exist? TODO: backfill with a bunk tx
            // note: even if the tx is *not* the blockade, we need to backfill this one, or it will block all txs that follow.

          // This will bump gas price and append this transaction to the end of the validation queue again.
          // TODO: if error, validate that the transaction failed on chain ??
          transaction.bumpGasPrice();
          await transaction.submit();
          // add this tx to the end of the validation queue
          this.addToValidation(transaction);
        } else {
          throw error;
        }
      }
    });
  }
}
