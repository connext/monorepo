import { TransactionManager as TTransactionManager, IERC20Minimal } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { BigNumber, constants, Contract, providers, Signer } from "ethers";
import {
  PrepareParams,
  CancelParams,
  FulfillParams,
  NxtpError,
  NxtpErrorJson,
  Values,
  jsonifyError,
} from "@connext/nxtp-utils";
import hyperid from "hyperid";
import { BaseLogger } from "pino";
import ERC20 from "@connext/nxtp-contracts/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import { errAsync, okAsync, ResultAsync } from "neverthrow";

import { TransactionManagerEvent, TransactionManagerEventPayloads, TransactionManagerListener } from "./listener";

const hId = hyperid();

export class TransactionManagerError extends NxtpError {
  static readonly type = "TransactionManagerError";
  static readonly reasons = {
    TxServiceError: "Error submitting transaction",
    NoTransactionManagerAddress: "No transactionManager found for chain",
  };

  constructor(
    public readonly message: Values<typeof TransactionManagerError.reasons> | string,
    public readonly chainId: number,
    public readonly context: {
      txError?: NxtpErrorJson;
      approveReceipt?: providers.TransactionReceipt;
      methodId: string;
      method: string;
    },
  ) {
    super(message, context, TransactionManagerError.type);
  }
}

export const getDeployedTransactionManagerContractAddress = (chainId: number): string | undefined => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }

  const address = record[name]?.contracts?.TransactionManager?.address;

  return address;
};

/**
 * Multi-chain wrapper around TranasctionManager contract
 */
export class TransactionManager {
  private chainConfig: {
    [chainId: number]: {
      provider: providers.FallbackProvider;
      transactionManager: TTransactionManager;
      listener: TransactionManagerListener;
    };
  };

  constructor(
    private readonly signer: Signer,
    _chainConfig: {
      [chainId: number]: {
        provider: providers.FallbackProvider;
        transactionManagerAddress: string;
      };
    },
    private readonly logger: BaseLogger,
  ) {
    this.chainConfig = {};
    Object.entries(_chainConfig).forEach(([chainId, { provider, transactionManagerAddress }]) => {
      const transactionManager = new Contract(
        transactionManagerAddress,
        TransactionManagerArtifact.abi,
        provider,
      ) as TTransactionManager;
      this.chainConfig[parseInt(chainId)] = {
        transactionManager,
        listener: new TransactionManagerListener(
          transactionManager,
          parseInt(chainId),
          logger.child({ module: "TransactionManagerListener", chainId }),
        ),
        provider,
      };
    });
  }

  getTransactionManagerAddress(chainId: number): string {
    return this.chainConfig[chainId].transactionManager.address;
  }

