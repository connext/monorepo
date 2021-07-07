import { jsonifyError } from "@connext/nxtp-utils";
import axios from "axios";
import { BigNumber, Signer, Wallet, providers } from "ethers";
import { NonceManager } from "@ethersproject/experimental";
import PriorityQueue from "p-queue";
import { BaseLogger } from "pino";

import { TransactionServiceConfig, ProviderConfig, validateProviderConfig } from "./config";
import { ChainError } from "./error";
import { FullTransaction, MinimalTransaction } from "./types";

const { JsonRpcProvider, FallbackProvider } = providers;

/// Could use a more encompassing name, e.g. ChainRpcDispatch, etc
export class ChainRpcProvider {
  // Saving the list of underlying JsonRpcProviders used in FallbackProvider for the event
  // where we need to do a send() call directly on each one (Fallback doesn't raise that interface).
  private _providers: providers.JsonRpcProvider[];
  private provider: providers.JsonRpcProvider | providers.FallbackProvider;
  private signer: NonceManager;
  private queue: PriorityQueue = new PriorityQueue({ concurrency: 1 });
  private readonly quorum: number;

  public confirmationsRequired: number;
  public confirmationTimeout: number;
  public chainId: number;

  constructor(
    private readonly log: BaseLogger,
    chainId: number,
    signer: string | Signer,
    providerConfigs: ProviderConfig[],
    private readonly config: TransactionServiceConfig,
  ) {
    this.confirmationsRequired = config.chainConfirmations.get(chainId) ?? config.defaultConfirmationsRequired;
    this.confirmationTimeout = config.confirmationTimeouts.get(chainId) ?? config.defaultConfirmationTimeout;
    this.chainId = chainId;
    // TODO: Quorum is set to 1 here, but we may want to reconfigure later. Normally it is half the sum of the weights,
    // which might be okay in our case, but for now we have a low bar.
    // NOTE: This only applies to fallback provider case below.
    this.quorum = 1;
    
    // Register a provider for each url.
    // Make sure all providers are ready()
    const filteredConfigs = providerConfigs.filter((config) => {
      const valid = validateProviderConfig(config);
      if (!valid) {
        this.log.error(
          config,
          "Configuration was invalid for provider."
        );
      }
      return valid;
    });
    if (providerConfigs.length === 1) {
      this.provider = new JsonRpcProvider(providerConfigs[0]);
      this._providers = [this.provider];
    } else if (providerConfigs.length > 1) {
      const hydratedConfigs = filteredConfigs.map((config) => (
        {
          provider: new JsonRpcProvider(
            {
              url: config.url,
              user: config.user,
              password: config.password,
            }
          ),
          priority: config.priority ?? 1,
          weight: config.weight ?? 1,
          stallTimeout: config.stallTimeout,
        }
      ));
      this.provider = new FallbackProvider(hydratedConfigs, this.quorum);
      this._providers = hydratedConfigs.map((p) => p.provider);
    } else {
      // Not enough valid providers were found in configuration.
      // We must throw here, as the router won't be able to support this chain without valid provider configs.
      throw new ChainError(ChainError.reasons.ProviderNotFound);
    }

    // Using NonceManager to wrap signer here.
    this.signer = new NonceManager(typeof signer === "string" ? new Wallet(signer, this.provider) : signer.connect(this.provider));
  }

  public async sendTransaction(
    tx: FullTransaction
  ): Promise<{ response: providers.TransactionResponse | Error; success: boolean }> {
    this.isReady();
    const method = this.sendTransaction.name;
    // Define task to send tx with proper nonce
    const task = async (): Promise<{ response: providers.TransactionResponse | Error; success: boolean }> => {
      try {
        // Send transaction using the passed in callback.
        const { to, data, chainId, value, gasPrice } = tx;
        let { nonce } = tx;
        if (typeof nonce === "undefined") {
          // Nonce hasn't been defined yet for the tx, indicating this is the first time it's being sent.
          // NOTE: This signer is a NonceManager, and will manage its nonce internally.
          nonce = await this.signer.getTransactionCount("pending");
        }
        const response: providers.TransactionResponse | undefined = await this.signer.sendTransaction({
          to,
          data,
          chainId,
          gasPrice,
          nonce: nonce,
          value: BigNumber.from(value || 0),
        });
        // Check to see if ethers returned undefined for the response; if so, handle as error case.
        if (typeof response === "undefined") {
          throw new ChainError(ChainError.reasons.FailedToSendTx, { method, ...tx, nonce });
        }
        return { response, success: true };
      } catch (e) {
        return { response: e, success: false };
      }
    };
    // Queue up the execution of the transaction.
    return await this.queue.add(task);
  }

