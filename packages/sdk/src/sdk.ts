import { BigNumber, providers, Signer, utils } from "ethers";
import { Evt } from "evt";
import {
  UserNxtpNatsMessagingService,
  TransactionPreparedEvent,
  AuctionResponse,
  MetaTxResponse,
  jsonifyError,
  Logger,
  createLoggingContext,
  encrypt,
  isNode,
  TransactionData,
} from "@connext/nxtp-utils";

import { getDeployedChainIdsForGasFee } from "./transactionManager/transactionManager";
import { SubmitError, ChainNotConfigured, EncryptionError } from "./error";
import {
  NxtpSdkEvent,
  NxtpSdkEventPayloads,
  NxtpSdkEvents,
  SenderTokenApprovalSubmittedPayload,
  SenderTokenApprovalMinedPayload,
  SenderTransactionPrepareSubmittedPayload,
  SenderTransactionPreparedPayload,
  SenderTransactionFulfilledPayload,
  SenderTransactionCancelledPayload,
  ReceiverPrepareSignedPayload,
  ReceiverTransactionPreparedPayload,
  ReceiverTransactionFulfilledPayload,
  ReceiverTransactionCancelledPayload,
  CrossChainParams,
  HistoricalTransaction,
  SubgraphSyncRecord,
  ActiveTransaction,
  CancelParams,
} from "./types";
import { signFulfillTransactionPayload, encodeAuctionBid, ethereumRequest } from "./utils";
import { SubgraphEvent, SubgraphEvents } from "./subgraph/subgraph";
import { NxtpSdkBase } from "./sdkBase";

export const MIN_SLIPPAGE_TOLERANCE = "00.01"; // 0.01%;
export const MAX_SLIPPAGE_TOLERANCE = "15.00"; // 15.0%
export const DEFAULT_SLIPPAGE_TOLERANCE = "0.10"; // 0.10%
export const AUCTION_TIMEOUT = 6_000;
export const META_TX_TIMEOUT = 300_000;

/**
 * Used to make mocking easier
 */
export const createMessagingEvt = <T>() => {
  return Evt.create<{ inbox: string; data?: T; err?: any }>();
};

/**
 * Helper to generate evt instances for all SDK events
 *
 * @returns A container keyed on event names whos values contain the EVT instance for the keyed event
 */
export const createEvts = (): { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } => {
  return {
    [NxtpSdkEvents.SenderTokenApprovalSubmitted]: Evt.create<SenderTokenApprovalSubmittedPayload>(),
    [NxtpSdkEvents.SenderTokenApprovalMined]: Evt.create<SenderTokenApprovalMinedPayload>(),
    [NxtpSdkEvents.SenderTransactionPrepareSubmitted]: Evt.create<SenderTransactionPrepareSubmittedPayload>(),
    [NxtpSdkEvents.SenderTransactionPrepared]: Evt.create<SenderTransactionPreparedPayload>(),
    [NxtpSdkEvents.SenderTransactionFulfilled]: Evt.create<SenderTransactionFulfilledPayload>(),
    [NxtpSdkEvents.SenderTransactionCancelled]: Evt.create<SenderTransactionCancelledPayload>(),
    [NxtpSdkEvents.ReceiverPrepareSigned]: Evt.create<ReceiverPrepareSignedPayload>(),
    [NxtpSdkEvents.ReceiverTransactionPrepared]: Evt.create<ReceiverTransactionPreparedPayload>(),
    [NxtpSdkEvents.ReceiverTransactionFulfilled]: Evt.create<ReceiverTransactionFulfilledPayload>(),
    [NxtpSdkEvents.ReceiverTransactionCancelled]: Evt.create<ReceiverTransactionCancelledPayload>(),
  };
};

/**
 * @classdesc Lightweight class to facilitate interaction with the TransactionManager contract on configured chains.
 *
 */
