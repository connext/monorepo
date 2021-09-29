import { BigNumber, constants, Contract, providers, Signer } from "ethers";
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
import { TransactionManager as TTransactionManager, IERC20Minimal } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import ERC20 from "@connext/nxtp-contracts/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";

import { ChainNotConfigured } from "../error";
import { getDecimals, getTokenPrice } from "../utils";

/**
 * Returns the address of the `TransactionManager` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedTransactionManagerContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.TransactionManager;
  return { address: contract.address, abi: contract.abi };
};

/**
 * @classdesc Multi-chain wrapper around TranasctionManager contract interactions
 */
export class TransactionManager {
  private chainConfig: {
    [chainId: number]: {
      provider: providers.FallbackProvider;
      transactionManager: TTransactionManager;
      priceOracleAddress: string;
    };
  };

  constructor(
    private readonly signer: Signer,
    _chainConfig: {
      [chainId: number]: {
        provider: providers.FallbackProvider;
        transactionManagerAddress: string;
        priceOracleAddress: string;
      };
    },
    private readonly logger: Logger,
  ) {
    this.chainConfig = {};
    Object.entries(_chainConfig).forEach(([chainId, { provider, transactionManagerAddress, priceOracleAddress }]) => {
      const transactionManager = new Contract(
        transactionManagerAddress,
        TransactionManagerArtifact.abi,
        provider,
      ) as TTransactionManager;
      this.chainConfig[parseInt(chainId)] = {
        transactionManager,
        provider,
        priceOracleAddress,
      };
    });
  }

  /**
   * Returns the address of the `TransactionManager` deployed to the provided chain, or undefined if it has not been deployed
   *
   * @param chainId - The chain you want the address on
   * @returns The deployed address or `undefined` if it has not been deployed yet
   */
  getTransactionManagerAddress(chainId: number): string {
    return this.chainConfig[chainId].transactionManager.address;
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

    const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

    const signer = this.getConnectedSigner(provider);

    const invariant = {
      receivingChainTxManagerAddress: txData.receivingChainTxManagerAddress,
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
    };

    const connected = transactionManager.connect(signer);

    // estimate gas
    let gasLimit;
    try {
      gasLimit = await connected.estimateGas.prepare(
        invariant,
        amount,
        expiry,
        encryptedCallData,
        encodedBid,
        bidSignature,
      );
    } catch (e) {
      const sanitized = parseError(e);
      throw sanitized;
    }

    const tx = await connected.prepare(invariant, amount, expiry, encryptedCallData, encodedBid, bidSignature, {
      value: txData.sendingAssetId === constants.AddressZero ? BigNumber.from(amount) : constants.Zero,
      from: this.signer.getAddress(),
      gasLimit: gasLimit.mul(2),
    });
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

    const { txData, signature } = cancelParams;
    const signer = this.getConnectedSigner(provider);

    const connected = transactionManager.connect(signer);

    // estimate gas
    let gasLimit;
    try {
      gasLimit = await connected.estimateGas.cancel(txData, signature, {
        from: this.signer.getAddress(),
      });
    } catch (e) {
      const sanitized = parseError(e);
      throw sanitized;
    }

    const tx = await transactionManager
      .connect(signer)
      .cancel(txData, signature, { from: this.signer.getAddress(), gasLimit: gasLimit.mul(2) });

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

    const { txData, relayerFee, signature, callData } = fulfillParams;
    const signer = this.getConnectedSigner(provider);

    const connected = transactionManager.connect(signer);

    // estimate gas
    let gasLimit;
    try {
      gasLimit = await connected.estimateGas.fulfill(txData, relayerFee, signature, callData, {
        from: this.signer.getAddress(),
      });
    } catch (e) {
      const sanitized = parseError(e);
      throw sanitized;
    }

    const tx = await connected.fulfill(txData, relayerFee, signature, callData, {
      from: this.signer.getAddress(),
      gasLimit: gasLimit.mul(2),
    });

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

    const signerAddress = await this.signer.getAddress();
    const signer = this.getConnectedSigner(provider);
    const erc20 = new Contract(assetId, ERC20.abi, signer) as IERC20Minimal;

    const approved = await erc20.allowance(signerAddress, transactionManager.address);
    this.logger.info("Got approved tokens", requestContext, methodContext, { approved: approved.toString() });
    if (approved.lt(amount)) {
      // estimate gas
      let gasLimit;
      try {
        gasLimit = await erc20.estimateGas.approve(
          transactionManager.address,
          infiniteApprove ? constants.MaxUint256 : amount,
          {
            from: this.signer.getAddress(),
          },
        );
      } catch (e) {
        const sanitized = parseError(e);
        throw sanitized;
      }

      const tx = await erc20.approve(transactionManager.address, infiniteApprove ? constants.MaxUint256 : amount, {
        from: this.signer.getAddress(),
        gasLimit: gasLimit.mul(2),
      });
      this.logger.info("Approve transaction submitted", requestContext, methodContext, { txHash: tx.hash });
      return tx;
    } else {
      this.logger.info("Allowance sufficient", requestContext, methodContext, {
        approved: approved.toString(),
        amount,
      });
      return undefined;
    }
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
    const { transactionManager } = this.chainConfig[chainId] ?? {};
    if (!transactionManager) {
      throw new ChainNotConfigured(chainId, Object.keys(this.chainConfig));
    }

    return transactionManager.routerBalances(router, assetId);
  }

