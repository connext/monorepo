import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";
import { TransactionService } from "@connext/nxtp-txservice";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { Interface } from "ethers/lib/utils";
import { BigNumber, constants, providers } from "ethers";
import {
  jsonifyError,
  FulfillParams,
  PrepareParams,
  CancelParams,
  NxtpError,
  Values,
  NxtpErrorJson,
} from "@connext/nxtp-utils";
import hyperid from "hyperid";
import { BaseLogger } from "pino";
import { errAsync, ResultAsync } from "neverthrow";

import { getConfig, NxtpRouterConfig } from "./config";

const hId = hyperid();

export class TransactionManagerError extends NxtpError {
  static readonly type = "TransactionManagerError";
  static readonly reasons = {
    EncodingError: "Error encoding data",
    TxServiceError: "Error from TransactionService",
    ConfigError: "Configuration error",
  };

  constructor(
    public readonly message: Values<typeof TransactionManagerError.reasons> | string,
    public readonly context: {
      chainId: number;
      txServiceError?: NxtpErrorJson;
      encodingError?: NxtpErrorJson;
      configError?: string;
      methodId: string;
      method: string;
    },
  ) {
    super(message, context, TransactionManagerError.type);
  }
}

export class TransactionManager {
  private readonly txManagerInterface: TTransactionManager["interface"];
  private readonly config: NxtpRouterConfig;

  constructor(
    private readonly txService: TransactionService,
    private readonly signerAddress: string,
    private readonly logger: BaseLogger,
    config?: NxtpRouterConfig,
  ) {
    this.txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
    this.config = config ?? getConfig();
  }

