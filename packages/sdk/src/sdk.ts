import Ajv from "ajv";
import addFormats from "ajv-formats";
import { constants, providers, Signer, utils } from "ethers";
import { Evt } from "evt";
import {
  getRandomBytes32,
  TIntegerString,
  TAddress,
  UserNxtpNatsMessagingService,
  PrepareParams,
  TransactionCancelledEvent,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
  TChainId,
} from "@connext/nxtp-utils";
import { BaseLogger } from "pino";
import { Type, Static } from "@sinclair/typebox";

import { handleReceiverPrepare, prepare } from "./crossChainTransfer";

import { TransactionManagerListener } from ".";

export const CrossChainParamsSchema = Type.Object({
  callData: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]*$/)),
  router: TAddress,
  sendingChainId: TChainId,
  sendingAssetId: TAddress,
  receivingChainId: TChainId,
  receivingAssetId: TAddress,
  callTo: Type.Optional(TAddress),
  receivingAddress: TAddress,
  amount: TIntegerString,
  expiry: TIntegerString,
  transactionId: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]{64}$/)),
});

export type CrossChainParams = Static<typeof CrossChainParamsSchema>;

// TODO: do we want to make these more specific?
// i.e. SenderTransactionPrepared, ReceiverTransactionPrepared,
// etc.
export const NxtpSdkEvents = {
  TransactionPrepared: "TransactionPrepared",
  TransactionFulfilled: "TransactionFulfilled",
  TransactionCancelled: "TransactionCancelled",
  TransactionCompleted: "TransactionCompleted",
} as const;
export type NxtpSdkEvent = typeof NxtpSdkEvents[keyof typeof NxtpSdkEvents];

// TODO: is this the event payload we want? anything else?
export type TransactionCompletedEvent = TransactionFulfilledEvent;

export interface NxtpSdkEventPayloads {
  [NxtpSdkEvents.TransactionPrepared]: TransactionPreparedEvent & { chainId: number };
  [NxtpSdkEvents.TransactionFulfilled]: TransactionFulfilledEvent & { chainId: number };
  [NxtpSdkEvents.TransactionCancelled]: TransactionCancelledEvent & { chainId: number };
  [NxtpSdkEvents.TransactionCompleted]: TransactionCompletedEvent & { chainId: number };
}

// TODO: stronger types
export interface NxtpSdk {
  transfer(
    params: CrossChainParams,
  ): Promise<{ prepareReceipt: providers.TransactionReceipt; completed: TransactionCompletedEvent }>;
  // getTransferQuote(): Promise<any>;
  // getTransferHistory(): Promise<any>;
}

const ajv = addFormats(new Ajv(), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
])
  .addKeyword("kind")
  .addKeyword("modifier");

export type SdkChains = {
  [chainId: number]: {
    provider: providers.JsonRpcProvider;
    listener: TransactionManagerListener;
  };
};

export class NxtpSdk {
  private evts: { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } = {
    [NxtpSdkEvents.TransactionPrepared]: Evt.create<TransactionPreparedEvent & { chainId: number }>(),
    [NxtpSdkEvents.TransactionFulfilled]: Evt.create<TransactionFulfilledEvent & { chainId: number }>(),
    [NxtpSdkEvents.TransactionCancelled]: Evt.create<TransactionCancelledEvent & { chainId: number }>(),
    [NxtpSdkEvents.TransactionCompleted]: Evt.create<TransactionCompletedEvent & { chainId: number }>(),
  };

  private readonly fulfilling: { [id: string]: TransactionPreparedEvent & { chainId: number } } = {};

  private constructor(
    private readonly chains: SdkChains,
    private readonly signer: Signer,
    private readonly messaging: UserNxtpNatsMessagingService,
    private readonly logger: BaseLogger,
  ) {}

  static async init(
    chainProviders: {
      [chainId: number]: providers.JsonRpcProvider;
    },
    signer: Signer,
    logger: BaseLogger,
    natsUrl?: string,
    authUrl?: string,
  ): Promise<NxtpSdk> {
    // Create messaging
    const addr = await signer.getAddress();
    const messaging = new UserNxtpNatsMessagingService({
      signer,
      logger: logger.child({ module: "NxtpMessaging", name: addr }),
      natsUrl,
      authUrl,
    });
    await messaging.connect();

    // Start up transaction manager listeners
    const listeners = await Promise.all(
      Object.entries(chainProviders).map(async ([chainId, chainProvider]) => {
        const listener = await TransactionManagerListener.connect(chainProvider);
        return { chainId, listener, chainProvider };
      }),
    );
    const chains: SdkChains = listeners.reduce((c, l) => {
      c[parseInt(l.chainId)] = { listener: l.listener, provider: l.chainProvider };
      return c;
    }, {} as SdkChains);

    const client = new NxtpSdk(chains, signer, messaging, logger.child({ module: "NxtpSdk", name: addr }));

    client.setupListeners();

    // TODO: check chain for any existing transactions that should be fulfilled
    // or cancelled
    return client;
  }

