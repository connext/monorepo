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

declare const ethereum: any;

export const CrossChainParamsSchema = Type.Object({
  callData: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]*$/)),
  sendingChainId: TChainId,
  sendingAssetId: TAddress,
  receivingChainId: TChainId,
  receivingAssetId: TAddress,
  callTo: Type.Optional(TAddress),
  receivingAddress: TAddress,
  amount: TIntegerString,
  expiry: Type.Number(),
  transactionId: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]{64}$/)),
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

// TODO: is this the event payload we want? anything else?
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
  };

  constructor(
    public readonly message: Values<typeof TransactionManagerError.reasons> | string,
    public readonly context: {
      transactionId: string;
      methodId: string;
      method: string;
      txError?: NxtpErrorJson;
      signerError?: NxtpErrorJson;
      messagingError?: NxtpErrorJson;
    },
  ) {
    super(message, context, TransactionManagerError.type);
  }
}

/**
 * Lightweight class to facilitate interaction with the TransactionManager contract on configured chains.
 *
 */
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
    private readonly logger: BaseLogger = pino(),
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
    this.setupListeners();
  }

  /**
   * Connects the messaging service used by the user
   *
   * @param bearerToken - (optional) The messaging bearer token. If not provided, one will be created and returned
   *
   * @returns The used bearer token
   */
  public async connectMessaging(bearerToken?: string): Promise<string> {
    const token = await this.messaging.connect(bearerToken);
    return token;
  }

  /**
   * Gets all the transactions that could require user action from the subgraph across all configured chains
   *
   * @returns An array of the active transactions and their status
   */
  public async getActiveTransactions(): Promise<{ txData: TransactionData; status: NxtpSdkEvent }[]> {
    const txs = await this.subgraph.getActiveTransactions();
    return txs;
  }

  /**
   * Fetches an estimated quote for a proposed crosschain transfer. Runs an auction to determine the `router` for a transaction and the estimated received value.
   *
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
      throw new Error(`Invalid params - ${error}`);
    }

    const user = await this.signer.getAddress();

    const { sendingAssetId, sendingChainId, amount, receivingChainId, receivingAssetId, receivingAddress, expiry } =
      params;
    if (!this.chainConfig[sendingChainId] || !this.chainConfig[receivingChainId]) {
      throw new Error(`Not configured for for chains ${sendingChainId} & ${receivingChainId}`);
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
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          this.logger.info({ method, methodId }, "We can't encrypt anything without the key.");
        } else {
          this.logger.error({ method, methodId, error }, "Error getting encryption key");
        }
        throw error;
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

        // check router sig on bid
        const signer = recoverAuctionBid(data.bid, data.bidSignature);
        if (signer !== data.bid.router) {
          this.logger.error({ method, methodId, signer, router: data.bid.router }, "Invalid router signature on bid");
          return;
        }

        // TODO: check contract for router liquidity

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
      },
      inbox,
    );

    this.logger.info({ method, methodId }, "Waiting up to 10 seconds for responses");
    try {
      const auctionResponse = await receivedResponsePromise;
      this.logger.info({ method, methodId, auctionResponse }, "Received response");
      return auctionResponse;
    } catch (e) {
      throw new Error("No response received");
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
      throw new Error(`Not configured for for chains ${sendingChainId} & ${receivingChainId}`);
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
      await this.transactionManager
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
        })
        .match(
          () => {
            this.logger.info({ method, methodId }, "Approval complete");
          },
          (err) => {
            throw new NxtpSdkError(NxtpSdkError.reasons.ApprovalError, {
              txError: jsonifyError(err as TransactionManagerError),
              transactionId,
              methodId,
              method,
            });
          },
        );
    }

    // Prepare sender side tx
    // TODO: validate expiry
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
    return await this.transactionManager
      .prepare(sendingChainId, params)
      .andThen((prepareResponse) => {
        this.evts.SenderTransactionPrepareSubmitted.post({
          prepareParams: params,
          transactionResponse: prepareResponse,
        });
        return okAsync(prepareResponse);
      })
      .match(
        (prepareResponse) => {
          return { prepareResponse, transactionId };
        },
        (err) => {
          throw new NxtpSdkError(NxtpSdkError.reasons.ApprovalError, {
            txError: jsonifyError(err as TransactionManagerError),
            transactionId,
            methodId,
            method,
          });
        },
      );
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
      .andThen((signature) => {
        this.logger.info({ method, methodId }, "Generated signature");
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
        return okAsync(signature);
      })
      .andThen((signature) => {
        // Submit fulfill to receiver chain
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
      return await prepareRes
        .andThen(({ callData, signature }) => {
          const responseInbox = generateMessagingInbox();

          return ResultAsync.fromPromise(
            new Promise<{ metaTxResponse?: MetaTxResponse; fulfillResponse?: providers.TransactionResponse }>(
              async (resolve, reject) => {
                if (!this.messaging.isConnected()) {
                  await this.messaging.connect();
                }

                await this.messaging.subscribeToMetaTxResponse(responseInbox, (data, err) => {
                  this.logger.info({ method, methodId, data, err }, "MetaTx response received");
                  if (err || !data) {
                    return reject(err);
                  }
                  this.logger.info({ method, methodId, responseInbox, data }, "Fulfill metaTx response received");
                  return resolve({ metaTxResponse: data, fulfillResponse: undefined });
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
              },
            ),
            (err) =>
              new NxtpSdkError(NxtpSdkError.reasons.MessagingError, {
                method,
                methodId,
                transactionId: txData.transactionId,
                messagingError: jsonifyError(err as Error),
              }),
          );
        })
        .match(
          (res) => res,
          (err) => {
            throw err;
          },
        );
    } else {
      return await prepareRes
        .andThen(({ callData, signature }) => {
          return this.transactionManager
            .fulfill(txData.receivingChainId, {
              callData,
              relayerFee,
              signature,
              txData,
            })
            .map((t) => {
              return { fulfillResponse: t, metaTxResponse: undefined };
            })
            .mapErr(
              (err) =>
                new NxtpSdkError(NxtpSdkError.reasons.TxError, {
                  method,
                  methodId,
                  txError: jsonifyError(err),
                  transactionId: txData.transactionId,
                }),
            );
        })
        .match(
          (res) => res,
          (err) => {
            throw err;
          },
        );
    }
  }

  public async cancelExpired(cancelParams: CancelParams, chainId: number): Promise<providers.TransactionResponse> {
    return await this.transactionManager.cancel(chainId, cancelParams).match(
      (res) => res,
      (err) => {
        throw err;
      },
    );
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
