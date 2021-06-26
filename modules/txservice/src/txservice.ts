import { BigNumber, Signer, Wallet, providers } from "ethers";
import { BaseLogger } from "pino";
import PriorityQueue from "p-queue";
import { delay } from "@connext/nxtp-utils";
import axios from "axios";

import { TransactionServiceConfig, DEFAULT_CONFIG } from "./config";
import { ChainError } from "./error";
import { ChainUtils, MinimalTransaction } from "./types";

const { JsonRpcProvider } = providers;

const makeProvider = (url: string): providers.JsonRpcProvider => {
  return new JsonRpcProvider(url);
};

export class TransactionService {
  private config: TransactionServiceConfig;
  private chains: Map<number, ChainUtils> = new Map();
  private log: BaseLogger;

  // TODO: Add an object/dictionary statically to the class prototype mapping the
  // signer to a flag indicating whether there is an instance using that signer.
  // This will prevent two queue instances using the same signer and therefore colliding.
  // Idea is to have essentially a modified 'singleton'-like pattern.

  constructor(
    log: BaseLogger,
    signer: string | Signer,
    chainProviders: { [chainId: number]: string[] },
    config: Partial<TransactionServiceConfig> = {} as TransactionServiceConfig,
    makeProviderOverride?: (url: string) => providers.JsonRpcProvider,
  ) {
    this.config = Object.assign(DEFAULT_CONFIG, config);
    this.log = log;
    // For each chain ID / provider, add a signer to our signers map and serialized queue to our queue map.
    Object.keys(chainProviders)
      .map(Number)
      .forEach(chainId => {
        const urls = chainProviders[chainId];
        if (urls.length === 0) {
          throw new ChainError(ChainError.reasons.ProviderNotFound);
        }
        // TODO: Use multiple providers, with either a wrapping ChainRpcProvider class or something internal to TransactionService.
        const url = urls[0];
        const provider = makeProviderOverride ? makeProviderOverride(url) : makeProvider(url);
        const confirmationsRequired =
          this.config.chainConfirmations.get(chainId) ?? this.config.defaultConfirmationsRequired;
        this.chains.set(chainId, {
          signer: typeof signer === "string" ? new Wallet(signer, provider) : (signer.connect(provider) as Signer),
          queue: new PriorityQueue({ concurrency: 1 }),
          provider,
          confirmationsRequired,
        } as ChainUtils);
      });
  }

