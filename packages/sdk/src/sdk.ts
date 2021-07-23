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
  TransactionData,
  CancelParams,
  encrypt,
  generateMessagingInbox,
  AuctionResponse,
  encodeAuctionBid,
  recoverAuctionBid,
  InvariantTransactionData,
  signFulfillTransactionPayload,
  MetaTxResponse,
  jsonifyError,
  NxtpError,
  NxtpErrorJson,
  Values,
} from "@connext/nxtp-utils";
import pino, { BaseLogger } from "pino";
import { Type, Static } from "@sinclair/typebox";
import { errAsync, okAsync, ResultAsync } from "neverthrow";

import {
  TransactionManager,
  getDeployedTransactionManagerContractAddress,
  TransactionManagerError,
} from "./transactionManager";
import { TransactionManagerEvents } from "./listener";
import { getDeployedSubgraphUri, Subgraph } from "./subgraph";

export const getExpiry = () => Math.floor(Date.now() / 1000) + 3600 * 24 * 3;
export const getMinExpiryBuffer = () => 3600 * 24 * 2 + 3600;

declare const ethereum: any; // TODO: what to do about node?

export const CrossChainParamsSchema = Type.Object({
  callData: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]*$/)),
  sendingChainId: TChainId,
  sendingAssetId: TAddress,
  receivingChainId: TChainId,
  receivingAssetId: TAddress,
  callTo: Type.Optional(TAddress),
  receivingAddress: TAddress,
  amount: TIntegerString,
  expiry: Type.Optional(Type.Number()),
  transactionId: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]{64}$/)),
  dryRun: Type.Optional(Type.Boolean()),
});

export type CrossChainParams = Static<typeof CrossChainParamsSchema>;

export const NxtpSdkEvents = {
  SenderTransactionPrepareTokenApproval: "SenderTokenApprovalSubmitted",
  SenderTokenApprovalMined: "SenderTokenApprovalMined",
  SenderTransactionPrepareSubmitted: "SenderTransactionPrepareSubmitted",
  SenderTransactionPrepared: "SenderTransactionPrepared",
  SenderTransactionFulfilled: "SenderTransactionFulfilled",
  SenderTransactionCancelled: "SenderTransactionCancelled",
  ReceiverPrepareSigned: "ReceiverPrepareSigned",
  ReceiverTransactionPrepared: "ReceiverTransactionPrepared",
  ReceiverTransactionFulfilled: "ReceiverTransactionFulfilled",
  ReceiverTransactionCancelled: "ReceiverTransactionCancelled",
} as const;
export type NxtpSdkEvent = typeof NxtpSdkEvents[keyof typeof NxtpSdkEvents];

export type TransactionCompletedEvent = TransactionFulfilledEvent;

export type SenderTransactionPrepareTokenApprovalPayload = {
  assetId: string;
  chainId: number;
  transactionResponse: providers.TransactionResponse;
};

export type SenderTokenApprovalMinedPayload = {
  assetId: string;
  chainId: number;
  transactionReceipt: providers.TransactionReceipt;
};

export type SenderTransactionPrepareSubmittedPayload = {
  prepareParams: PrepareParams;
  transactionResponse: providers.TransactionResponse;
};

export type ReceiverPrepareSignedPayload = {
  signature: string;
  signer: string;
  transactionId: string;
};