export class NxtpSdk {
  private evts: { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } = createEvts();
  private readonly sdkBase: NxtpSdkBase;
  private readonly logger: Logger;

  constructor(
    private readonly config: {
      chainConfig: {
        [chainId: number]: {
          provider: providers.FallbackProvider;
          transactionManagerAddress?: string;
          priceOracleAddress?: string;
          subgraph?: string;
          subgraphSyncBuffer?: number;
        };
      };
      signer: Signer;
      messagingSigner?: Signer;
      logger?: Logger;
      network?: "testnet" | "mainnet" | "local";
      natsUrl?: string;
      authUrl?: string;
      messaging?: UserNxtpNatsMessagingService;
      skipPolling?: boolean;
      sdkBase?: NxtpSdkBase;
    },
  ) {
    const { chainConfig, signer, messagingSigner, messaging, natsUrl, authUrl, logger, network, skipPolling, sdkBase } =
      this.config;

    this.logger = logger ?? new Logger({ name: "NxtpSdk" });

    this.sdkBase =
      sdkBase ??
      new NxtpSdkBase({
        chainConfig,
        signerAddress: signer.getAddress(),
        authUrl,
        messaging,
        natsUrl,
        signer,
        logger: this.logger.child({ name: "NxtpSdkBase" }),
        network,
        messagingSigner,
        skipPolling,
      });
  }

  async connectMessaging(bearerToken?: string): Promise<string> {
    return this.sdkBase.connectMessaging(bearerToken);
  }

  /**
   * Gets all the transactions that could require user action from the subgraph across all configured chains
   *
   * @returns An array of the active transactions and their status
   */
  public async getActiveTransactions(): Promise<ActiveTransaction[]> {
    return this.sdkBase.getActiveTransactions();
  }

  /**
   *
   * @param chainId
   * @returns
   */
  getSubgraphSyncStatus(chainId: number): SubgraphSyncRecord {
    return this.sdkBase.getSubgraphSyncStatus(chainId);
  }

  /**
   * Gets historical transactions
   *
   * @returns An array of historical transactions
   */
  public async getHistoricalTransactions(): Promise<HistoricalTransaction[]> {
    return this.sdkBase.getHistoricalTransactions();
  }

  /**
   * Fetches an estimated quote for a proposed crosschain transfer. Runs an auction to determine the `router` for a transaction and the estimated received value.
   *
   * @param params - Params to create crosschain transfer with
   * @param params.callData - The calldata to execute on the receiving chain
   * @param params.sendingChainId - The originating chain (where user is sending funds from)
   * @param params.sendingAssetId - The originating asset of the funds the user is sending
   * @param params.receivingChainId - The destination chain (where user wants the funds)
   * @param params.receivingAssetId - The assetId of funds the user would like to receive on the receiving chain
   * @param params.callTo - The address on the receiving chain to execute the callData on
   * @param params.receivingAddress - The address the funds should be sent to on the destination chain if callTo/callData is empty, or the fallback address if the callTo/callData is specified
   * @param params.amount - The amount the user will send on the sending chain. This is not necessarily the amount they will receive
   * @param params.expiry - The expiry on the sending chain for the transfer
   * @param params.transactionId - The unique identifier for the transfer
   *
   * @returns The auction response for the given transacton
   *
   * @remarks
   * The user chooses the transactionId, and they are incentivized to keep the transactionId unique otherwise their signature could e replayed and they would lose funds.
   */
  public async getTransferQuote(params: Omit<CrossChainParams, "encryptedCallData">): Promise<AuctionResponse> {
    const user = await this.config.signer.getAddress();
    const callData = params.callData ?? "0x";
    let encryptedCallData = "0x";
    if (callData !== "0x") {
      try {
        const encryptionPublicKey = await ethereumRequest("eth_getEncryptionPublicKey", [user]);
        encryptedCallData = await encrypt(callData, encryptionPublicKey);
      } catch (e) {
        throw new EncryptionError("public key encryption failed", jsonifyError(e));
      }
    }

    return this.sdkBase.getTransferQuote({ ...params, encryptedCallData });
  }

