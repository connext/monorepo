import Ajv from "ajv";
import addFormats from "ajv-formats";
import { constants, providers, Signer, utils, BigNumber } from "ethers";
import { Evt } from "evt";
import {
  getRandomBytes32,
  TIntegerString,
  TAddress,
  UserNxtpNatsMessagingService,
  PrepareParams,
  TransactionPreparedEvent,
  TransactionFulfilledEvent,
  TransactionCancelledEvent,
  TChainId,
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
  calculateExchangeAmount,
  isNode,
  NATS_AUTH_URL,
  NATS_CLUSTER_URL,
  NATS_WS_URL,
  NATS_AUTH_URL_TESTNET,
  NATS_AUTH_URL_LOCAL,
  NATS_CLUSTER_URL_LOCAL,
  NATS_WS_URL_LOCAL,
  NATS_CLUSTER_URL_TESTNET,
  NATS_WS_URL_TESTNET,
  getDeployedSubgraphUri,
} from "@connext/nxtp-utils";
import pino, { BaseLogger } from "pino";
import { Type, Static } from "@sinclair/typebox";
import { errAsync, okAsync, ResultAsync } from "neverthrow";

import {
  TransactionManager,
  getDeployedTransactionManagerContractAddress,
  TransactionManagerError,
} from "./transactionManager";
import { ActiveTransaction, Subgraph, SubgraphEvent, SubgraphEvents } from "./subgraph";

/** Gets the expiry to use for new transfers */
export const getExpiry = () => Math.floor(Date.now() / 1000) + 3600 * 24 * 3;

/** Gets the min expiry buffer to validate */
export const getMinExpiryBuffer = () => 3600 * 24 * 2 + 3600;

export const MAX_SLIPPAGE_TOLERANCE = "15.00"; // 15.0%
export const DEFAULT_SLIPPAGE_TOLERANCE = "0.10"; // 0.10%
export const AUCTION_TIMEOUT = 6_000;

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
  slippageTolerance: Type.Optional(Type.String()),
  dryRun: Type.Optional(Type.Boolean()),
});

export type CrossChainParams = Static<typeof CrossChainParamsSchema>;

