import {
  mkAddress,
  mkHash,
  UserNxtpNatsMessagingService,
  getRandomBytes32,
  InvariantTransactionData,
  VariantTransactionData,
  AuctionBid,
} from "@connext/nxtp-utils";
import { err, ok, errAsync, okAsync } from "neverthrow";
import { expect } from "chai";
import { providers, Wallet, constants, utils, BigNumber } from "ethers";
import pino from "pino";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import {
  CrossChainParams,
  NxtpSdk,
  NxtpSdkError,
  NxtpSdkEvents,
  MAX_SLIPPAGE_TOLERANCE,
  MIN_SLIPPAGE_TOLERANCE,
  getMinExpiryBuffer,
  getMaxExpiryBuffer,
} from "../../src/sdk";

import * as sdkUtils from "../../src/sdk";
import { Subgraph, ActiveTransaction } from "../../src/subgraph";
import { TransactionManager, TransactionManagerError } from "../../src/transactionManager";
import { TxResponse, TxReceipt, EmptyBytes, EmptyCallDataHash } from "../helper";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });

const { AddressZero } = constants;
const response = "connected";

describe("NxtpSdk", () => {
  let sdk: NxtpSdk;
  let signer: SinonStubbedInstance<Wallet>;
  let messaging: SinonStubbedInstance<UserNxtpNatsMessagingService>;
  let subgraph: SinonStubbedInstance<Subgraph>;
  let transactionManager: SinonStubbedInstance<TransactionManager>;
  let provider1337: SinonStubbedInstance<providers.FallbackProvider>;
  let provider1338: SinonStubbedInstance<providers.FallbackProvider>;
  let signFulfillTransactionPayloadMock: SinonStub;
  let recoverAuctionBidMock: SinonStub;

  let user: string = mkAddress("0xa");
  let router: string = mkAddress("0xb");
  let sendingChainId: number = 1337;
  let receivingChainId: number = 1338;
  let sendingChainTxManagerAddress: string = mkAddress("0xaaa");
  let receivingChainTxManagerAddress: string = mkAddress("0xbbb");

  beforeEach(() => {
    provider1337 = createStubInstance(providers.FallbackProvider);
    (provider1337 as any)._isProvider = true;
    provider1338 = provider1337;
    const chainConfig = {
      [sendingChainId]: {
        provider: provider1337,
        subgraph: "http://example.com",
        transactionManagerAddress: sendingChainTxManagerAddress,
      },
      [receivingChainId]: {
        provider: provider1338,
        subgraph: "http://example.com",
        transactionManagerAddress: receivingChainTxManagerAddress,
      },
    };
    signer = createStubInstance(Wallet);
    messaging = createStubInstance(UserNxtpNatsMessagingService);
    subgraph = createStubInstance(Subgraph);
    transactionManager = createStubInstance(TransactionManager);

    stub(sdkUtils, "getDecimals").resolves(18);

    stub(sdkUtils, "getTimestampInSeconds").resolves(Math.floor(Date.now() / 1000));

    signFulfillTransactionPayloadMock = stub(sdkUtils, "signFulfillTransactionPayload");
    recoverAuctionBidMock = stub(sdkUtils, "recoverAuctionBid");

    stub(sdkUtils, "AUCTION_TIMEOUT").value("1_000");

    signFulfillTransactionPayloadMock.resolves(EmptyCallDataHash);

    messaging.isConnected.resolves(true);
    messaging.publishMetaTxRequest.resolves({ inbox: "inbox" });

    signer.getAddress.resolves(user);

    sdk = new NxtpSdk(chainConfig, signer, logger, undefined, "http://example.com", "http://example.com");

    (sdk as any).transactionManager = transactionManager;
    (sdk as any).subgraph = subgraph;
    (sdk as any).messaging = messaging;

    messaging.connect.resolves(response);
  });

  afterEach(() => {
    restore();
    reset();
  });

  const getTransactionData = async (
    txOverrides: Partial<InvariantTransactionData> = {},
    recordOverrides: Partial<VariantTransactionData> = {},
  ): Promise<{ transaction: InvariantTransactionData; record: VariantTransactionData }> => {
    const transaction = {
      user: user,
      router: router,
      sendingAssetId: mkAddress("0xc"),
      receivingAssetId: mkAddress("0xb"),
      sendingChainFallback: user,
      callTo: AddressZero,
      receivingAddress: mkAddress("0xa"),
      callDataHash: EmptyCallDataHash,
      transactionId: getRandomBytes32(),
      sendingChainId: sendingChainId,
      receivingChainId: receivingChainId,
      ...txOverrides,
    };

    const day = 24 * 60 * 60;
    const record = {
      amount: "10",
      expiry: Math.floor(Date.now() / 1000) + day + 5_000,
      preparedBlockNumber: 10,
      ...recordOverrides,
    };

    return { transaction, record };
  };

  const getMock = (
    crossChainParamsOverrides: Partial<CrossChainParams> = {},
    auctionBidOverrides: Partial<AuctionBid> = {},
    _bidSignature: string = EmptyCallDataHash,
  ): { crossChainParams: CrossChainParams; auctionBid: AuctionBid; bidSignature: string } => {
    const crossChainParams = {
      callData: EmptyBytes,
      sendingChainId: sendingChainId,
      sendingAssetId: mkAddress("0xc"),
      receivingChainId: receivingChainId,
      receivingAssetId: mkAddress("0xb"),
      callTo: AddressZero,
      receivingAddress: mkAddress("0xa"),
      amount: "1000000",
      expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
      transactionId: getRandomBytes32(),
      ...crossChainParamsOverrides,
    };

    const auctionBid = {
      user: user,
      router: router,
      sendingChainId: sendingChainId,
      sendingAssetId: mkAddress("0xa"),
      amount: "1000000",
      receivingChainId: receivingChainId,
      receivingAssetId: mkAddress("0xb"),
      amountReceived: "1000000",
      receivingAddress: mkAddress("0xc"),
      transactionId: getRandomBytes32(),
      expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
      callDataHash: EmptyCallDataHash,
      callTo: AddressZero,
      encryptedCallData: EmptyBytes,
      sendingChainTxManagerAddress: sendingChainTxManagerAddress,
      receivingChainTxManagerAddress: receivingChainTxManagerAddress,
      bidExpiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
      ...auctionBidOverrides,
    };

    const bidSignature = _bidSignature;

    return { crossChainParams, auctionBid, bidSignature };
  };

  describe("#constructor", () => {
    it("should error if transaction manager doesn't exist for chainId", () => {
      const _chainConfig = {
        [sendingChainId]: {
          provider: provider1337,
          subgraph: "http://example.com",
        },
        [receivingChainId]: {
          provider: provider1338,
          subgraph: "http://example.com",
        },
      };
      let error;
      try {
        const instance = new NxtpSdk(
          _chainConfig,
          signer,
          logger,
          undefined,
          "http://example.com",
          "http://example.com",
        );
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
    });

    it("should error if subgraph doesn't exist for chainId", () => {
      const _chainConfig = {
        [sendingChainId]: {
          provider: provider1337,
          transactionManagerAddress: sendingChainTxManagerAddress,
        },
        [receivingChainId]: {
          provider: provider1338,
          transactionManagerAddress: receivingChainTxManagerAddress,
        },
      };

      let error;
      try {
        const instance = new NxtpSdk(
          _chainConfig,
          signer,
          logger,
          undefined,
          "http://example.com",
          "http://example.com",
        );
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
    });

    it("happy: constructor, get transactionManager address", () => {
      const chainConfig = {
        [4]: {
          provider: provider1337,
          subgraph: "http://example.com",
        },
        [5]: {
          provider: provider1338,
          subgraph: "http://example.com",
        },
      };
      const instance = new NxtpSdk(chainConfig, signer, logger, undefined, "http://example.com", "http://example.com");
    });
  });

  describe("#connectMessaging", () => {
    const assertMessaging = async (bearerToken?: string) => {
      const res = await sdk.connectMessaging(bearerToken);
      expect(res).to.be.eq(response);
    };
    it("happy connectMessaging with bearerToken", async () => {
      const bearerToken = "hello";

      await assertMessaging(bearerToken);
    });

    it("happy connectMessaging", async () => {
      await assertMessaging();
    });
  });

  describe("#getActiveTransactions", () => {
    it("happy getActiveTransactions", async () => {
      const { transaction, record } = await getTransactionData();
      const activeTransaction = {
        crosschainTx: { invariant: transaction, sending: record, receiving: record },
        status: NxtpSdkEvents.SenderTransactionPrepared,
        bidSignature: EmptyBytes,
        encodedBid: EmptyBytes,
        encryptedCallData: EmptyBytes,
      };
      subgraph.getActiveTransactions.resolves([activeTransaction]);
      const res = await sdk.getActiveTransactions();
      expect(res[0]).to.be.eq(activeTransaction);
    });
  });

  describe("#getTransferQuote", () => {
    // TODO: #143 callData encryption

    describe("should error if invalid params", () => {
      const { crossChainParams } = getMock({ callData: "abc" });
      it("invalid callData", async () => {
        let error;
        try {
          await sdk.getTransferQuote(crossChainParams);
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { crossChainParams } = getMock({ sendingChainId: 1400 });
        let error;
        try {
          await sdk.getTransferQuote(crossChainParams);
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });

      it("unkown receivingChainId", async () => {
        const { crossChainParams } = getMock({ receivingChainId: 1400 });
        let error;
        try {
          await sdk.getTransferQuote(crossChainParams);
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });
    });

    it("should error if slippageTolerance is lower than Min allowed", async () => {
      const { crossChainParams } = getMock({ slippageTolerance: (parseFloat(MIN_SLIPPAGE_TOLERANCE) - 1).toString() });
      let error;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
    });

    it("should error if slippageTolerance is higher than Max allowed", async () => {
      const { crossChainParams } = getMock({ slippageTolerance: (parseFloat(MAX_SLIPPAGE_TOLERANCE) + 1).toString() });
      let error;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
    });

    it("should error if expiry is too short", async () => {
      const { crossChainParams } = getMock({ expiry: Math.floor(Date.now() / 1000) + getMinExpiryBuffer() - 1000 });
      let error;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
      expect(error.context.paramsError).to.include("Expiry too short");
    });

    it("should error if expiry is too high", async () => {
      const { crossChainParams } = getMock({ expiry: Math.floor(Date.now() / 1000) + getMaxExpiryBuffer() + 1000 });
      let error;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
      expect(error.context.paramsError).to.include("Expiry too high");
    });

    it.skip("should error if eth_getEncryptionPublicKey errors", async () => {});

    it("should log error if recoverAuctionSigner errors", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      messaging.subscribeToAuctionResponse.yields({ bid: auctionBid, bidSignature });
      recoverAuctionBidMock.returns(auctionBid.user);
      transactionManager.getRouterLiquidity.returns(okAsync(BigNumber.from(auctionBid.amountReceived)));

      let error;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.AuctionError);
      expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
      expect(error.context.auctionError.message).to.include("No bids received");
      expect(error.context.invalidBids[0].error.message).to.include("Invalid router signature on bid");
      expect(error.context.invalidBids[0].data.bid).to.be.eq(auctionBid);
    });

    it("should log error if getRouterLiquidity errors", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();
      const mockMethod = "transfer";
      const mockMethodId = getRandomBytes32();

      messaging.subscribeToAuctionResponse.yields({ bid: auctionBid, bidSignature });
      recoverAuctionBidMock.returns(auctionBid.router);

      transactionManager.getRouterLiquidity.returns(
        errAsync(
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
            method: mockMethod,
            methodId: mockMethodId,
            transactionId: auctionBid.transactionId,
          }),
        ),
      );

      let error;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.AuctionError);
      expect(error.context.auctionError.message).to.include("No bids received");
      expect(error.context.invalidBids[0].error.message).to.include(TransactionManagerError.reasons.TxServiceError);
      expect(error.context.invalidBids[0].data.bid).to.be.eq(auctionBid);
    });

    it("should log error if router liquidity is lower than amountReceived", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      messaging.subscribeToAuctionResponse.yields({ bid: auctionBid, bidSignature });
      recoverAuctionBidMock.returns(auctionBid.router);

      transactionManager.getRouterLiquidity.returns(okAsync(BigNumber.from(auctionBid.amountReceived).sub("1")));

      let error;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.AuctionError);
      expect(error.context.auctionError.message).to.include("No bids received");
      expect(error.context.invalidBids[0].error.message).to.include("Router's liquidity low");
      expect(error.context.invalidBids[0].data.bid).to.be.eq(auctionBid);
    });

    it("should log error if amountReceived is lower than lower bound", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      const crossChainParamsMock = JSON.parse(JSON.stringify(crossChainParams));
      crossChainParamsMock.amount = "100000000";
      auctionBid.amountReceived = "1";

      messaging.subscribeToAuctionResponse.yields({ bid: auctionBid, bidSignature });
      recoverAuctionBidMock.returns(auctionBid.router);
      transactionManager.getRouterLiquidity.returns(okAsync(BigNumber.from(auctionBid.amountReceived)));

      let error;
      try {
        await sdk.getTransferQuote(crossChainParamsMock);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.AuctionError);
      expect(error.context.auctionError.message).to.include("No bids received");
      expect(error.context.invalidBids[0].error.message).to.include(
        "Invalid bid price: price impact is more than the slippage tolerance",
      );
      expect(error.context.invalidBids[0].data.bid).to.be.eq(auctionBid);
    });

    it("happy: should get a transfer quote => dryRun ", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      messaging.subscribeToAuctionResponse.yields({ bid: auctionBid, bidSignature: undefined });
      let error;
      let res;
      try {
        res = await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }

      expect(res.bid).to.be.eq(auctionBid);
      expect(res.bidSignature).to.be.undefined;
    });

    it("happy: should get a transfer quote", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      messaging.subscribeToAuctionResponse.yields({ bid: auctionBid, bidSignature });
      recoverAuctionBidMock.returns(auctionBid.router);
      transactionManager.getRouterLiquidity.returns(okAsync(BigNumber.from(auctionBid.amountReceived)));

      let error;
      let res;
      try {
        res = await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }

      expect(res.bid).to.be.eq(auctionBid);
      expect(res.bidSignature).to.be.eq(bidSignature);
    });
  });

  describe("#prepareTransfer", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { auctionBid, bidSignature } = getMock({}, { user: "abc" });
        let error;
        try {
          await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { auctionBid, bidSignature } = getMock({}, { sendingChainId: 1400 });
        let error;
        try {
          await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });

      it("unkown receivingChainId", async () => {
        const { auctionBid, bidSignature } = getMock({}, { receivingChainId: 1400 });
        let error;
        try {
          await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });
    });

    it("should error if bidSignature undefined", async () => {
      const { auctionBid, bidSignature } = getMock({}, {}, "");

      let error;
      try {
        await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
      expect(error.context.paramsError).to.include("bidSignature undefined");
    });

    it("should error if approveTokensIfNeeded transaction fails", async () => {
      const { auctionBid, bidSignature } = getMock();
      const mockMethod = "transfer";
      const mockMethodId = getRandomBytes32();

      transactionManager.approveTokensIfNeeded.returns(
        errAsync(
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
            method: mockMethod,
            methodId: mockMethodId,
            transactionId: auctionBid.transactionId,
          }),
        ),
      );
      let error;
      try {
        await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
    });

    it("should error if approve transaction.wait errors", async () => {
      const { auctionBid, bidSignature } = getMock();

      const TxResponseMock = JSON.parse(JSON.stringify(TxResponse));
      TxResponseMock.wait = () => Promise.reject(new Error("fails"));

      transactionManager.approveTokensIfNeeded.returns(okAsync(TxResponseMock));
      let error;
      try {
        await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      expect(error.context.txError.message).to.be.eq("fails");
    });

    it("should error if approve transaction reverts", async () => {
      const { auctionBid, bidSignature } = getMock();

      const TxResponseMock = JSON.parse(JSON.stringify(TxResponse));
      const TxReceiptMock = JSON.parse(JSON.stringify(TxReceipt));
      TxReceiptMock.status = 0;

      TxResponseMock.wait = () => Promise.resolve(TxReceiptMock);

      transactionManager.approveTokensIfNeeded.returns(okAsync(TxResponseMock));
      let error;
      try {
        await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      expect(error.context.approveReceipt).to.be.eq(TxReceiptMock);
    });

    it("should error if prepare errors", async () => {
      const { auctionBid, bidSignature } = getMock();
      const mockMethod = "transfer";
      const mockMethodId = getRandomBytes32();

      transactionManager.approveTokensIfNeeded.returns(okAsync(undefined));
      transactionManager.prepare.returns(
        errAsync(
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
            method: mockMethod,
            methodId: mockMethodId,
            transactionId: auctionBid.transactionId,
          }),
        ),
      );
      let error;
      try {
        await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
    });

    it("happy: start transfer with suffice approval", async () => {
      const { auctionBid, bidSignature } = getMock();

      transactionManager.approveTokensIfNeeded.returns(okAsync(undefined));
      transactionManager.prepare.returns(okAsync(TxResponse));
      let error;
      let res;
      try {
        res = await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
      expect(res.prepareResponse).to.be.eq(TxResponse);
      expect(res.transactionId).to.be.eq(auctionBid.transactionId);
    });

    it("happy: start transfer ", async () => {
      const { auctionBid, bidSignature } = getMock();

      transactionManager.approveTokensIfNeeded.returns(okAsync(TxResponse));
      transactionManager.prepare.returns(okAsync(TxResponse));
      let error;
      let res;
      try {
        res = await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
      expect(res.prepareResponse).to.be.eq(TxResponse);
      expect(res.transactionId).to.be.eq(auctionBid.transactionId);
    });
  });

  describe("#fulfillTransfer", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        let error;
        try {
          await sdk.fulfillTransfer({
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });

      it("invalid encryptedCallData", async () => {
        const { transaction, record } = await getTransactionData();
        let error;
        try {
          await sdk.fulfillTransfer({
            txData: { ...transaction, ...record },

            encryptedCallData: 1 as any,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { transaction, record } = await getTransactionData({ sendingChainId: 1400 });
        let error;
        try {
          await sdk.fulfillTransfer({
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });

      it("unkown receivingChainId", async () => {
        const { transaction, record } = await getTransactionData({ receivingChainId: 1400 });
        let error;
        try {
          await sdk.fulfillTransfer({
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });
    });

    it("should error if signFulfillTransactionPayload errors", async () => {
      const { transaction, record } = await getTransactionData();

      signFulfillTransactionPayloadMock.rejects(new Error("fails"));
      let error;
      try {
        await sdk.fulfillTransfer({
          txData: { ...transaction, ...record },
          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.SigningError);
      expect(error.context.transactionId).to.be.eq(transaction.transactionId);
    });

    it("should error if finish transfer => useRelayers:true, metaTxResponse errors", async () => {
      const { transaction, record } = await getTransactionData();

      messaging.subscribeToMetaTxResponse.yields("inbox", new Error("fails"));
      let error;
      let res;
      try {
        res = await sdk.fulfillTransfer({
          txData: { ...transaction, ...record },

          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        });
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.MessagingError);
      expect(error.context.messagingError.message).to.be.eq("fails");
    });

    it("happy: finish transfer => useRelayers:true", async () => {
      const { transaction, record } = await getTransactionData();

      const transactionHash = mkHash("0xc");
      messaging.subscribeToMetaTxResponse.yields({
        transactionHash: transactionHash,
        chainId: sendingChainId,
      });

      let error;
      let res;
      try {
        res = await sdk.fulfillTransfer({
          txData: { ...transaction, ...record },

          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        });
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
      expect(res.metaTxResponse.transactionHash).to.be.eq(transactionHash);
      expect(res.metaTxResponse.chainId).to.be.eq(sendingChainId);
    });

    it("should error if finish transfer => useRelayers:false, fulfill errors", async () => {
      const { transaction, record } = await getTransactionData();
      const mockMethod = "transfer";
      const mockMethodId = getRandomBytes32();

      signFulfillTransactionPayloadMock.resolves(EmptyCallDataHash);

      transactionManager.fulfill.returns(
        errAsync(
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
            method: mockMethod,
            methodId: mockMethodId,
          }),
        ),
      );

      let error;
      let res;
      try {
        res = await sdk.fulfillTransfer(
          {
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          },
          "0",
          false,
        );
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      expect(error.context.method).to.be.eq(mockMethod);
      expect(error.context.methodId).to.be.eq(mockMethodId);
    });

    it("happy: finish transfer => useRelayers:false", async () => {
      const { transaction, record } = await getTransactionData();

      transactionManager.fulfill.returns(okAsync(TxResponse));
      let error;
      let res;
      try {
        res = await sdk.fulfillTransfer(
          {
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          },
          "0",
          false,
        );
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
      expect(res.fulfillResponse).to.be.eq(TxResponse);
    });
  });

  describe("#cancel", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        let error;
        try {
          await sdk.cancel(
            {
              txData: { ...transaction, ...record },
              relayerFee: "",
              signature: "",
            },
            sendingChainId,
          );
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });

      it("invalid relayerFee", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        let error;
        try {
          await sdk.cancel(
            {
              txData: { ...transaction, ...record },
              relayerFee: "",
              signature: EmptyCallDataHash,
            },
            sendingChainId,
          );
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });

      it("invalid signature", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        let error;
        try {
          await sdk.cancel(
            {
              txData: { ...transaction, ...record },
              relayerFee: "1",
              signature: "",
            },
            sendingChainId,
          );
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });
    });

    it("should error if transactionManager cancel fails", async () => {
      const mockMethod = "cancel";
      const mockMethodId = getRandomBytes32();
      const { transaction, record } = await getTransactionData();

      transactionManager.cancel.resolves(
        err(
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
            method: mockMethod,
            methodId: mockMethodId,
            transactionId: transaction.transactionId,
          }),
        ),
      );
      let error;
      try {
        await sdk.cancel(
          {
            txData: { ...transaction, ...record },
            relayerFee: "1",
            signature: EmptyCallDataHash,
          },
          sendingChainId,
        );
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      expect(error.context.transactionId).to.be.eq(transaction.transactionId);
    });

    it("happy: cancel", async () => {
      const mockMethod = "cancel";
      const mockMethodId = getRandomBytes32();
      const { transaction, record } = await getTransactionData();

      transactionManager.cancel.resolves(ok(TxResponse));
      let error;
      let res;
      try {
        res = await sdk.cancel(
          {
            txData: { ...transaction, ...record },
            relayerFee: "1",
            signature: EmptyCallDataHash,
          },
          sendingChainId,
        );
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
      expect(res).to.be.eq(TxResponse);
    });
  });

  it("happy changeInjectedSigner", () => {
    const signer = createStubInstance(Wallet);
    const res = sdk.changeInjectedSigner(signer);
  });

  it("happy removeAllListeners", () => {
    const res = sdk.removeAllListeners();
  });
});