  public async sendAndConfirmTx(
    chainId: number,
    tx: MinimalTransaction,
    presetGasPrice?: BigNumber,
  ): Promise<providers.TransactionReceipt> {
    const method = this.sendAndConfirmTx.name;
    // const methodId = getRandomBytes32();

    // Ensure that a signer, provider, etc are present to execute on this chainId.
    if (!this.chains.has(chainId)) {
      throw new ChainError(ChainError.reasons.SignerNotFound);
    }

    // Nonce will persist across iterations, as soon as it is defined in the first one.
    let nonce: number | undefined;
    const nonceExpired = false;
    let gasPrice: BigNumber;

    const responses: providers.TransactionResponse[] = [];
    let receipt: providers.TransactionReceipt | undefined;

    try {
      // Get (initial) gas price if there is not a preset amount passed into this method.
      gasPrice = presetGasPrice ?? (await this.getGasPrice(chainId));
    } catch (e) {
      // NOTE: This should be a VectorError thrown here by this.getGasPrice.
      this.log.error(method, chainId);
      // Default to initial gas price, if available. Otherwise, throw.
      const price = this.config.chainInitialGas.get(chainId);
      if (!price) {
        throw e;
      }
      gasPrice = price;
    }

    while (!receipt) {
      try {
        /// SUBMIT
        this.log.info(
          { method, chainId, to: tx.to, from: tx.from, nonce, gasPrice: gasPrice.toString() },
          "Attempting to send transaction.",
        );
        // First, send tx and get back a response.
        const { response: _response, success } = await this.sendTx(chainId, tx, gasPrice, nonce);
        if (!success) {
          this.log.error({ error: _response }, "Failed to send tx");
          throw _response;
        }
        const response = _response as providers.TransactionResponse;
        // Check to see if ethers returned undefined for the response; if so, handle as error case.
        if (!response) {
          this.log.error({ method, chainId, response }, "Received invalid response from sendTx.");
          throw new ChainError(ChainError.reasons.InvalidResponse);
        }
        this.log.info(
          { method, hash: response.hash, gas: (response.gasPrice ?? "unknown").toString(), nonce: response.nonce },
          "Tx submitted",
        );

        // Save nonce if applicable.
        if (nonce === undefined) {
          nonce = response.nonce;
        }

        // Add this response to our local response history.
        responses.push(response);

        /// CONFIRM
        // Now we wait for confirmation and get tx receipt.
        receipt = await this.confirmTx(chainId, responses);
        // Check status in event of tx reversion.
        if (receipt && receipt.status === 0) {
          throw new ChainError(ChainError.reasons.TxReverted, { receipt });
        }
      } catch (e) {
        // Check if the error was a confirmation timeout.
        if (e.message === ChainError.reasons.ConfirmationTimeout) {
          if (nonceExpired) {
            const error = new ChainError(ChainError.reasons.NonceExpired, {
              method,
            });
            throw error;
          }
          const prevGasPrice = gasPrice;
          gasPrice = this.bumpGasPrice(gasPrice);
          this.log.info(
            {
              method,
              gasPrice: prevGasPrice.toString(),
              newGasPrice: gasPrice.toString(),
            },
            "Tx timed out waiting for confirmation. Bumping gas price for reattempt.",
          );
        } else {
          let error = e;
          const reason: string | undefined = ChainError.parseChainErrorReason(e.message);
          if (reason) {
            error = new ChainError(reason);
          }
          // TODO: Use jsonifyError
          this.log.error({ method, error: error.toString() }, error.message);
          throw error;
        }
      }
    }
    // Success!
    this.log.info({ method, receipt }, "Tx mined.");
    return receipt;
  }

  /// Helper method to wrap queuing up a transaction and waiting for response.
  private async sendTx(
    chainId: number,
    tx: MinimalTransaction,
    gasPrice: BigNumber,
    nonce?: number,
  ): Promise<{ response: providers.TransactionResponse | Error; success: boolean }> {
    const { signer, queue } = this.chains.get(chainId)!;
    // Define task to send tx with proper nonce
    const task = async (): Promise<{ response: providers.TransactionResponse | Error; success: boolean }> => {
      try {
        // Send transaction using the passed in callback.
        // const stored = this.nonces.get(chainId);
        // const nonceToUse: number = nonce ?? stored ?? (await signer.getTransactionCount("pending"));
        const pending: number = await signer.getTransactionCount("pending");
        const response: providers.TransactionResponse | undefined = await signer.sendTransaction({
          to: tx.to,
          data: tx.data,
          chainId: tx.chainId,
          gasPrice,
          nonce: nonce ?? pending,
          value: BigNumber.from(tx.value || 0),
        });
        // After calling tx fn, set nonce to the greatest of
        // stored, pending, or incremented
        // const pending = await signer.getTransactionCount("pending");
        // const incremented = (response?.nonce ?? nonceToUse) + 1;
        // Ensure the nonce you store is *always* the greatest of the values
        // const toCompare = stored ?? 0;
        // if (toCompare < pending || toCompare < incremented) {
        //   this.nonces.set(chainId, incremented > pending ? incremented : pending);
        // }
        return { response, success: true };
      } catch (e) {
        return { response: e, success: false };
      }
    };
    // Queue up the execution of the transaction.
    return await queue.add(task);
  }