export const NxtpSdkEvents = {
  SenderTokenApprovalSubmitted: "SenderTokenApprovalSubmitted",
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

export type SenderTokenApprovalSubmittedPayload = {
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

export type SdkEvent<T> = T & {
  transactionHash: string;
};

export type SenderTransactionPreparedPayload = SdkEvent<TransactionPreparedEvent>;
export type SenderTransactionFulfilledPayload = SdkEvent<TransactionFulfilledEvent>;
export type SenderTransactionCancelledPayload = SdkEvent<TransactionCancelledEvent>;
export type ReceiverTransactionPreparedPayload = SdkEvent<TransactionPreparedEvent>;
export type ReceiverTransactionFulfilledPayload = SdkEvent<TransactionFulfilledEvent>;
export type ReceiverTransactionCancelledPayload = SdkEvent<TransactionCancelledEvent>;

export interface NxtpSdkEventPayloads {
  [NxtpSdkEvents.SenderTokenApprovalSubmitted]: SenderTokenApprovalSubmittedPayload;
  [NxtpSdkEvents.SenderTokenApprovalMined]: SenderTokenApprovalMinedPayload;
  [NxtpSdkEvents.SenderTransactionPrepareSubmitted]: SenderTransactionPrepareSubmittedPayload;
  [NxtpSdkEvents.SenderTransactionPrepared]: SenderTransactionPreparedPayload;
  [NxtpSdkEvents.SenderTransactionFulfilled]: SenderTransactionFulfilledPayload;
  [NxtpSdkEvents.SenderTransactionCancelled]: SenderTransactionCancelledPayload;
  [NxtpSdkEvents.ReceiverPrepareSigned]: ReceiverPrepareSignedPayload;
  [NxtpSdkEvents.ReceiverTransactionPrepared]: ReceiverTransactionPreparedPayload;
  [NxtpSdkEvents.ReceiverTransactionFulfilled]: ReceiverTransactionFulfilledPayload;
  [NxtpSdkEvents.ReceiverTransactionCancelled]: ReceiverTransactionCancelledPayload;
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
 * @classdesc An error class containing all errors returned by the SDK
 */
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

/**
 * @classdesc Lightweight class to facilitate interaction with the TransactionManager contract on configured chains.
 *
 */
export class NxtpSdk {
  private evts: { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } = createEvts();
  private readonly transactionManager: TransactionManager;
  private readonly messaging: UserNxtpNatsMessagingService;
  private readonly subgraph: Subgraph;

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
    network: "testnet" | "mainnet" | "local" = "mainnet",
    natsUrl?: string,
    authUrl?: string,
    messaging?: UserNxtpNatsMessagingService,
  ) {
    if (messaging) {
      this.messaging = messaging;
    } else {
      let _natsUrl = natsUrl;
      let _authUrl = authUrl;
      switch (network) {
        case "mainnet": {
          _natsUrl = _natsUrl ?? isNode() ? NATS_CLUSTER_URL : NATS_WS_URL;
          _authUrl = _authUrl ?? NATS_AUTH_URL;
          break;
        }
        case "testnet": {
          _natsUrl = _natsUrl ?? isNode() ? NATS_CLUSTER_URL_TESTNET : NATS_WS_URL_TESTNET;
          _authUrl = _authUrl ?? NATS_AUTH_URL_TESTNET;
          break;
        }
        case "local": {
          _natsUrl = _natsUrl ?? isNode() ? NATS_CLUSTER_URL_LOCAL : NATS_WS_URL_LOCAL;
          _authUrl = _authUrl ?? NATS_AUTH_URL_LOCAL;
          break;
        }
      }

      this.messaging = new UserNxtpNatsMessagingService({
        signer,
        logger: logger.child({ module: "UserNxtpNatsMessagingService" }),
        natsUrl: _natsUrl,
        authUrl: _authUrl,
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
  public async getActiveTransactions(): Promise<ActiveTransaction[]> {
    const txs = await this.subgraph.getActiveTransactions();
    return txs;
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
      slippageTolerance = DEFAULT_SLIPPAGE_TOLERANCE,
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

    if (parseFloat(slippageTolerance) > parseFloat(MAX_SLIPPAGE_TOLERANCE)) {
      throw new NxtpSdkError(NxtpSdkError.reasons.ParamsError, {
        method,
        methodId,
        paramsError: `Slippage Tolerance ${slippageTolerance}, must be lower than ${MAX_SLIPPAGE_TOLERANCE}`,
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

    const auctionBids: AuctionResponse[] = [];

    const receivedResponsePromise = new Promise<AuctionResponse>(async (res, rej) => {
      await new Promise<void>((ext) => {
        setTimeout(() => {
          ext();
        }, AUCTION_TIMEOUT);
        this.messaging.subscribeToAuctionResponse(inbox, async (data, err) => {
          if (err || !data) {
            this.logger.error({ method, methodId, err, data }, "Error in auction response");
          }
          // dry run, return first response
          else if (!data.bidSignature) {
            auctionBids.push(data);
            ext();
          } else {
            // validate bid
            // check router sig on bid
            const signer = recoverAuctionBid(data.bid, data.bidSignature ?? "");
            if (signer !== data.bid.router) {
              this.logger.error(
                { method, methodId, signer, router: data.bid.router },
                "Invalid router signature on bid",
              );
              return;
            }

            // check contract for router liquidity
            const routerLiq = await this.transactionManager.getRouterLiquidity(
              receivingChainId,
              data.bid.router,
              receivingAssetId,
            );
            if (routerLiq.isOk()) {
              if (routerLiq.value.lt(data.bid.amountReceived)) {
                this.logger.error(
                  { method, methodId, signer, receivingChainId, receivingAssetId, router: data.bid.router },
                  `Router's liquidity low`,
                );
                return;
              }
            } else {
              this.logger.error(
                { method, methodId, signer, receivingChainId, receivingAssetId, router: data.bid.router },
                routerLiq.error.message,
              );
              return;
            }

            // check if the price changes unfovorably by more than the slippage tolerance(percentage).
            const lowerBoundExchangeRate = (1 - parseFloat(slippageTolerance) / 100).toString();
            const lowerBound = calculateExchangeAmount(amount, lowerBoundExchangeRate);

            if (BigNumber.from(data.bid.amountReceived).lt(lowerBound)) {
              this.logger.error(
                {
                  method,
                  methodId,
                  signer,
                  lowerBound: lowerBound,
                  bidAmount: data.bid.amount,
                  amountReceived: data.bid.amountReceived,
                  slippageTolerance: slippageTolerance,
                  router: data.bid.router,
                },
                "Invalid bid price: price impact is more than the slippage tolerance",
              );
              return;
            }

            auctionBids.push(data);
            if (auctionBids.length >= 5) {
              ext();
            }
          }
        });
      });

      if (auctionBids.length === 0) {
        rej(
          new NxtpSdkError(NxtpSdkError.reasons.AuctionError, {
            method,
            methodId,
            transactionId,
            auctionError: "No bids",
          }),
        );
      }

      this.logger.info({ method, methodId, auctionBids }, "Auction bids received");
      auctionBids.sort((a, b) => {
        return BigNumber.from(b.bid.amountReceived).gt(a.bid.amountReceived) ? -1 : 1; // TODO: check this logic
      });

      res(auctionBids[0]);
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

    this.logger.info({ method, methodId }, `Waiting up to ${AUCTION_TIMEOUT} seconds for responses`);
    try {
      const auctionResponse = await receivedResponsePromise;
      this.logger.info({ method, methodId, auctionResponse }, "Received response");
      return auctionResponse;
    } catch (e) {
      const err = new NxtpSdkError(NxtpSdkError.reasons.AuctionError, {
        method,
        methodId,
        transactionId,
        auctionError: "No response received",
      });
      this.logger.error({ method, methodId, err: jsonifyError(err) }, "Received response");
      throw err;
    }
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

  /**
   * Completes the transaction on the receiving chain. This function should either cancel the transaction if it is prepared incorrectly, or fulfill it if it is prepared correctly.
   *
   * @param params - The `TransactionPrepared` event payload from the receiving chain
   * @param relayerFee - (optional) The fee paid to relayers. Comes out of the transaction amount the router prepared with. Defaults to 0
   * @param useRelayers - (optional) If true, will use a realyer to submit the fulfill transaction
   * @returns An object containing either the TransactionResponse from self-submitting the fulfill transaction, or the Meta-tx response (if you used meta transactions)
   * // TODO: fix this typing, if its either or the types should reflect that
   */
  public async finishTransfer(
    params: Omit<TransactionPreparedEvent, "caller">,
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
    const method = this.cancel.name;
    const methodId = getRandomBytes32();
    this.logger.info({ method, methodId, chainId, cancelParams }, "Method started");
    const cancelRes = await this.transactionManager.cancel(chainId, cancelParams);
    if (cancelRes.isOk()) {
      this.logger.info({ method, methodId }, "Method complete");
      return cancelRes.value;
    } else {
      throw cancelRes.error;
    }
  }

  /**
   * Changes the signer associated with the sdk
   *
   * @param signer - Signer to change to
   */
  public changeInjectedSigner(signer: Signer) {
    this.signer = signer;
  }

  /**
   * Turns off all listeners and disconnects messaging from the sdk
   */
  public removeAllListeners(): void {
    this.messaging.disconnect();
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
      this.subgraph.attach(event as SubgraphEvent, callback as any, filter as any);
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
      this.subgraph.attachOnce(event as SubgraphEvent, callback as any, filter as any);
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
        this.subgraph.detach(event as SubgraphEvent);
      } else {
        this.evts[event].detach();
      }
      this.evts[event].detach();
    } else {
      Object.values(this.evts).forEach((evt) => evt.detach());
      this.subgraph.detach();
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
      return this.subgraph.waitFor(event as SubgraphEvent, timeout, filter as any) as Promise<NxtpSdkEventPayloads[T]>;
    } else {
      return this.evts[event].pipe(filter).waitFor(timeout);
    }
  }
}
