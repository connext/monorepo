import { BigNumber, providers, Signer, utils } from "ethers";
import { Evt } from "evt";
import {
  UserNxtpNatsMessagingService,
  TransactionPreparedEvent,
  AuctionResponse,
  jsonifyError,
  Logger,
  createLoggingContext,
  encrypt,
  ChainData,
  getChainData,
  StatusResponse,
} from "@connext/nxtp-utils";

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
  GetTransferQuote,
  SdkBaseChainConfigParams,
} from "./types";
import { signFulfillTransactionPayload, encodeAuctionBid, ethereumRequest, getGasLimit } from "./utils";

import { NxtpSdkBase } from "./sdkBase";

export const MIN_SLIPPAGE_TOLERANCE = "00.01"; // 0.01%;
export const MAX_SLIPPAGE_TOLERANCE = "15.00"; // 15.0%
export const DEFAULT_SLIPPAGE_TOLERANCE = "0.10"; // 0.10%
export const AUCTION_TIMEOUT = 30_000;
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
  public readonly chainData?: Map<string, ChainData>;

  constructor(
    private readonly config: {
      chainConfig: SdkBaseChainConfigParams;
      signer: Signer;
      messagingSigner?: Signer;
      logger?: Logger;
      network?: "testnet" | "mainnet" | "local";
      natsUrl?: string;
      authUrl?: string;
      messaging?: UserNxtpNatsMessagingService;
      skipPolling?: boolean;
      sdkBase?: NxtpSdkBase;
      chainData?: Map<string, ChainData>;
    },
  ) {
    const {
      chainConfig,
      signer,
      messagingSigner,
      messaging,
      natsUrl,
      authUrl,
      logger,
      network,
      skipPolling,
      sdkBase,
      chainData,
    } = this.config;

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
        chainData,
      });
    this.chainData = this.sdkBase.chainData;
  }

  /**
   * Retrieves ChainData and instantiates a new NxtpSdk instance using it.
   *
   * @param config - Sdk configuration params (without chainData).
   * @returns A new NxtpSdk instance.
   */
  static async create(config: {
    chainConfig: SdkBaseChainConfigParams;
    signer: Signer;
    messagingSigner?: Signer;
    logger?: Logger;
    network?: "testnet" | "mainnet" | "local";
    natsUrl?: string;
    authUrl?: string;
    messaging?: UserNxtpNatsMessagingService;
    skipPolling?: boolean;
    sdkBase?: NxtpSdkBase;
  }): Promise<NxtpSdk> {
    const chainData = await getChainData();
    return new NxtpSdk({ ...config, chainData });
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
    actualAmount?: string,
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
      amount: _amount,
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
    const amount = actualAmount ?? _amount;

    const signerAddr = await this.config.signer.getAddress();
    const connectedSigner = this.config.signer;

    const approveTxReq = await this.sdkBase.approveForPrepare(
      { sendingAssetId, sendingChainId, amount, transactionId },
      infiniteApprove,
    );
    const gasLimit = getGasLimit(receivingChainId);
    if (approveTxReq) {
      const approveTx = await connectedSigner.sendTransaction({ ...approveTxReq, gasLimit });
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
    this.logger.info("Generated prepareReq", requestContext, methodContext, { prepareReq });
    const prepareResponse = await connectedSigner.sendTransaction({ ...prepareReq, gasLimit });
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
   * Changes the injected signer associated with the SDK.
   *
   * @param signer - New injected signer for the SDK to use.
   */
  public changeInjectedSigner(signer: Signer) {
    this.config.signer = signer;
    this.sdkBase.changeInjectedSigner(signer);
  }
}