export interface NxtpSdkEventPayloads {
  [NxtpSdkEvents.SenderTransactionPrepareTokenApproval]: SenderTransactionPrepareTokenApprovalPayload;
  [NxtpSdkEvents.SenderTokenApprovalMined]: SenderTokenApprovalMinedPayload;
  [NxtpSdkEvents.SenderTransactionPrepareSubmitted]: SenderTransactionPrepareSubmittedPayload;
  [NxtpSdkEvents.SenderTransactionPrepared]: TransactionPreparedEvent;
  [NxtpSdkEvents.SenderTransactionFulfilled]: TransactionFulfilledEvent;
  [NxtpSdkEvents.SenderTransactionCancelled]: TransactionCancelledEvent;
  [NxtpSdkEvents.ReceiverPrepareSigned]: ReceiverPrepareSignedPayload;
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

export const createEvts = (): { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } => {
  return {
    [NxtpSdkEvents.SenderTransactionPrepareTokenApproval]: Evt.create<SenderTransactionPrepareTokenApprovalPayload>(),
    [NxtpSdkEvents.SenderTokenApprovalMined]: Evt.create<SenderTokenApprovalMinedPayload>(),
    [NxtpSdkEvents.SenderTransactionPrepareSubmitted]: Evt.create<SenderTransactionPrepareSubmittedPayload>(),
    [NxtpSdkEvents.SenderTransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [NxtpSdkEvents.SenderTransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
    [NxtpSdkEvents.SenderTransactionCancelled]: Evt.create<TransactionCancelledEvent>(),
    [NxtpSdkEvents.ReceiverPrepareSigned]: Evt.create<ReceiverPrepareSignedPayload>(),
    [NxtpSdkEvents.ReceiverTransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [NxtpSdkEvents.ReceiverTransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
    [NxtpSdkEvents.ReceiverTransactionCancelled]: Evt.create<TransactionCancelledEvent>(),
  };
};

export class NxtpSdkError extends NxtpError {
  static readonly type = "NxtpSdkError";
  static readonly reasons = {
    ApprovalError: "Error approving tokens",
    SigningError: "Signing error",
    MessagingError: "Messaging error",
    TxError: "Transaction Error",
    ParamsError: "Invalid Parameters",
    ConfigError: "Invalid Config",
    AuctionError: "Auction Error",
  };

  constructor(
    public readonly message: Values<typeof TransactionManagerError.reasons> | string,
    public readonly context: {
      paramsError?: string;
      configError?: string;
      transactionId: string;
      methodId: string;
      method: string;
      txError?: NxtpErrorJson;
      signerError?: NxtpErrorJson;
      messagingError?: NxtpErrorJson;
      auctionError?: string;
    },
  ) {
    super(message, context, TransactionManagerError.type);
  }
}

export class NxtpSdk {
  private evts: { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } = createEvts();
  private readonly transactionManager: TransactionManager;
  private readonly messaging: UserNxtpNatsMessagingService;
  private readonly subgraph: Subgraph;

  private listenersEstablished = false;

  constructor(
    private readonly chainConfig: {
      [chainId: number]: {
        provider: providers.FallbackProvider;
        transactionManagerAddress?: string;
        subgraph?: string;
      };
    },
    private signer: Signer,
    network?: "testnet" | "mainnet", // TODO
    private readonly logger: BaseLogger = pino(),
    doNotStartContractListeners = false,
    natsUrl?: string,
    authUrl?: string,
    messaging?: UserNxtpNatsMessagingService,
  ) {
    if (messaging) {
      this.messaging = messaging;
    } else {
      this.messaging = new UserNxtpNatsMessagingService({
        signer,
        logger: logger.child({ module: "UserNxtpNatsMessagingService" }),
        natsUrl,
        authUrl,
      });
    }

    const txManagerConfig: Record<
      number,
      {
        provider: providers.FallbackProvider;
        transactionManagerAddress: string;
      }
    > = {};

    const subgraphConfig: Record<
      number,
      {
        subgraph: string;
      }
    > = {};

    // create configs for subclasses based on passed-in config
    Object.entries(this.chainConfig).forEach(
      async ([_chainId, { provider, transactionManagerAddress: _transactionManagerAddress, subgraph: _subgraph }]) => {
        const chainId = parseInt(_chainId);

        let transactionManagerAddress = _transactionManagerAddress;
        if (!transactionManagerAddress) {
          transactionManagerAddress = getDeployedTransactionManagerContractAddress(chainId);
        }
        if (!transactionManagerAddress) {
          throw new Error(`Unable to get transactionManagerAddress for ${chainId}, please provide override`);
        }
        txManagerConfig[chainId] = {
          provider,
          transactionManagerAddress,
        };

        let subgraph = _subgraph;
        if (!subgraph) {
          subgraph = getDeployedSubgraphUri(chainId);
        }
        if (!subgraph) {
          throw new Error(`Unable to get subgraph for ${chainId}, please provide override`);
        }
        subgraphConfig[chainId] = {
          subgraph,
        };
      },
    );
    this.transactionManager = new TransactionManager(
      this.signer,
      txManagerConfig,
      this.logger.child({ module: "TransactionManager" }),
    );
    this.subgraph = new Subgraph(this.signer, subgraphConfig, this.logger.child({ module: "Subgraph" }));

    // Start up transaction manager listeners
    if (!doNotStartContractListeners) {
      this.setupListeners();
    }
  }

  public async connectMessaging(bearerToken?: string): Promise<string> {
    const token = await this.messaging.connect(bearerToken);
    return token;
  }

  public async getActiveTransactions(): Promise<{ txData: TransactionData; status: NxtpSdkEvent }[]> {
    const txs = await this.subgraph.getActiveTransactions();
    return txs;
  }

  // TODO: add slippage tolerance
  public async getTransferQuote(params: CrossChainParams): Promise<AuctionResponse> {
    const method = "getTransferQuote";
    const methodId = getRandomBytes32();
    this.logger.info({ method, methodId, params }, "Method started");

    // Validate params schema
    const validate = ajv.compile(CrossChainParamsSchema);
    const valid = validate(params);
    if (!valid) {
      const error = validate.errors?.map((err) => `${err.instancePath} - ${err.message}`).join(",");
      this.logger.error({ method, methodId, error: validate.errors, params }, "Invalid transfer params");
      throw new NxtpSdkError(NxtpSdkError.reasons.ParamsError, {
        method,
        methodId,
        paramsError: error,
        transactionId: params.transactionId ?? "",
      });
    }

    const user = await this.signer.getAddress();

    const {
      sendingAssetId,
      sendingChainId,
      amount,
      receivingChainId,
      receivingAssetId,
      receivingAddress,
      expiry: _expiry,
      dryRun,
    } = params;
    if (!this.chainConfig[sendingChainId] || !this.chainConfig[receivingChainId]) {
      throw new NxtpSdkError(NxtpSdkError.reasons.ConfigError, {
        method,
        methodId,
        configError: `Not configured for for chains ${sendingChainId} & ${receivingChainId}`,
        transactionId: params.transactionId ?? "",
      });
    }

    const expiry = _expiry ?? getExpiry();
    if (expiry - Date.now() / 1000 < getMinExpiryBuffer()) {
      throw new NxtpSdkError(NxtpSdkError.reasons.ParamsError, {
        method,
        methodId,
        paramsError: `Expiry too short, must be at least ${Date.now() / 1000 + getMinExpiryBuffer()}`,
        transactionId: params.transactionId ?? "",
      });
    }

    const transactionId = params.transactionId ?? getRandomBytes32();
    const callTo = params.callTo ?? constants.AddressZero;
    const callData = params.callData ?? "0x";

    let encryptedCallData = "0x";
    const callDataHash = utils.keccak256(callData);
    if (callData !== "0x") {
      let encryptionPublicKey;

      try {
        encryptionPublicKey = await ethereum.request({
          method: "eth_getEncryptionPublicKey",
          params: [user], // you must have access to the specified account
        });
      } catch (error) {
        let paramsError = "Error getting encryption key";
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          paramsError = "User rejected encryption key request";
        }
        throw new NxtpSdkError(NxtpSdkError.reasons.ParamsError, {
          method,
          methodId,
          paramsError,
          transactionId: params.transactionId ?? "",
        });
      }

      encryptedCallData = await encrypt(callData, encryptionPublicKey);
    }

    if (!this.messaging.isConnected()) {
      await this.messaging.connect();
    }

    const inbox = generateMessagingInbox();
    const receivedResponsePromise = new Promise<AuctionResponse>((res, rej) => {
      setTimeout(() => rej(), 10_000);
      this.messaging.subscribeToAuctionResponse(inbox, (data, err) => {
        if (err || !data) {
          this.logger.error({ method, methodId, err, data }, "Error in auction response");
          return;
        }

        // dry run, return first response
        if (!data.bidSignature) {
          res(data);
          return;
        }

        // check router sig on bid
        const signer = recoverAuctionBid(data.bid, data.bidSignature);
        if (signer !== data.bid.router) {
          this.logger.error({ method, methodId, signer, router: data.bid.router }, "Invalid router signature on bid");
          return;
        }

        // TODO: check contract for router liquidity
        // TODO: check response for receivedAmount for tolerance

        // TODO: compare multiple responses

        this.logger.info({ method, methodId, data }, "Received auction response");
        res(data);
      });
    });

    await this.messaging.publishAuctionRequest(
      {
        user,
        sendingChainId,
        sendingAssetId,
        amount,
        receivingChainId,
        receivingAssetId,
        receivingAddress,
        callTo,
        callDataHash,
        encryptedCallData,
        expiry,
        transactionId,
        dryRun: !!dryRun,
      },
      inbox,
    );

    this.logger.info({ method, methodId }, "Waiting up to 10 seconds for responses");
    try {
      const auctionResponse = await receivedResponsePromise;
      this.logger.info({ method, methodId, auctionResponse }, "Received response");
      return auctionResponse;
    } catch (e) {
      throw new NxtpSdkError(NxtpSdkError.reasons.AuctionError, {
        method,
        methodId,
        transactionId,
        auctionError: "No response received",
      });
    }
  }

  public async startTransfer(
    transferParams: AuctionResponse,
    infiniteApprove = false,
  ): Promise<{ prepareResponse: providers.TransactionResponse; transactionId: string }> {
    const method = "transfer";
    const methodId = getRandomBytes32();
    this.logger.info({ method, methodId, transferParams }, "Method started");

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
    } = bid;
    const encodedBid = encodeAuctionBid(bid);

    if (!this.chainConfig[sendingChainId] || !this.chainConfig[receivingChainId]) {
      throw new NxtpSdkError(NxtpSdkError.reasons.ConfigError, {
        method,
        methodId,
        configError: `Not configured for for chains ${sendingChainId} & ${receivingChainId}`,
        transactionId,
      });
    }

    if (!bidSignature) {
      throw new NxtpSdkError(NxtpSdkError.reasons.ParamsError, {
        method,
        methodId,
        transactionId,
        paramsError: "bidSignature not available",
      });
    }

    this.logger.info(
      {
        method,
        methodId,
        amount,
        expiry,
        encodedBid,
        bidSignature,
      },
      "Preparing tx!",
    );

    if (sendingAssetId !== constants.AddressZero) {
      const approveRes = await this.transactionManager
        .approveTokensIfNeeded(sendingChainId, sendingAssetId, amount, infiniteApprove)
        .andThen((approveTx) => {
          // handle optional approval
          if (approveTx) {
            this.evts.SenderTokenApprovalSubmitted.post({
              assetId: sendingAssetId,
              chainId: sendingChainId,
              transactionResponse: approveTx,
            });
            return ResultAsync.fromPromise(
              approveTx.wait(1),
              (err) =>
                new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
                  txError: jsonifyError(err as NxtpError),
                  method,
                  methodId,
                }),
            );
          }
          return okAsync(undefined);
        })
        .andThen((approveReceipt) => {
          // handle optional approval
          if (approveReceipt) {
            if (approveReceipt?.status === 0) {
              return errAsync(
                new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
                  approveReceipt,
                  method,
                  methodId,
                }),
              );
            }
            this.logger.info(
              { method, methodId, transactionId, transactionHash: approveReceipt.transactionHash },
              "Mined approve tx",
            );
            this.evts.SenderTokenApprovalMined.post({
              assetId: sendingAssetId,
              chainId: sendingChainId,
              transactionReceipt: approveReceipt,
            });
          }
          return okAsync(approveReceipt);
        });

      if (approveRes.isOk()) {
        this.logger.info({ method, methodId, approveRes: approveRes.value }, "Approval complete");
      } else {
        throw approveRes.error;
      }
    }

