import { constants, providers, Signer, utils, BigNumber, Wallet } from "ethers";
import { Evt } from "evt";
import {
  ajv,
  getRandomBytes32,
  UserNxtpNatsMessagingService,
  PrepareParams,
  TransactionPreparedEventSchema,
  TransactionPreparedEvent,
  AuctionResponse,
  InvariantTransactionData,
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
  delay,
  MetaTxTypes,
  Logger,
  createLoggingContext,
  RequestContext,
  calculateExchangeAmount,
  getReceiverAmount,
  ChainData,
  StatusResponse,
} from "@connext/nxtp-utils";
import { Interface } from "ethers/lib/utils";
import { abi as TransactionManagerAbi } from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { abi as RouterAbi } from "@connext/nxtp-contracts/artifacts/contracts/Router.sol/Router.json";
import { ChainReader } from "@connext/nxtp-txservice";

import {
  NoTransactionManager,
  NoSubgraph,
  InvalidSlippage,
  InvalidExpiry,
  InvalidCallTo,
  EncryptionError,
  NoBids,
  NoValidBids,
  UnknownAuctionError,
  ChainNotConfigured,
  InvalidBidSignature,
  SendingChainSubgraphsNotSynced,
  ReceivingChainSubgraphsNotSynced,
  NoPriceOracle,
  InvalidParamStructure,
  FulfillTimeout,
  NotEnoughAmount,
} from "./error";
import {
  TransactionManager,
  getDeployedTransactionManagerContract,
  getDeployedPriceOracleContract,
  getDeployedChainIdsForGasFee,
  TransactionManagerChainConfig,
} from "./transactionManager/transactionManager";
import {
  SdkBaseConfigParams,
  NxtpSdkEventPayloads,
  CrossChainParams,
  CrossChainParamsSchema,
  AuctionBidParamsSchema,
  CancelSchema,
  HistoricalTransaction,
  SubgraphSyncRecord,
  ActiveTransaction,
  CancelParams,
  GetTransferQuote,
  SdkBaseChainConfigParams,
  ApproveParams,
} from "./types";
import {
  getTransactionId,
  getTimestampInSeconds,
  getExpiry,
  getMinExpiryBuffer,
  getMaxExpiryBuffer,
  generateMessagingInbox,
  recoverAuctionBid,
  encodeAuctionBid,
  gelatoFulfill,
  isChainSupportedByGelato,
} from "./utils";
import { Subgraph, SubgraphChainConfig, SubgraphEvent, SubgraphEvents } from "./subgraph/subgraph";

export const MIN_SLIPPAGE_TOLERANCE = "00.01"; // 0.01%;
export const MAX_SLIPPAGE_TOLERANCE = "15.00"; // 15.0%
export const DEFAULT_SLIPPAGE_TOLERANCE = "0.10"; // 0.10%
export const DEFAULT_AUCTION_TIMEOUT = 6_000;
export const FULFILL_TIMEOUT = 300_000;
export const DELAY_BETWEEN_RETRIES = 5_000;

Evt.setDefaultMaxHandlers(250);

/**
 * Used to make mocking easier
 */
export const createMessagingEvt = <T>() => {
  return Evt.create<{ inbox: string; data?: T; err?: any }>();
};

export const setupChainReader = (logger: Logger, chainConfig: SdkBaseChainConfigParams): ChainReader => {
  return new ChainReader(logger, chainConfig);
};

/**
 * @classdesc Lightweight class to facilitate interaction with the TransactionManager contract on configured chains.
 *
 */
export class NxtpSdkBase {
  // Tolerance is a percentage (5 = 5%).
  public static BID_DEVIATION_TOLERANCE = 5;

  private readonly transactionManager: TransactionManager;
  // TODO: Make this private. Rn it's public for Sdk class to use for chainReader calls; but all calls should happen here.
  public readonly chainReader: ChainReader;
  private readonly messaging: UserNxtpNatsMessagingService;
  private readonly subgraph: Subgraph;
  private readonly logger: Logger;
  public readonly chainData?: Map<string, ChainData>;

