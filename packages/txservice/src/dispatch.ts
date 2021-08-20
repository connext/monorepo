import { BigNumber, providers, Signer } from "ethers";
import { BaseLogger } from "pino";
import PriorityQueue from "p-queue";
// import { getUuid } from "@connext/nxtp-utils";

// import { TransactionServiceConfig } from "./config";
import { ChainRpcProvider } from "./provider";
import { FullTransaction, GasPrice, WriteTransaction } from "./types";
import { AlreadyMined, TransactionReplaced, TransactionReverted, TransactionServiceFailure } from "./error";

class MetaTransaction {
  // Responses, in the order of attempts made for this tx.
  public responses: providers.TransactionResponse[] = [];
  // Receipt that we received for the on-chain transaction that was mined with
  // the desired number of confirmations.
  public receipt?: providers.TransactionReceipt;

  // Which transaction attempt we are on.
  private _attempt = 0;
  /**
   * Getter to return the internal attempt
   *
   * @returns The _attempt of the transction
   */
  public get attempt(): number {
    return this._attempt;
  }

  /**
   * Retrieves all data needed to format a full transaction, including current gas price set, nonce, etc.
   */
  public get data(): FullTransaction {
    return {
      ...this.minTx,
      gasPrice: this.gasPrice.get(),
      nonce: this.nonce,
      gasLimit: this.gasPrice.limit,
    };
  }

  /**
   * A data structure used for management of the lifecycle of one on-chain transaction.
   *
   * @param logger The pino.BaseLogger instance we use for logging.
   * @param provider The ChainRpcProvider instance we use for interfacing with the chain.
   * @param minTx The minimum transaction data required to send a transaction.
   * @param gasPrice Initialized gas price tracker for this transaction.
   */
  constructor(
    public readonly minTx: WriteTransaction,
    public readonly nonce: number,
    private readonly gasPrice: GasPrice,
  ) {}
}

// Thread safe stack manager.
class TransactionBuffer {
  // Both of the following are functionally treated as stacks (LIFO).
  private completed: MetaTransaction[] = [];
  private pending: MetaTransaction[] = [];
  // Should be used to access either of the stacks.
  private readonly accessQueue: PriorityQueue = new PriorityQueue({ concurrency: 1 });

  // Push a new tx to pending.
  public async push() {
    // TODO: We may want to cap the pending stack here.
  }

  // Move latest pending to completed.
  public async shift() {
    // TODO: Trim the completed stack.
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

  private async getLastTx(): Promise<MetaTransaction | null> {
    return await this.accessQueue.add(() => {
      if (this.pending.length > 0) {
        return this.pending[this.pending.length - 1];
      } else if (this.completed.length > 0) {
        return this.completed[this.completed.length - 1];
      }
      return null;
    });
  }
}

export class RpcDispatch {
  private readonly submitQueue: PriorityQueue = new PriorityQueue({ concurrency: 1 });
  public readonly chainId: number;

  /**
   *
   * @param logger The pino.BaseLogger instance we use for logging.
   * @param provider The ChainRpcProvider instance we use for interfacing with the chain.
   */
  constructor(
    private readonly logger: BaseLogger,
    public readonly provider: ChainRpcProvider
  ) {
    this.chainId = this.provider.chainId;
  }

  public async submit(tx: WriteTransaction) {
    let gasLimit: BigNumber;
    let result = await this.provider.estimateGas(tx);
    if (result.isErr()) {
      if (result.error instanceof TransactionReverted) {
        throw result.error;
      }
      this.logger.warn(
        {
          method: this.submit.name,
          transaction: tx,
          error: result.error,
        },
        "Estimate gas failed due to an unexpected error.",
      );
      throw result.error;
    } else {
      gasLimit = result.value;
    }

    result = await this.provider.getGasPrice();
    if (result.isErr()) {
      throw result.error;
    }
    const gasPrice = new GasPrice(result.value, gasLimit);
  

    

    // Queue up the execution of the transaction.
    result = await this.submitQueue.add(
      async (): Promise<{ value: MetaTx | Error; success: boolean }> => {
        try {
          // NOTE: This call must be serialized within the queue, as it is depenedent on pending transaction count.
          const nonce = transaction.nonce ?? (await this.transactionBuffer.getNonce());

          // Send the transaction.
          const response = 

          // Check to see if ethers returned null or undefined for the response; if so, handle as error case.
          if (response == null) {
            throw new TransactionServiceFailure("Ethers returned a null or undefined transaction response.", {
              transaction,
              response,
            });
          }

          const value = this.transactionBuffer.push(nonce, response);
          return { value, success: true };
        } catch (e) {
          return { value: e, success: false };
        }
      },
    );
    if (!result.success) {
      throw result.value;
    }
    // Now we block until the transaction is validated (meaning that it's received 1 confirmation on chain).
    const meta: MetaTx = result.value as MetaTx;
    await meta.validate();
    return meta.response;

    // add to submit queue, new tx
    // block until submit completed
    // error ? throw. else...
    // wait until 1 confirm
    // timeout ?
    // check to see if we are the
  }

}