  public async confirmTransaction(
    transactionHash: string,
  ) {
    this.isReady();
    // We are using waitForTransaction here to leverage the timeout functionality internal to ethers.
    // IF this times out, ethers will reject with ("timeout exceeded", Logger.errors.TIMEOUT)
    // Alternatively, it could reject with ("transaction was replaced", Logger.errors.TRANSACTION_REPLACED)
    await this.provider.waitForTransaction(transactionHash, this.confirmationsRequired);
    return await this.provider.getTransactionReceipt(transactionHash);
  }

  public async readTransaction(tx: MinimalTransaction): Promise<string> {
    this.isReady();
    const method = this.readTransaction.name;
    return await this.retryWrapper(this.chainId, method, async () => {
      try {
        const readResult = await this.signer.call({
          to: tx.to,
          data: tx.data,
        });
        return readResult;
      } catch (e) {
        throw new ChainError(ChainError.reasons.ContractReadFailure, { error: jsonifyError(e) });
      }
    });
  }

  // TODO: Cache gas prices.
  public async getGasPrice(): Promise<BigNumber> {
    const method = this.getGasPrice.name;

    const { gasInitialBumpPercent, gasMinimum } = this.config;
    return await this.retryWrapper<BigNumber>(this.chainId, method, async () => {
      let gasPrice: BigNumber | undefined = undefined;

      if (this.chainId === 1) {
        try {
          const gasNowResponse = await axios.get(`https://www.gasnow.org/api/v3/gas/price`);
          const { rapid } = gasNowResponse.data;
          gasPrice = typeof rapid !== "undefined" ? BigNumber.from(rapid) : undefined;
        } catch (e) {
          this.log.warn({ error: e }, "Gasnow failed, using provider");
        }
      }

      if (!gasPrice) {
        gasPrice = await this.provider.getGasPrice();
        gasPrice = gasPrice.add(gasPrice.mul(gasInitialBumpPercent).div(100));
      }
      if (gasPrice.lt(gasMinimum)) {
        gasPrice = BigNumber.from(gasMinimum);
      }
      return gasPrice;
    });
  }

  private async retryWrapper<T>(chainId: number, method: string, targetMethod: () => Promise<T>): Promise<T> {
    let retries: number;
    const errors: { [attempt: number]: string | undefined } = {};
    for (retries = 1; retries < this.config.rpcProviderMaxRetries; retries++) {
      try {
        return await targetMethod();
      } catch (e) {
        errors[retries] = e.message;
      }
    }
    throw new ChainError(ChainError.reasons.RpcFailure, {
      method,
      chainId,
      errors,
    });
  }

  private async isReady(): Promise<boolean> {
    // TODO: Do we need both ready and the check below, or is this redundant?
    // provider.ready returns a Promise which will stall until the network has heen established, ignoring
    // errors due to the target node not being active yet. This will ensure we wait until the node is up
    // and running smoothly.
    const ready = await this.provider.ready;
    if (!ready) {
      // Error out, not enough providers are ready.
      throw new ChainError(ChainError.reasons.ProviderNotSynced);
    }
    // Ensure that provider(s) are synced.
    const outOfSync = [];
    await Promise.all(this._providers.map(async (provider) => {
      try {
        return await provider.send("eth_syncing", []);
      } catch(e) {
        outOfSync.push(e);
      }
    }));
    // We base our evaluation on the quorum (by default, 1). If the quorum isn't 1,
    // we may necessarily need >1 provider to be in sync.
    if (this._providers.length - outOfSync.length < this.quorum) {
      // Error out, not enough providers are ready.
      throw new ChainError(ChainError.reasons.ProviderNotSynced);
    }
    return true;
  }
}
