import {
  mkAddress,
  mkHash,
  UserNxtpNatsMessagingService,
  getRandomBytes32,
  InvariantTransactionData,
  VariantTransactionData,
  AuctionBid,
  delay,
} from "@connext/nxtp-utils";
import { expect } from "chai";
import { providers, Wallet, constants, BigNumber } from "ethers";
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
import { HistoricalTransactionStatus, Subgraph } from "../../src/subgraph";
import { TransactionManager, TransactionManagerError } from "../../src/transactionManager";
import { TxResponse, TxReceipt, EmptyBytes, EmptyCallDataHash } from "../helper";
import { Evt } from "evt";

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
  let balanceStub: SinonStub;

  let user: string = mkAddress("0xa");
  let router: string = mkAddress("0xb");
  let sendingChainId: number = 1337;
  let receivingChainId: number = 1338;
  let sendingChainTxManagerAddress: string = mkAddress("0xaaa");
  let receivingChainTxManagerAddress: string = mkAddress("0xbbb");

  const messageEvt = Evt.create<{ inbox: string; data?: any; err?: any }>();

  beforeEach(async () => {
    provider1337 = createStubInstance(providers.FallbackProvider);
    (provider1337 as any)._isProvider = true;
    provider1338 = createStubInstance(providers.FallbackProvider);
    (provider1338 as any)._isProvider = true;
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

    balanceStub = stub(sdkUtils, "getOnchainBalance");
    balanceStub.resolves(BigNumber.from(0));
    stub(sdkUtils, "createMessagingEvt").returns(messageEvt);

    signFulfillTransactionPayloadMock = stub(sdkUtils, "signFulfillTransactionPayload");
    recoverAuctionBidMock = stub(sdkUtils, "recoverAuctionBid");

    stub(sdkUtils, "AUCTION_TIMEOUT").value(1_000);
    stub(sdkUtils, "generateMessagingInbox").returns("inbox");

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
      receivingChainTxManagerAddress: mkAddress("0xaa"),
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
    it("should error if transaction manager doesn't exist for chainId", async () => {
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

    it("should error if subgraph doesn't exist for chainId", async () => {
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

    it("happy: constructor, get transactionManager address", async () => {
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

  describe("#initMessaging", () => {
    it("should fail if connect fails", async () => {
      messaging.connect.rejects(new Error("fail"));

      await expect(sdk.initMessaging()).to.be.rejectedWith("fail");
    });

    it("should fail if subscribeToAuctionResponse fails", async () => {
      messaging.subscribeToAuctionResponse.rejects(new Error("fail"));

      await expect(sdk.initMessaging()).to.be.rejectedWith("fail");
      expect(messaging.connect.callCount).to.be.eq(1);
    });

    it("should fail if subscribeToMetaTxResponse fails", async () => {
      messaging.subscribeToMetaTxResponse.rejects(new Error("fail"));

      await expect(sdk.initMessaging()).to.be.rejectedWith("fail");
      expect(messaging.connect.callCount).to.be.eq(1);
      expect(messaging.subscribeToAuctionResponse.callCount).to.be.eq(1);
    });

    it("should work", async () => {
      await sdk.initMessaging();
      expect(messaging.connect.callCount).to.be.eq(1);
      expect(messaging.subscribeToAuctionResponse.callCount).to.be.eq(1);
      expect(messaging.subscribeToMetaTxResponse.callCount).to.be.eq(1);
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
        preparedTimestamp: Math.floor(Date.now() / 1000),
      };
      subgraph.getActiveTransactions.resolves([activeTransaction]);
      const res = await sdk.getActiveTransactions();
      expect(res[0]).to.be.eq(activeTransaction);
    });
  });

  describe("#getHistoricalTransactions", () => {
    it("should work", async () => {
      const { transaction, record } = await getTransactionData();
      const activeTransaction = {
        crosschainTx: { invariant: transaction, sending: record, receiving: record },
        status: HistoricalTransactionStatus.FULFILLED,
        bidSignature: EmptyBytes,
        encodedBid: EmptyBytes,
        encryptedCallData: EmptyBytes,
        preparedTimestamp: Math.floor(Date.now() / 1000),
      };
      subgraph.getHistoricalTransactions.resolves([activeTransaction]);
      const res = await sdk.getHistoricalTransactions();
      expect(res).to.be.deep.eq([activeTransaction]);
    });
  });

  describe("#getTransferQuote", () => {
    // TODO: #143 callData encryption

    describe("should error if invalid params", () => {
      const { crossChainParams } = getMock({ callData: "abc" });
      it("invalid callData", async () => {
        await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
          NxtpSdkError.reasons.ParamsError,
        );
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { crossChainParams } = getMock({ sendingChainId: 1400 });
        await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
          NxtpSdkError.reasons.ConfigError,
        );
      });

      it("unkown receivingChainId", async () => {
        const { crossChainParams } = getMock({ receivingChainId: 1400 });

        await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
          NxtpSdkError.reasons.ConfigError,
        );
      });
    });

    it("should error if slippageTolerance is lower than Min allowed", async () => {
      const { crossChainParams } = getMock({ slippageTolerance: (parseFloat(MIN_SLIPPAGE_TOLERANCE) - 1).toString() });
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        NxtpSdkError.reasons.ParamsError,
      );
    });

    it("should error if slippageTolerance is higher than Max allowed", async () => {
      const { crossChainParams } = getMock({ slippageTolerance: (parseFloat(MAX_SLIPPAGE_TOLERANCE) + 1).toString() });

      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        NxtpSdkError.reasons.ParamsError,
      );
    });

    it("should error if expiry is too short", async () => {
      const { crossChainParams } = getMock({ expiry: Math.floor(Date.now() / 1000) + getMinExpiryBuffer() - 1000 });

      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        NxtpSdkError.reasons.ParamsError,
      );
    });

    it("should error if expiry is too high", async () => {
      const { crossChainParams } = getMock({ expiry: Math.floor(Date.now() / 1000) + getMaxExpiryBuffer() + 1000 });
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        NxtpSdkError.reasons.ParamsError,
      );
    });

    it("should error if eth_getEncryptionPublicKey errors", async () => {
      const callData = getRandomBytes32();
      const { crossChainParams } = getMock({ callData });

      await expect(sdk.getTransferQuote(crossChainParams)).to.be.rejectedWith(NxtpSdkError.reasons.EncryptionError);
    });

    it.skip("should fail if encrypt fails", async () => {});

    it("should not include improperly signed bids", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      recoverAuctionBidMock.returns(auctionBid.user);
      transactionManager.getRouterLiquidity.resolves(BigNumber.from(auctionBid.amountReceived));

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: auctionBid } });
      }, 200);
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        NxtpSdkError.reasons.AuctionError,
      );
    });

    it("should log error if getRouterLiquidity errors", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();
      const mockMethod = "transfer";
      const mockMethodId = getRandomBytes32();

      recoverAuctionBidMock.returns(auctionBid.router);

      transactionManager.getRouterLiquidity.rejects(
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
          method: mockMethod,
          methodId: mockMethodId,
          transactionId: auctionBid.transactionId,
        }),
      );

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: auctionBid } });
      }, 200);
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        NxtpSdkError.reasons.AuctionError,
      );
    });

    it("should log error if router liquidity is lower than amountReceived", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      recoverAuctionBidMock.returns(auctionBid.router);

      transactionManager.getRouterLiquidity.resolves(BigNumber.from(auctionBid.amountReceived).sub("1"));

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: auctionBid } });
      }, 200);
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        NxtpSdkError.reasons.AuctionError,
      );
    });

    it("should log error if amountReceived is lower than lower bound", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      const crossChainParamsMock = JSON.parse(JSON.stringify(crossChainParams));
      crossChainParamsMock.amount = "100000000";
      auctionBid.amountReceived = "1";

      recoverAuctionBidMock.returns(auctionBid.router);
      transactionManager.getRouterLiquidity.resolves(BigNumber.from(auctionBid.amountReceived));

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: auctionBid } });
      }, 200);
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        NxtpSdkError.reasons.AuctionError,
      );
    });

    it("happy: should get a transfer quote => dryRun ", async () => {
      const { crossChainParams, auctionBid } = getMock();

      recoverAuctionBidMock.returns(auctionBid.router);
      transactionManager.getRouterLiquidity.resolves(BigNumber.from(auctionBid.amountReceived));

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature: undefined, bid: auctionBid } });
      }, 100);
      const res = await sdk.getTransferQuote(crossChainParams);

      expect(res.bid).to.be.eq(auctionBid);
      expect(res.bidSignature).to.be.undefined;
    });

    it("happy: should get a transfer quote", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      recoverAuctionBidMock.returns(auctionBid.router);
      transactionManager.getRouterLiquidity.resolves(BigNumber.from(auctionBid.amountReceived));

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: auctionBid } });
      }, 200);
      const res = await sdk.getTransferQuote(crossChainParams);

      expect(res.bid).to.be.eq(auctionBid);
      expect(res.bidSignature).to.be.eq(bidSignature);
    });
  });

  describe("#prepareTransfer", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { auctionBid, bidSignature } = getMock({}, { user: "abc" });
        await expect(sdk.prepareTransfer({ bid: auctionBid, bidSignature })).to.eventually.be.rejectedWith(
          NxtpSdkError.reasons.ParamsError,
        );
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { auctionBid, bidSignature } = getMock({}, { sendingChainId: 1400 });

        await expect(sdk.prepareTransfer({ bid: auctionBid, bidSignature })).to.eventually.be.rejectedWith(
          NxtpSdkError.reasons.ConfigError,
        );
      });

      it("unkown receivingChainId", async () => {
        const { auctionBid, bidSignature } = getMock({}, { receivingChainId: 1400 });

        await expect(sdk.prepareTransfer({ bid: auctionBid, bidSignature })).to.eventually.be.rejectedWith(
          NxtpSdkError.reasons.ConfigError,
        );
      });
    });

    it("should error if it has insufficient balance", async () => {
      const { auctionBid, bidSignature } = getMock({}, {}, "");
      balanceStub.resolves(BigNumber.from(0));
      try {
        await sdk.prepareTransfer({ bid: { ...auctionBid, amount: "10" }, bidSignature });
        expect("Should error").to.be.undefined;
      } catch (e) {
        expect(e.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(e.context.paramsError).to.include(`Insufficient balance`);
      }
    });

    it("should error if bidSignature undefined", async () => {
      const { auctionBid } = getMock({}, {}, "");
      await expect(sdk.prepareTransfer({ bid: auctionBid, bidSignature: undefined })).to.eventually.be.rejectedWith(
        NxtpSdkError.reasons.ParamsError,
      );
    });

    it("should error if approveTokensIfNeeded transaction fails", async () => {
      const { auctionBid, bidSignature } = getMock();
      transactionManager.approveTokensIfNeeded.rejects("fails");

      await expect(sdk.prepareTransfer({ bid: auctionBid, bidSignature })).to.eventually.be.rejectedWith("");
    });

    it("should error if approve transaction.wait errors", async () => {
      const { auctionBid, bidSignature } = getMock();
      balanceStub.resolves(BigNumber.from(auctionBid.amount));

      const TxResponseMock = JSON.parse(JSON.stringify(TxResponse));
      TxResponseMock.wait = () => Promise.reject(new Error("fails"));

      transactionManager.approveTokensIfNeeded.returns(TxResponseMock);

      await expect(sdk.prepareTransfer({ bid: auctionBid, bidSignature })).to.eventually.be.rejectedWith("fails");
    });

    it("should error if approve transaction reverts", async () => {
      const { auctionBid, bidSignature } = getMock();
      balanceStub.resolves(BigNumber.from(auctionBid.amount));

      const TxResponseMock = JSON.parse(JSON.stringify(TxResponse));
      const TxReceiptMock = JSON.parse(JSON.stringify(TxReceipt));
      TxReceiptMock.status = 0;

      TxResponseMock.wait = () => Promise.resolve(TxReceiptMock);

      transactionManager.approveTokensIfNeeded.resolves(TxResponseMock);

      await expect(sdk.prepareTransfer({ bid: auctionBid, bidSignature })).to.eventually.be.rejectedWith(
        TransactionManagerError.reasons.TxServiceError,
      );
    });

    it("should error if prepare errors", async () => {
      const { auctionBid, bidSignature } = getMock();
      const mockMethod = "transfer";
      const mockMethodId = getRandomBytes32();
      balanceStub.resolves(BigNumber.from(auctionBid.amount));

      transactionManager.approveTokensIfNeeded.resolves(undefined);
      transactionManager.prepare.rejects(
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
          method: mockMethod,
          methodId: mockMethodId,
          transactionId: auctionBid.transactionId,
        }),
      );
      await expect(sdk.prepareTransfer({ bid: auctionBid, bidSignature })).to.eventually.be.rejectedWith(
        TransactionManagerError.reasons.TxServiceError,
      );
    });

    it("happy: start transfer with suffice approval", async () => {
      const { auctionBid, bidSignature } = getMock();
      balanceStub.resolves(BigNumber.from(auctionBid.amount));

      transactionManager.approveTokensIfNeeded.returns(undefined);
      transactionManager.prepare.resolves(TxResponse);
      const res = await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
      expect(res.prepareResponse).to.be.eq(TxResponse);
      expect(res.transactionId).to.be.eq(auctionBid.transactionId);
    });

    it("happy: start transfer ", async () => {
      const { auctionBid, bidSignature } = getMock();
      balanceStub.resolves(BigNumber.from(auctionBid.amount));

      transactionManager.approveTokensIfNeeded.resolves(TxResponse);
      transactionManager.prepare.resolves(TxResponse);

      const res = await sdk.prepareTransfer({ bid: auctionBid, bidSignature });
      expect(res.prepareResponse).to.be.eq(TxResponse);
      expect(res.transactionId).to.be.eq(auctionBid.transactionId);
    });
  });

  describe("#fulfillTransfer", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        await expect(
          sdk.fulfillTransfer({
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          }),
        ).to.eventually.be.rejectedWith(NxtpSdkError.reasons.ParamsError);
      });

      it("invalid encryptedCallData", async () => {
        const { transaction, record } = await getTransactionData();

        await expect(
          sdk.fulfillTransfer({
            txData: { ...transaction, ...record },

            encryptedCallData: 1 as any,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          }),
        ).to.eventually.be.rejectedWith(NxtpSdkError.reasons.ParamsError);
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { transaction, record } = await getTransactionData({ sendingChainId: 1400 });
        await expect(
          sdk.fulfillTransfer({
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          }),
        ).to.eventually.be.rejectedWith(NxtpSdkError.reasons.ConfigError);
      });

      it("unkown receivingChainId", async () => {
        const { transaction, record } = await getTransactionData({ receivingChainId: 1400 });

        await expect(
          sdk.fulfillTransfer({
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          }),
        ).to.eventually.be.rejectedWith(NxtpSdkError.reasons.ConfigError);
      });
    });

    it("should error if signFulfillTransactionPayload errors", async () => {
      const { transaction, record } = await getTransactionData();

      signFulfillTransactionPayloadMock.rejects(new Error("fails"));
      await expect(
        sdk.fulfillTransfer({
          txData: { ...transaction, ...record },
          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        }),
      ).to.eventually.be.rejectedWith("fails");
    });

    it("should error if finish transfer => useRelayers:true, metaTxResponse errors", async () => {
      const { transaction, record } = await getTransactionData();
      stub(sdkUtils, "META_TX_TIMEOUT").value(1_000);

      setTimeout(() => {
        messageEvt.post({
          inbox: "inbox",
          err: "Blahhh",
        });
      }, 200);

      try {
        await sdk.fulfillTransfer({
          txData: { ...transaction, ...record },

          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        });
        expect("Should have errored").to.be.undefined;
      } catch (e) {
        expect(e.message).to.be.eq(NxtpSdkError.reasons.TxError);
        expect(e.context.txError.message).to.include("No relayer response");
      }
    });

    it("happy: finish transfer => useRelayers:true", async () => {
      const { transaction, record } = await getTransactionData();

      const transactionHash = mkHash("0xc");

      setTimeout(() => {
        messageEvt.post({
          inbox: "inbox",
          data: {
            transactionHash,
            chainId: sendingChainId,
          },
        });
      }, 200);

      const res = await sdk.fulfillTransfer({
        txData: { ...transaction, ...record },

        encryptedCallData: EmptyCallDataHash,
        encodedBid: EmptyCallDataHash,
        bidSignature: EmptyCallDataHash,
      });

      expect(res.metaTxResponse.transactionHash).to.be.eq(transactionHash);
      expect(res.metaTxResponse.chainId).to.be.eq(sendingChainId);
    });

    it("should error if finish transfer => useRelayers:false, fulfill errors", async () => {
      const { transaction, record } = await getTransactionData();
      const mockMethod = "transfer";
      const mockMethodId = getRandomBytes32();

      signFulfillTransactionPayloadMock.resolves(EmptyCallDataHash);

      transactionManager.fulfill.rejects(
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
          method: mockMethod,
          methodId: mockMethodId,
        }),
      );
      await expect(
        sdk.fulfillTransfer(
          {
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          },
          "0",
          false,
        ),
      ).to.eventually.be.rejectedWith(TransactionManagerError.reasons.TxServiceError);
    });

    it("happy: finish transfer => useRelayers:false", async () => {
      const { transaction, record } = await getTransactionData();

      transactionManager.fulfill.resolves(TxResponse);
      const res = await sdk.fulfillTransfer(
        {
          txData: { ...transaction, ...record },

          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        },
        "0",
        false,
      );
      expect(res.fulfillResponse).to.be.eq(TxResponse);
    });
  });

  describe("#cancel", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });

        await expect(
          sdk.cancel(
            {
              txData: { ...transaction, ...record },
              relayerFee: "",
              signature: "",
            },
            sendingChainId,
          ),
        ).to.eventually.be.rejectedWith(NxtpSdkError.reasons.ParamsError);
      });

      it("invalid relayerFee", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        await expect(
          sdk.cancel(
            {
              txData: { ...transaction, ...record },
              relayerFee: "",
              signature: EmptyCallDataHash,
            },
            sendingChainId,
          ),
        ).to.eventually.be.rejectedWith(NxtpSdkError.reasons.ParamsError);
      });

      it("invalid signature", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });

        await expect(
          sdk.cancel(
            {
              txData: { ...transaction, ...record },
              relayerFee: "1",
              signature: "",
            },
            sendingChainId,
          ),
        ).to.eventually.be.rejectedWith(NxtpSdkError.reasons.ParamsError);
      });
    });

    it("should error if transactionManager cancel fails", async () => {
      const mockMethod = "cancel";
      const mockMethodId = getRandomBytes32();
      const { transaction, record } = await getTransactionData();

      transactionManager.cancel.rejects(
        new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
          method: mockMethod,
          methodId: mockMethodId,
          transactionId: transaction.transactionId,
        }),
      );
      await expect(
        sdk.cancel(
          {
            txData: { ...transaction, ...record },
            relayerFee: "1",
            signature: EmptyCallDataHash,
          },
          sendingChainId,
        ),
      ).to.eventually.be.rejectedWith(TransactionManagerError.reasons.TxServiceError);
    });

    it("happy: cancel", async () => {
      const { transaction, record } = await getTransactionData();

      transactionManager.cancel.resolves(TxResponse);

      const res = await sdk.cancel(
        {
          txData: { ...transaction, ...record },
          relayerFee: "1",
          signature: EmptyCallDataHash,
        },
        sendingChainId,
      );

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
