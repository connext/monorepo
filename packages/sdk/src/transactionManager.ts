import { BigNumber, constants, Contract, providers, Signer } from "ethers";
import { BaseLogger } from "pino";
import { PrepareParams, CancelParams, FulfillParams, getUuid } from "@connext/nxtp-utils";
import { TransactionManager as TTransactionManager, IERC20Minimal } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import ERC20 from "@connext/nxtp-contracts/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";

import { ChainNotSupported } from "./error";

/**
 * Returns the address of the `TransactionManager` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
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
 * @classdesc Multi-chain wrapper around TranasctionManager contract interactions
 */
export class TransactionManager {
  private chainConfig: {
    [chainId: number]: {
      provider: providers.FallbackProvider;
      transactionManager: TTransactionManager;
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
        provider,
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
  async prepare(chainId: number, prepareParams: PrepareParams): Promise<providers.TransactionResponse> {
    const method = "Contract::prepare";
    const methodId = getUuid();

    this.logger.info({ method, methodId, prepareParams }, "Method start");

    const { transactionManager, provider } = this.chainConfig[chainId] ?? {};
    if (!transactionManager) {
      new ChainNotSupported(method, methodId, chainId, {
        transactionId: prepareParams?.txData?.transactionId ?? "",
      });
    }

    if (!provider) {
      new ChainNotSupported(method, methodId, chainId, {
        transactionId: prepareParams?.txData?.transactionId ?? "",
      });
    }

    const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

    const tx = await transactionManager.connect(this.signer.connect(provider)).prepare(
      {
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
      },
      amount,
      expiry,
      encryptedCallData,
      encodedBid,
      bidSignature,
      {
        value: txData.sendingAssetId === constants.AddressZero ? BigNumber.from(amount) : constants.Zero,
        from: await this.signer.getAddress(),
      },
    );
    this.logger.info({ txHash: tx.hash, method, methodId }, "Prepare transaction submitted");
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
  async cancel(chainId: number, cancelParams: CancelParams): Promise<providers.TransactionResponse> {
    const method = "Contract::cancel";
    const methodId = getUuid();

    this.logger.info({ method, methodId, cancelParams }, "Method start");

    const { transactionManager, provider } = this.chainConfig[chainId] ?? {};
    if (!transactionManager) {
      throw new ChainNotSupported(method, methodId, chainId, {
        transactionId: cancelParams?.txData?.transactionId ?? "",
      });
    }

    if (!provider) {
      throw new ChainNotSupported(method, methodId, chainId, {
        transactionId: cancelParams?.txData?.transactionId ?? "",
      });
    }

    const { txData, signature } = cancelParams;
    const tx = await transactionManager
      .connect(this.signer.connect(provider))
      .cancel(txData, signature, { from: this.signer.getAddress() });

    this.logger.info({ txHash: tx.hash, method, methodId }, "Cancel transaction submitted");
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
  async fulfill(chainId: number, fulfillParams: FulfillParams): Promise<providers.TransactionResponse> {
    const method = "Contract::fulfill";
    const methodId = getUuid();

    this.logger.info({ method, methodId, fulfillParams }, "Method start");

    const { transactionManager, provider } = this.chainConfig[chainId] ?? {};
    if (!transactionManager) {
      new ChainNotSupported(method, methodId, chainId, {
        transactionId: fulfillParams?.txData?.transactionId ?? "",
      });
    }

    if (!provider) {
      new ChainNotSupported(method, methodId, chainId, {
        transactionId: fulfillParams?.txData?.transactionId ?? "",
      });
    }

    const { txData, relayerFee, signature, callData } = fulfillParams;
    const tx = await transactionManager
      .connect(this.signer.connect(provider))
      .fulfill(txData, relayerFee, signature, callData, {
        from: this.signer.getAddress(),
      });

    this.logger.info({ txHash: tx.hash, method, methodId }, "Fulfill transaction submitted");
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
  ): Promise<providers.TransactionResponse | undefined> {
    const method = "Contract::approveTokensIfNeeded";
    const methodId = getUuid();

    this.logger.info({ method, methodId, chainId, assetId, amount }, "Method start");

    const { transactionManager, provider } = this.chainConfig[chainId] ?? {};
    if (!transactionManager) {
      throw new ChainNotSupported(method, methodId, chainId, {
        assetId,
        amount,
      });
    }

    if (!provider) {
      new ChainNotSupported(method, methodId, chainId, {
        assetId,
        amount,
      });
    }

    const signerAddress = await this.signer.getAddress();
    const erc20 = new Contract(assetId, ERC20.abi, this.signer.connect(provider)) as IERC20Minimal;

    const approved = await erc20.allowance(signerAddress, transactionManager.address);
    this.logger.info({ method, methodId, approved: approved.toString() }, "Got approved tokens");
    if (approved.lt(amount)) {
      const tx = await erc20.approve(transactionManager.address, infiniteApprove ? constants.MaxUint256 : amount);
      this.logger.info({ txHash: tx.hash, method, methodId }, "Approve transaction submitted");
      return tx;
    } else {
      this.logger.info({ method, methodId, approved: approved.toString(), amount }, "Allowance sufficient");
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
    const method = "Contract::getLiquidity";
    const methodId = getUuid();

    const txManager = this.chainConfig[chainId]?.transactionManager;
    if (!txManager) {
      throw new ChainNotSupported(method, methodId, chainId, {
        assetId,
        router,
      });
    }

    return await txManager.routerBalances(router, assetId);
  }
}