  public async transfer(
    transferParams: CrossChainParams,
  ): Promise<{ prepareReceipt: providers.TransactionReceipt; completed: TransactionCompletedEvent }> {
    const method = "transfer";
    const methodId = getRandomBytes32();
    this.logger.info({ method, methodId, transferParams }, "Method started");

    // Validate params schema
    const validate = ajv.compile(CrossChainParamsSchema);
    const valid = validate(transferParams);
    if (!valid) {
      const error = validate.errors?.map((err) => err.message).join(",");
      this.logger.error({ error, transferParams }, "Invalid transfer params");
      throw new Error(`Invalid params - ${error!}`);
    }

    const {
      sendingAssetId,
      receivingAssetId,
      receivingAddress,
      router,
      amount,
      expiry,
      callData,
      sendingChainId,
      receivingChainId,
      callTo,
    } = transferParams;
    if (!this.chains[sendingChainId] || !this.chains[receivingChainId]) {
      throw new Error(`Not configured for for chains ${sendingChainId} & ${receivingChainId}`);
    }

    // Create promise for completed tx
    const transactionId = transferParams.transactionId ?? getRandomBytes32();
    const timeout = 300_000;
    const completed = this.evts.TransactionCompleted.pipe(
      (data) => data.txData.transactionId === transactionId,
    ).waitFor(timeout);

    const callDataHash = callData ? utils.keccak256(callData) : constants.HashZero;

    const user = await this.signer.getAddress();
    // Prepare sender side tx
    const params: PrepareParams = {
      txData: {
        user,
        router,
        sendingAssetId,
        receivingAssetId,
        sendingChainFallback: receivingAddress, // TODO: for now
        callTo: callTo ?? constants.AddressZero,
        receivingAddress,
        sendingChainId,
        receivingChainId,
        callDataHash,
        transactionId,
      },
      encryptedCallData: "0x", // TODO
      bidSignature: "", // TODO
      encodedBid: "", // TODO
      amount,
      expiry,
    };
    const prepareReceipt = await prepare(
      params,
      this.chains[sendingChainId].listener.getTransactionManager(),
      this.signer,
      this.logger,
    );

    // wait for completed event
    const event = await completed;
    return { prepareReceipt, completed: event };
  }

  private setupListeners(): void {
    Object.entries(this.chains).forEach(([chainId, { listener }]) => {
      // Always broadcast signature when a receiver-side prepare event is emitted
      listener.attach(NxtpSdkEvents.TransactionPrepared, async (data) => {
        const { txData, encodedBid, caller, bidSignature, encryptedCallData } = data;
        if (txData.receivingChainId !== listener.chainId!) {
          this.logger.debug(
            {
              transaction: txData.transactionId,
              sendingChain: txData.sendingChainId,
              receivingChain: txData.receivingChainId,
              chainId: listener.chainId!,
            },
            "Nothing to handle",
          );
          return;
        }
        // Always automatically broadcast signatures for recieving chain
        if (this.fulfilling[txData.transactionId]) {
          // NOTE: this is more for debugging
          // than anything, not harmful if
          // metatxs are picked up 2x (other
          // than relayers wasting gas)
          this.logger.warn({ ...data }, "Already fulfilling, got an additional event");
        }
        // TODO: how to handle relayer fees here? will need before signing
        this.logger.info({ ...data }, "Handling receiver tx prepared event");
        this.fulfilling[txData.transactionId] = data;
        await handleReceiverPrepare(
          {
            txData,
            caller,
            encryptedCallData,
            bidSignature,
            encodedBid,
          },
          listener.getTransactionManager(),
          this.signer,
          this.messaging,
          this.logger,
        );

        delete this.fulfilling[txData.transactionId];
      });

      // Emit transaction completed event when receiver-side fulfill event is
      // emitted
      // TODO: what if this is an asynchronous event? i.e. happens when a tx is
      // fulfilled as you're switching between chains in the UI? (ie going from
      // matic to bsc then bsc to matic and router fulfills)
      listener.attach(
        NxtpSdkEvents.TransactionFulfilled,
        async (data) => {
          this.evts[NxtpSdkEvents.TransactionCompleted].post(data);
        },
        (data) => data.txData.receivingChainId === parseInt(chainId),
      );

      // Parrot all chain events
      Object.keys(this.evts).forEach((_event: string) => {
        if (_event === NxtpSdkEvents.TransactionCompleted) {
          return;
        }
        const event = _event as NxtpSdkEvent;
        listener.attach(event, (data) => {
          this.evts[event].post(data as any);
        });
      });
    });
  }

  // Listener methods
  public attach<T extends NxtpSdkEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attach(...(args as [number, any]));
  }

  public attachOnce<T extends NxtpSdkEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attachOnce(...(args as [number, any]));
  }

  public detach<T extends NxtpSdkEvent>(event?: T): void {
    if (event) {
      this.evts[event].detach();
      return;
    }
    Object.values(this.evts).forEach((evt) => evt.detach());
  }

  public waitFor<T extends NxtpSdkEvent>(
    event: T,
    timeout: number,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
  ): Promise<NxtpSdkEventPayloads[T]> {
    return this.evts[event].pipe(filter).waitFor(timeout) as Promise<NxtpSdkEventPayloads[T]>;
  }
}
