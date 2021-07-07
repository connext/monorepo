import { Signer, providers } from "ethers";
import { BaseLogger } from "pino";
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

export class TransactionService {
  // TODO: Add an object/dictionary statically to the class prototype mapping the
  // signer to a flag indicating whether there is an instance using that signer.
  // This will prevent two queue instances using the same signer and therefore colliding.
  // Idea is to have essentially a modified 'singleton'-like pattern.
  // private static _instances: Map<string, TransactionService> = new Map();

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
        await transaction.send();

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
          let error = e;
          const reason: string | undefined = ChainError.parseChainErrorReason(e.message);
          if (reason) {
            error = new ChainError(reason, { method });
          }
          this.log.error({ method, error: jsonifyError(error) }, error.message);
          throw error;
        }
      }
    }

    // Check status in event of tx reversion.
    if (receipt.status === 0) {
      throw new ChainError(ChainError.reasons.TxReverted, { receipt });
    }

    // Success!
    this.log.info({ method, receipt }, "Tx mined.");
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
}
