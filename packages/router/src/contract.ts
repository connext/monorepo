import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";
import { TransactionService } from "@connext/nxtp-txservice";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { Interface } from "ethers/lib/utils";
import { constants, providers, Wallet } from "ethers";
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

/**
 * @classdesc Defines the error thrown by the `TransactionManager` class
 */
export class TransactionManagerError extends NxtpError {
  static readonly type = "TransactionManagerError";
  static readonly reasons = {
    EncodingError: "Error encoding data",
    TxServiceError: "Error from TransactionService",
  };

  constructor(
    public readonly message: Values<typeof TransactionManagerError.reasons> | string,
    public readonly context: {
      txServiceError?: NxtpErrorJson;
      encodingError?: NxtpErrorJson;
      methodId: string;
      method: string;
    },
  ) {
    super(message, context, TransactionManagerError.type);
  }
}

/**
 * @classdesc Handles any onchain interactions with the `TransactionManager` contracts, including transaction submissions and chain reads.
 */
export class TransactionManager {
  private readonly txManagerInterface: TTransactionManager["interface"];
  private readonly config: NxtpRouterConfig;
  private readonly wallet: Wallet;

  constructor(
    private readonly txService: TransactionService,
    private readonly signerAddress: string,
    private readonly logger: BaseLogger,
  ) {
    this.txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
    this.config = getConfig();
    this.wallet = Wallet.fromMnemonic(this.config.mnemonic);
  }

  getProvider(chainId: number): providers.FallbackProvider {
    return new providers.FallbackProvider(
      this.config.chainConfig[chainId].providers.map((url) => new providers.JsonRpcProvider(url, chainId)),
    );
  }