  async confirmTx(chainId: number, responses: providers.TransactionResponse[]): Promise<providers.TransactionReceipt> {
    const { provider, confirmationsRequired } = this.chains.get(chainId)!;
    const { confirmationTimeout, confirmationTimeoutExtensionMultiplier } = this.config;
    // A flag for marking when we have received at least 1 confirmation. We'll extend the wait period
    // if this is the case.
    let receivedConfirmation = false;

    // An anon fn to get the tx receipts for all responses.
    // We must check for confirmation in all previous transactions. Although it's most likely
    // that it's the previous one, any of them could have been confirmed.
    const pollForReceipt = async (): Promise<providers.TransactionReceipt | undefined> => {
      // Save all reverted receipts for a check in case our Promise.race evaluates to be undefined.
      const reverted: providers.TransactionReceipt[] = [];
      // Make a pool of promises for resolving each receipt call (once it reaches target confirmations).
      const receipt = await Promise.race<any>(
        responses
          .map(response => {
            return new Promise(async resolve => {
              const r = await provider.getTransactionReceipt(response.hash);
              if (r) {
                if (r.status === 0) {
                  reverted.push(r);
                } else if (r.confirmations >= confirmationsRequired) {
                  return resolve(r);
                } else if (r.confirmations >= 1) {
                  receivedConfirmation = true;
                }
              }
            });
          })
          // Add a promise returning undefined with a delay of 2 seconds to the pool.
          // This will execute in the event that none of the provider.getTransactionReceipt calls work,
          // and/or none of them have the number of confirmations we want.
          .concat(delay(2_000)),
      );
      if (!!receipt) {
        if (reverted.length === responses.length) {
          // We know every tx was reverted.
          // NOTE: The first reverted receipt in the array will be entirely arbitrary.
          // TODO: Should we return the reverted receipt belonging to the latest tx instead?
          return reverted[0];
        }
      }
      return receipt;
    };

    // Poll for receipt.
    let receipt: providers.TransactionReceipt | undefined = await pollForReceipt();
    // NOTE: This loop won't execute if receipt is valid (not undefined).
    let timeElapsed = 0;
    const startMark = new Date().getTime();
    const extendedTimeout = confirmationTimeout * confirmationTimeoutExtensionMultiplier;
    while (!receipt && timeElapsed < (receivedConfirmation ? extendedTimeout : confirmationTimeout)) {
      receipt = await pollForReceipt();
      // Update elapsed time.
      timeElapsed = new Date().getTime() - startMark;
    }

    // If there is no receipt, we timed out in our polling operation.
    if (!receipt) {
      throw new ChainError(ChainError.reasons.ConfirmationTimeout);
    }

    return receipt;
  }

  private bumpGasPrice(gasPrice: BigNumber): BigNumber {
    // Scale up gas by percentage as specified by config.
    const bumpedGasPrice = gasPrice.add(gasPrice.mul(this.config.gasReplacementBumpPercent).div(100)).add(1);
    const { gasLimit } = this.config;
    // if the gas price is past the max, throw.
    if (bumpedGasPrice.gt(gasLimit)) {
      const error = new ChainError(ChainError.reasons.MaxGasPriceReached, {
        gasPrice: bumpedGasPrice.toString(),
        max: gasLimit.toString(),
      });
      throw error;
    }
    return bumpedGasPrice;
  }

  async getGasPrice(chainId: number): Promise<BigNumber> {
    const method = this.getGasPrice.name;
    const { provider } = this.chains.get(chainId)!;
    const { gasInitialBumpPercent, gasPriceMinimum } = this.config;
    return await this.retryWrapper<BigNumber>(chainId, method, async () => {
      let gasPrice: BigNumber | undefined = undefined;

      if (chainId === 1) {
        try {
          const gasNowResponse = await axios.get(`https://www.gasnow.org/api/v3/gas/price`);
          const { rapid } = gasNowResponse.data;
          gasPrice = typeof rapid !== "undefined" ? BigNumber.from(rapid) : undefined;
        } catch (e) {
          this.log.warn({ error: e }, "Gasnow failed, using provider");
        }
      }

      if (!gasPrice) {
        try {
          gasPrice = await provider.getGasPrice();
          gasPrice = gasPrice.add(gasPrice.mul(gasInitialBumpPercent).div(100));
        } catch (e) {
          throw e;
        }
      }
      if (gasPrice.lt(gasPriceMinimum)) {
        gasPrice = BigNumber.from(gasPriceMinimum);
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
}
