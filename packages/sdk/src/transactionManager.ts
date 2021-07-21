import { TransactionManager as TTransactionManager, IERC20Minimal } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { BigNumber, constants, Contract, providers, Signer } from "ethers";
import { PrepareParams, CancelParams, FulfillParams } from "@connext/nxtp-utils";
import hyperid from "hyperid";
import { BaseLogger } from "pino";
import ERC20 from "@connext/nxtp-contracts/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";

import { TransactionManagerEvent, TransactionManagerEventPayloads, TransactionManagerListener } from "./listener";

const hId = hyperid();

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
   * @param prepareParams.txData - The `InvariantTransactionData` for the transaction being prepared
   * @param prepareParams.amount - The amount to be sent from the signer to the `Transactionmanager`
   * @param prepareParams.expiry - The timestamp the transaction will expire by
   * @param prepareParams.encryptedCallData - The encrypted calldata to be executed on the receiving chain
   * @param prepareParams.encodedBid - The encoded auction bid
   * @param prepareParams.bidSignature - The signature on the winning bid
   * @returns The `TransactionResponse` from the signer once the transaction has been submitted, not mined
   */
  async prepare(chainId: number, prepareParams: PrepareParams): Promise<providers.TransactionResponse> {
    const method = "Contract::prepare";
    const methodId = hId();

    this.logger.info({ method, methodId, prepareParams }, "Method start");

    const txManager = this.chainConfig[chainId].transactionManager;
    if (!txManager) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

    const txRes = await txManager
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
      );
    return txRes;
  }

  /**
   * Sends the cancel transaction to the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain you want to cancel the transaction
   * @param cancelParams.txData - The `TransactionData` (variant and invariant data) for the transaction being cancelled
   * @param cancelParams.relayerFee - The amount to be awarded to relayer for submitting the transaction to the `TransactionManager` (respected IFF on the sending chain and post-expiry)
   * @param cancelParams.signature - User's signature on cancel payload to be used by relayer when submitting transaction
   * @returns The `TransactionResponse` from the signer once the transaction has been submitted, not mined
   *
   * @remarks
   * Can be the sender chain if the transfer has expired, or the receiver chain before the expiry
   */
  async cancel(chainId: number, cancelParams: CancelParams): Promise<providers.TransactionResponse> {
    const method = "Contract::cancel";
    const methodId = hId();

    this.logger.info({ method, methodId, cancelParams }, "Method start");

    const txManager = this.chainConfig[chainId].transactionManager;
    if (!txManager) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const { txData, relayerFee, signature } = cancelParams;

    const txRes = await txManager
      .connect(this.signer.provider ? this.signer : this.signer.connect(this.chainConfig[chainId].provider))
      .cancel(txData, relayerFee, signature, { from: this.signer.getAddress() });
    return txRes;
  }

  /**
   * Sends the fulfill transaction to the `TransactionManager` on the provided chain.
   *
   * @param chainId - The chain you want to fulfill the transaction on (transactionData.receivingChainId)
   * @param fulfillParams.txData - The `TransactionData` (variant and invariant data) for the transaction being fulfilled
   * @param fulfillParams.relayerFee - The amount to be awarded to relayer for submitting the transaction to the `TransactionManager`
   * @param fulfillParams.signature - User's signature on fulfill payload to be used by relayer when submitting transaction
   * @param fulfillParams.callData - The unencrypted call data corresponding to the `transactionData.callDataHash`
   *
   * @returns The `TransactionResponse` from the signer once the transaction has been submitted, not mined
   *
   * @remarks
   * User cannot be assumed to have gas on the receiving chain, so may use a relayer rather than submit the transaction themselves.
   */
  async fulfill(chainId: number, fulfillParams: FulfillParams): Promise<providers.TransactionResponse> {
    const method = "Contract::fulfill";
    const methodId = hId();

    this.logger.info({ method, methodId, fulfillParams }, "Method start");

    const txManager = this.chainConfig[chainId].transactionManager;
    if (!txManager) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const { txData, relayerFee, signature, callData } = fulfillParams;

    const txRes = await txManager
      .connect(this.signer.provider ? this.signer : this.signer.connect(this.chainConfig[chainId].provider))
      .fulfill(txData, relayerFee, signature, callData, {
        from: this.signer.getAddress(),
      });
    return txRes;
  }

  /**
   * Approves tokens with the given assetId for the TransactionManager on the specified chainId to spend if the current allowance is below the specified amount threshold
   *
   * @param chainId - The chain you want to increase `TransactionManager` allowance on
   * @param assetId - The asset you want to increase allowance for
   * @param amount - The minimum approval amount
   * @param infiniteApprove - (optional) If true, approves the max value. Defaults to false.
   * @returns a TransactionResponse if an approval transaction was sent, or undefined if none was needed.
   */
  async approveTokensIfNeeded(
    chainId: number,
    assetId: string,
    amount: string,
    infiniteApprove = false,
  ): Promise<providers.TransactionResponse | undefined> {
    const method = "Contract::approveTokensIfNeeded";
    const methodId = hId();

    this.logger.info({ method, methodId, chainId, assetId, amount }, "Method start");

    const config = this.chainConfig[chainId];
    const txManager = config.transactionManager;
    const signerAddress = await this.signer.getAddress();
    if (!txManager) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    if (assetId === constants.AddressZero) {
      // TODO: return undeinf
      this.logger.info({ assetId, method, methodId }, "Cannot approve native asset");
      return undefined;
    }

    const erc20 = new Contract(
      assetId,
      ERC20.abi,
      this.signer.provider ? this.signer : this.signer.connect(config.provider),
    ) as IERC20Minimal;
    const approved = await erc20.allowance(signerAddress, txManager.address);
    this.logger.info({ method, methodId, approved: approved.toString() }, "Got approved tokens");
    if (approved.lt(amount)) {
      const approveTx = await erc20.approve(txManager.address, infiniteApprove ? constants.MaxUint256 : amount);
      this.logger.info({ method, methodId, transactionHash: approveTx.hash }, "Submitted approve tx");
      return approveTx;
    } else {
      this.logger.info({ method, methodId, approved: approved.toString(), amount }, "Allowance sufficient");
      return undefined;
    }
  }

  /**
   * Sets up the TransactionManager listeners for each chain
   */
  public establishListeners(): void {
    Object.values(this.chainConfig).forEach(({ listener }) => {
      listener.establishListeners();
    });
  }

  /**
   * Removes all listeners for given event on the TransactionManager across all chains.
   *
   * @param event - (optiona;) the event name you want to remove all listeners for. If not provided, removes all listeners on the contract for all events
   */
  public removeAllListeners(event?: TransactionManagerEvent): void {
    Object.entries(this.chainConfig).forEach(([c, { listener }]) => {
      const chainId = parseInt(c);
      listener.removeAllListeners(event);
      this.detach(chainId, event);
    });
  }

  /**
   * Returns the available liquidity for the given router of the given asset on the `TransactionManager` contract for the specified chain.
   *
   * @param chainId - The chain you want to check liquidity on
   * @param router - The router you want to check the liquidity of
   * @param assetId - The asset you want to check the liquidity of
   * @returns A promise resolving with a `BigNumber` indiciating the available liquidity for the router
   */
  async getLiquidity(chainId: number, router: string, assetId: string): Promise<BigNumber> {
    const txManager = this.chainConfig[chainId].transactionManager;
    if (!txManager) {
      throw new Error("No transactionManagerAddress configured for chainId: " + chainId.toString());
    }

    const liquidity = await txManager.routerBalances(router, assetId);
    return liquidity;
  }

  /**
   * Attaches a callback to the emitted event
   *
   * @param chainId - The chainId of the TransactionManager to register the listener for
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   */
  public attach<T extends TransactionManagerEvent>(
    chainId: number,
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    return this.chainConfig[chainId].listener.attach(event, callback, filter, timeout);
  }

  /**
   * Attaches a callback to the emitted event that will be executed one time and then detached.
   *
   * @param chainId - The chainId of the TransactionManager to register the listener for
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   */
  public attachOnce<T extends TransactionManagerEvent>(
    chainId: number,
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    return this.chainConfig[chainId].listener.attach(event, callback, filter, timeout);
  }

  /**
   * Removes all attached handlers from the given event.
   *
   * @param chainId - The chainId of the TransactionManager to remove the callback from
   * @param event - (optional) The event name to remove handlers from. If not provided, will detach handlers from *all* subgraph events
   */
  public detach<T extends TransactionManagerEvent>(chainId: number, event?: T): void {
    return this.chainConfig[chainId].listener.detach(event);
  }

  /**
   * Returns a promise that resolves when the event matching the filter is emitted
   *
   * @param event - The event name to wait for
   * @param timeout - The ms to continue waiting before rejecting
   * @param filter - (optional) A filter where the promise is only resolved if the filter returns true
   * @returns Promise that will resolve with the event payload once the event is emitted, or rejects if the timeout is reached.
   */
  public waitFor<T extends TransactionManagerEvent>(
    chainId: number,
    event: T,
    timeout: number,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
  ): Promise<TransactionManagerEventPayloads[T]> {
    return this.chainConfig[chainId].listener.waitFor(event, timeout, filter);
  }
}
