import Ajv from "ajv";
import addFormats from "ajv-formats";
import { constants, Contract, providers, Signer, utils } from "ethers";
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
  TransactionData,
  CancelParams,
} from "@connext/nxtp-utils";
import { BaseLogger } from "pino";
import { Type, Static } from "@sinclair/typebox";
import ERC20 from "@connext/nxtp-contracts/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";
import { IERC20Minimal } from "@connext/nxtp-contracts/typechain";

import { cancel, handleReceiverPrepare, prepare } from "./crossChainTransfer";
import {
  getActiveTransactionsByUser,
  getVariantHashByInvariantData,
  TransactionManagerEvents,
  TransactionManagerListener,
} from "./utils";

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

export const NxtpSdkEvents = {
  SenderTransactionPrepared: "SenderTransactionPrepared",
  SenderTransactionFulfilled: "SenderTransactionFulfilled",
  SenderTransactionCancelled: "SenderTransactionCancelled",
  ReceiverTransactionPrepared: "ReceiverTransactionPrepared",
  ReceiverTransactionFulfilled: "ReceiverTransactionFulfilled",
  ReceiverTransactionCancelled: "ReceiverTransactionCancelled",
} as const;
export type NxtpSdkEvent = typeof NxtpSdkEvents[keyof typeof NxtpSdkEvents];

// TODO: is this the event payload we want? anything else?
export type TransactionCompletedEvent = TransactionFulfilledEvent;

