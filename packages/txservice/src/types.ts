import { delay, Logger, RequestContext } from "@connext/nxtp-utils";
import { BigNumber, BigNumberish, providers, utils } from "ethers";

import { MaxBufferLengthError, parseError, RpcError, TransactionBackfilled } from "./error";

export const { StaticJsonRpcProvider } = providers;

export type ReadTransaction = {
  chainId: number;
  to: string;
  data: string;
};

export type WriteTransaction = {
  from?: string;
  value: BigNumberish;
} & ReadTransaction;

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
  hashes?: string[];
  attempt?: number;
  bumps?: number;
  minedBlockNumber?: number;
  confirmedBlockNumber?: number;
  gasPrice: string;
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
  public get params(): providers.TransactionRequest {
    return {
      ...this.minTx,
      gasPrice: this.gas.price,
      nonce: this.nonce,
      gasLimit: this.gas.limit,
    };
  }

  public get loggable(): LoggableTransactionData {
    return {
      // These values should always be defined.
      txsId: this.uuid,
      nonce: this.nonce,
      gasPrice: `${utils.formatUnits(this.gas.price, "gwei")} gwei`,
      gasLimit: this.gas.limit.toString(),
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
        // This splice operation will replace that transaction in the buffer.
        replacedTx = super.splice(index, shouldReplace ? 1 : 0, tx)[0];
      }
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
    return this.find((tx) => tx.nonce === nonce) ?? this.lastShiftedTx;
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
      this.logger.error(msg, undefined, undefined, ctx);
    } else {
      this.logger.debug(msg, undefined, undefined, ctx);
    }
  }
}

/**
 * Cache item used in ProviderCache schema property; either blocks to live (BTL) or time to live (TTL) must
 * be specified (the former is preferred but the latter can be used as a backup when a block listener will not
 * be actively updating the cache's block number).
 */
type ProviderCacheSchema<T> = {
  [K in keyof T]:
    | {
        btl: number;
        ttl?: number;
      }
    | {
        btl?: number;
        ttl: number;
      };
};

type ProviderCacheData<T> = {
  [K in keyof T]?: {
    value: T[K];
    timestamp: number;
    blockNumber: number;
  };
};

/**
 * @classdesc A data structure for managing time-sensitive (expiring) cached information from chain
 * that expires after a set number of blocks or amount of time.
 */
export class ProviderCache<T> {
  private _blockNumber = -1;
  public get blockNumber(): number {
    return this._blockNumber;
  }

  private _data: ProviderCacheData<T> = {};
  public get data(): Partial<T> {
    const data: Partial<T> = {};
    for (const k of Object.keys(this._data)) {
      const key = k as keyof T;
      data[key] = this.getItem(key)?.value;
    }
    return data;
  }

  /**
   * @param schema - A schema for the cache that determines whether each item expires after a set period of
   * time (ttl, ms) or a set number of blocks (btl, number).
   */
  constructor(private readonly logger: Logger, private readonly schema: ProviderCacheSchema<T>) {}

  /**
   * Update the cache block number, and optionally the data.
   * @param blockNumber - Current block number.
   * @param data - Optional data to update the cache with.
   */
  public update(blockNumber: number, data: Partial<T> = {}) {
    if (blockNumber < this._blockNumber) {
      this.logger.debug("Block number went backwards. Did a reorg occur?", undefined, undefined, {
        newBlockNumber: blockNumber,
        previousBlockNumber: this._blockNumber,
      });
    }
    this._blockNumber = blockNumber;
    this.set(data);
  }

  /**
   * Set a value in the cache.
   * @param data - The data to set.
   */
  public set(data: Partial<T>) {
    Object.keys(data).forEach((k) => {
      const key = k as keyof T;
      const value = data[key] as T[keyof T];
      this._data[key] = {
        value,
        timestamp: Date.now(),
        blockNumber: this.blockNumber,
      };
    });
  }

  /**
   * Helper for retrieving item from data depending on whether it's expired.
   * @param key - a key of the cache data schema.
   * @returns
   */
  private getItem(key: keyof T): ProviderCacheData<T>[keyof T] | undefined {
    const { ttl, btl } = this.schema[key];
    const item = this._data[key];
    if (!item) {
      return undefined;
    }
    // In these blocks, we'll also erase the item from the cache data if it's expired.
    if (ttl !== undefined && item.timestamp + ttl < Date.now()) {
      this._data[key] = undefined;
      return undefined;
    }
    if (btl !== undefined && item.blockNumber + btl < this.blockNumber) {
      this._data[key] = undefined;
      return undefined;
    }
    return item;
  }
}

/**
 * @classdesc An extension of StaticJsonRpcProvider that manages a providers chain synchronization status
 * and intercepts all RPC send() calls to ensure that the provider is in sync.
 */
export class SyncProvider extends StaticJsonRpcProvider {
  private readonly connectionInfo: utils.ConnectionInfo;
  public readonly url: string;

  public synced = true;
  public lag = 0;
  public priority = 0;

  private static readonly N_SAMPLES = 100;
  // Denominator is the target reliability sample size.
  private static readonly RELIABILITY_STEP = 1 / SyncProvider.N_SAMPLES;
  // A metric used for measuring reliability, based on the number of successful calls / last N calls made.
  public reliability = 0.0;

