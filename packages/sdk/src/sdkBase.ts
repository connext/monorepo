import { constants, providers, Signer, utils, BigNumber, Wallet } from "ethers";
import { Evt } from "evt";
import {
  ajv,
  getRandomBytes32,
  UserNxtpNatsMessagingService,
  PrepareParams,
  TransactionPreparedEvent,
  AuctionResponse,
  InvariantTransactionData,
  MetaTxResponse,
  jsonifyError,
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
  calculateExchangeWad,
  delay,
  MetaTxTypes,
  Logger,
  createLoggingContext,
} from "@connext/nxtp-utils";

import {
  TransactionManagerBase,
  getDeployedTransactionManagerContract,
} from "./transactionManager/transactionManagerBase";
import {
  NoTransactionManager,
  NoSubgraph,
  InvalidParamStructure,
  InvalidSlippage,
  InvalidExpiry,
  EncryptionError,
  NoBids,
  NoValidBids,
  UnknownAuctionError,
  ChainNotConfigured,
  MetaTxTimeout,
  SubgraphsNotSynced,
} from "./error";
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
  CrossChainParamsSchema,
  AuctionBidParamsSchema,
  TransactionPrepareEventSchema,
  CancelSchema,
  HistoricalTransaction,
  SubgraphSyncRecord,
  ActiveTransaction,
  CancelParams,
} from "./types";
import {
  getTimestampInSeconds,
  getExpiry,
  getMinExpiryBuffer,
  getMaxExpiryBuffer,
  getDecimals,
  generateMessagingInbox,
  recoverAuctionBid,
  getFulfillTransactionHashToSign,
  encodeAuctionBid,
  ethereumRequest,
  encrypt,
} from "./utils";
import { Subgraph, SubgraphChainConfig, SubgraphEvent, SubgraphEvents } from "./subgraph/subgraph";

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
export class NxtpSdkNoSend {
  private evts: { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } = createEvts();
  private readonly transactionManagerBase: TransactionManagerBase;
  private readonly messaging: UserNxtpNatsMessagingService;
  private readonly subgraph: Subgraph;

  // Keep messaging evts separate from the evt container that has things
  // attached to it
  private readonly auctionResponseEvt = createMessagingEvt<AuctionResponse>();
  private readonly metaTxResponseEvt = createMessagingEvt<MetaTxResponse>();