export interface NxtpSdkEventPayloads {
  [NxtpSdkEvents.SenderTransactionPrepared]: TransactionPreparedEvent;
  [NxtpSdkEvents.SenderTransactionFulfilled]: TransactionFulfilledEvent;
  [NxtpSdkEvents.SenderTransactionCancelled]: TransactionCancelledEvent;
  [NxtpSdkEvents.ReceiverTransactionPrepared]: TransactionPreparedEvent;
  [NxtpSdkEvents.ReceiverTransactionFulfilled]: TransactionFulfilledEvent;
  [NxtpSdkEvents.ReceiverTransactionCancelled]: TransactionCancelledEvent;
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
    [NxtpSdkEvents.SenderTransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [NxtpSdkEvents.SenderTransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
    [NxtpSdkEvents.SenderTransactionCancelled]: Evt.create<TransactionCancelledEvent>(),
    [NxtpSdkEvents.ReceiverTransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [NxtpSdkEvents.ReceiverTransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
    [NxtpSdkEvents.ReceiverTransactionCancelled]: Evt.create<TransactionCancelledEvent>(),
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

    // Start up transaction manager listeners
    const listeners = await Promise.all(
      Object.entries(chainProviders).map(async ([chainId, chainProvider]) => {
        const listener = new TransactionManagerListener(chainProvider, parseInt(chainId), logger);
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

    // only need to connect messaging on transfer
    if (!this.messaging.isConnected()) {
      await this.messaging.connect();
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

    const transactionId = transferParams.transactionId ?? getRandomBytes32();

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
      bidSignature: "0x", // TODO
      encodedBid: "0x", // TODO
      amount,
      expiry,
    };
    let erc20;
    if (sendingAssetId !== constants.AddressZero) {
      erc20 = new Contract(sendingAssetId, ERC20.abi, this.signer) as IERC20Minimal;
    }
    const prepareReceipt = await prepare(
      params,
      this.chains[sendingChainId].listener.transactionManager,
      this.signer,
      this.logger,
      erc20,
    );

    // wait for completed event
    const timeout = 300_000;
    const completed = this.evts.ReceiverTransactionFulfilled.pipe(
      (data) => data.txData.transactionId === transactionId,
    ).waitFor(timeout);
    const event = await completed;
    return { prepareReceipt, completed: event };
  }

  public async getActiveTransactions(): Promise<{ txData: TransactionData; status: NxtpSdkEvent }[]> {
    const signerAddress = await this.signer.getAddress();
    const transactionsForChains = await Promise.all(
      Object.keys(this.chains).map(async (c): Promise<[chainId: number, txs: TransactionPreparedEvent[]]> => {
        const chainId = parseInt(c);
        const active = await getActiveTransactionsByUser(chainId, signerAddress, this.chains[chainId].provider);
        return [chainId, active];
      }),
    );

    // active transaction is determined by the combo of sender and receiver txs
    const activeWithStatus = await Promise.all(
      transactionsForChains.map(async ([chainId, txs]) => {
        return await Promise.all(
          txs.map(async (tx): Promise<(TransactionPreparedEvent & { status: NxtpSdkEvent }) | undefined> => {
            if (tx.txData.receivingChainId === chainId) {
              // receiver active transactions are automatically ReceiverTransactionPrepared
              return {
                txData: tx.txData,
                status: NxtpSdkEvents.ReceiverTransactionPrepared,
                bidSignature: tx.bidSignature,
                caller: tx.caller,
                encodedBid: tx.encodedBid,
                encryptedCallData: tx.encryptedCallData,
              };
            } else if (tx.txData.sendingChainId === chainId) {
              // use receiver status to determine sender side
              const hash = await getVariantHashByInvariantData(
                tx.txData.receivingChainId,
                {
                  user: tx.txData.user,
                  router: tx.txData.router,
                  sendingAssetId: tx.txData.sendingAssetId,
                  receivingAssetId: tx.txData.receivingAssetId,
                  sendingChainFallback: tx.txData.sendingChainFallback,
                  callTo: tx.txData.callTo,
                  receivingAddress: tx.txData.receivingAddress,
                  sendingChainId: tx.txData.sendingChainId,
                  receivingChainId: tx.txData.receivingChainId,
                  callDataHash: tx.txData.callDataHash,
                  transactionId: tx.txData.transactionId,
                },
                this.chains[tx.txData.receivingChainId].provider,
              );
              // default to receiver fulfilled
              let status: NxtpSdkEvent = NxtpSdkEvents.ReceiverTransactionFulfilled;
              if (hash === constants.HashZero) {
                // if hash is empty, transfer has not been created on receiver side
                status = NxtpSdkEvents.SenderTransactionPrepared;
              } else {
                // else check if its in active transfers, if so, its prepared
                const receivingActiveTxs = transactionsForChains.find(([cId]) => cId === tx.txData.receivingChainId);
                if (receivingActiveTxs) {
                  const activeReceiving = receivingActiveTxs[1].find(
                    (t) => t.txData.transactionId === tx.txData.transactionId,
                  );
                  if (activeReceiving) {
                    status = NxtpSdkEvents.ReceiverTransactionPrepared;
                  }
                }
              }
              return {
                txData: tx.txData,
                status,
                bidSignature: tx.bidSignature,
                caller: tx.caller,
                encodedBid: tx.encodedBid,
                encryptedCallData: tx.encryptedCallData,
              };
            }
            return undefined;
          }),
        );
      }),
    );
    const filtered = activeWithStatus.flat().filter((x) => !!x);
    const ids = filtered.map((t) => t?.txData.transactionId);
    const deduped = filtered.filter((t, index) => !ids.includes(t?.txData.transactionId, index + 1));
    const receiverPrepared = deduped.filter((d) => d?.status === NxtpSdkEvents.ReceiverTransactionPrepared);
    // connect messaging if needed
    if (receiverPrepared.length > 0) {
      if (!this.messaging.isConnected()) {
        await this.messaging.connect();
      }
    }
    receiverPrepared.forEach(async (tx) => {
      // rebroadcast sig
      this.logger.info({ txData: tx!.txData }, "Rebroadcasting receiver prepare sig");
      await handleReceiverPrepare(
        {
          txData: tx!.txData,
          bidSignature: tx!.bidSignature,
          caller: tx!.caller,
          encodedBid: tx!.encodedBid,
          encryptedCallData: tx!.encryptedCallData,
        },
        this.chains[tx!.txData.receivingChainId].listener.transactionManager,
        this.signer,
        this.messaging,
        this.logger,
      );
      this.logger.info({ txData: tx!.txData }, "Broadcasted receiver prepare sig");
    });
    return deduped as { txData: TransactionData; status: NxtpSdkEvent }[];
  }

  public async cancelExpired(cancelParams: CancelParams, chainId: number): Promise<providers.TransactionReceipt> {
    const tx = await cancel(cancelParams, this.chains[chainId].listener.transactionManager, this.signer, this.logger);
    return tx;
  }

  private setupListeners(): void {
    Object.values(this.chains).forEach(({ listener }) => {
      // Always broadcast signature when a receiver-side prepare event is emitted
      this.attach(NxtpSdkEvents.ReceiverTransactionPrepared, async (data) => {
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
        this.fulfilling[txData.transactionId] = { ...data, chainId: listener.chainId };
        if (!this.messaging.isConnected()) {
          await this.messaging.connect();
        }
        await handleReceiverPrepare(
          {
            txData,
            caller,
            encryptedCallData,
            bidSignature,
            encodedBid,
          },
          listener.transactionManager,
          this.signer,
          this.messaging,
          this.logger,
        );

        delete this.fulfilling[txData.transactionId];
      });

      // Translate chain events to SDK external events
      listener.attach(TransactionManagerEvents.TransactionPrepared, (data) => {
        if (listener.chainId === data.txData.sendingChainId) {
          return this.evts[NxtpSdkEvents.SenderTransactionPrepared].post(data);
        }
        if (listener.chainId === data.txData.receivingChainId) {
          return this.evts[NxtpSdkEvents.ReceiverTransactionPrepared].post(data);
        }
        return;
      });

      listener.attach(TransactionManagerEvents.TransactionFulfilled, (data) => {
        if (listener.chainId === data.txData.sendingChainId) {
          return this.evts[NxtpSdkEvents.SenderTransactionFulfilled].post(data);
        }
        if (listener.chainId === data.txData.receivingChainId) {
          return this.evts[NxtpSdkEvents.ReceiverTransactionFulfilled].post(data);
        }
        return;
      });

      listener.attach(TransactionManagerEvents.TransactionCancelled, (data) => {
        if (listener.chainId === data.txData.sendingChainId) {
          return this.evts[NxtpSdkEvents.SenderTransactionCancelled].post(data);
        }
        if (listener.chainId === data.txData.receivingChainId) {
          return this.evts[NxtpSdkEvents.ReceiverTransactionCancelled].post(data);
        }
        return;
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