  public async estimateFulfillFee(
    txData: TransactionData,
    signatureForFee: string,
    relayerFee: string,
  ): Promise<BigNumber> {
    return this.sdkBase.estimateFulfillFee(txData, signatureForFee, relayerFee);
  }

  /**
   * Begins a crosschain transfer by calling `prepare` on the sending chain.
   *
   * @param transferParams - The auction result (winning bid and associated signature)
   * @param transferParams.bid - The winning action bid (includes all data needed to call prepare)
   * @param transferParams.bidSignature - The signature of the router on the winning bid
   * @param infiniteApprove - (optional) If true, will approve the TransactionManager on `transferParams.sendingChainId` for the max value. If false, will approve for only transferParams.amount. Defaults to false
   * @returns A promise with the transactionId and the `TransactionResponse` returned when the prepare transaction was submitted, not mined.
   */
  public async prepareTransfer(
    transferParams: AuctionResponse,
    infiniteApprove = false,
  ): Promise<{ prepareResponse: providers.TransactionResponse; transactionId: string }> {
    const { requestContext, methodContext } = createLoggingContext(
      this.prepareTransfer.name,
      undefined,
      transferParams.bid.transactionId,
    );

    this.logger.info("Method started", requestContext, methodContext, { transferParams });

    const { bid, bidSignature } = transferParams;

    const {
      user,
      router,
      sendingAssetId,
      receivingAssetId,
      receivingAddress,
      amount,
      expiry,
      callDataHash,
      encryptedCallData,
      sendingChainId,
      receivingChainId,
      callTo,
      transactionId,
      initiator,
    } = bid;
    const encodedBid = encodeAuctionBid(bid);

    const signerAddr = await this.config.signer.getAddress();
    let connectedSigner = this.config.signer;
    if (isNode()) {
      connectedSigner = this.config.signer.connect(this.config.chainConfig[sendingChainId].provider);
    }

    const approveTxReq = await this.sdkBase.approveForPrepare(transferParams, infiniteApprove);
    if (approveTxReq) {
      const approveTx = await connectedSigner.sendTransaction(approveTxReq);
      this.evts.SenderTokenApprovalSubmitted.post({
        assetId: sendingAssetId,
        chainId: sendingChainId,
        transactionResponse: approveTx,
      });

      const approveReceipt = await approveTx.wait(1);
      if (approveReceipt?.status === 0) {
        throw new SubmitError(
          transactionId,
          sendingChainId,
          signerAddr,
          "approve",
          sendingAssetId,
          { infiniteApprove, amount },
          jsonifyError(new Error("Receipt status is 0")),
          {
            approveReceipt,
          },
        );
      }
      this.logger.info("Mined approve tx", requestContext, methodContext, {
        transactionHash: approveReceipt.transactionHash,
      });
      this.evts.SenderTokenApprovalMined.post({
        assetId: sendingAssetId,
        chainId: sendingChainId,
        transactionReceipt: approveReceipt,
      });
    }

    // Prepare sender side tx
    const prepareReq = await this.sdkBase.prepareTransfer(transferParams);
    this.logger.warn("Generated prepareReq", requestContext, methodContext, { prepareReq });
    const prepareResponse = await connectedSigner.sendTransaction(prepareReq);
    this.evts.SenderTransactionPrepareSubmitted.post({
      prepareParams: {
        txData: {
          receivingChainTxManagerAddress: "",
          user,
          router,
          initiator,
          sendingAssetId,
          receivingAssetId,
          sendingChainFallback: user,
          callTo,
          receivingAddress,
          sendingChainId,
          receivingChainId,
          callDataHash,
          transactionId,
        },
        encryptedCallData,
        bidSignature: bidSignature!,
        encodedBid,
        amount,
        expiry,
      },
      transactionResponse: prepareResponse,
    });
    return { prepareResponse, transactionId };
  }

