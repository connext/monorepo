import { Logger, RequestContext } from "@connext/nxtp-utils";
import { BigNumber, BigNumberish, providers, utils } from "ethers";

import { MaxBufferLengthError } from "./error";

export type ReadTransaction = {
  chainId: number;
  to: string;
  data: string;
};

export type WriteTransaction = {
  from?: string;
  value: BigNumberish;
} & ReadTransaction;

export type FullTransaction = {
  nonce: number;
  gasPrice: BigNumber;
  gasLimit: BigNumber;
} & WriteTransaction;

// TODO: Cache all the provider call responses, and have one singular data structure for managing that cache.
export type CachedGas = {
  price: BigNumber;
  timestamp: number;
};

export type CachedTransactionCount = {
  value: number;
  timestamp: number;
};

/// Events
export type TxServiceSubmittedEvent = {
  responses: providers.TransactionResponse[];
};

export type TxServiceMinedEvent = {
  receipt: providers.TransactionReceipt;
};

export type TxServiceConfirmedEvent = {
  receipt: providers.TransactionReceipt;
};

export type TxServiceFailedEvent = {
  error: Error;
  receipt?: providers.TransactionReceipt;
};

export const NxtpTxServiceEvents = {
  TransactionSubmitted: "TransactionSubmitted",
  TransactionMined: "TransactionMined",
  TransactionConfirmed: "TransactionConfirmed",
  TransactionFailed: "TransactionFailed",
} as const;
export type NxtpTxServiceEvent = typeof NxtpTxServiceEvents[keyof typeof NxtpTxServiceEvents];

export interface NxtpTxServiceEventPayloads {
  [NxtpTxServiceEvents.TransactionSubmitted]: TxServiceSubmittedEvent;
  [NxtpTxServiceEvents.TransactionMined]: TxServiceMinedEvent;
  [NxtpTxServiceEvents.TransactionConfirmed]: TxServiceConfirmedEvent;
  [NxtpTxServiceEvents.TransactionFailed]: TxServiceFailedEvent;
}

/**
 * @classdesc Handles getting gas prices and enforcing maximums for transactions
 */
export class Gas {
  private _gasPrice: BigNumber;
  private readonly _maxGasPrice: BigNumber;

  /**
   * Gets the current gas price
   * @returns BigNumber representation of gas price
   */
  public get price(): BigNumber {
    return BigNumber.from(this._gasPrice);
  }

  /**
   * Validates + sets the current gas price
   *
   * @param value - Gas price to set
   */
  public set price(value: BigNumber) {
    this._gasPrice = value;
  }

  constructor(public readonly baseValue: BigNumber, public readonly limit: BigNumber) {
    this._gasPrice = baseValue;
    // Enforce a max gas price 250% higher than the base value as a buffer.
    // This means, using the default config (at the time of writing this) we'll be able to execute about
    // 10 gas bumps before hitting the ceiling.
    // TODO: Use the config to set this value.
    const absoluteMax = utils.parseUnits("5000", "gwei");
    const max = baseValue.mul(5).div(2);
    this._maxGasPrice = max.gt(absoluteMax) ? absoluteMax : max;
  }

  /**
   * Sets the gas price to the pre-set maximum. This is typically used to fire off backfill transactions
   * to ensure they'll go through quickly.
   */
  public setToMax() {
    this._gasPrice = this._maxGasPrice.sub(10);
  }
}

type TransactionConfig = {
  confirmationTimeout: number;
  confirmationsRequired: number;
};

type LoggableTransactionData = {
  txsId: string;
  nonce: number;
  hashes: string[];
  attempt: number;
  gasPrice: string;
  gasLimit: string;
  discontinued: boolean;
  error: any;
  confirmations: number;
  didSubmit: boolean;
  didFinish: boolean;
};

/**
 * @classdesc A data structure for storing invariant params and managing state related to a single transaction.
 */
export class Transaction {
  // TODO: Temp solution - will be replaced by batching solution.
  // How many attempts until we consider a blocking tx as taking too long.
  public static MAX_ATTEMPTS = 99999;

  // Responses, in the order of attempts made for this tx.
  public responses: providers.TransactionResponse[] = [];

  // Receipt that we received for the on-chain transaction that was mined with
  // the desired number of confirmations.
  public receipt?: providers.TransactionReceipt;

  // TODO: private setter
  // Timestamp initially set on creation, but will be updated each time submit() is called.
  public timestamp: number = Date.now();

  // Indicates whether this transaction has been killed by monitor loop.
  public discontinued = false;

  // This error will be set in the instance of a failure.
  public error: Error | undefined;

  // Which transaction attempt we are on.
  public attempt = 0;

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
   * Retrieves all params needed to format a full transaction, including current gas price set, nonce, etc.
   */
  public get params(): FullTransaction {
    return {
      ...this.minTx,
      gasPrice: this.gas.price,
      nonce: this.nonce,
      gasLimit: this.gas.limit,
    };
  }

  public get loggable(): LoggableTransactionData {
    return {
      txsId: this.uuid,
      nonce: this.nonce,
      attempt: this.attempt,
      hashes: this.hashes,
      gasPrice: `${utils.formatUnits(this.gas.price, "gwei")} gwei`,
      gasLimit: this.gas.limit.toString(),
      discontinued: this.discontinued,
      error: this.error,
      confirmations: this.receipt ? this.receipt.confirmations : 0,
      didSubmit: this.didSubmit,
      didFinish: this.didFinish,
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

/**
 * @classdesc A data structure for managing the lifecycle of a (continuously rotating) batch of transactions.
 */
export class TransactionBuffer extends Array<Transaction> {

  public get isFull(): boolean {
    return this.maxLength ? this.length >= this.maxLength : false;
  }

  public get nonces(): number[] {
    return this.map((tx) => tx.nonce);
  }

  private get lastNonce(): number | undefined {
    const nonces = this.nonces;
    return nonces.length > 0 ? nonces[nonces.length - 1] : undefined;
  }

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

  public push(tx: Transaction): number {
    const lastNonce = this.lastNonce;
    if (lastNonce && tx.nonce <= lastNonce) {
      this.log("A nonce was pushed out of order! How could this have happened?! D:", {
        tx: tx.loggable,
        lastNonce,
      });
    }

    if (this.isFull) {
      throw new MaxBufferLengthError({
        maxLength: this.maxLength,
      });
    }
    const index = super.push(tx);
    this.log();
    return index;
  }

  public shift(): Transaction | undefined {
    const tx = super.shift();
    this.log();
    return tx;
  }

  private log(message?: string, context: any = {}) {
    this.logger.debug(message ? `${this.id.name}: ${message}` : this.id.name, undefined, undefined, {
      chainId: this.id.chainId,
      length: this.length,
      maxLength: this.maxLength ?? "N/A",
      buffer: this.nonces,
      ...context,
    });
  }
}
