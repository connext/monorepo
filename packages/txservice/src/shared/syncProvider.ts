import { delay, getHostnameFromRegex } from "@connext/nxtp-utils";
import { providers, utils } from "ethers";

import { parseError, RpcError } from "./errors";

export const { StaticJsonRpcProvider } = providers;

// TODO: Wrap metrics in a type, and add a getter for it for logging purposes (after sync() calls, for example)
// TODO: Should be a multiton mapped by URL (such that no duplicate instances are created).
/**
 * @classdesc An extension of StaticJsonRpcProvider that manages a providers chain synchronization status
 * and intercepts all RPC send() calls to ensure that the provider is in sync.
 */
export class SyncProvider extends StaticJsonRpcProvider {
  private readonly connectionInfo: utils.ConnectionInfo;
  public readonly name: string;

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
  private latencies: number[] = [];
  public get latency(): number {
    if (this.latencies.length === 0) {
      return 0.0;
    }
    // Average execution time over the last N samples.
    this.latencies = this.latencies.slice(-SyncProvider.N_SAMPLES);
    return this.latencies.reduce((a, b) => a + b, 0) / this.latencies.length;
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
    private readonly debugLogging = false,
  ) {
    super(_connectionInfo, chainId);
    this.connectionInfo = typeof _connectionInfo === "string" ? { url: _connectionInfo } : _connectionInfo;
    this.name = getHostnameFromRegex(this.connectionInfo.url)
      ? getHostnameFromRegex(this.connectionInfo.url)!.split(".").slice(0, -1).join(".")
      : this.connectionInfo.url;
  }

  /**
   * Synchronizes the provider with chain by checking the current block number and updating the syncedBlockNumber
   * property.
   */
  public async sync(): Promise<void> {
    const blockNumber = await this.getBlockNumber();
    this.debugLog("SYNCING_BLOCK_EVENT", blockNumber, this.syncedBlockNumber);
    this._syncedBlockNumber = blockNumber;
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
    const ready = await this.ready;
    if (!ready) {
      throw new RpcError(RpcError.reasons.OutOfSync, {
        provider: this.name,
        chainId: this.chainId,
        lastSyncedBlockNumber: this.syncedBlockNumber,
        synced: this.synced,
        lag: this.lag,
        ready,
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
                    reject(
                      new RpcError(RpcError.reasons.StallTimeout, {
                        attempt: i,
                        provider: this.name,
                        chainId: this.chainId,
                        stallTimeout: this.stallTimeout,
                        errors,
                      }),
                    );
                  }),
                ]
              : [],
          ),
        );
      } catch (error) {
        if (error.type === RpcError.type) {
          // If the error is an RPC Error, update metrics to reflect provider misbehavior.
          const isTimeout = error.reason === RpcError.reasons.StallTimeout;
          this.updateMetrics(false, sendTimestamp, i, method, params, {
            type: error.type.toString(),
            context: error.context,
            isTimeout,
          });
          // If the RPC error is a StallTimeout, we should assume this provider is unresponsive at the moment, and throw.
          if (isTimeout) {
            throw error;
          }
          errors.push(error);
        } else {
          throw error;
        }
      }
    }

    throw new RpcError(RpcError.reasons.FailedToSend, {
      provider: this.name,
      chainId: this.chainId,
      errors,
    });
  }

  private updateMetrics(
    success: boolean,
    sendTimestamp: number,
    iteration: number,
    method: string,
    params: any[],
    error?: { type: string; context: any; isTimeout: boolean },
  ) {
    const latency = +((Date.now() - sendTimestamp) / 1000).toFixed(2);
    this.latencies.push(latency);
    if (success) {
      this.reliability = Math.min(1, +(this.reliability + SyncProvider.RELIABILITY_STEP).toFixed(2));
    } else {
      if (error?.isTimeout) {
        // If the provider really is not responding in stallTimeout time (by default 10s!), we should assume
        // it is unresponsive and severely penalize reliability score as a result.
        this.reliability = 0;
      } else {
        this.reliability = Math.max(0, +(this.reliability - SyncProvider.RELIABILITY_STEP).toFixed(2));
      }
    }
    this.debugLog(
      success ? "RPC_CALL" : "RPC_ERROR",
      `#${iteration}`,
      method,
      this.cps,
      latency,
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
      console.log(`[${Date.now()}]`, `(${this.name})`, message, ...args);
    }
  }
}