  constructor(
    private readonly config: {
      chainConfig: {
        [chainId: number]: {
          provider: providers.FallbackProvider;
          transactionManagerAddress?: string;
          subgraph?: string;
          subgraphSyncBuffer?: number;
        };
      };
      signerAddress: Promise<string>;
      signer?: Signer;
      natsUrl?: string;
      authUrl?: string;
      messaging?: UserNxtpNatsMessagingService;
    },
    private readonly logger: Logger = new Logger({ name: "NxtpSdk", level: "info" }),
    network: "testnet" | "mainnet" | "local" = "mainnet",
    skipPolling = false,
  ) {
    const { chainConfig, signer, messaging, natsUrl, authUrl } = this.config;
    if (messaging) {
      this.messaging = messaging;
    } else {
      let _natsUrl;
      let _authUrl;
      switch (network) {
        case "mainnet": {
          _natsUrl = natsUrl ?? (isNode() ? NATS_CLUSTER_URL : NATS_WS_URL);
          _authUrl = authUrl ?? NATS_AUTH_URL;
          break;
        }
        case "testnet": {
          _natsUrl = natsUrl ?? (isNode() ? NATS_CLUSTER_URL_TESTNET : NATS_WS_URL_TESTNET);
          _authUrl = authUrl ?? NATS_AUTH_URL_TESTNET;
          break;
        }
        case "local": {
          _natsUrl = natsUrl ?? (isNode() ? NATS_CLUSTER_URL_LOCAL : NATS_WS_URL_LOCAL);
          _authUrl = authUrl ?? NATS_AUTH_URL_LOCAL;
          break;
        }
      }
      this.messaging = new UserNxtpNatsMessagingService({
        signer: signer ?? Wallet.createRandom(), // create random wallet just for messaging auth
        logger: this.logger.child({ module: "UserNxtpNatsMessagingService" }),
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
      Omit<SubgraphChainConfig, "subgraphSyncBuffer"> & { subgraphSyncBuffer?: number }
    > = {};

    // create configs for subclasses based on passed-in config
    Object.entries(chainConfig).forEach(
      ([
        _chainId,
        { provider, transactionManagerAddress: _transactionManagerAddress, subgraph: _subgraph, subgraphSyncBuffer },
      ]) => {
        const chainId = parseInt(_chainId);
        let transactionManagerAddress = _transactionManagerAddress;
        if (!transactionManagerAddress) {
          const res = getDeployedTransactionManagerContract(chainId);
          if (!res || !res.address) {
            throw new NoTransactionManager(chainId);
          }
          transactionManagerAddress = res.address;
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
          throw new NoSubgraph(chainId);
        }
        subgraphConfig[chainId] = {
          subgraph,
          provider,
          subgraphSyncBuffer,
        };
      },
    );
    this.transactionManagerBase = new TransactionManagerBase(
      txManagerConfig,
      config.signerAddress,
      this.logger.child({ module: "TransactionManager" }, "debug"),
    );
    this.subgraph = new Subgraph(
      config.signerAddress,
      subgraphConfig,
      this.logger.child({ module: "Subgraph" }),
      skipPolling,
    );
  }

  async connectMessaging(bearerToken?: string): Promise<string> {
    // Setup the subscriptions
    const token = await this.messaging.connect(bearerToken);
    await this.messaging.subscribeToAuctionResponse(
      (_from: string, inbox: string, data?: AuctionResponse, err?: any) => {
        this.auctionResponseEvt.post({ inbox, data, err });
      },
    );

    await this.messaging.subscribeToMetaTxResponse((_from: string, inbox: string, data?: MetaTxResponse, err?: any) => {
      this.metaTxResponseEvt.post({ inbox, data, err });
    });

    await delay(1000);
    return token;
  }

  /**
   * Gets all the transactions that could require user action from the subgraph across all configured chains
   *
   * @returns An array of the active transactions and their status
   */
  public async getActiveTransactions(): Promise<ActiveTransaction[]> {
    return this.subgraph.getActiveTransactions();
  }

  /**
   *
   * @param chainId
   * @returns
   */
  getSubgraphSyncStatus(chainId: number): SubgraphSyncRecord {
    const record = this.subgraph.getSyncStatus(chainId);
    return (
      record ?? {
        synced: false,
        syncedBlock: 0,
        latestBlock: 0,
      }
    );
  }

  /**
   * Gets historical transactions
   *
   * @returns An array of historical transactions
   */
  public async getHistoricalTransactions(): Promise<HistoricalTransaction[]> {
    return this.subgraph.getHistoricalTransactions();
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
    const transactionId = params.transactionId ?? getRandomBytes32();
    const { requestContext, methodContext } = createLoggingContext(
      this.getTransferQuote.name,
      undefined,
      transactionId,
    );

    this.logger.info("Method started", requestContext, methodContext, { params });

    // Validate params schema
    const validate = ajv.compile(CrossChainParamsSchema);
    const valid = validate(params);
    if (!valid) {
      const msg = (validate.errors ?? []).map((err) => `${err.instancePath} - ${err.message}`).join(",");
      const error = new InvalidParamStructure("getTransferQuote", "CrossChainParams", msg, params);
      this.logger.error("Invalid transfer params", requestContext, methodContext, jsonifyError(error), {
        validationError: msg,
        params,
      });
      throw error;
    }

    const user = await this.config.signerAddress;

    const {
      initiator,
      sendingAssetId,
      sendingChainId,
      amount,
      receivingChainId,
      receivingAssetId,
      receivingAddress,
      slippageTolerance = DEFAULT_SLIPPAGE_TOLERANCE,
      expiry: _expiry,
      dryRun,
      preferredRouter: _preferredRouter,
    } = params;
    if (!this.config.chainConfig[sendingChainId]) {
      throw new ChainNotConfigured(sendingChainId, Object.keys(this.config.chainConfig));
    }

    if (!this.config.chainConfig[receivingChainId]) {
      throw new ChainNotConfigured(receivingChainId, Object.keys(this.config.chainConfig));
    }

    const { provider: sendingProvider } = this.config.chainConfig[sendingChainId];
    const { provider: receivingProvider } = this.config.chainConfig[receivingChainId];

    const sendingSyncStatus = this.getSubgraphSyncStatus(sendingChainId);
    const receivingSyncStatus = this.getSubgraphSyncStatus(receivingChainId);
    if (!sendingSyncStatus.synced || !receivingSyncStatus.synced) {
      throw new SubgraphsNotSynced(sendingSyncStatus, receivingSyncStatus, { sendingChainId, receivingChainId });
    }

    if (parseFloat(slippageTolerance) < parseFloat(MIN_SLIPPAGE_TOLERANCE)) {
      throw new InvalidSlippage(slippageTolerance, MIN_SLIPPAGE_TOLERANCE, MAX_SLIPPAGE_TOLERANCE);
    }

    if (parseFloat(slippageTolerance) > parseFloat(MAX_SLIPPAGE_TOLERANCE)) {
      throw new InvalidSlippage(slippageTolerance, MIN_SLIPPAGE_TOLERANCE, MAX_SLIPPAGE_TOLERANCE);
    }

    const preferredRouter = _preferredRouter ? utils.getAddress(_preferredRouter) : undefined;

    const blockTimestamp = await getTimestampInSeconds();
    const expiry = _expiry ?? getExpiry(blockTimestamp);
    if (expiry - blockTimestamp < getMinExpiryBuffer()) {
      throw new InvalidExpiry(expiry, getMinExpiryBuffer(), getMaxExpiryBuffer(), blockTimestamp);
    }

    if (expiry - blockTimestamp > getMaxExpiryBuffer()) {
      throw new InvalidExpiry(expiry, getMinExpiryBuffer(), getMaxExpiryBuffer(), blockTimestamp);
    }

    const callTo = params.callTo ?? constants.AddressZero;
    const callData = params.callData ?? "0x";

    let encryptedCallData = "0x";
    const callDataHash = utils.keccak256(callData);
    if (callData !== "0x") {
      try {
        const encryptionPublicKey = await ethereumRequest("eth_getEncryptionPublicKey", [user]);
        encryptedCallData = await encrypt(callData, encryptionPublicKey);
      } catch (e) {
        throw new EncryptionError("public key encryption failed", jsonifyError(e));
      }
    }

    if (!this.messaging.isConnected()) {
      await this.connectMessaging();
    }

    const inbox = generateMessagingInbox();

    const auctionBidsPromise = new Promise<AuctionResponse[]>(async (resolve, reject) => {
      if (dryRun) {
        try {
          const result = await this.auctionResponseEvt
            .pipe((data) => data.inbox === inbox)
            .pipe((data) => !!data.data)
            .pipe((data) => !data.err)
            .waitFor(AUCTION_TIMEOUT);
          return resolve([result.data!]);
        } catch (e) {
          return reject(e);
        }
      }

      if (preferredRouter) {
        this.logger.warn("Waiting for preferred router", requestContext, methodContext, {
          preferredRouter,
        });
        try {
          const result = await this.auctionResponseEvt
            .pipe((data) => data.inbox === inbox)
            .pipe((data) => !!data.data)
            .pipe((data) => !data.err)
            .pipe((data) => data.data?.bid.router === preferredRouter)
            .waitFor(AUCTION_TIMEOUT * 2); // wait extra for preferred router
          return resolve([result.data!]);
        } catch (e) {
          return reject(e);
        }
      }

      const auctionCtx = Evt.newCtx();
      const bids: AuctionResponse[] = [];
      this.auctionResponseEvt
        .pipe(auctionCtx)
        .pipe((data) => data.inbox === inbox)
        .pipe((data) => !!data.data)
        .pipe((data) => {
          if (data.err) {
            this.logger.warn("Invalid bid received", requestContext, methodContext, { inbox, err: data.err });
            return false;
          }
          return true;
        })
        .attach((data) => {
          bids.push(data.data!);
        });

      setTimeout(async () => {
        this.auctionResponseEvt.detach(auctionCtx);
        return resolve(bids);
      }, AUCTION_TIMEOUT);
    });

    const payload = {
      user,
      initiator: initiator ?? user,
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
    };
    await this.messaging.publishAuctionRequest(payload, inbox);

    this.logger.info(`Waiting up to ${AUCTION_TIMEOUT} ms for responses`, requestContext, methodContext, {
      inbox,
    });
    try {
      const auctionResponses = await auctionBidsPromise;
      this.logger.info("Auction closed", requestContext, methodContext, {
        auctionResponses,
        transactionId,
        inbox,
      });
      if (auctionResponses.length === 0) {
        throw new NoBids(AUCTION_TIMEOUT, transactionId, payload);
      }
      if (dryRun) {
        return auctionResponses[0];
      }
      const filtered: (AuctionResponse | string)[] = await Promise.all(
        auctionResponses.map(async (data: AuctionResponse) => {
          // validate bid
          // check router sig on bid
          const signer = recoverAuctionBid(data.bid, data.bidSignature ?? "");
          if (signer !== data.bid.router) {
            const msg = "Invalid router signature on bid";
            this.logger.warn(msg, requestContext, methodContext, { signer, router: data.bid.router });
            return msg;
          }

          // check contract for router liquidity
          try {
            const routerLiq = await this.transactionManagerBase.getRouterLiquidity(
              receivingChainId,
              data.bid.router,
              receivingAssetId,
            );
            if (routerLiq.lt(data.bid.amountReceived)) {
              const msg = "Router's liquidity low";
              this.logger.warn(msg, requestContext, methodContext, {
                signer,
                receivingChainId,
                receivingAssetId,
                router: data.bid.router,
                routerLiq: routerLiq.toString(),
                amountReceived: data.bid.amountReceived,
              });
              return msg;
            }
          } catch (err) {
            const msg = "Error getting router liquidity";
            this.logger.error(msg, requestContext, methodContext, jsonifyError(err), {
              sendingChainId,
              receivingChainId,
            });
            return msg;
          }

          // check if the price changes unfovorably by more than the slippage tolerance(percentage).
          const lowerBoundExchangeRate = (1 - parseFloat(slippageTolerance) / 100).toString();
          const [inputDecimals, outputDecimals] = await Promise.all([
            getDecimals(sendingAssetId, sendingProvider),
            getDecimals(receivingAssetId, receivingProvider),
          ]);

          const lowerBound = calculateExchangeWad(
            BigNumber.from(amount),
            inputDecimals,
            lowerBoundExchangeRate,
            outputDecimals,
          );

          // safe calculation if the amountReceived is greater than 4 decimals
          if (BigNumber.from(data.bid.amountReceived).lt(lowerBound)) {
            const msg = "Invalid bid price: price impact is more than the slippage tolerance";
            this.logger.warn(msg, requestContext, methodContext, {
              signer,
              lowerBound: lowerBound,
              bidAmount: data.bid.amount,
              amountReceived: data.bid.amountReceived,
              slippageTolerance: slippageTolerance,
              router: data.bid.router,
            });
            return msg;
          }

          return data;
        }),
      );

      const valid = filtered.filter((x) => typeof x !== "string") as AuctionResponse[];
      const invalid = filtered.filter((x) => typeof x === "string") as string[];
      if (valid.length === 0) {
        throw new NoValidBids(transactionId, payload, invalid.join(","), auctionResponses);
      }
      const chosen = valid.sort((a: AuctionResponse, b) => {
        return BigNumber.from(b.bid.amountReceived).gt(a.bid.amountReceived) ? -1 : 1; // TODO: #142 check this logic
      })[0];
      return chosen;
    } catch (e) {
      this.logger.error("Auction error", requestContext, methodContext, jsonifyError(e), {
        transactionId,
      });
      throw new UnknownAuctionError(transactionId, jsonifyError(e), payload, { transactionId });
    }
  }

  public async approveForPrepare(
    transferParams: AuctionResponse,
    infiniteApprove = false,
  ): Promise<providers.TransactionRequest | undefined> {
    const { requestContext, methodContext } = createLoggingContext(
      this.approveForPrepare.name,
      undefined,
      transferParams.bid.transactionId,
    );

    this.logger.info("Method started", requestContext, methodContext, { transferParams });

    const {
      bid: { sendingAssetId, sendingChainId, amount },
    } = transferParams;

    if (sendingAssetId !== constants.AddressZero) {
      const approveTx = await this.transactionManagerBase.approveTokensIfNeeded(
        sendingChainId,
        sendingAssetId,
        amount,
        infiniteApprove,
        requestContext,
      );
      return approveTx;
    }
    return undefined;
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
  public async prepareTransfer(transferParams: AuctionResponse): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(
      this.prepareTransfer.name,
      undefined,
      transferParams.bid.transactionId,
    );

    this.logger.info("Method started", requestContext, methodContext, { transferParams });

    const sendingSyncStatus = this.getSubgraphSyncStatus(transferParams.bid.sendingChainId);
    const receivingSyncStatus = this.getSubgraphSyncStatus(transferParams.bid.receivingChainId);
    if (!sendingSyncStatus.synced || !receivingSyncStatus.synced) {
      throw new SubgraphsNotSynced(sendingSyncStatus, receivingSyncStatus, { transferParams });
    }

    const { bid, bidSignature } = transferParams;

    // Validate params schema
    const validate = ajv.compile(AuctionBidParamsSchema);
    const valid = validate(bid);
    if (!valid || !bidSignature) {
      const msg = (validate.errors ?? []).map((err) => `${err.instancePath} - ${err.message}`).join(",");
      const error = new InvalidParamStructure("prepareTransfer", "AuctionResponse", msg, transferParams, {
        transactionId: transferParams.bid.transactionId,
      });
      this.logger.error("Invalid transfer params", requestContext, methodContext, jsonifyError(error), {
        validationErrors: validate.errors,
        transferParams,
        bidSignature,
      });
      throw error;
    }

    const {
      user,
      router,
      initiator,
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

    // Prepare sender side tx
    const txData: InvariantTransactionData = {
      receivingChainTxManagerAddress: this.transactionManagerBase.getTransactionManagerAddress(receivingChainId)!,
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
    };
    const params: PrepareParams = {
      txData,
      encryptedCallData,
      bidSignature,
      encodedBid,
      amount,
      expiry,
    };
    const tx = await this.transactionManagerBase.prepare(sendingChainId, params, requestContext);
    return tx;
  }

  public async getFulfillHashToSign(
    params: Omit<TransactionPreparedEvent, "caller">,
    relayerFee = "0",
  ): Promise<string> {
    const { requestContext, methodContext } = createLoggingContext(
      this.getFulfillHashToSign.name,
      undefined,
      params.txData.transactionId,
    );
    this.logger.info("Method started", requestContext, methodContext, { params, relayerFee });

    // Validate params schema
    const validate = ajv.compile(TransactionPrepareEventSchema);
    const valid = validate(params);
    if (!valid) {
      const msg = (validate.errors ?? []).map((err) => `${err.instancePath} - ${err.message}`).join(",");
      const error = new InvalidParamStructure("fulfillTransfer", "TransactionPrepareEventParams", msg, params, {
        transactionId: params.txData.transactionId,
      });
      this.logger.error("Invalid Params", requestContext, methodContext, jsonifyError(error), {
        validationError: msg,
        params,
      });
      throw error;
    }

    const { txData } = params;

    if (!this.config.chainConfig[txData.sendingChainId]) {
      throw new ChainNotConfigured(txData.sendingChainId, Object.keys(this.config.chainConfig));
    }

    if (!this.config.chainConfig[txData.receivingChainId]) {
      throw new ChainNotConfigured(txData.receivingChainId, Object.keys(this.config.chainConfig));
    }

    this.logger.info("Generating fulfill payload", requestContext, methodContext);
    const hash = getFulfillTransactionHashToSign(
      txData.transactionId,
      relayerFee,
      txData.receivingChainId,
      txData.receivingChainTxManagerAddress,
    );

    this.logger.info("Generated fulfill payload", requestContext, methodContext, { hash });
    return hash;
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
    fulfillSignature: string,
    decryptedCallData: string,
    relayerFee = "0",
    useRelayers = true,
  ): Promise<{ fulfillRequest?: providers.TransactionRequest; metaTxResponse?: MetaTxResponse }> {
    const { requestContext, methodContext } = createLoggingContext(
      this.fulfillTransfer.name,
      undefined,
      params.txData.transactionId,
    );
    this.logger.info("Method started", requestContext, methodContext, { params, useRelayers });

    // Validate params schema
    const validate = ajv.compile(TransactionPrepareEventSchema);
    const valid = validate(params);
    if (!valid) {
      const msg = (validate.errors ?? []).map((err) => `${err.instancePath} - ${err.message}`).join(",");
      const error = new InvalidParamStructure("fulfillTransfer", "TransactionPrepareEventParams", msg, params, {
        transactionId: params.txData.transactionId,
      });
      this.logger.error("Invalid Params", requestContext, methodContext, jsonifyError(error), {
        validationError: msg,
        params,
      });
      throw error;
    }

    const { txData } = params;

    if (!this.config.chainConfig[txData.sendingChainId]) {
      throw new ChainNotConfigured(txData.sendingChainId, Object.keys(this.config.chainConfig));
    }

    if (!this.config.chainConfig[txData.receivingChainId]) {
      throw new ChainNotConfigured(txData.receivingChainId, Object.keys(this.config.chainConfig));
    }

    if (useRelayers) {
      this.logger.info("Fulfilling using relayers", requestContext, methodContext);
      if (!this.messaging.isConnected()) {
        await this.connectMessaging();
      }

      // send through messaging to metatx relayers
      const responseInbox = generateMessagingInbox();

      const metaTxProm = this.metaTxResponseEvt
        .pipe((data) => data.inbox === responseInbox)
        .pipe((data) => !!data.data?.transactionHash)
        .pipe((data) => !data.err)
        .waitFor(META_TX_TIMEOUT);

      const request = {
        type: MetaTxTypes.Fulfill,
        relayerFee,
        to: this.transactionManagerBase.getTransactionManagerAddress(txData.receivingChainId)!,
        chainId: txData.receivingChainId,
        data: {
          relayerFee,
          signature: fulfillSignature,
          txData,
          callData: decryptedCallData,
        },
      };
      await this.messaging.publishMetaTxRequest(request, responseInbox);

      try {
        const response = await metaTxProm;
        const metaTxRes = response.data;
        this.logger.info("Method complete", requestContext, methodContext, {
          txHash: metaTxRes?.transactionHash,
          chainId: metaTxRes?.chainId,
        });
        return { metaTxResponse: metaTxRes };
      } catch (e) {
        throw e.message.includes("Evt timeout") ? new MetaTxTimeout(txData.transactionId, META_TX_TIMEOUT, request) : e;
      }
    } else {
      this.logger.info("Fulfilling with user's signer", requestContext, methodContext);
      const fulfillRequest = await this.transactionManagerBase.fulfill(
        txData.receivingChainId,
        {
          callData: decryptedCallData,
          relayerFee,
          signature: fulfillSignature,
          txData,
        },
        requestContext,
      );

      this.logger.info("Method complete", requestContext, methodContext, { fulfillRequest });
      return { fulfillRequest };
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

  public async cancel(cancelParams: CancelParams, chainId: number): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(
      this.cancel.name,
      undefined,
      cancelParams.txData.transactionId,
    );
    this.logger.info("Method started", requestContext, methodContext, { chainId, cancelParams });

    // Validate params schema
    const validate = ajv.compile(CancelSchema);
    const valid = validate(cancelParams);
    if (!valid) {
      const msg = (validate.errors ?? []).map((err) => `${err.instancePath} - ${err.message}`).join(",");
      const error = new InvalidParamStructure("cancel", "CancelParams", msg, cancelParams, {
        transactionId: cancelParams.txData.transactionId,
      });
      this.logger.error("Invalid Params", requestContext, methodContext, jsonifyError(error), {
        validationError: msg,
        cancelParams,
      });
      throw error;
    }

    const cancelRequest = await this.transactionManagerBase.cancel(chainId, cancelParams, requestContext);
    this.logger.info("Method complete", requestContext, methodContext, { cancelRequest });
    return cancelRequest;
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
    this.metaTxResponseEvt.detach();
    this.auctionResponseEvt.detach();
    this.messaging.disconnect();
    this.subgraph.stopPolling();
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
      this.subgraph.attachOnce(event as SubgraphEvent, callback as any, filter as any, timeout);
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
