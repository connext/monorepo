import {
  CrossChainParams,
  NxtpSdk,
  NxtpSdkEvent,
  NxtpSdkEventPayloads,
  NxtpSdkEvents,
  ReceiverPrepareSignedPayload,
  ReceiverTransactionCancelledPayload,
  ReceiverTransactionFulfilledPayload,
  ReceiverTransactionPreparedPayload,
  SenderTokenApprovalMinedPayload,
  SenderTransactionCancelledPayload,
  SenderTransactionFulfilledPayload,
  SenderTransactionPreparedPayload,
  SenderTransactionPrepareSubmittedPayload,
  SenderTokenApprovalSubmittedPayload,
  getMinExpiryBuffer,
} from "@connext/nxtp-sdk";
import {
  AuctionResponse,
  createLoggingContext,
  getRandomBytes32,
  jsonifyError,
  Logger,
  NxtpError,
  NxtpErrorJson,
  TransactionPreparedEvent,
  UserNxtpNatsMessagingService,
} from "@connext/nxtp-utils";



import { providers, Signer } from "ethers";
import { Evt, VoidCtx } from "evt";
import PriorityQueue from "p-queue";

import { ChainConfig } from "./config";

type AddressField = { address: string };

class TransactionCancelled extends NxtpError {
  static readonly type = TransactionCancelled.name;

  static getMessage(wasRouter: boolean) {
    return wasRouter ? `Router cancelled transfer` : `Transfer was cancelled`;
  }

  constructor(
    public readonly wasRouter: boolean,
    public readonly transactionId: string,
    public readonly context: any = {},
  ) {
    super(TransactionCancelled.getMessage(wasRouter), { transactionId, ...context }, TransactionCancelled.type);
  }
}

export const SdkAgentEvents = {
  ...NxtpSdkEvents,
  InitiateFailed: "InitiateFailed",
  UserCompletionFailed: "UserCompletionFailed",
  RouterCompletionFailed: "RouterCompletionFailed",
  TransactionCompleted: "TransactionCompleted",
} as const;
export type SdkAgentEvent = typeof SdkAgentEvents[keyof typeof SdkAgentEvents];

// Undefined if failed on bid
type InitiateFailedPayload = { params?: AuctionResponse; error: string };
type UserCompletionFailedPayload = { params: TransactionPreparedEvent; error: NxtpErrorJson; fulfilling: boolean };
type RouterCompletionFailedPayload = NxtpSdkEventPayloads[typeof SdkAgentEvents.SenderTransactionCancelled];
type TransactionCompletedPayload = { transactionId: string; timestamp: number; error?: NxtpErrorJson };
export interface SdkAgentEventPayloads extends NxtpSdkEventPayloads {
  [SdkAgentEvents.InitiateFailed]: InitiateFailedPayload;
  [SdkAgentEvents.UserCompletionFailed]: UserCompletionFailedPayload;
  [SdkAgentEvents.RouterCompletionFailed]: RouterCompletionFailedPayload;
  [SdkAgentEvents.TransactionCompleted]: TransactionCompletedPayload;
}

const createEvts = (): { [K in SdkAgentEvent]: Evt<SdkAgentEventPayloads[K] & AddressField> } => {
  return {
    [SdkAgentEvents.SenderTokenApprovalSubmitted]: Evt.create<SenderTokenApprovalSubmittedPayload & AddressField>(),
    [SdkAgentEvents.SenderTokenApprovalMined]: Evt.create<SenderTokenApprovalMinedPayload & AddressField>(),
    [SdkAgentEvents.SenderTransactionPrepareSubmitted]: Evt.create<
      SenderTransactionPrepareSubmittedPayload & AddressField
    >(),
    [SdkAgentEvents.SenderTransactionPrepared]: Evt.create<SenderTransactionPreparedPayload & AddressField>(),
    [SdkAgentEvents.SenderTransactionFulfilled]: Evt.create<SenderTransactionFulfilledPayload & AddressField>(),
    [SdkAgentEvents.SenderTransactionCancelled]: Evt.create<SenderTransactionCancelledPayload & AddressField>(),
    [SdkAgentEvents.ReceiverPrepareSigned]: Evt.create<ReceiverPrepareSignedPayload & AddressField>(),
    [SdkAgentEvents.ReceiverTransactionPrepared]: Evt.create<ReceiverTransactionPreparedPayload & AddressField>(),
    [SdkAgentEvents.ReceiverTransactionFulfilled]: Evt.create<ReceiverTransactionFulfilledPayload & AddressField>(),
    [SdkAgentEvents.ReceiverTransactionCancelled]: Evt.create<ReceiverTransactionCancelledPayload & AddressField>(),
    [SdkAgentEvents.InitiateFailed]: Evt.create<InitiateFailedPayload & AddressField>(),
    [SdkAgentEvents.UserCompletionFailed]: Evt.create<UserCompletionFailedPayload & AddressField>(),
    [SdkAgentEvents.RouterCompletionFailed]: Evt.create<RouterCompletionFailedPayload & AddressField>(),
    [SdkAgentEvents.TransactionCompleted]: Evt.create<TransactionCompletedPayload & AddressField>(),
  };
};