  prepare(
    chainId: number,
    prepareParams: PrepareParams,
  ): ResultAsync<providers.TransactionReceipt, TransactionManagerError> {
    const method = "Contract::prepare ";
    const methodId = hId();
    this.logger.info({ method, methodId, prepareParams }, "Method start");

    const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

    const nxtpContractAddress = this.config.chainConfig[chainId].transactionManagerAddress;
    if (!nxtpContractAddress) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          chainId,
          configError: "No contract exists for chain",
          methodId,
          method,
        }),
      );
    }

    let encodedData: string;
    try {
      encodedData = this.txManagerInterface.encodeFunctionData("prepare", [
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
      ]);
    } catch (err) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          chainId,
          encodingError: jsonifyError(err),
          method,
          methodId,
        }),
      );
    }

    return ResultAsync.fromPromise(
      this.txService.sendTx(chainId, {
        to: nxtpContractAddress,
        data: encodedData,
        value: constants.Zero,
        chainId,
        from: this.signerAddress,
      }),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
          chainId,
          txServiceError: jsonifyError(err as NxtpError),
          methodId,
          method,
        }),
    );
  }

  fulfill(
    chainId: number,
    fulfillParams: FulfillParams,
  ): ResultAsync<providers.TransactionReceipt, TransactionManagerError> {
    const method = "Contract::fulfill";
    const methodId = hId();
    this.logger.info({ method, methodId, fulfillParams }, "Method start");

    const nxtpContractAddress = this.config.chainConfig[chainId].transactionManagerAddress;
    if (!nxtpContractAddress) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          chainId,
          configError: "No contract exists for chain",
          methodId,
          method,
        }),
      );
    }

    const { txData, relayerFee, signature, callData } = fulfillParams;
    let fulfillData;
    try {
      fulfillData = this.txManagerInterface.encodeFunctionData("fulfill", [txData, relayerFee, signature, callData]);
    } catch (err) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          chainId,
          encodingError: jsonifyError(err),
          methodId,
          method,
        }),
      );
    }

    return ResultAsync.fromPromise(
      this.txService.sendTx(chainId, {
        chainId,
        data: fulfillData,
        to: nxtpContractAddress,
        value: 0,
        from: this.signerAddress,
      }),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
          chainId,
          txServiceError: jsonifyError(err as NxtpError),
          methodId,
          method,
        }),
    );
  }

  cancel(
    chainId: number,
    cancelParams: CancelParams,
  ): ResultAsync<providers.TransactionReceipt, TransactionManagerError> {
    const method = "Contract::cancel";
    const methodId = hId();
    this.logger.info({ method, methodId, cancelParams }, "Method start");
    // encode and call tx service

    const { txData, relayerFee, signature } = cancelParams;

    const nxtpContractAddress = this.config.chainConfig[chainId].transactionManagerAddress;
    if (!nxtpContractAddress) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          chainId,
          configError: "No contract exists for chain",
          methodId,
          method,
        }),
      );
    }

    let cancelData;
    try {
      cancelData = this.txManagerInterface.encodeFunctionData("cancel", [txData, relayerFee, signature]);
    } catch (err) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          chainId,
          encodingError: jsonifyError(err),
          methodId,
          method,
        }),
      );
    }

    return ResultAsync.fromPromise(
      this.txService.sendTx(chainId, {
        chainId,
        data: cancelData,
        to: this.config.chainConfig[chainId].transactionManagerAddress,
        value: 0,
        from: this.signerAddress,
      }),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
          chainId,
          txServiceError: jsonifyError(err as NxtpError),
          methodId,
          method,
        }),
    );
  }

  removeLiquidity(
    chainId: number,
    amount: string,
    assetId: string,
    recipientAddress: string | undefined,
  ): ResultAsync<providers.TransactionReceipt, TransactionManagerError> {
    const method = "Contract::removeLiquidity";
    const methodId = hId();
    this.logger.info({ method, methodId, amount, assetId, recipientAddress }, "Method start");

    //should we remove liquidity for self if there isn't another address specified?
    if (!recipientAddress) {
      recipientAddress = this.signerAddress;
    }

    const nxtpContractAddress = this.config.chainConfig[chainId].transactionManagerAddress;
    if (!nxtpContractAddress) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          chainId,
          configError: "No contract exists for chain",
          methodId,
          method,
        }),
      );
    }

    let removeLiquidityData;
    try {
      removeLiquidityData = this.txManagerInterface.encodeFunctionData("removeLiquidity", [
        amount,
        assetId,
        recipientAddress,
      ]);
    } catch (err) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          encodingError: jsonifyError(err),
          chainId,
          methodId,
          method,
        }),
      );
    }

    return ResultAsync.fromPromise(
      this.txService.sendTx(chainId, {
        chainId,
        data: removeLiquidityData,
        to: nxtpContractAddress,
        value: 0,
      }),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
          txServiceError: jsonifyError(err as NxtpError),
          chainId,
          methodId,
          method,
        }),
    );
  }

  getRouterBalance(chainId: number, assetId: string): ResultAsync<BigNumber, TransactionManagerError> {
    const method = "Contract::removeLiquidity";
    const methodId = hId();
    this.logger.info({ method, methodId, chainId, assetId }, "Method start");

    const nxtpContractAddress = this.config.chainConfig[chainId].transactionManagerAddress;
    if (!nxtpContractAddress) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          chainId,
          configError: "No contract exists for chain",
          methodId,
          method,
        }),
      );
    }

    let issuedSharesData;
    try {
      issuedSharesData = this.txManagerInterface.encodeFunctionData("getRouterBalance", [this.signerAddress, assetId]);
    } catch (err) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          chainId,
          encodingError: jsonifyError(err),
          methodId,
          method,
        }),
      );
    }

    return ResultAsync.fromPromise(
      this.txService.readTx(chainId, {
        chainId,
        data: issuedSharesData,
        to: nxtpContractAddress,
        value: 0,
      }),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
          chainId,
          txServiceError: jsonifyError(err as NxtpError),
          methodId,
          method,
        }),
    ).map((encodedData) => {
      const decoded = this.txManagerInterface.decodeFunctionResult("getRouterBalance", encodedData);
      console.log("decoded: ", decoded);
      return BigNumber.from(decoded[0]);
    });
  }
}