  /**
   * Calculates gas amount in receiving token
   *
   * @param chainId - The receiving chain you want to check gas price on
   * @param fulfillParams - The parameters for fulfill transactions
   */
  async calculateGasInTokenForFullfil(
    chainId: number,
    fulfillParams: FulfillParams,
    _requestContext?: RequestContext<string>,
  ): Promise<BigNumber> {
    const { requestContext, methodContext } = createLoggingContext(
      "TransactionManager.calculateGasInToken",
      _requestContext,
      fulfillParams.txData.transactionId,
    );

    const { transactionManager, provider } = this.chainConfig[chainId] ?? {};
    if (!transactionManager || !provider) {
      throw new ChainNotConfigured(chainId, Object.keys(this.chainConfig));
    }

    this.logger.info("Method start", requestContext, methodContext, { fulfillParams });
    const gasAmount = await this.calculateGasAmountForFulfill(chainId, fulfillParams);
    const { txData } = fulfillParams;

    const ethPriceInUsd = await getTokenPrice(
      this.chainConfig[chainId]?.priceOracleAddress,
      constants.AddressZero,
      provider,
    );

    const receivingTokenPriceInUsd = await getTokenPrice(
      this.chainConfig[chainId]?.priceOracleAddress,
      txData.receivingAssetId,
      provider,
    );

    const outputDecimals = await getDecimals(txData.receivingAssetId, provider);

    const tokenAmount = gasAmount
      .mul(ethPriceInUsd)
      .div(receivingTokenPriceInUsd)
      .div(BigNumber.from(10).pow(18 - outputDecimals));

    return tokenAmount;
  }

  /**
   * Calculates gas amount for fulfill tranactions
   *
   * @param chainId The network identifier
   * @param fulfillParams The params used for fulfill transactions
   */
  async calculateGasAmountForFulfill(chainId: number, fulfillParams: FulfillParams): Promise<BigNumber> {
    const { transactionManager, provider } = this.chainConfig[chainId] ?? {};
    if (!transactionManager || !provider) {
      throw new ChainNotConfigured(chainId, Object.keys(this.chainConfig));
    }

    const signer = this.getConnectedSigner(provider);
    const connected = transactionManager.connect(signer);
    const { txData, relayerFee, signature, callData } = fulfillParams;

    // get gas limit
    let gasLimit = BigNumber.from(0);
    try {
      gasLimit = await connected.estimateGas.fulfill(txData, relayerFee, signature, callData);
    } catch (e) {
      const sanitized = parseError(e);
      throw sanitized;
    }

    // get gas price
    let gasPrice = BigNumber.from(0);
    try {
      gasPrice = await provider.getGasPrice();
    } catch (e) {
      const sanitized = parseError(e);
      throw sanitized;
    }

    return gasLimit.mul(gasPrice);
  }
}