  // Used for tracking how many calls we've made in the last second.
  private cpsTimestamps: number[] = [];
  public get cps(): number {
    // Average CPS over the last 10 seconds.
    const now = Date.now();
    this.cpsTimestamps = this.cpsTimestamps.filter((ts) => now - ts < 10_000);
    return this.cpsTimestamps.length / 10;
  }
  private execTimes: number[] = [];
  public get avgExecTime(): number {
    // Average execution time over the last N samples.
    this.execTimes = this.execTimes.slice(-SyncProvider.N_SAMPLES);
    return this.execTimes.reduce((a, b) => a + b, 0) / this.execTimes.length;
  }

  // This variable is used to track the last block number this provider synced to, and is kept separately from the
  // inherited `blockNumber` property (which is a getter that uses an update method).
  private _syncedBlockNumber = -1;
  public get syncedBlockNumber(): number {
    return this._syncedBlockNumber;
  }

  constructor(
    _connectionInfo: utils.ConnectionInfo | string,
    public readonly chainId: number,
    private readonly stallTimeout = 10_000,
    private readonly debugLogging = true,
  ) {
    super(_connectionInfo, chainId);
    this.connectionInfo = typeof _connectionInfo === "string" ? { url: _connectionInfo } : _connectionInfo;
    this.url = this.connectionInfo.url.replace("https://", "").split(".com")[0];
  }

  /**
   * Synchronizes the provider with chain by checking the current block number and updating the syncedBlockNumber
   * property.
   */
  public sync(): Promise<void> {
    this.removeAllListeners();

    return new Promise<void>((resolve) => {
      this.once("block", async (blockNumber: number) => {
        this.debugLog("SYNCING_BLOCK_EVENT", blockNumber, this.syncedBlockNumber);
        this._syncedBlockNumber = blockNumber;
        resolve();
      });
    });
  }

  public async addBlockListener(onBlock: (blockNumber: number) => void) {
    this.on("block", async (blockNumber: number) => {
      this.debugLog("BLOCK_EVENT", blockNumber);
      onBlock(blockNumber);
    });
  }

  /**
   * Overridden RPC send method. If the provider is currently out of sync, this method will
   * now throw an RpcError indicating such. This way, we ensure an out of sync provider is never
   * consulted (except when checking the block number, which is used for syncing).
   *
   * @param method - RPC method name.
   * @param params - RPC method params.
   * @returns any - RPC response.
   * @throws RpcError - If the provider is currently out of sync.
   */
  public async send(method: string, params: Array<any>): Promise<any> {
    // provider.ready returns a Promise which will stall until the network has been established, ignoring
    // errors due to the target node not being active yet. This will ensure we wait until the node is up
    // and running smoothly.
    if ((!this.synced && method !== "eth_blockNumber") || !(await this.ready)) {
      throw new RpcError(RpcError.reasons.OutOfSync, {
        provider: this.url,
        chainId: this.chainId,
        blockNumber: this.syncedBlockNumber,
        synced: this.synced,
      });
    }

    // TODO: Make # of retries configurable?
    const errors: any[] = [];
    let sendTimestamp = -1;
    for (let i = 1; i <= 5; i++) {
      try {
        sendTimestamp = Date.now();
        this.cpsTimestamps.push(sendTimestamp);
        return await Promise.race(
          [
            new Promise((resolve, reject) => {
              super
                .send(method, params)
                .then((res) => {
                  this.updateMetrics(true, sendTimestamp, i, method, params);
                  resolve(res);
                })
                .catch((e) => {
                  const error = parseError(e);
                  reject(error);
                });
            }),
          ].concat(
            this.stallTimeout
              ? [
                  new Promise(async (_, reject) => {
                    await delay(this.stallTimeout);
                    reject(new RpcError(RpcError.reasons.Timeout));
                  }),
                ]
              : [],
          ),
        );
      } catch (error) {
        // If the error is an RPC Error (that's not a Timeout) we want to throw it.
        if (error.type === RpcError.type && error.reason !== RpcError.reasons.Timeout) {
          this.updateMetrics(false, sendTimestamp, i, method, params, {
            type: error.type.toString(),
            context: error.context,
          });
          errors.push(error);
        } else {
          throw error;
        }
      }
    }

    if (errors.every((error) => error.type === errors[0].type)) {
      // If every error type is the same, might as well throw the initial error.
      throw errors[0];
    }

    throw new RpcError(RpcError.reasons.FailedToSend, {
      provider: this.url,
      chainId: this.chainId,
      blockNumber: this.syncedBlockNumber,
      errors,
    });
  }

  private updateMetrics(
    success: boolean,
    sendTimestamp: number,
    iteration: number,
    method: string,
    params: any[],
    error?: { type: string; context: any },
  ) {
    const execTime = +((Date.now() - sendTimestamp) / 1000).toFixed(2);
    this.execTimes.push(execTime);
    if (success) {
      this.reliability = Math.min(1, +(this.reliability + SyncProvider.RELIABILITY_STEP).toFixed(2));
    } else {
      this.reliability = Math.max(0, +(this.reliability - SyncProvider.RELIABILITY_STEP).toFixed(2));
    }
    this.debugLog(
      success ? "RPC_CALL" : "RPC_ERROR",
      `#${iteration}`,
      method,
      this.cps,
      execTime,
      this.reliability,
      // TODO: Logging params for these methods is for debugging purposes only.
      ["eth_getBlockByNumber", "eth_getTransactionByHash", "eth_getTransactionReceipt"].includes(method)
        ? params.length > 0
          ? params[0]
          : params
        : "",
      error ? error.type : "",
      error ? error.context : "",
    );
  }

  private debugLog(message: string, ...args: any[]) {
    if (this.debugLogging) {
      console.log(`[${Date.now()}]`, `(${this.url})`, message, ...args);
    }
  }
}