  prepare(
    chainId: number,
    prepareParams: PrepareParams,
  ): ResultAsync<providers.TransactionResponse, TransactionManagerError> {
    const method = "Contract::prepare";
    const methodId = hId();

    this.logger.info({ method, methodId, prepareParams }, "Method start");

    const txManager = this.chainConfig[chainId]?.transactionManager;
    if (!txManager) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.NoTransactionManagerAddress, chainId, {
          methodId,
          method,
        }),
      );
    }

    const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

    return ResultAsync.fromPromise(
      txManager
        .connect(this.signer.provider ? this.signer : this.signer.connect(this.chainConfig[chainId].provider))
        .prepare(
          {
            user: txData.user,
            router: txData.router,
            sendingAssetId: txData.sendingAssetId,
            receivingAssetId: txData.receivingAssetId,
            sendingChainFallback: txData.sendingChainFallback,
            callTo: txData.callTo,
            receivingAddress: txData.receivingAddress,
            sendingChainId: txData.sendingChainId,
            receivingChainId: txData.receivingChainId,
            callDataHash: txData.callDataHash,
            transactionId: txData.transactionId,
          },
          amount,
          expiry,
          encryptedCallData,
          encodedBid,
          bidSignature,
          { value: constants.Zero, from: this.signer.getAddress() },
        ),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, chainId, {
          method,
          methodId,
          txError: jsonifyError(err as NxtpError),
        }),
    ).andThen((tx) => {
      this.logger.info({ txHash: tx.hash, method, methodId }, "Prepare transaction submitted");
      return okAsync(tx);
    });
  }

  cancel(
    chainId: number,
    cancelParams: CancelParams,
  ): ResultAsync<providers.TransactionResponse, TransactionManagerError> {
    const method = "Contract::cancel";
    const methodId = hId();

    this.logger.info({ method, methodId, cancelParams }, "Method start");

    const txManager = this.chainConfig[chainId]?.transactionManager;
    if (!txManager) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.NoTransactionManagerAddress, chainId, {
          methodId,
          method,
        }),
      );
    }

    const { txData, relayerFee, signature } = cancelParams;
    return ResultAsync.fromPromise(
      txManager
        .connect(this.signer.provider ? this.signer : this.signer.connect(this.chainConfig[chainId].provider))
        .cancel(txData, relayerFee, signature, { from: this.signer.getAddress() }),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, chainId, {
          method,
          methodId,
          txError: jsonifyError(err as NxtpError),
        }),
    ).andThen((tx) => {
      this.logger.info({ txHash: tx.hash, method, methodId }, "Cancel transaction submitted");
      return okAsync(tx);
    });
  }

  fulfill(
    chainId: number,
    fulfillParams: FulfillParams,
  ): ResultAsync<providers.TransactionResponse, TransactionManagerError> {
    const method = "Contract::fulfill";
    const methodId = hId();

    this.logger.info({ method, methodId, fulfillParams }, "Method start");

    const txManager = this.chainConfig[chainId]?.transactionManager;
    if (!txManager) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.NoTransactionManagerAddress, chainId, {
          methodId,
          method,
        }),
      );
    }

    const { txData, relayerFee, signature, callData } = fulfillParams;
    return ResultAsync.fromPromise(
      txManager
        .connect(this.signer.provider ? this.signer : this.signer.connect(this.chainConfig[chainId].provider))
        .fulfill(txData, relayerFee, signature, callData, {
          from: this.signer.getAddress(),
        }),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, chainId, {
          method,
          methodId,
          txError: jsonifyError(err as NxtpError),
        }),
    ).andThen((tx) => {
      this.logger.info({ txHash: tx.hash, method, methodId }, "Fulfill transaction submitted");
      return okAsync(tx);
    });
  }

  approveTokensIfNeeded(
    chainId: number,
    assetId: string,
    amount: string,
    infiniteApprove = false,
  ): ResultAsync<providers.TransactionResponse | undefined, TransactionManagerError> {
    const method = "Contract::approveTokensIfNeeded";
    const methodId = hId();

    this.logger.info({ method, methodId, chainId, assetId, amount }, "Method start");

    const config = this.chainConfig[chainId];
    const txManager = this.chainConfig[chainId]?.transactionManager;
    if (!txManager) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.NoTransactionManagerAddress, chainId, {
          methodId,
          method,
        }),
      );
    }

    return ResultAsync.fromPromise(
      this.signer.getAddress(),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, chainId, {
          method,
          methodId,
          txError: jsonifyError(err as NxtpError),
        }),
    ).andThen((signerAddress) => {
      const erc20 = new Contract(
        assetId,
        ERC20.abi,
        this.signer.provider ? this.signer : this.signer.connect(config.provider),
      ) as IERC20Minimal;

      return ResultAsync.fromPromise(
        erc20.allowance(signerAddress, txManager.address),
        (err) =>
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, chainId, {
            method,
            methodId,
            txError: jsonifyError(err as NxtpError),
          }),
      ).andThen((approved) => {
        this.logger.info({ method, methodId, approved: approved.toString() }, "Got approved tokens");
        if (approved.lt(amount)) {
          return ResultAsync.fromPromise(
            erc20.approve(txManager.address, infiniteApprove ? constants.MaxUint256 : amount),
            (err) =>
              new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, chainId, {
                method,
                methodId,
                txError: jsonifyError(err as NxtpError),
              }),
          );
        } else {
          this.logger.info({ method, methodId, approved: approved.toString(), amount }, "Allowance sufficient");
          return okAsync(undefined);
        }
      });
    });
  }

  public establishListeners(): void {
    Object.values(this.chainConfig).forEach(({ listener }) => {
      listener.establishListeners();
    });
  }

  public removeAllListeners(event?: TransactionManagerEvent): void {
    Object.entries(this.chainConfig).forEach(([c, { listener }]) => {
      const chainId = parseInt(c);
      listener.removeAllListeners(event);
      this.detach(chainId, event);
    });
  }

  getLiquidity(chainId: number, router: string, assetId: string): ResultAsync<BigNumber, TransactionManagerError> {
    const method = "Contract::getLiquidity";
    const methodId = hId();

    const txManager = this.chainConfig[chainId]?.transactionManager;
    if (!txManager) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.NoTransactionManagerAddress, chainId, {
          methodId,
          method,
        }),
      );
    }

    return ResultAsync.fromPromise(
      txManager.routerBalances(router, assetId),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, chainId, {
          method,
          methodId,
          txError: jsonifyError(err as NxtpError),
        }),
    );
  }

  public attach<T extends TransactionManagerEvent>(
    chainId: number,
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    return this.chainConfig[chainId].listener.attach(event, callback, filter, timeout);
  }

  public attachOnce<T extends TransactionManagerEvent>(
    chainId: number,
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    return this.chainConfig[chainId].listener.attach(event, callback, filter, timeout);
  }

  public detach<T extends TransactionManagerEvent>(chainId: number, event?: T): void {
    return this.chainConfig[chainId].listener.detach(event);
  }

  public waitFor<T extends TransactionManagerEvent>(
    chainId: number,
    event: T,
    timeout: number,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
  ): Promise<TransactionManagerEventPayloads[T]> {
    return this.chainConfig[chainId].listener.waitFor(event, timeout, filter);
  }
}