  // Keep messaging evts separate from the evt container that has things
  // attached to it
  private readonly auctionResponseEvt = createMessagingEvt<AuctionResponse>();
  private readonly statusResponseEvt = createMessagingEvt<StatusResponse>();

  constructor(private readonly config: SdkBaseConfigParams) {
    const {
      signerAddress,
      chainConfig,
      messagingSigner,
      messaging,
      natsUrl,
      authUrl,
      logger,
      network,
      skipPolling,
      chainData,
    } = this.config;

    this.logger = logger ?? new Logger({ name: "NxtpSdk", level: "info" });
    this.config.network = network ?? "testnet";
    this.config.skipPolling = skipPolling ?? false;
    this.chainData = chainData;

    if (messaging) {
      this.messaging = messaging;
    } else {
      let _natsUrl;
      let _authUrl;
      switch (this.config.network) {
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
        signer: messagingSigner ?? Wallet.createRandom(), // create random wallet just for messaging auth
        logger: this.logger.child({ module: "UserNxtpNatsMessagingService" }),
        natsUrl: _natsUrl,
        authUrl: _authUrl,
      });
    }

    this.chainReader = setupChainReader(this.logger, chainConfig);

    const txManagerConfig: Record<number, TransactionManagerChainConfig> = {};

    const subgraphConfig: Record<
      number,
      Omit<SubgraphChainConfig, "subgraphSyncBuffer"> & { subgraphSyncBuffer?: number }
    > = {};