  /**
   * Fulfills the transaction on the receiving chain.
   *
   * @param params - The `TransactionPrepared` event payload from the receiving chain
   * @param relayerFee - (optional) The fee paid to relayers. Comes out of the transaction amount the router prepared with. Defaults to 0
   * @param useRelayers - (optional) If true, will use a realyer to submit the fulfill transaction
   * @returns An object containing either the TransactionResponse from self-submitting the fulfill transaction, or the Meta-tx response (if you used meta transactions)
   */
  public async fulfillTransfer(
    params: Omit<TransactionPreparedEvent, "caller">,
    relayerFee = "0",
    useRelayers = true,
  ): Promise<{ fulfillResponse?: providers.TransactionResponse; metaTxResponse?: MetaTxResponse }> {
    const { requestContext, methodContext } = createLoggingContext(
      this.fulfillTransfer.name,
      undefined,
      params.txData.transactionId,
    );
    this.logger.info("Method started", requestContext, methodContext, { params, useRelayers });

    const { txData, encryptedCallData } = params;

    if (!this.config.chainConfig[txData.sendingChainId]) {
      throw new ChainNotConfigured(txData.sendingChainId, Object.keys(this.config.chainConfig));
    }

    if (!this.config.chainConfig[txData.receivingChainId]) {
      throw new ChainNotConfigured(txData.receivingChainId, Object.keys(this.config.chainConfig));
    }

    const signerAddress = await this.config.signer.getAddress();
    let connectedSigner = this.config.signer;
    if (isNode()) {
      connectedSigner = this.config.signer.connect(this.config.chainConfig[txData.receivingChainId].provider);
    }

    let calculateRelayerFee = relayerFee;
    const chainIdsForPriceOracle = getDeployedChainIdsForGasFee();
    if (useRelayers && chainIdsForPriceOracle.includes(txData.receivingChainId)) {
      const gasNeeded = await this.sdkBase.estimateFulfillFee(txData, "0x", "0");

      this.logger.info(
        `Calculating Gas Fee for fulfill tx. neededGas = ${gasNeeded.toString()}`,
        requestContext,
        methodContext,
      );

      calculateRelayerFee = gasNeeded.toString();
    }

    this.logger.info("Generating fulfill signature", requestContext, methodContext, { calculateRelayerFee });
    const signature = await signFulfillTransactionPayload(
      txData.transactionId,
      calculateRelayerFee,
      txData.receivingChainId,
      txData.receivingChainTxManagerAddress,
      this.config.signer,
    );

    this.logger.info("Generated signature", requestContext, methodContext, { signature });
    this.evts.ReceiverPrepareSigned.post({ signature, transactionId: txData.transactionId, signer: signerAddress });
    this.logger.info("Preparing fulfill tx", requestContext, methodContext, { calculateRelayerFee });
    let callData = "0x";
    if (txData.callDataHash !== utils.keccak256(callData)) {
      try {
        callData = await ethereumRequest("eth_decrypt", [encryptedCallData, txData.user]);
      } catch (e) {
        throw new EncryptionError("decryption failed", jsonifyError(e));
      }
    }
    const response = await this.sdkBase.fulfillTransfer(params, signature, callData, calculateRelayerFee, useRelayers);

    if (useRelayers) {
      return { metaTxResponse: response.metaTxResponse };
    } else {
      this.logger.info("Fulfilling with user's signer", requestContext, methodContext);
      const fulfillResponse = await connectedSigner.sendTransaction(response.fulfillRequest!);

      this.logger.info("Method complete", requestContext, methodContext, { txHash: fulfillResponse.hash });
      return { fulfillResponse };
    }
  }