/**
 * @classdesc Manages a single agent assocuated with a single sdk instance. This class does not throw errors, instead emits them as events
 */
export class SdkAgent {

  private cyclicalContext: VoidCtx | undefined;

  private queue = new PriorityQueue({ concurrency: 1 });

  private readonly evts: { [K in SdkAgentEvent]: Evt<SdkAgentEventPayloads[K] & AddressField> } = createEvts();

  private readonly logger: Logger = new Logger({ name: "sdkAgent", level: "debug" });

  private constructor(
    public readonly address: string,
    private readonly _chainProviders: {
      [chainId: number]: { provider: providers.FallbackProvider };
    },
    private readonly _signer: Signer,
    private readonly sdk: NxtpSdk,
  ) {}

  /**
   * Creates a new agent
   *
   * @param chainProviders
   * @param signer
   * @param natsUrl
   * @param authUrl
   * @param messaging
   * @returns
   */
  static async connect(
    chainProviders: ChainConfig,
    signer: Signer,
    logger: Logger,
    natsUrl?: string,
    authUrl?: string,
    messaging?: UserNxtpNatsMessagingService,
  ): Promise<SdkAgent> {
    // Get signer address for name
    const address = await signer.getAddress();

    // Create sdk
    const sdk = new NxtpSdk(
      chainProviders,
      signer,
      logger.child({ name: "Sdk" }),
      "local",
      natsUrl,
      authUrl,
      messaging,
    );
    await sdk.connectMessaging();
    const agent = new SdkAgent(address, chainProviders, signer, logger, sdk);

    // Parrot all events
    agent.setupListeners();

    return agent;
  }

  private setupListeners() {
    // Parrot all sdk events
    Object.keys(NxtpSdkEvents).map((_event) => {
      const event = _event as NxtpSdkEvent;
      this.sdk.attach(event, (_data) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const data = _data as any;
        this.evts[event].post({ ...data, address: this.address });
      });
    });

    // Setup autofulfill of transfers + post to evt if it failed
    this.sdk.attach(NxtpSdkEvents.ReceiverTransactionPrepared, async (data) => {
      let error: NxtpErrorJson | undefined;
      try {
        await this.sdk.fulfillTransfer(data);
      } catch (e) {
        error = jsonifyError(e);
        this.logger.error("Fulfilling failed", undefined, undefined, error, {
          transactionId: data.txData.transactionId,
          error,
        });
        this.evts[SdkAgentEvents.UserCompletionFailed].post({
          error,
          params: data,
          fulfilling: true,
          address: this.address,
        });
        // process.exit(1);
      }
      this.evts.TransactionCompleted.post({
        transactionId: data.txData.transactionId,
        address: this.address,
        timestamp: Date.now(),
        error,
      });
    });