    // create configs for subclasses based on passed-in config
    Object.entries(chainConfig).forEach(
      ([
        _chainId,
        {
          transactionManagerAddress: _transactionManagerAddress,
          priceOracleAddress: _priceOracleAddress,
          subgraph: _subgraph,
          subgraphSyncBuffer,
        },
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
        this.config.chainConfig[chainId].transactionManagerAddress = transactionManagerAddress;

        let priceOracleAddress = _priceOracleAddress;
        const chainIdsForGasFee = getDeployedChainIdsForGasFee();
        if (!priceOracleAddress && chainIdsForGasFee.includes(chainId)) {
          const res = getDeployedPriceOracleContract(chainId);
          if (!res || !res.address) {
            throw new NoPriceOracle(chainId);
          }

          priceOracleAddress = res.address;
        }

        txManagerConfig[chainId] = {
          transactionManagerAddress,
          priceOracleAddress: priceOracleAddress || constants.AddressZero,
        };

        let subgraph = _subgraph;
        if (!subgraph) {
          subgraph = getDeployedSubgraphUri(chainId, chainData);
        }
        if (!subgraph || subgraph.length === 0) {
          throw new NoSubgraph(chainId);
        }
        // Ensure subgraph is configured properly; may be a CSV env string or an array of subgraph urls.
        subgraph = typeof subgraph === "string" ? subgraph.replace("]", "").replace("[", "").split(",") : subgraph;
        subgraphConfig[chainId] = {
          subgraph,
          subgraphSyncBuffer,
        };
      },
    );
    this.transactionManager = new TransactionManager(
      txManagerConfig,
      this.chainReader,
      signerAddress,
      this.logger.child({ module: "TransactionManager" }, "debug"),
    );
    this.subgraph = new Subgraph(
      signerAddress,
      subgraphConfig,
      this.chainReader,
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

    await this.messaging.subscribeToStatusResponse((_from: string, inbox: string, data?: any, err?: any) => {
      this.statusResponseEvt.post({ inbox, data, err });
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

  public async calculateGasFeeInReceivingTokenForFulfill(
    receivingChainId: number,
    receivingAssetId: string,
  ): Promise<BigNumber> {
    const { requestContext, methodContext } = createLoggingContext(
      this.calculateGasFeeInReceivingTokenForFulfill.name,
      undefined,
    );

    this.logger.info("Method started", requestContext, methodContext);
    const outputDecimals = await this.chainReader.getDecimalsForAsset(receivingChainId, receivingAssetId);
    return await this.chainReader.calculateGasFeeInReceivingTokenForFulfill(
      receivingChainId,
      receivingAssetId,
      outputDecimals,
      this.chainData,
    );
  }

  public async getEstimateReceiverAmount(params: {
    amount: string;
    sendingChainId: number;
    sendingAssetId: string;
    receivingChainId: number;
    receivingAssetId: string;
  }): Promise<{ receiverAmount: string; totalFee: string; routerFee: string; gasFee: string; relayerFee: string }> {
    const { requestContext, methodContext } = createLoggingContext(this.getEstimateReceiverAmount.name, undefined);
    const { amount, sendingChainId, receivingChainId, sendingAssetId, receivingAssetId } = params;

    this.logger.debug("Estimating receiver amount", requestContext, methodContext, {
      amount,
      sendingChainId,
      sendingAssetId,
      receivingChainId,
      receivingAssetId,
    });

    // validate that assets/chains are supported and there is enough liquidity
    const inputDecimals = await this.chainReader.getDecimalsForAsset(sendingChainId, sendingAssetId);

    const outputDecimals = await this.chainReader.getDecimalsForAsset(receivingChainId, receivingAssetId);

    // calculate router fee
    const { receivingAmount: swapAmount, routerFee } = await getReceiverAmount(amount, inputDecimals, outputDecimals);
    // calculate gas fee

    const gasFee = await this.chainReader.calculateGasFeeInReceivingToken(
      sendingChainId,
      sendingAssetId,
      receivingChainId,
      receivingAssetId,
      outputDecimals,
      this.chainData,
      requestContext,
    );

    const relayerFee = await this.chainReader.calculateGasFeeInReceivingTokenForFulfill(
      receivingChainId,
      receivingAssetId,
      outputDecimals,
      this.chainData,
      requestContext,
    );

    const totalGasFee = gasFee.add(relayerFee);
    const receiverAmount = BigNumber.from(swapAmount).sub(totalGasFee);

    const totalFee = totalGasFee.add(routerFee);
    return {
      receiverAmount: receiverAmount.toString(),
      totalFee: totalFee.toString(),
      routerFee,
      gasFee: gasFee.toString(),
      relayerFee: relayerFee.toString(),
    };
  }

  public async getRouterStatus(requestee: string): Promise<StatusResponse[]> {
    const { requestContext, methodContext } = createLoggingContext(this.getRouterStatus.name, undefined, "");

    this.logger.debug("Method started", requestContext, methodContext);

    if (!this.messaging.isConnected()) {
      await this.connectMessaging();
    }

    const inbox = generateMessagingInbox();
    const statusWaitTimeMs = 2_000;

    const statusCtx = Evt.newCtx();

    const statusPromise = new Promise<StatusResponse[]>(async (resolve) => {
      const statusResponses: StatusResponse[] = [];
      this.statusResponseEvt
        .pipe(statusCtx)
        .pipe((data) => data.inbox === inbox)
        .pipe((data) => !!data.data)
        .attach((data) => {
          statusResponses.push(data.data as StatusResponse);
        });

      setTimeout(async () => {
        this.statusResponseEvt.detach(statusCtx);
        return resolve(statusResponses);
      }, statusWaitTimeMs);
    });

    await this.messaging.publishStatusRequest({ requestee }, inbox);

    this.logger.debug(`Waiting up to ${statusWaitTimeMs} ms for responses`, requestContext, methodContext, {
      inbox,
    });

    const receviedStatusResponses = await statusPromise;

    return receviedStatusResponses;
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
  public async getTransferQuote(params: CrossChainParams): Promise<GetTransferQuote> {
    const user = await this.config.signerAddress;
    const transactionId =
      params.transactionId || getTransactionId(params.sendingChainId.toString(), user, getRandomBytes32());

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

    const {
      sendingAssetId,
      sendingChainId,
      amount,
      receivingChainId,
      receivingAssetId,
      receivingAddress,
      callTo: _callTo,
      callData: _callData,
      encryptedCallData: _encryptedCallData,
      slippageTolerance = DEFAULT_SLIPPAGE_TOLERANCE,
      expiry: _expiry,
      dryRun,
      preferredRouters: _preferredRouters,
      initiator,
      auctionWaitTimeMs = DEFAULT_AUCTION_TIMEOUT,
      numAuctionResponsesQuorum,
    } = params;

    const sendingChainProvider = this.config.chainConfig[sendingChainId]?.providers;
    const receivingChainProvider = this.config.chainConfig[receivingChainId]?.providers;
    if (!sendingChainProvider) {
      throw new ChainNotConfigured(sendingChainId, Object.keys(this.config.chainConfig));
    }

    if (!receivingChainProvider) {
      throw new ChainNotConfigured(receivingChainId, Object.keys(this.config.chainConfig));
    }

    const sendingSyncStatus = this.getSubgraphSyncStatus(sendingChainId);
    const receivingSyncStatus = this.getSubgraphSyncStatus(receivingChainId);
    if (!sendingSyncStatus.synced) {
      throw new SendingChainSubgraphsNotSynced(sendingSyncStatus, receivingSyncStatus, {
        sendingChainId,
        receivingChainId,
      });
    }

    if (!receivingSyncStatus.synced) {
      throw new ReceivingChainSubgraphsNotSynced(sendingSyncStatus, receivingSyncStatus, {
        sendingChainId,
        receivingChainId,
      });
    }

    if (parseFloat(slippageTolerance) < parseFloat(MIN_SLIPPAGE_TOLERANCE)) {
      throw new InvalidSlippage(slippageTolerance, MIN_SLIPPAGE_TOLERANCE, MAX_SLIPPAGE_TOLERANCE);
    }

    if (parseFloat(slippageTolerance) > parseFloat(MAX_SLIPPAGE_TOLERANCE)) {
      throw new InvalidSlippage(slippageTolerance, MIN_SLIPPAGE_TOLERANCE, MAX_SLIPPAGE_TOLERANCE);
    }

    const preferredRouters = (_preferredRouters ?? []).map((a) => utils.getAddress(a));

    const blockTimestamp = await getTimestampInSeconds();
    const expiry = _expiry ?? getExpiry(blockTimestamp);
    if (expiry - blockTimestamp < getMinExpiryBuffer()) {
      throw new InvalidExpiry(expiry, getMinExpiryBuffer(), getMaxExpiryBuffer(), blockTimestamp);
    }

    if (expiry - blockTimestamp > getMaxExpiryBuffer()) {
      throw new InvalidExpiry(expiry, getMinExpiryBuffer(), getMaxExpiryBuffer(), blockTimestamp);
    }

    const callTo = _callTo ?? constants.AddressZero;
    const callData = _callData ?? "0x";
    const callDataHash = utils.keccak256(callData);

    const encryptedCallData = _encryptedCallData ?? "0x";

    if (callData !== "0x" && encryptedCallData === "0x") {
      throw new EncryptionError("bad public key encryption", undefined, { callData, encryptedCallData });
    }

    const {
      receiverAmount,
      totalFee,
      relayerFee: metaTxRelayerFee,
      routerFee,
      gasFee,
    } = await this.getEstimateReceiverAmount({
      amount,
      sendingChainId,
      sendingAssetId,
      receivingChainId,
      receivingAssetId,
    });

    if (BigNumber.from(receiverAmount).lt(0)) {
      throw new NotEnoughAmount({ receiverAmount, totalFee, routerFee, gasFee, relayerFee: metaTxRelayerFee });
    }

    if (!this.messaging.isConnected()) {
      await this.connectMessaging();
    }

    const inbox = generateMessagingInbox();
    let receivedBids: (AuctionResponse | string)[];

    const auctionBidsPromise = new Promise<AuctionResponse[]>(async (resolve, reject) => {
      if (dryRun) {
        try {
          const result = await this.auctionResponseEvt
            .pipe((data) => data.inbox === inbox)
            .pipe((data) => !!data.data)
            .pipe((data) => !data.err)
            .waitFor(auctionWaitTimeMs);
          return resolve([result.data as AuctionResponse]);
        } catch (e) {
          return reject(e);
        }
      }

      if (preferredRouters.length > 0) {
        this.logger.warn("Waiting for preferred routers", requestContext, methodContext, {
          preferredRouters,
        });
        try {
          const result = await this.auctionResponseEvt
            .pipe((data) => data.inbox === inbox)
            .pipe((data) => !!data.data)
            .pipe((data) => !data.err)
            .pipe((data) => preferredRouters.includes(utils.getAddress((data.data as AuctionResponse).bid.router)))
            .waitFor(auctionWaitTimeMs * 2); // wait extra for preferred router
          return resolve([result.data as AuctionResponse]);
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
          bids.push(data.data as AuctionResponse);
          if (numAuctionResponsesQuorum) {
            if (bids.length >= numAuctionResponsesQuorum) {
              return resolve(bids);
            }
          }
        });

      setTimeout(async () => {
        this.auctionResponseEvt.detach(auctionCtx);
        return resolve(bids);
      }, auctionWaitTimeMs);
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

    this.logger.info(`Waiting up to ${auctionWaitTimeMs} ms for responses`, requestContext, methodContext, {
      inbox,
    });
    try {
      const auctionResponses = await auctionBidsPromise;
      this.logger.info("Auction closed", requestContext, methodContext, {
        auctionResponses,
        transactionId,
        inbox,
      });
      if (dryRun) {
        return { ...auctionResponses[0], totalFee, metaTxRelayerFee, routerFee };
      }
      receivedBids = await Promise.all(
        auctionResponses.map(async (data: AuctionResponse) => {
          // validate bid
          // check router sig on bid
          const signer = recoverAuctionBid(data.bid, data.bidSignature ?? "");
          if (signer !== data.bid.router) {
            const code = await this.chainReader.getCode(receivingChainId, data.bid.router);
            if (code !== "0x") {
              const encodedData = new Interface(RouterAbi).encodeFunctionData("routerSigner");
              let routerSigner = await this.chainReader.readTx({
                to: data.bid.router,
                data: encodedData,
                chainId: receivingChainId,
              });
              routerSigner = utils.getAddress(utils.hexDataSlice(routerSigner, 12)); // convert 32 bytes to 20 bytes

              if (routerSigner !== signer) {
                const msg = "Invalid routerContract signature on bid";
                this.logger.warn(msg, requestContext, methodContext, { signer, router: data.bid.router, routerSigner });
                return msg;
              }
            } else {
              const msg = "Invalid router signature on bid";
              this.logger.warn(msg, requestContext, methodContext, { signer, router: data.bid.router });
              return msg;
            }
          }

          // check contract for router liquidity
          try {
            const routerLiq = await this.transactionManager.getRouterLiquidity(
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

          const amtMinusGas = BigNumber.from(data.bid.amountReceived).sub(data.gasFeeInReceivingToken);
          const lowerBound = calculateExchangeAmount(amtMinusGas.toString(), lowerBoundExchangeRate).split(".")[0];

          // safe calculation if the amountReceived is greater than 4 decimals
          if (BigNumber.from(data.bid.amountReceived).lt(lowerBound)) {
            const msg = "Invalid bid price: price impact is more than the slippage tolerance";
            this.logger.warn(msg, requestContext, methodContext, {
              signer,
              lowerBound: lowerBound.toString(),
              bidAmount: data.bid.amount,
              amtMinusGas: amtMinusGas.toString(),
              gasFeeInReceivingToken: data.gasFeeInReceivingToken,
              amountReceived: data.bid.amountReceived,
              slippageTolerance: slippageTolerance,
              router: data.bid.router,
            });
            return msg;
          }

          return data;
        }),
      );
    } catch (e) {
      this.logger.error("Auction error", requestContext, methodContext, jsonifyError(e), {
        transactionId,
      });
      throw new UnknownAuctionError(transactionId, jsonifyError(e), payload, { transactionId });
    }

    if (receivedBids.length === 0) {
      throw new NoBids(auctionWaitTimeMs, transactionId, payload, { requestContext, methodContext });
    }

    const validBids = receivedBids.filter((x) => typeof x !== "string") as AuctionResponse[];
    const invalidBids = receivedBids.filter((x) => typeof x === "string") as string[];

    if (validBids.length === 0) {
      throw new NoValidBids(transactionId, payload, invalidBids.join(","), receivedBids);
    }

    const maximumBid = validBids.sort((a: AuctionResponse, b) => {
      return BigNumber.from(a.bid.amountReceived).gt(b.bid.amountReceived) ? -1 : 1;
    })[0];

    const filteredBids = validBids.filter((a: AuctionResponse) =>
      BigNumber.from(a.bid.amountReceived)
        .sub(maximumBid.bid.amountReceived)
        .abs()
        .lte(BigNumber.from(maximumBid.bid.amountReceived).mul(NxtpSdkBase.BID_DEVIATION_TOLERANCE).div(100)),
    );

    const chosen = filteredBids[Math.floor(Math.random() * (filteredBids.length - 1))];

    return { ...chosen, totalFee, metaTxRelayerFee, routerFee };
  }

  public async approveForPrepare(
    approveParams: ApproveParams,
    infiniteApprove = false,
  ): Promise<providers.TransactionRequest | undefined> {
    const { requestContext, methodContext } = createLoggingContext(
      this.approveForPrepare.name,
      undefined,
      approveParams.transactionId,
    );

    this.logger.info("Method started", requestContext, methodContext, { approveParams });

    const { sendingAssetId, sendingChainId, amount } = approveParams;

    if (sendingAssetId !== constants.AddressZero) {
      const approveTx = await this.transactionManager.approveTokensIfNeeded(
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
  public async prepareTransfer(
    transferParams: AuctionResponse,
    actualAmount?: string,
  ): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(
      this.prepareTransfer.name,
      undefined,
      transferParams.bid.transactionId,
    );

    this.logger.info("Method started", requestContext, methodContext, { transferParams, actualAmount });

    const sendingSyncStatus = this.getSubgraphSyncStatus(transferParams.bid.sendingChainId);
    const receivingSyncStatus = this.getSubgraphSyncStatus(transferParams.bid.receivingChainId);
    if (!sendingSyncStatus.synced) {
      throw new SendingChainSubgraphsNotSynced(sendingSyncStatus, receivingSyncStatus, {
        sendingChainId: transferParams.bid.sendingChainId,
        receivingChainId: transferParams.bid.receivingChainId,
      });
    }

    if (!receivingSyncStatus.synced) {
      throw new ReceivingChainSubgraphsNotSynced(sendingSyncStatus, receivingSyncStatus, {
        sendingChainId: transferParams.bid.sendingChainId,
        receivingChainId: transferParams.bid.receivingChainId,
      });
    }

    const { bid, bidSignature } = transferParams;

    // Validate params schema
    const validate = ajv.compile(AuctionBidParamsSchema);
    const valid = validate(bid);
    if (!valid) {
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
      amount: _amount,
      expiry,
      callDataHash,
      encryptedCallData,
      sendingChainId,
      receivingChainId,
      callTo,
      transactionId,
    } = bid;
    const encodedBid = encodeAuctionBid(bid);
    const amount = actualAmount || _amount;

    if (!this.config.chainConfig[sendingChainId]) {
      throw new ChainNotConfigured(sendingChainId, Object.keys(this.config.chainConfig));
    }

    if (!this.config.chainConfig[receivingChainId]) {
      throw new ChainNotConfigured(receivingChainId, Object.keys(this.config.chainConfig));
    }

    if (!bidSignature) {
      throw new InvalidBidSignature(transactionId, bid, router);
    }

    if (callTo !== constants.AddressZero) {
      const callToContractCode = await this.chainReader.getCode(receivingChainId, callTo);
      if (!callToContractCode || callToContractCode === "0x") {
        throw new InvalidCallTo(transactionId, callTo);
      }
    }

    // Prepare sender side tx
    const txData: InvariantTransactionData = {
      receivingChainTxManagerAddress: this.transactionManager.getTransactionManagerAddress(receivingChainId)!,
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
    const tx = await this.transactionManager.prepare(sendingChainId, params, requestContext);
    return tx;
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
    useRelayers = false,
  ): Promise<{
    transactionResponse?: { transactionHash: string; chainId: number };
    transactionRequest?: providers.TransactionRequest;
  }> {
    const { requestContext, methodContext } = createLoggingContext(
      this.fulfillTransfer.name,
      undefined,
      params.txData.transactionId,
    );
    this.logger.info("Method started", requestContext, methodContext, { params, useRelayers });
    const transactionId = params.txData.transactionId;

    // Validate params schema
    const validate = ajv.compile(TransactionPreparedEventSchema);
    const valid = validate(params);
    if (!valid) {
      const msg = (validate.errors ?? []).map((err) => `${err.instancePath} - ${err.message}`).join(",");
      const error = new InvalidParamStructure("fulfillTransfer", "TransactionPrepareEventParams", msg, params, {
        transactionId: transactionId,
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

    const fulfillTxProm = this.waitFor(SubgraphEvents.ReceiverTransactionFulfilled, FULFILL_TIMEOUT, (data) => {
      return data.txData.transactionId === params.txData.transactionId;
    });

    if (useRelayers) {
      if (isChainSupportedByGelato(txData.receivingChainId)) {
        this.logger.info("Fulfilling using Gelato Relayer", requestContext, methodContext);
        const deployedContract = this.config.chainConfig[txData.receivingChainId].transactionManagerAddress!;
        for (let i = 0; i < 3; i++) {
          try {
            const data = await gelatoFulfill(
              txData.receivingChainId,
              deployedContract,
              new Interface(TransactionManagerAbi),
              {
                txData,
                relayerFee,
                signature: fulfillSignature,
                callData: decryptedCallData,
              },
            );
            if (!data.taskId) {
              throw new Error("No taskId returned");
            }
            this.logger.info("Submitted using Gelato Relayer", requestContext, methodContext, { data });

            try {
              const response = await fulfillTxProm;
              const ret = {
                transactionHash: response.transactionHash,
                chainId: response.txData.receivingChainId,
              };
              this.logger.info("Method complete", requestContext, methodContext, ret);
              return { transactionResponse: ret };
            } catch (e) {
              throw e.message.includes("Evt timeout")
                ? new FulfillTimeout(txData.transactionId, FULFILL_TIMEOUT, params.txData.receivingChainId, {
                    requestContext,
                    methodContext,
                  })
                : e;
            }
          } catch (err) {
            this.logger.error("Error using Gelato Relayer", requestContext, methodContext, jsonifyError(err), {
              attemptNum: i + 1,
            });
            await delay(DELAY_BETWEEN_RETRIES);
          }
        }
      }

      // If Gelato relayer is not supported or otherwise failed, fall back to using router network.
      this.logger.info("Fulfilling using router network", requestContext, methodContext);
      if (!this.messaging.isConnected()) {
        await this.connectMessaging();
      }

      // send through messaging to metatx relayers
      const responseInbox = generateMessagingInbox();
      const request = {
        type: MetaTxTypes.Fulfill,
        relayerFee,
        to: this.transactionManager.getTransactionManagerAddress(txData.receivingChainId)!,
        chainId: txData.receivingChainId,
        data: {
          relayerFee,
          signature: fulfillSignature,
          txData,
          callData: decryptedCallData,
        },
      };
      await this.messaging.publishMetaTxRequest(request, responseInbox);
      this.logger.info("Submitted using router network", requestContext, methodContext, { request });

      try {
        const response = await fulfillTxProm;
        const ret = {
          transactionHash: response.transactionHash,
          chainId: response.txData.receivingChainId,
        };
        this.logger.info("Method complete", requestContext, methodContext, ret);
        return { transactionResponse: ret };
      } catch (e) {
        throw e.message.includes("Evt timeout")
          ? new FulfillTimeout(txData.transactionId, FULFILL_TIMEOUT, params.txData.receivingChainId, {
              requestContext,
              methodContext,
            })
          : e;
      }
    } else {
      this.logger.info("Creating transaction request", requestContext, methodContext);
      const fulfillRequest = await this.transactionManager.fulfill(
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
      return { transactionRequest: fulfillRequest };
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

    const transactionId = cancelParams.txData.transactionId;

    // Validate params schema
    const validate = ajv.compile(CancelSchema);
    const valid = validate(cancelParams);
    if (!valid) {
      const msg = (validate.errors ?? []).map((err) => `${err.instancePath} - ${err.message}`).join(",");
      const error = new InvalidParamStructure("cancel", "CancelParams", msg, cancelParams, {
        transactionId: transactionId,
      });
      this.logger.error("Invalid Params", requestContext, methodContext, jsonifyError(error), {
        validationError: msg,
        cancelParams,
      });
      throw error;
    }

    const cancelRequest = await this.transactionManager.cancel(chainId, cancelParams, requestContext);
    this.logger.info("Method complete", requestContext, methodContext, { cancelRequest });
    return cancelRequest;
  }

  /**
   * Gets gas price in target chain
   *
   * @param chainId The network identifier
   *
   * @returns Gas price in BigNumber
   */
  async getGasPrice(chainId: number, requestContext: RequestContext): Promise<BigNumber> {
    this.assertChainIsConfigured(chainId);

    // get gas price
    let gasPrice = BigNumber.from(0);
    try {
      gasPrice = await this.chainReader.getGasPrice(chainId, requestContext);
    } catch (e) {}

    return gasPrice;
  }

  public async querySubgraph(chainId: number, query: string): Promise<any> {
    this.subgraph.query(chainId, query);
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
  public attach<T extends SubgraphEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
  ): void {
    this.subgraph.attach(event, callback as any, filter as any);
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
  public attachOnce<T extends SubgraphEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    this.subgraph.attachOnce(event, callback as any, filter as any, timeout);
  }

  /**
   * Removes all attached handlers from the given event.
   *
   * @param event - (optional) The event name to remove handlers from. If not provided, will detach handlers from *all* subgraph events
   */
  public detach<T extends SubgraphEvent>(event?: T): void {
    this.subgraph.detach(event);
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
  public waitFor<T extends SubgraphEvent>(
    event: T,
    timeout: number,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
  ): Promise<NxtpSdkEventPayloads[T]> {
    return this.subgraph.waitFor(event, timeout, filter as any) as Promise<NxtpSdkEventPayloads[T]>;
  }

  public assertChainIsConfigured(chainId: number) {
    if (!this.config.chainConfig[chainId] || !this.chainReader.isSupportedChain(chainId)) {
      throw new ChainNotConfigured(chainId, Object.keys(this.config.chainConfig));
    }
  }
}