  /**
   * Cancels the given transaction
   *
   * @param cancelParams - Arguments to submit to chain
   * @param cancelParams.txData - TransactionData (invariant + variant) to be cancelled
   * @param cancelParams.relayerFee - Fee to be paid for relaying transaction (only respected on sending chain cancellations post-expiry by the user)
   * @param cancelParams.signature - User signature for relayer to use
   * @param chainId - Chain to cancel the transaction on
   * @returns A TransactionResponse when the transaction was submitted, not mined
   */
  public async cancel(cancelParams: CancelParams, chainId: number): Promise<providers.TransactionResponse> {
    const { requestContext, methodContext } = createLoggingContext(
      this.cancel.name,
      undefined,
      cancelParams.txData.transactionId,
    );
    if (!this.config.chainConfig[chainId]) {
      throw new ChainNotConfigured(chainId, Object.keys(this.config.chainConfig));
    }
    this.logger.info("Method started", requestContext, methodContext, { chainId, cancelParams });

    const cancelReq = await this.sdkBase.cancel(cancelParams, chainId);
    let connectedSigner = this.config.signer;
    if (isNode()) {
      connectedSigner = this.config.signer.connect(this.config.chainConfig[chainId].provider);
    }

    const cancelResponse = await connectedSigner.sendTransaction(cancelReq);
    this.logger.info("Method complete", requestContext, methodContext, { txHash: cancelResponse.hash });
    return cancelResponse;
  }

  /**
   * Changes the signer associated with the sdk
   *
   * @param signer - Signer to change to
   */
  public changeInjectedSigner(signer: Signer) {
    this.config.signer = signer;
  }

  /**
   * Turns off all listeners and disconnects messaging from the sdk
   */
  public removeAllListeners(): void {
    this.detach();
    this.sdkBase.removeAllListeners();
  }

  // Listener methods
  /**
   * Attaches a callback to the emitted event
   *
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   */
  public attach<T extends NxtpSdkEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    if (Object.keys(SubgraphEvents).includes(event)) {
      this.sdkBase.attach(event as SubgraphEvent, callback as any, filter as any);
    } else {
      this.evts[event].pipe(filter).attach(...(args as [number, any]));
    }
  }

  /**
   * Attaches a callback to the emitted event that will be executed one time and then detached.
   *
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   *
   */
  public attachOnce<T extends NxtpSdkEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    if (Object.keys(SubgraphEvents).includes(event)) {
      this.sdkBase.attachOnce(event as SubgraphEvent, callback as any, filter as any, timeout);
    } else {
      this.evts[event].pipe(filter).attachOnce(...(args as [number, any]));
    }
  }

  /**
   * Removes all attached handlers from the given event.
   *
   * @param event - (optional) The event name to remove handlers from. If not provided, will detach handlers from *all* subgraph events
   */
  public detach<T extends NxtpSdkEvent>(event?: T): void {
    if (event) {
      if (Object.keys(SubgraphEvents).includes(event)) {
        this.sdkBase.detach(event as SubgraphEvent);
      } else {
        this.evts[event].detach();
      }
      this.evts[event].detach();
    } else {
      Object.values(this.evts).forEach((evt) => evt.detach());
      this.sdkBase.detach();
    }
  }

  /**
   * Returns a promise that resolves when the event matching the filter is emitted
   *
   * @param event - The event name to wait for
   * @param timeout - The ms to continue waiting before rejecting
   * @param filter - (optional) A filter where the promise is only resolved if the filter returns true
   *
   * @returns Promise that will resolve with the event payload once the event is emitted, or rejects if the timeout is reached.
   *
   */
  public waitFor<T extends NxtpSdkEvent>(
    event: T,
    timeout: number,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
  ): Promise<NxtpSdkEventPayloads[T]> {
    if (Object.keys(SubgraphEvents).includes(event)) {
      return this.sdkBase.waitFor(event as SubgraphEvent, timeout, filter as any) as Promise<NxtpSdkEventPayloads[T]>;
    } else {
      return this.evts[event].pipe(filter).waitFor(timeout);
    }
  }
}