    // On sender cancellation, post that it was completed
    this.sdk.attach(NxtpSdkEvents.SenderTransactionCancelled, async (data) => {
      this.evts.RouterCompletionFailed.post({
        ...data,
        address: this.address,
      });
      this.evts.TransactionCompleted.post({
        transactionId: data.txData.transactionId,
        address: this.address,
        timestamp: Date.now(),
        error: jsonifyError(
          new TransactionCancelled(data.caller === data.txData.router, data.txData.transactionId, { ...data }),
        ),
      });
    });
  }

  public cancelCyclicalTransfers() {
    if (!this.cyclicalContext) {
      return;
    }

    this.cyclicalContext.done();
    this.cyclicalContext = undefined;
  }

  /**
   * On each ReceiverTransactionFulfilled (i.e. router complete), create a new transfer
   *
   * New transfers will go in the opposite direction of the received transaction to keep balance roughly equal
   *
   */
  public establishCyclicalTransfers() {
    if (this.cyclicalContext) {
      return;
    }
    // On each ReceiverTransactionFulfilled (i.e. router complete), create a new transfer
    // Will go in the opposite direction of the received transaction to keep
    // balance roughly equal
    this.cyclicalContext = Evt.newCtx();
    this.evts.ReceiverTransactionFulfilled.attach(this.cyclicalContext, async (data) => {
      const { amount, sendingAssetId, sendingChainId, receivingChainId, receivingAssetId } = data.txData;
      await this.initiateCrosschainTransfer({
        amount,
        sendingChainId: receivingChainId,
        sendingAssetId: receivingAssetId,
        receivingChainId: sendingChainId,
        receivingAssetId: sendingAssetId,
      });
    });

    // On each SenderTransactionCancelled (i.e. router cancels), create a
    // new transfer that reattempts the cancelled transaction
    this.evts.SenderTransactionCancelled.attach(this.cyclicalContext, async (data) => {
      const { amount, sendingAssetId, sendingChainId, receivingChainId, receivingAssetId } = data.txData;
      await this.initiateCrosschainTransfer({
        amount,
        sendingChainId,
        sendingAssetId,
        receivingChainId,
        receivingAssetId,
      });
    });
  }

  /**
   * Creates a single crosschain transfer. Will not error, but will emit error events
   *
   * @param params parameters to create crosschain transfer with. By default uses lowest expiry possible for sender side and themselves as the receiving address
   */
  public async initiateCrosschainTransfer(
    params: Omit<CrossChainParams, "receivingAddress" | "expiry"> & { receivingAddress?: string },
  ): Promise<void> {
    this.logger.info("SDK Crosschain XFR Starting (adding to queue)", undefined, undefined, { params });
    return this.queue.add(async () => {
      const minExpiry = getMinExpiryBuffer(); // 36h in seconds
      const buffer = 5 * 60; // 5 min buffer
      // 0. Create bid
      const bid = {
        receivingAddress: this.address,
        expiry: Math.floor(Date.now() / 1000) + minExpiry + buffer, // Use min + 5m
        transactionId: getRandomBytes32(),
        ...params,
      };
      const { requestContext, methodContext } = createLoggingContext(
          this.initiateCrosschainTransfer.name,
          undefined,
          bid.transactionId,
      );

      let auction: AuctionResponse | undefined = undefined;
      let auction_attempts = 0;
      //todo move this out to a config file
      const MAX_AUCTION_ATTEMPTS = 3;

      try {
        // 1. Run the auction
        while(!auction && auction_attempts < MAX_AUCTION_ATTEMPTS){
          auction_attempts++;
          auction = await this.sdk.getTransferQuote(bid);
          this.logger.debug(`Auction attempt ${auction_attempts} for TransactionID: ${bid.transactionId}`, requestContext, methodContext, {auction:auction, txid:bid.transactionId});
        }
        // 2. Start the transfer
        if(auction) {
          const prepareTxfr = await this.sdk.prepareTransfer(auction, true);
          this.logger.debug(`Preparing Transfer`, requestContext, methodContext, {txfr_info:prepareTxfr, txid:bid.transactionId});
        }
        else{
          this.logger.debug(`Couldn't get an auction response`, requestContext, methodContext, {txid:bid.transactionId});
          process.exit(1);
        }
        // Transfer will auto-fulfill based on established listeners
      } catch (e) {
        const error = jsonifyError(e);
        this.logger.error("Preparing failed", requestContext, methodContext, error, {
          transactionId: bid.transactionId,
          error,
          auction,
        });
        this.evts.InitiateFailed.post({ params: auction, address: this.address, error: error.message });
        this.evts.TransactionCompleted.post({
          transactionId: bid.transactionId,
          address: this.address,
          timestamp: Date.now(),
          error: jsonifyError(e),
        });
        process.exit(1);
      }
    });
  }

  // Listener methods
  public attach<T extends SdkAgentEvent>(
    event: T,
    callback: (data: SdkAgentEventPayloads[T]) => void,
    filter: (data: SdkAgentEventPayloads[T]) => boolean = (_data: SdkAgentEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attach(...(args as [number, any]));
  }

  public attachOnce<T extends SdkAgentEvent>(
    event: T,
    callback: (data: SdkAgentEventPayloads[T]) => void,
    filter: (data: SdkAgentEventPayloads[T]) => boolean = (_data: SdkAgentEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attachOnce(...(args as [number, any]));
  }

  public detach<T extends SdkAgentEvent>(event?: T): void {
    if (event) {
      this.evts[event].detach();
      return;
    }
    Object.values(this.evts).forEach((evt) => evt.detach());
  }

  public waitFor<T extends SdkAgentEvent>(
    event: T,
    timeout: number,
    filter: (data: SdkAgentEventPayloads[T]) => boolean = (_data: SdkAgentEventPayloads[T]) => true,
  ): Promise<SdkAgentEventPayloads[T]> {
    return this.evts[event].pipe(filter).waitFor(timeout) as Promise<SdkAgentEventPayloads[T]>;
  }
}
