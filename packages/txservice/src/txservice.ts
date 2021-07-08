import { Signer, providers } from "ethers";
import { BaseLogger } from "pino";
import { Evt } from "evt";
import { jsonifyError } from "@connext/nxtp-utils";

import {
  TransactionServiceConfig,
  validateTransactionServiceConfig,
  DEFAULT_CONFIG,
  ChainConfig,
} from "./config";
import { ChainError } from "./error";
import { MinimalTransaction } from "./types";
import { ChainRpcProvider } from "./provider";
import { Transaction } from "./transaction";

export type TxServiceSubmittedEvent = {
  response: providers.TransactionResponse;
}

export type TxServiceConfirmedEvent = {
  receipt: providers.TransactionReceipt;
}

export type TxServiceFailedEvent = {
  error: ChainError;
  receipt?: providers.TransactionReceipt;
}

export const NxtpTxServiceEvents = {
  TransactionAttemptSubmitted: "TransactionAttemptSubmitted",
  TransactionConfirmed: "TransactionConfirmed",
  TransactionFailed: "TransactionFailed",
} as const;
export type NxtpTxServiceEvent = typeof NxtpTxServiceEvents[keyof typeof NxtpTxServiceEvents];

export interface NxtpTxServiceEventPayloads {
  [NxtpTxServiceEvents.TransactionAttemptSubmitted]: TxServiceSubmittedEvent;
  [NxtpTxServiceEvents.TransactionConfirmed]: TxServiceConfirmedEvent;
  [NxtpTxServiceEvents.TransactionFailed]: TxServiceFailedEvent;
}

export class TransactionService {
  // TODO: Add an object/dictionary statically to the class prototype mapping the
  // signer to a flag indicating whether there is an instance using that signer.
  // This will prevent two queue instances using the same signer and therefore colliding.
  // Idea is to have essentially a modified 'singleton'-like pattern.
  // private static _instances: Map<string, TransactionService> = new Map();

  private evts: { [K in NxtpTxServiceEvent]: Evt<NxtpTxServiceEventPayloads[K]> } = {
    [NxtpTxServiceEvents.TransactionAttemptSubmitted]: Evt.create<TxServiceSubmittedEvent>(),
    [NxtpTxServiceEvents.TransactionConfirmed]: Evt.create<TxServiceConfirmedEvent>(),
    [NxtpTxServiceEvents.TransactionFailed]: Evt.create<TxServiceFailedEvent>(),
  }

  private config: TransactionServiceConfig;
  private providers: Map<number, ChainRpcProvider> = new Map();

  constructor(
    private readonly log: BaseLogger,
    signer: string | Signer,
    config: Partial<TransactionServiceConfig>,
  ) {
    // TODO: See above TODO. Should we have a getInstance() method and make constructor private ??
    // const _signer: string = typeof signer === "string" ? signer : signer.getAddress();
    // if (TransactionService._instances.has(_signer)) {}

    // Set up the config.
    this.config = Object.assign(DEFAULT_CONFIG, config);
    validateTransactionServiceConfig(this.config);
    // For each chain ID / provider, map out all the utils needed for each chain.
    const chains = this.config.chains;
    Object.keys(chains)
      .forEach((chainId) => {
        // Get this chain's config.
        const chain: ChainConfig = chains[chainId];
        // Retrieve provider configs and ensure at least one provider is configured.
        const providers = chain.providers;
        if (providers.length === 0) {
          // TODO: This should be a config parser error (i.e. thrown in config parse).
          this.log.error({ chainId, providers }, `Provider configurations not found for chainID: ${chainId}`);
          throw new ChainError(ChainError.reasons.ProviderNotFound);
        }
        const chainIdNumber = parseInt(chainId);
        this.providers.set(chainIdNumber, new ChainRpcProvider(this.log, signer, chainIdNumber, chain, providers, this.config));
      });
  }

  public async sendAndConfirmTx(
    chainId: number,
    tx: MinimalTransaction,
  ): Promise<providers.TransactionReceipt> {
    const method = this.sendAndConfirmTx.name;
    let receipt: providers.TransactionReceipt | undefined;

    const transaction = new Transaction(
      this.log,
      this.getProvider(chainId),
      tx,
      this.config,
    );

    while (!receipt) {
      try {
        /// SUBMIT
        // First, send tx and get back a response.
        const response = await transaction.send();
        this.handleSubmit(response);

        /// CONFIRM
        // Now we wait for confirmation and get tx receipt.
        receipt = await transaction.confirm();
      } catch (e) {
        // Check if the error was a confirmation timeout.
        if (e.message === ChainError.reasons.ConfirmationTimeout) {
          if (transaction.nonceExpired) {
            throw new ChainError(ChainError.reasons.NonceExpired, { method });
          }
          transaction.bumpGasPrice();
        } else {
          // Coerce error to be a ChainError.
          let error = e;
          const reason: string | undefined = ChainError.parseChainErrorReason(e.message);
          if (reason) {
            error = new ChainError(reason, { method });
          } else {
            error = new ChainError(error.message, { method });
          }
          this.handleFail(error, receipt);
          throw error;
        }
      }
    }

    // Success!
    this.handleConfirm(receipt);
    return receipt;
  }

  /// Create a non-state changing contract call. Returns hexdata that needs to be decoded.
  public async readTx(chainId: number, tx: MinimalTransaction): Promise<string> {
    const provider = this.getProvider(chainId);
    return provider.readTransaction(tx);
  }

  /// Helper to wrap getting provider for specified chain ID.
  private getProvider(chainId: number): ChainRpcProvider {
    // Ensure that a signer, provider, etc are present to execute on this chainId.
    if (!this.providers.has(chainId)) {
      throw new ChainError(ChainError.reasons.ProviderNotFound);
    }
    return this.providers.get(chainId)!;
  }

  private handleSubmit(response: providers.TransactionResponse) {
    const method = this.sendAndConfirmTx.name;
    this.log.info(
      {
        method,
        hash: response.hash,
        gas: (response.gasPrice ?? "unknown").toString(),
        nonce: response.nonce,
      },
      "Tx submitted.",
    );
    this.evts[NxtpTxServiceEvents.TransactionAttemptSubmitted].post({ response });
  }

  private handleConfirm(receipt: providers.TransactionReceipt) {
    const method = this.sendAndConfirmTx.name;
    this.log.info({ method, receipt }, "Tx mined.");
    this.evts[NxtpTxServiceEvents.TransactionConfirmed].post({ receipt });
  }

  private handleFail(error: ChainError, receipt?: providers.TransactionReceipt) {
    const method = this.sendAndConfirmTx.name;
    this.log.error({ method, receipt, error: jsonifyError(error) }, "Tx failed.");
    this.evts[NxtpTxServiceEvents.TransactionFailed].post({ error, receipt });
  } 
}
