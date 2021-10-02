import { BigNumber, Contract, providers, Signer } from "ethers";
import {
  PrepareParams,
  CancelParams,
  FulfillParams,
  isNode,
  Logger,
  RequestContext,
  createLoggingContext,
} from "@connext/nxtp-utils";
import { parseError } from "@connext/nxtp-txservice";
import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";

import { ChainNotConfigured } from "../error";

import { TransactionManagerBase } from "./transactionManagerBase";
const HARDCODED_GAS_LIMIT = BigNumber.from(125_000);

/**
 * @classdesc Multi-chain wrapper around TranasctionManager contract interactions
 */
export class TransactionManager {
  private chainConfig: {
    [chainId: number]: {
      provider: providers.FallbackProvider;
      transactionManager: TTransactionManager;
    };
  };

  private txManagerBase: TransactionManagerBase;

  constructor(
    private readonly signer: Signer,
    _chainConfig: {
      [chainId: number]: {
        provider: providers.FallbackProvider;
        transactionManagerAddress: string;
      };
    },
    private readonly logger: Logger,
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
        provider,
      };
    });
    this.txManagerBase = new TransactionManagerBase(
      _chainConfig,
      this.signer.getAddress(),
      this.logger.child({ name: "TransactionManagerBase" }),
    );
  }

  /**
   * Returns a connected signer. This is necessary because the browser-injected signer will not allow a provider to be connected.
   *
   * @param provider - The provider to connect if not a browser
   * @returns The connected signer
   */
  getConnectedSigner(provider: providers.FallbackProvider): Signer {
    if (isNode()) {
      return this.signer.connect(provider);
    }
    return this.signer;
  }

  /**
   * Sends the prepare transaction to the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain you want to prepare the transaction on (transactionData.sendingChainId)
   * @param prepareParams - The arguments to be submitted to chain
   * @param prepareParams.txData - The `InvariantTransactionData` for the transaction being prepared
   * @param prepareParams.amount - The amount to be sent from the signer to the `Transactionmanager`
   * @param prepareParams.expiry - The timestamp the transaction will expire by
   * @param prepareParams.encryptedCallData - The encrypted calldata to be executed on the receiving chain
   * @param prepareParams.encodedBid - The encoded auction bid
   * @param prepareParams.bidSignature - The signature on the winning bid
   * @returns If successful, returns the `TransactionResponse` from the signer once the transaction has been submitted, not mined. If the function errors, will return a TransacionManagerError
   */
  async prepare(
    chainId: number,
    prepareParams: PrepareParams,
    _requestContext?: RequestContext<string>,
  ): Promise<providers.TransactionResponse> {
    const { requestContext, methodContext } = createLoggingContext(
      "TransactionManager.prepare",
      _requestContext,
      prepareParams.txData.transactionId,
    );

    this.logger.info("Method start", requestContext, methodContext, { chainId, prepareParams });

    const { transactionManager, provider } = this.chainConfig[chainId] ?? {};
    if (!transactionManager || !provider) {
      throw new ChainNotConfigured(chainId, Object.keys(this.chainConfig));
    }

    const signer = this.getConnectedSigner(provider);

    const minTx = await this.txManagerBase.prepare(chainId, prepareParams, _requestContext);

    // estimate gas
    let gasLimit;
    try {
      if (chainId === 100) {
        gasLimit = HARDCODED_GAS_LIMIT;
      } else {
        gasLimit = await signer.estimateGas(minTx);
      }
    } catch (e) {
      const sanitized = parseError(e);
      throw sanitized;
    }

    const tx = await signer.sendTransaction({ ...minTx, from: this.signer.getAddress(), gasLimit: gasLimit.mul(2) });
    this.logger.info("Prepare transaction submitted", requestContext, methodContext, {
      txHash: tx.hash,
    });
    return tx;
  }

  /**
   * Sends the cancel transaction to the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain you want to cancel the transaction
   * @param cancelParams - The arguments to submit to chain
   * @param cancelParams.txData - The `TransactionData` (variant and invariant data) for the transaction being cancelled
   * @param cancelParams.relayerFee - The amount to be awarded to relayer for submitting the transaction to the `TransactionManager` (respected IFF on the sending chain and post-expiry)
   * @param cancelParams.signature - User's signature on cancel payload to be used by relayer when submitting transaction
   * @returns If successful, returns `TransactionResponse` from the signer once the transaction has been submitted, not mined. If it errors, returns a `TransactionManagerError`
   *
   * @remarks
   * Can be the sender chain if the transfer has expired, or the receiver chain before the expiry
   */
  async cancel(
    chainId: number,
    cancelParams: CancelParams,
    _requestContext?: RequestContext<string>,
  ): Promise<providers.TransactionResponse> {
    const { requestContext, methodContext } = createLoggingContext(
      "TransactionManager.cancel",
      _requestContext,
      cancelParams.txData.transactionId,
    );

    this.logger.info("Method start", requestContext, methodContext, { cancelParams });

    const { transactionManager, provider } = this.chainConfig[chainId] ?? {};
    if (!transactionManager || !provider) {
      throw new ChainNotConfigured(chainId, Object.keys(this.chainConfig));
    }

    const signer = this.getConnectedSigner(provider);

    const minTx = await this.txManagerBase.cancel(chainId, cancelParams, _requestContext);

    // estimate gas
    let gasLimit;
    try {
      if (chainId === 100) {
        gasLimit = HARDCODED_GAS_LIMIT;
      } else {
        gasLimit = await signer.estimateGas(minTx);
      }
    } catch (e) {
      const sanitized = parseError(e);
      throw sanitized;
    }

    const tx = await signer.sendTransaction({ ...minTx, from: this.signer.getAddress(), gasLimit: gasLimit.mul(2) });

    this.logger.info("Cancel transaction submitted", requestContext, methodContext, {
      txHash: tx.hash,
    });
    return tx;
  }

  /**
   * Sends the fulfill transaction to the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain you want to fulfill the transaction on (transactionData.receivingChainId)
   * @param fulfillParams - The arguments to submit to chain
   * @param fulfillParams.txData - The `TransactionData` (variant and invariant data) for the transaction being fulfilled
   * @param fulfillParams.relayerFee - The amount to be awarded to relayer for submitting the transaction to the `TransactionManager`
   * @param fulfillParams.signature - User's signature on fulfill payload to be used by relayer when submitting transaction
   * @param fulfillParams.callData - The unencrypted call data corresponding to the `transactionData.callDataHash`
   *
   * @returns If successful, returns `TransactionResponse` from the signer once the transaction has been submitted, not mined. If it errors, returns a `TransactionManagerError`
   *
   * @remarks
   * User cannot be assumed to have gas on the receiving chain, so may use a relayer rather than submit the transaction themselves.
   */
  async fulfill(
    chainId: number,
    fulfillParams: FulfillParams,
    _requestContext?: RequestContext<string>,
  ): Promise<providers.TransactionResponse> {
    const { requestContext, methodContext } = createLoggingContext(
      "TransactionManager.fulfill",
      _requestContext,
      fulfillParams.txData.transactionId,
    );

    this.logger.info("Method start", requestContext, methodContext, { fulfillParams });

    const { transactionManager, provider } = this.chainConfig[chainId] ?? {};
    if (!transactionManager || !provider) {
      throw new ChainNotConfigured(chainId, Object.keys(this.chainConfig));
    }

    const signer = this.getConnectedSigner(provider);

    const minTx = await this.txManagerBase.fulfill(chainId, fulfillParams, _requestContext);

    // estimate gas
    let gasLimit;
    try {
      if (chainId === 100) {
        gasLimit = HARDCODED_GAS_LIMIT;
      } else {
        gasLimit = await signer.estimateGas({ ...minTx, from: this.signer.getAddress() });
      }
    } catch (e) {
      const sanitized = parseError(e);
      throw sanitized;
    }

    const tx = await signer.sendTransaction({ ...minTx, from: this.signer.getAddress(), gasLimit: gasLimit.mul(2) });

    this.logger.info("Fulfill transaction submitted", requestContext, methodContext, { txHash: tx.hash });
    return tx;
  }

  /**
   * Approves tokens with the given assetId for the TransactionManager on the specified chainId to spend if the current allowance is below the specified amount threshold
   *
   * @param chainId - The chain you want to increase `TransactionManager` allowance on
   * @param assetId - The asset you want to increase allowance for
   * @param amount - The minimum approval amount
   * @param infiniteApprove - (optional) If true, approves the max value. Defaults to false.
   *
   * @returns If successful, either returns `TransactionResponse` from the signer once the transaction has been submitted, not mined if the allowance was increased, or undefined if the allowance >= amount. If it errors, returns a `TransactionManagerError`.
   */
  async approveTokensIfNeeded(
    chainId: number,
    assetId: string,
    amount: string,
    infiniteApprove = false,
    _requestContext?: RequestContext,
  ): Promise<providers.TransactionResponse | undefined> {
    const { requestContext, methodContext } = createLoggingContext(
      "TransactionManager.approveTokensIfNeeded",
      _requestContext,
    );

    this.logger.info("Method start", requestContext, methodContext, { chainId, assetId, amount });

    const { transactionManager, provider } = this.chainConfig[chainId] ?? {};
    if (!transactionManager || !provider) {
      throw new ChainNotConfigured(chainId, Object.keys(this.chainConfig));
    }

    const signer = this.getConnectedSigner(provider);

    const minTx = await this.txManagerBase.approveTokensIfNeeded(
      chainId,
      assetId,
      amount,
      infiniteApprove,
      _requestContext,
    );

    if (!minTx) {
      return undefined;
    }

    // estimate gas
    let gasLimit;
    try {
      if (chainId === 100) {
        gasLimit = HARDCODED_GAS_LIMIT;
      } else {
        gasLimit = await signer.estimateGas(minTx);
      }
    } catch (e) {
      const sanitized = parseError(e);
      throw sanitized;
    }

    const tx = await signer.sendTransaction({ ...minTx, from: this.signer.getAddress(), gasLimit: gasLimit.mul(2) });

    this.logger.info("Approve transaction submitted", requestContext, methodContext, { txHash: tx.hash });
    return tx;
  }

  /**
   * Returns the available liquidity for the given router of the given asset on the `TransactionManager` contract for the specified chain.
   *
   * @param chainId - The chain you want to check liquidity on
   * @param router - The router you want to check the liquidity of
   * @param assetId - The asset you want to check the liquidity of
   * @returns Either the BigNumber representation of the available router liquidity in the provided asset, or a TransactionManagerError if the function failed
   */
  async getRouterLiquidity(chainId: number, router: string, assetId: string): Promise<BigNumber> {
    return await this.txManagerBase.getRouterLiquidity(chainId, router, assetId);
  }
}