    // Prepare sender side tx
    const txData: InvariantTransactionData = {
      user,
      router,
      sendingAssetId,
      receivingAssetId,
      sendingChainFallback: user,
      callTo,
      receivingAddress,
      sendingChainId,
      receivingChainId,
      callDataHash,
      transactionId,
    };
    const params: PrepareParams = {
      txData,
      encryptedCallData,
      bidSignature,
      encodedBid,
      amount,
      expiry,
    };
    const prepareRes = await this.transactionManager.prepare(sendingChainId, params);

    if (prepareRes.isOk()) {
      this.evts.SenderTransactionPrepareSubmitted.post({
        prepareParams: params,
        transactionResponse: prepareRes.value,
      });
      return { prepareResponse: prepareRes.value, transactionId };
    } else {
      throw prepareRes.error;
    }
  }

  public async finishTransfer(
    params: TransactionPreparedEvent,
    relayerFee = "0",
    useRelayers = true,
  ): Promise<{ fulfillResponse?: providers.TransactionResponse; metaTxResponse?: MetaTxResponse }> {
    const method = "finishTransfer";
    const methodId = getRandomBytes32();
    this.logger.info({ method, methodId, params, useRelayers }, "Method started");

    const { txData, encryptedCallData } = params;

    const signerAddress = await this.signer.getAddress();

    this.logger.info({ method, methodId, transactionId: params.txData.transactionId }, "Generating fulfill signature");
    let signature: string;
    const prepareRes = ResultAsync.fromPromise(
      // Generate signature
      signFulfillTransactionPayload(txData.transactionId, relayerFee, this.signer),
      (err) =>
        new NxtpSdkError(NxtpSdkError.reasons.SigningError, {
          method,
          methodId,
          transactionId: txData.transactionId,
          signerError: jsonifyError(err as Error),
        }),
    )
      .andThen((_signature) => {
        this.logger.info({ method, methodId, signature }, "Generated signature");
        signature = _signature;
        this.evts.ReceiverPrepareSigned.post({ signature, transactionId: txData.transactionId, signer: signerAddress });
        if (!this.messaging.isConnected()) {
          return ResultAsync.fromPromise(
            this.messaging.connect(),
            (err) =>
              new NxtpSdkError(NxtpSdkError.reasons.MessagingError, {
                method,
                methodId,
                transactionId: txData.transactionId,
                messagingError: jsonifyError(err as Error),
              }),
          );
        }
        return okAsync(undefined);
      })
      .andThen(() => {
        this.logger.info({ method, methodId, transactionId: txData.transactionId, relayerFee }, "Preparing fulfill tx");
        let callData = "0x";
        if (txData.callDataHash !== utils.keccak256(callData)) {
          return ResultAsync.fromPromise(
            new Promise<{ callData: string; signature: string }>(async (res) => {
              callData = await ethereum.request({
                method: "eth_decrypt",
                params: [encryptedCallData, txData.user],
              });
              res({ callData, signature });
            }),
            (err) =>
              new NxtpSdkError(NxtpSdkError.reasons.SigningError, {
                method,
                methodId,
                transactionId: txData.transactionId,
                messagingError: jsonifyError(err as Error),
              }),
          );
        }
        return okAsync({ callData, signature });
      });

    if (useRelayers) {
      // send through messaging to metatx relayers
      const metaTxRes = await prepareRes.andThen(({ callData, signature }) => {
        const responseInbox = generateMessagingInbox();

        return ResultAsync.fromPromise(
          new Promise<MetaTxResponse>(async (resolve, reject) => {
            if (!this.messaging.isConnected()) {
              await this.messaging.connect();
            }

            await this.messaging.subscribeToMetaTxResponse(responseInbox, (data, err) => {
              this.logger.info({ method, methodId, data, err }, "MetaTx response received");
              if (err || !data) {
                return reject(err);
              }
              this.logger.info({ method, methodId, responseInbox, data }, "Fulfill metaTx response received");
              return resolve(data);
            });

            await this.messaging.publishMetaTxRequest(
              {
                type: "Fulfill",
                relayerFee,
                to: this.transactionManager.getTransactionManagerAddress(txData.receivingChainId),
                chainId: txData.receivingChainId,
                data: {
                  relayerFee,
                  signature,
                  txData,
                  callData,
                },
              },
              responseInbox,
            );
          }),
          (err) =>
            new NxtpSdkError(NxtpSdkError.reasons.MessagingError, {
              method,
              methodId,
              transactionId: txData.transactionId,
              messagingError: jsonifyError(err as Error),
            }),
        );
      });

      if (metaTxRes.isOk()) {
        this.logger.info({ method, methodId }, "Method complete");
        return { metaTxResponse: metaTxRes.value };
      } else {
        throw metaTxRes.error;
      }
    } else {
      const fulfillRes = await prepareRes.andThen(({ callData, signature }) => {
        return this.transactionManager.fulfill(txData.receivingChainId, {
          callData,
          relayerFee,
          signature,
          txData,
        });
      });
      if (fulfillRes.isOk()) {
        this.logger.info({ method, methodId }, "Method complete");
        return { fulfillResponse: fulfillRes.value };
      } else {
        throw fulfillRes.error;
      }
    }
  }

  public async cancelExpired(cancelParams: CancelParams, chainId: number): Promise<providers.TransactionResponse> {
    const method = this.cancelExpired.name;
    const methodId = getRandomBytes32();
    this.logger.info({ method, methodId, cancelParams, chainId }, "Method started");
    const cancelRes = await this.transactionManager.cancel(chainId, cancelParams);
    if (cancelRes.isOk()) {
      this.logger.info({ method, methodId }, "Method complete");
      return cancelRes.value;
    } else {
      throw cancelRes.error;
    }
  }

  public changeInjectedSigner(signer: Signer) {
    this.signer = signer;
  }

  public establishListeners(): void {
    this.transactionManager.establishListeners();
    this.setupListeners();
  }

  public removeAllListeners(): void {
    this.messaging.disconnect();
    this.transactionManager.removeAllListeners();
    this.detach();
    this.listenersEstablished = false;
  }

  private setupListeners(): void {
    // idempotency
    if (this.listenersEstablished) {
      return;
    }
    Object.keys(this.chainConfig).forEach((_chainId) => {
      const chainId = parseInt(_chainId);
      // Translate chain events to SDK external events
      this.transactionManager.attach(chainId, TransactionManagerEvents.TransactionPrepared, (data) => {
        if (chainId === data.txData.sendingChainId) {
          return this.evts[NxtpSdkEvents.SenderTransactionPrepared].post(data);
        }
        if (chainId === data.txData.receivingChainId) {
          return this.evts[NxtpSdkEvents.ReceiverTransactionPrepared].post(data);
        }
        return;
      });

      this.transactionManager.attach(chainId, TransactionManagerEvents.TransactionFulfilled, (data) => {
        if (chainId === data.txData.sendingChainId) {
          this.evts[NxtpSdkEvents.SenderTransactionFulfilled].post(data);
        } else if (chainId === data.txData.receivingChainId) {
          this.evts[NxtpSdkEvents.ReceiverTransactionFulfilled].post(data);
        }
      });

      this.transactionManager.attach(chainId, TransactionManagerEvents.TransactionCancelled, (data) => {
        if (chainId === data.txData.sendingChainId) {
          this.evts[NxtpSdkEvents.SenderTransactionCancelled].post(data);
        } else if (chainId === data.txData.receivingChainId) {
          this.evts[NxtpSdkEvents.ReceiverTransactionCancelled].post(data);
        }
      });
    });
    this.listenersEstablished = true;
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
