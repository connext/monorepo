import {
  CrossChainParams,
  NxtpSdk,
  NxtpSdkEvent,
  NxtpSdkEventPayloads,
  NxtpSdkEvents,
  SenderTokenApprovalMinedPayload,
  SenderTransactionPrepareSubmittedPayload,
  SenderTransactionPrepareTokenApprovalPayload,
} from "@connext/nxtp-sdk";
import {
  AuctionResponse,
  getRandomBytes32,
  TransactionCancelledEvent,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
  UserNxtpNatsMessagingService,
} from "@connext/nxtp-utils";
import { providers, Signer } from "ethers";
import pino from "pino";
import { Evt } from "evt";

type AddressField = { address: string };

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
type UserCompletionFailedPayload = { params: TransactionPreparedEvent; error: string; fulfilling: boolean };
type RouterCompletionFailedPayload = NxtpSdkEventPayloads[typeof SdkAgentEvents.SenderTransactionCancelled];
type TransactionCompletedPayload = { transactionId: string; timestamp: number; error?: string };
export interface SdkAgentEventPayloads extends NxtpSdkEventPayloads {
  [SdkAgentEvents.InitiateFailed]: InitiateFailedPayload;
  [SdkAgentEvents.UserCompletionFailed]: UserCompletionFailedPayload;
  [SdkAgentEvents.RouterCompletionFailed]: RouterCompletionFailedPayload;
  [SdkAgentEvents.TransactionCompleted]: TransactionCompletedPayload;
}

const createEvts = (): { [K in SdkAgentEvent]: Evt<SdkAgentEventPayloads[K] & AddressField> } => {
  return {
    [SdkAgentEvents.SenderTransactionPrepareTokenApproval]: Evt.create<
      SenderTransactionPrepareTokenApprovalPayload & AddressField
    >(),
    [SdkAgentEvents.SenderTokenApprovalMined]: Evt.create<SenderTokenApprovalMinedPayload & AddressField>(),
    [SdkAgentEvents.SenderTransactionPrepareSubmitted]: Evt.create<
      SenderTransactionPrepareSubmittedPayload & AddressField
    >(),
    [SdkAgentEvents.SenderTransactionPrepared]: Evt.create<TransactionPreparedEvent & AddressField>(),
    [SdkAgentEvents.SenderTransactionFulfilled]: Evt.create<TransactionFulfilledEvent & AddressField>(),
    [SdkAgentEvents.SenderTransactionCancelled]: Evt.create<TransactionCancelledEvent & AddressField>(),
    [SdkAgentEvents.ReceiverTransactionPrepared]: Evt.create<TransactionPreparedEvent & AddressField>(),
    [SdkAgentEvents.ReceiverTransactionFulfilled]: Evt.create<TransactionFulfilledEvent & AddressField>(),
    [SdkAgentEvents.ReceiverTransactionCancelled]: Evt.create<TransactionCancelledEvent & AddressField>(),
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
  private readonly sdk: NxtpSdk;

  private isCyclical = false;

  private readonly evts: { [K in SdkAgentEvent]: Evt<SdkAgentEventPayloads[K] & AddressField> } = createEvts();

  private constructor(
    public readonly address: string,
    private readonly chainProviders: {
      [chainId: number]: providers.FallbackProvider;
    },
    private readonly signer: Signer,
    natsUrl?: string,
    authUrl?: string,
    messaging?: UserNxtpNatsMessagingService,
  ) {
    this.sdk = new NxtpSdk(
      this.chainProviders,
      this.signer,
      pino({ level: "info" }).child({ name: "SdkAgent" }),
      natsUrl,
      authUrl,
      messaging,
    );
  }

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
    chainProviders: {
      [chainId: number]: providers.FallbackProvider;
    },
    signer: Signer,
    natsUrl?: string,
    authUrl?: string,
    messaging?: UserNxtpNatsMessagingService,
  ): Promise<SdkAgent> {
    // Get signer address for name
    const address = await signer.getAddress();

    // Create sdk
    const agent = new SdkAgent(address, chainProviders, signer, natsUrl, authUrl, messaging);
    await agent.sdk.connectMessaging();

    // Parrot all events
    agent.setupListeners();

    return agent;
  }

  private setupListeners() {
    // Parrot all sdk events
    Object.keys(NxtpSdkEvents).map((_event) => {
      const event = _event as NxtpSdkEvent;
      this.sdk.attach(event, (data) => {
        this.evts[event].post({ ...data, address: this.address } as any);
      });
    });

    // Setup autofulfill of transfers + post to evt if it failed
    this.sdk.attach(NxtpSdkEvents.ReceiverTransactionPrepared, async (data) => {
      // TODO: determine if sdk will complete or cancel transfer
      let error: string | undefined;
      try {
        await this.sdk.finishTransfer(data);
      } catch (e) {
        error = e.message;
        this.evts[SdkAgentEvents.UserCompletionFailed].post({
          error: error!,
          params: data,
          fulfilling: true,
          address: this.address,
        });
      }
      this.evts.TransactionCompleted.post({
        transactionId: data.txData.transactionId,
        address: this.address,
        timestamp: Date.now(),
        error,
      });
    });
  }

  /**
   * On each ReceiverTransactionFulfilled (i.e. router complete), create a new transfer
   *
   * New transfers will go in the opposite direction of the received transaction to keep balance roughly equal
   *
   */
  public establishCyclicalTransfers() {
    if (this.isCyclical) {
      return;
    }
    // On each ReceiverTransactionFulfilled (i.e. router complete), create a new transfer
    // Will go in the opposite direction of the received transaction to keep
    // balance roughly equal
    this.sdk.attach(NxtpSdkEvents.ReceiverTransactionFulfilled, async (data) => {
      const { amount, sendingAssetId, sendingChainId, receivingChainId, receivingAssetId } = data.txData;
      this.initiateCrosschainTransfer({
        amount,
        sendingChainId: receivingChainId,
        sendingAssetId: receivingAssetId,
        receivingChainId: sendingChainId,
        receivingAssetId: sendingAssetId,
      });
    });

    this.isCyclical = true;
  }

  /**
   * Creates a single crosschain transfer. Will not error, but will emit error events
   *
   * @param params parameters to create crosschain transfer with. By default uses lowest expiry possible for sender side and themselves as the receiving address
   */
  public async initiateCrosschainTransfer(
    params: Omit<CrossChainParams, "receivingAddress" | "expiry"> & { receivingAddress?: string },
  ): Promise<void> {
    const minExpiry = 36 * 60 * 60; // 36h in seconds
    const buffer = 5 * 60; // 5 min buffer
    // 0. Create bid
    const bid = {
      receivingAddress: this.address,
      expiry: Math.floor(Date.now() / 1000) + minExpiry + buffer, // Use min + 5m
      transactionId: getRandomBytes32(),
      ...params,
    };
    let auction: AuctionResponse | undefined = undefined;
    try {
      // 1. Run the auction
      auction = await this.sdk.getTransferQuote(bid);
      // 2. Start the transfer
      await this.sdk.startTransfer(auction, true);

      // Transfer will auto-fulfill based on established listeners
    } catch (e) {
      this.evts.InitiateFailed.post({ params: auction, address: this.address, error: e.message });
      this.evts.TransactionCompleted.post({
        transactionId: bid.transactionId,
        address: this.address,
        timestamp: Date.now(),
        error: e.message,
      });
    }
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