  /**
   * Method calls `prepare` on the `TransactionManager` on the given chain. Should be used to `prepare` the receiver-side transaction. Resolves when the transaction has been mined.
   *
   * @param chainId - The chain you are preparing a transaction on
   * @param prepareParams - Arguments to supply to contract
   * @param prepareParams.txData - The `InvariantTransactionData` for the transaction being prepared
   * @param prepareParams.amount - The amount to be deducted from the liquidity held by the router on the TransactionManager
   * @param prepareParams.expiry - The timestamp the transaction will expire by
   * @param prepareParams.encryptedCallData - The user-encrypted calldata to be executed on the receiving chain
   * @param prepareParams.encodedBid - The encoded auction bid
   * @param prepareParams.bidSignature - The signature on the winning bid
   *
   * @returns If successful, returns `TransactionReceipt` from the prepare transaction sent to the `TransactionManager.sol`. If it fails, returns a `TransactionManagerError`
   *
   */
  prepare(
    chainId: number,
    prepareParams: PrepareParams,
  ): ResultAsync<providers.TransactionReceipt, TransactionManagerError> {
    const method = "Contract::prepare ";
    const methodId = hId();
    this.logger.info({ method, methodId, prepareParams }, "Method start");

    const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

    const provider = this.getProvider(chainId);

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
          encodingError: jsonifyError(err),
          method,
          methodId,
        }),
      );
    }

    return ResultAsync.fromPromise(
      // this.txService.sendTx(chainId, {
      //   to: this.config.chainConfig[chainId].transactionManagerAddress,
      //   data: encodedData,
      //   value: constants.Zero,
      //   chainId,
      //   from: this.signerAddress,
      // }),
      new Promise(async (res) => {
        const response = await this.wallet.connect(provider).sendTransaction({
          to: this.config.chainConfig[chainId].transactionManagerAddress,
          data: encodedData,
          value: constants.Zero,
          from: this.signerAddress,
        });
        this.logger.info({ method, methodId, response }, "Tx submitted");
        const receipt = await response.wait();
        this.logger.info({ method, methodId, txHash: receipt.transactionHash }, "Tx mined");
        res(receipt);
      }),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
          txServiceError: jsonifyError(err as NxtpError),
          methodId,
          method,
        }),
    );
  }

  /**
   * Calls `fulfill` on the `TransactionManager` on the given chain. Can be used to submit the routers own fulfill transaction (on the sending chain), or to submit fulfill transactions where the router is acting as a relayer.
   *
   * @param chainId - The chain you are fulfilling a transaction on
   * @param fulfillParams - The arguments to submit to chain
   * @param fulfillParams.txData - The `TransactionData` (invariant and variant) for the transaction you are fulfilling
   * @param fulfillParams.relayerFee - The `relayerFee` for the transaction
   * @param fulfillParams.signature - The `txData.user`'s signature used to unlock the transaction
   * @param fulfillParams.callData - The unencrypted calldata that corresponds to the `txData.callDataHash`
   * @returns If successful, returns the `TransactionReceipt` from the fulfill transaction sent to the `TransactionManager.sol`. If it fails, returns a `TransactionManagerError`
   */
  fulfill(
    chainId: number,
    fulfillParams: FulfillParams,
  ): ResultAsync<providers.TransactionReceipt, TransactionManagerError> {
    const method = "Contract::fulfill";
    const methodId = hId();
    this.logger.info({ method, methodId, fulfillParams }, "Method start");

    const provider = this.getProvider(chainId);

    const { txData, relayerFee, signature, callData } = fulfillParams;
    let fulfillData: string;
    try {
      fulfillData = this.txManagerInterface.encodeFunctionData("fulfill", [txData, relayerFee, signature, callData]);
    } catch (err) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          encodingError: jsonifyError(err),
          methodId,
          method,
        }),
      );
    }

    return ResultAsync.fromPromise(
      // this.txService.sendTx(chainId, {
      //   chainId,
      //   data: fulfillData,
      //   to: this.config.chainConfig[chainId].transactionManagerAddress,
      //   value: 0,
      //   from: this.signerAddress,
      // }),
      new Promise(async (res) => {
        const response = await this.wallet.connect(provider).sendTransaction({
          to: this.config.chainConfig[chainId].transactionManagerAddress,
          data: fulfillData,
          value: constants.Zero,
          from: this.signerAddress,
        });
        this.logger.info({ method, methodId, response }, "Tx submitted");
        const receipt = await response.wait();
        this.logger.info({ method, methodId, txHash: receipt.transactionHash }, "Tx mined");
        res(receipt);
      }),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
          txServiceError: jsonifyError(err as NxtpError),
          methodId,
          method,
        }),
    );
  }

  /**
   * Calls `cancel` on the `TransactionManager` on the given chain. Can be used to submit the routers own cancellation or to relay a user's cancellation request.
   * @param chainId - The chain you are cancelling a transaction on
   * @param cancelParams - The arguments to submit to chain
   * @param cancelParams.txData - The `TransactionData` (invariant and variant) for the transaction you are cancelling
   * @param cancelParams.relayerFee - The relayer fee for the transaction
   * @param cancelParams.signature - The user signatures (if submitting as a relayer) on the relayerFee and transactionId
   * @returns If successful, returns the `TransactionReceipt` from the cancel transaction sent to the `TransactionManager.sol`. If it fails, returns a `TransactionManagerError`
   */
  cancel(
    chainId: number,
    cancelParams: CancelParams,
  ): ResultAsync<providers.TransactionReceipt, TransactionManagerError> {
    const method = "Contract::cancel";
    const methodId = hId();
    this.logger.info({ method, methodId, cancelParams }, "Method start");
    // encode and call tx service

    const provider = this.getProvider(chainId);

    const { txData, relayerFee, signature } = cancelParams;

    let cancelData: string;
    try {
      cancelData = this.txManagerInterface.encodeFunctionData("cancel", [txData, relayerFee, signature]);
    } catch (err) {
      return errAsync(
        new TransactionManagerError(TransactionManagerError.reasons.EncodingError, {
          encodingError: jsonifyError(err),
          methodId,
          method,
        }),
      );
    }

    return ResultAsync.fromPromise(
      // this.txService.sendTx(chainId, {
      //   chainId,
      //   data: cancelData,
      //   to: this.config.chainConfig[chainId].transactionManagerAddress,
      //   value: 0,
      //   from: this.signerAddress,
      // }),
      new Promise(async (res) => {
        const response = await this.wallet.connect(provider).sendTransaction({
          to: this.config.chainConfig[chainId].transactionManagerAddress,
          data: cancelData,
          value: constants.Zero,
          from: this.signerAddress,
        });
        this.logger.info({ method, methodId, response }, "Tx submitted");
        const receipt = await response.wait();
        this.logger.info({ method, methodId, txHash: receipt.transactionHash }, "Tx mined");
        res(receipt);
      }),
      (err) =>
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
          txServiceError: jsonifyError(err as NxtpError),
          methodId,
          method,
        }),
    );
  }

  /**
   * Removes liquidity from the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain to interact with
   * @param amount - The amount of liquidity you want to remove
   * @param assetId - The assetId (token address or address(0) for native asset) of the asset you'd like to remove liquidity from onchain.
   * @param recipientAddress - The address you'd like the funds to be sent to
   * @returns If successful, returns `TransactionReceipt` for the removeLiquidity transaction. If it fails, returns a `TransactionManagerError`
   */
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

    const nxtpContractAddress = getConfig().chainConfig[chainId].transactionManagerAddress;

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
          methodId,
          method,
        }),
    );
  }
}
