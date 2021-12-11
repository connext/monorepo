import { RequestContext } from "@connext/nxtp-utils";
import { BigNumber, providers, utils } from "ethers";

import { Gas, WriteTransaction } from "./types";

type TransactionConfig = {
  confirmationTimeout: number;
  confirmationsRequired: number;
};

type LoggableTransactionData = {
  txsId: string;
  nonce: number;
  type: number;
  hashes?: string[];
  attempt?: number;
  bumps?: number;
  minedBlockNumber?: number;
  confirmedBlockNumber?: number;
  gasPrice?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  gasLimit: string;
  error?: string;
  confirmations?: number;
  state?: string;
};

/**
 * @classdesc A data structure for storing invariant params and managing state related to a single transaction.
 */
export class OnchainTransaction {
  // Responses, in the order of attempts made for this tx.
  public responses: providers.TransactionResponse[] = [];

  // Receipt that we received for the on-chain transaction that was mined with
  // the desired number of confirmations.
  private _receipt: providers.TransactionReceipt | undefined;
  public get receipt(): providers.TransactionReceipt | undefined {
    return this._receipt;
  }
  public set receipt(value: providers.TransactionReceipt | undefined) {
    // If the receipt has not yet been set, we can assume this is the mined receipt.
    if (!this._receipt) {
      this.minedBlockNumber = value?.blockNumber ?? -1;
    }
    this._receipt = value;
  }
  // Used to track when the transaction was mined, in the event that the mined receipt gets replaced by
  // the confirmation receipt.
  public minedBlockNumber = -1;

  // Timestamp initially set on creation.
  public readonly timestamp: number = Date.now();

  // This error will be set in the instance of a failure.
  public error: Error | undefined;

  // Which transaction attempt we are on.
  public attempt = 0;

  // How many times we have bumped the gas price.
  public bumps = 0;

  // The EIP-2718 type of this transaction envelope.
  // 0 = legacy, 1 = EIP-1559, 2 = EIP-1559 with priority.
  public type = 0; // TODO: Support EIP-1559 transactions.

  public get hash(): string | undefined {
    return this.didMine
      ? this.receipt!.transactionHash
      : this.responses.length > 0
      ? this.responses[this.responses.length - 1].hash
      : undefined;
  }

  public get hashes(): string[] {
    return this.responses.map((tx) => tx.hash);
  }

  /**
   * Specifies whether the transaction has been submitted.
   * @returns boolean indicating whether the transaction is submitted.
   */
  public get didSubmit(): boolean {
    return this.responses.length > 0;
  }

  /**
   * Specifies whether the transaction has been mined.
   * @returns boolean indicating whether the transaction is mined.
   */
  public get didMine(): boolean {
    return !!this.receipt && this.receipt.confirmations > 0;
  }

  /**
   * Specifies whether the transaction has been completed - meaning that it's been
   * mined and has received the target number of confirmations.
   * @returns boolean indicating whether the transaction is completed.
   */
  public get didFinish(): boolean {
    return !!this.receipt && this.receipt.confirmations >= this.config.confirmationsRequired;
  }

  /**
   * Formats gas fee info according to tx type (safely ensures we do not send redundant fee info,
   * and that params are properly named).
   */
  public get gasFee(): {
    gasPrice?: BigNumber;
    maxPriorityFeePerGas?: BigNumber;
    maxFeePerGas?: BigNumber;
  } {
    const fees =
      this.type === 2
        ? {
            maxFeePerGas: this.gas.maxFeePerGas,
            maxPriorityFeePerGas: this.gas.maxPriorityFeePerGas,
          }
        : {
            gasPrice: this.gas.price,
          };
    return fees;
  }

  /**
   * Retrieves all params needed to format a full transaction, including current gas price set, nonce, etc.
   */
  public get params(): providers.TransactionRequest {
    return {
      ...this.minTx,
      nonce: this.nonce,
      type: this.type,
      gasLimit: this.gas.limit,
      ...this.gasFee,
    };
  }

  /**
   * Formats gas fees into gwei units.
   */
  public get loggableGasFee(): {
    gasPrice?: string;
    maxPriorityFeePerGas?: string;
    maxFeePerGas?: string;
  } {
    const gasFee = this.gasFee;
    return {
      gasPrice: gasFee.gasPrice ? `${utils.formatUnits(gasFee.gasPrice, "gwei")} gwei` : undefined,
      maxFeePerGas: gasFee.maxFeePerGas ? `${utils.formatUnits(gasFee.maxFeePerGas, "gwei")} gwei` : undefined,
      maxPriorityFeePerGas: gasFee.maxPriorityFeePerGas
        ? `${utils.formatUnits(gasFee.maxPriorityFeePerGas, "gwei")} gwei`
        : undefined,
    };
  }

  /**
   * Packages transaction data into a format best for logging.
   */
  public get loggable(): LoggableTransactionData {
    return {
      // These values should always be defined.
      txsId: this.uuid,
      nonce: this.nonce,
      type: this.type,
      gasLimit: this.gas.limit.toString(),

      // Gas fee values will present themselves depending on which are defined.
      ...this.loggableGasFee,

      // Keeping these values as undefined if 0 in order to keep logs slim (undefined values won't be logged).
      attempt: this.attempt > 0 ? this.attempt : undefined,
      bumps: this.bumps > 0 ? this.bumps : undefined,
      hashes: this.hashes.length > 0 ? this.hashes : undefined,

      // Track block numbers for mine and confirm for observability.
      minedBlockNumber: this.minedBlockNumber === -1 ? undefined : this.minedBlockNumber,
      confirmedBlockNumber:
        this.receipt && this.receipt.blockNumber > this.minedBlockNumber ? this.receipt.blockNumber : undefined,
      confirmations: this.receipt?.confirmations,
      error: this.error ? this.error.message : undefined,
      state: this.error ? "E" : this.didFinish ? "C" : this.didMine ? "M" : this.didSubmit ? "S" : undefined,
    };
  }

  /**
   * A data structure used for management of the lifecycle of one on-chain transaction.
   *
   * @param context - Logging context.
   * @param minTx - The minimum transaction data required to send a transaction.
   * @param nonce - Assigned nonce number for this transaction.
   * @param gas - The Gas tracker instance, which will include price, limit, and maximum.
   * @param config - Transaction configuration.
   * @param uuid - A unique ID for this transaction.
   */
  constructor(
    public readonly context: RequestContext,
    public readonly minTx: WriteTransaction,
    public readonly nonce: number,
    public readonly gas: Gas,
    private readonly config: TransactionConfig,
    public readonly uuid: string,
  ) {}
}
