import {
  mkAddress,
  mkHash,
  UserNxtpNatsMessagingService,
  getRandomBytes32,
  InvariantTransactionData,
  VariantTransactionData,
  AuctionBid,
  Logger,
  chainDataMock,
  GAS_ESTIMATES,
} from "@connext/nxtp-utils";
import { expect } from "chai";
import { providers, Wallet, constants, BigNumber } from "ethers";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { MAX_SLIPPAGE_TOLERANCE, MIN_SLIPPAGE_TOLERANCE } from "../../src/sdk";
import * as TransactionManagerHelperFns from "../../src/transactionManager/transactionManager";

import * as utils from "../../src/utils";
import * as sdkIndex from "../../src/sdkBase";
import { EmptyBytes, EmptyCallDataHash, TxRequest } from "../helper";
import { Evt } from "evt";
import {
  ChainNotConfigured,
  InvalidBidSignature,
  InvalidExpiry,
  InvalidParamStructure,
  InvalidSlippage,
  FulfillTimeout,
  NoSubgraph,
  NoTransactionManager,
  SubgraphsNotSynced,
  UnknownAuctionError,
  InvalidCallTo,
  NoValidBids,
  RelayFailed,
  NotEnoughAmount,
} from "../../src/error";
import { getAddress, keccak256, parseEther } from "ethers/lib/utils";
import { CrossChainParams, NxtpSdkEvents, HistoricalTransactionStatus } from "../../src";
import { Subgraph } from "../../src/subgraph/subgraph";
import { getMinExpiryBuffer, getMaxExpiryBuffer } from "../../src/utils";
import { TransactionManager } from "../../src/transactionManager/transactionManager";
import { NxtpSdkBase } from "../../src/sdkBase";

const logger = new Logger({ level: process.env.LOG_LEVEL ?? "silent" });

const { AddressZero } = constants;
const response = "connected";

// NOTE: Tried importing the evt module Timeout error here, but the compiler throws.
// For now, just mocking using the proper message string.
const mockEvtTimeoutErr = (timeout: number) => new Error(`Evt timeout after ${timeout}ms`);

describe("NxtpSdkBase", () => {
  let sdk: NxtpSdkBase;
  let signer: SinonStubbedInstance<Wallet>;
  let messaging: SinonStubbedInstance<UserNxtpNatsMessagingService>;
  let subgraph: SinonStubbedInstance<Subgraph>;
  let transactionManager: SinonStubbedInstance<TransactionManager>;
  let chainData: SinonStub;
  let getDeployedChainIdsForGasFeeStub: SinonStub;
  let getDeployedPriceOracleContractStub: SinonStub;
  let provider1337: SinonStubbedInstance<providers.FallbackProvider>;
  let provider1338: SinonStubbedInstance<providers.FallbackProvider>;
  let signFulfillTransactionPayloadMock: SinonStub;
  let recoverAuctionBidMock: SinonStub;
  let balanceStub: SinonStub;
  let gelatoFulfill: SinonStub;
  let isChainSupportedByGelatoStub: SinonStub;

  let user: string = getAddress(mkAddress("0xa"));
  let router: string = getAddress(mkAddress("0xb"));
  let sendingChainId: number = 1337;
  let receivingChainId: number = 1338;
  let sendingChainTxManagerAddress: string = mkAddress("0xaaa");
  let receivingChainTxManagerAddress: string = mkAddress("0xbbb");

  const messageEvt = Evt.create<{ inbox: string; data?: any; err?: any }>();

  const supportedChains = [sendingChainId.toString(), receivingChainId.toString()];

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
    subgraph.getSyncStatus.returns({ latestBlock: 0, synced: true, syncedBlock: 0 });
    transactionManager = createStubInstance(TransactionManager);

    stub(utils, "getChainData").resolves(chainDataMock);
    stub(utils, "getDecimalsForAsset").resolves(18);
    stub(utils, "getTokenPrice").resolves(BigNumber.from(10).pow(21));
    stub(utils, "getTimestampInSeconds").resolves(Math.floor(Date.now() / 1000));
    provider1337.getGasPrice.resolves(BigNumber.from(10).pow(9));
    provider1338.getGasPrice.resolves(BigNumber.from(10).pow(9));

    balanceStub = stub(utils, "getOnchainBalance");
    balanceStub.resolves(BigNumber.from(0));
    stub(sdkIndex, "createMessagingEvt").returns(messageEvt);

    signFulfillTransactionPayloadMock = stub(utils, "signFulfillTransactionPayload");
    recoverAuctionBidMock = stub(utils, "recoverAuctionBid");
    recoverAuctionBidMock.returns(router);

    stub(sdkIndex, "DEFAULT_AUCTION_TIMEOUT").value(1_000);
    stub(utils, "generateMessagingInbox").returns("inbox");
    gelatoFulfill = stub(utils, "gelatoFulfill").resolves({ taskId: "foo" });
    isChainSupportedByGelatoStub = stub(utils, "isChainSupportedByGelato").returns(true);

    signFulfillTransactionPayloadMock.resolves(EmptyCallDataHash);

    messaging.isConnected.resolves(true);
    messaging.publishMetaTxRequest.resolves({ inbox: "inbox" });

    signer.getAddress.resolves(user);

    sdk = new NxtpSdkBase({
      chainConfig,
      natsUrl: "http://example.com",
      authUrl: "http://example.com",
      messaging: undefined,
      logger,
      signerAddress: Promise.resolve(user),
    });

    (sdk as any).transactionManager = transactionManager;
    (sdk as any).subgraph = subgraph;
    (sdk as any).messaging = messaging;

    messaging.connect.resolves(response);

    getDeployedChainIdsForGasFeeStub = stub(TransactionManagerHelperFns, "getDeployedChainIdsForGasFee").returns([
      sendingChainId,
      receivingChainId,
    ]);

    getDeployedPriceOracleContractStub = stub(TransactionManagerHelperFns, "getDeployedPriceOracleContract").returns({
      address: "0x0",
      abi: "",
    });
  });

  afterEach(() => {
    sdk.removeAllListeners();
    restore();
    reset();
  });

  const getTransactionData = async (
    txOverrides: Partial<InvariantTransactionData> = {},
    recordOverrides: Partial<VariantTransactionData> = {},
  ): Promise<{ transaction: InvariantTransactionData; record: VariantTransactionData }> => {
    const transaction = {
      receivingChainTxManagerAddress: mkAddress("0xaa"),
      user,
      initiator: user,
      router,
      sendingAssetId: mkAddress("0xc"),
      receivingAssetId: mkAddress("0xb"),
      sendingChainFallback: user,
      callTo: AddressZero,
      receivingAddress: mkAddress("0xa"),
      callDataHash: EmptyCallDataHash,
      transactionId: getRandomBytes32(),
      sendingChainId,
      receivingChainId,
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
    _gasFeeInReceivingToken = "0",
    _metaTxRelayerFe = "0",
  ): {
    crossChainParams: CrossChainParams;
    auctionBid: AuctionBid;
    bidSignature: string;
    gasFeeInReceivingToken: string;
    metaTxRelayerFee: string;
  } => {
    const transactionId = getRandomBytes32();
    const crossChainParams = {
      callData: EmptyBytes,
      encryptedCallData: EmptyBytes,
      sendingChainId: sendingChainId,
      sendingAssetId: mkAddress("0xc"),
      receivingChainId: receivingChainId,
      receivingAssetId: mkAddress("0xb"),
      callTo: AddressZero,
      receivingAddress: mkAddress("0xa"),
      amount: parseEther("1").toString(),
      expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
      transactionId,
      ...crossChainParamsOverrides,
    };

    const auctionBid = {
      user,
      router,
      initiator: user,
      sendingChainId,
      sendingAssetId: mkAddress("0xa"),
      amount: parseEther("1").toString(),
      receivingChainId,
      receivingAssetId: mkAddress("0xb"),
      amountReceived: "1000000",
      receivingAddress: mkAddress("0xc"),
      transactionId,
      expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
      callDataHash: EmptyCallDataHash,
      callTo: AddressZero,
      encryptedCallData: EmptyBytes,
      sendingChainTxManagerAddress,
      receivingChainTxManagerAddress,
      bidExpiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
      ...auctionBidOverrides,
    };

    const bidSignature = _bidSignature;
    const gasFeeInReceivingToken = _gasFeeInReceivingToken;
    const metaTxRelayerFee = _metaTxRelayerFe;

    return { crossChainParams, auctionBid, bidSignature, gasFeeInReceivingToken, metaTxRelayerFee };
  };

  describe("#constructor", () => {
    it("should error if transaction manager doesn't exist for chainId", async () => {
      const _chainConfig = {
        [sendingChainId]: {
          provider: provider1337,
          subgraph: "http://example.com",
        },
      };
      expect(
        () =>
          new NxtpSdkBase({
            chainConfig: _chainConfig,
            signerAddress: Promise.resolve(user),
            natsUrl: "http://example.com",
            authUrl: "http://example.com",
            messaging: undefined,
            logger,
            network: "mainnet",
          }),
      ).to.throw(NoTransactionManager.getMessage(sendingChainId));
    });

    it("should error if subgraph doesn't exist for chainId", async () => {
      getDeployedChainIdsForGasFeeStub.returns([sendingChainId, receivingChainId]);
      const _chainConfig = {
        [sendingChainId]: {
          provider: provider1337,
          transactionManagerAddress: sendingChainTxManagerAddress,
        },
      };
      expect(
        () =>
          new NxtpSdkBase({
            chainConfig: _chainConfig,
            signerAddress: Promise.resolve(user),
            natsUrl: "http://example.com",
            authUrl: "http://example.com",
            messaging: undefined,
            logger,
            network: "mainnet",
          }),
      ).to.throw(NoSubgraph.getMessage(sendingChainId));
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
      expect(
        () =>
          new NxtpSdkBase({
            chainConfig,
            signerAddress: Promise.resolve(user),
            natsUrl: "http://example.com",
            authUrl: "http://example.com",
            messaging: undefined,
            network: "testnet",
            logger,
          }),
      ).to.not.throw;
    });
  });

  describe("#connectMessaging", () => {
    it("should fail if connect fails", async () => {
      messaging.connect.rejects(new Error("fail"));

      await expect(sdk.connectMessaging()).to.be.rejectedWith("fail");
    });

    it("should fail if subscribeToAuctionResponse fails", async () => {
      messaging.subscribeToAuctionResponse.rejects(new Error("fail"));

      await expect(sdk.connectMessaging()).to.be.rejectedWith("fail");
      expect(messaging.connect.callCount).to.be.eq(1);
    });

    it("should work", async () => {
      await sdk.connectMessaging();
      expect(messaging.connect.callCount).to.be.eq(1);
      expect(messaging.subscribeToAuctionResponse.callCount).to.be.eq(1);
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
          InvalidParamStructure.getMessage("getTransferQuote", "CrossChainParams"),
        );
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { crossChainParams } = getMock({ sendingChainId: 1400 });
        await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
          ChainNotConfigured.getMessage(1400, supportedChains),
        );
      });

      it("unkown receivingChainId", async () => {
        const { crossChainParams } = getMock({ receivingChainId: 1400 });

        await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
          ChainNotConfigured.getMessage(1400, supportedChains),
        );
      });
    });

    it("should error if subgraph not synced", async () => {
      subgraph.getSyncStatus.returns({ latestBlock: 0, synced: false, syncedBlock: 0 });
      const { crossChainParams } = getMock();

      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        SubgraphsNotSynced.getMessage(
          { latestBlock: 0, synced: false, syncedBlock: 0 },
          { latestBlock: 0, synced: false, syncedBlock: 0 },
        ),
      );
    });

    it("should error if slippageTolerance is lower than Min allowed", async () => {
      const { crossChainParams } = getMock({ slippageTolerance: (parseFloat(MIN_SLIPPAGE_TOLERANCE) - 1).toString() });
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        InvalidSlippage.getMessage(crossChainParams.slippageTolerance, MIN_SLIPPAGE_TOLERANCE, MAX_SLIPPAGE_TOLERANCE),
      );
    });

    it("should error if slippageTolerance is higher than Max allowed", async () => {
      const { crossChainParams } = getMock({ slippageTolerance: (parseFloat(MAX_SLIPPAGE_TOLERANCE) + 1).toString() });

      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        InvalidSlippage.getMessage(crossChainParams.slippageTolerance, MIN_SLIPPAGE_TOLERANCE, MAX_SLIPPAGE_TOLERANCE),
      );
    });

    it("should error if expiry is too short", async () => {
      const { crossChainParams } = getMock({ expiry: Math.floor(Date.now() / 1000) + getMinExpiryBuffer() - 1000 });

      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        InvalidExpiry.getMessage(crossChainParams.expiry, getMinExpiryBuffer(), getMaxExpiryBuffer()),
      );
    });

    it("should error if expiry is too high", async () => {
      const { crossChainParams } = getMock({ expiry: Math.floor(Date.now() / 1000) + getMaxExpiryBuffer() + 1000 });
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        InvalidExpiry.getMessage(crossChainParams.expiry, getMinExpiryBuffer(), getMaxExpiryBuffer()),
      );
    });

    it("should error if receiverAmount is lower than gasFee", async () => {
      const { crossChainParams } = getMock({ amount: "100000" });
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(NotEnoughAmount.getMessage());
    });

    it("should not include improperly signed bids", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      recoverAuctionBidMock.returns(auctionBid.user);
      transactionManager.getRouterLiquidity.resolves(BigNumber.from(auctionBid.amountReceived));

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: auctionBid } });
      }, 200);
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        NoValidBids.getMessage(auctionBid.transactionId),
      );
    });

    it("should log error if getRouterLiquidity errors", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      recoverAuctionBidMock.returns(auctionBid.router);

      transactionManager.getRouterLiquidity.rejects(new Error("fail"));

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: auctionBid } });
      }, 200);
      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        NoValidBids.getMessage(auctionBid.transactionId),
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
        NoValidBids.getMessage(auctionBid.transactionId),
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
        UnknownAuctionError.getMessage(auctionBid.transactionId),
      );
    });

    it("happy: should get a transfer quote => dryRun ", async () => {
      const { crossChainParams, auctionBid } = getMock();

      recoverAuctionBidMock.returns(auctionBid.router);
      transactionManager.getRouterLiquidity.resolves(BigNumber.from(auctionBid.amountReceived));

      setTimeout(() => {
        messageEvt.post({
          inbox: "inbox",
          data: { bidSignature: undefined, bid: auctionBid, gasFeeInReceivingToken: "0" },
        });
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
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: auctionBid, gasFeeInReceivingToken: "0" } });
      }, 100);
      const res = await sdk.getTransferQuote(crossChainParams);

      expect(res.bid).to.be.eq(auctionBid);
      expect(res.bidSignature).to.be.eq(bidSignature);
    });

    it("happy: should get a transfer quote with callData", async () => {
      const callData = getRandomBytes32();
      const encryptedCallData = keccak256(getRandomBytes32());
      const { crossChainParams, auctionBid, bidSignature } = getMock({
        callData,
        encryptedCallData,
      });

      recoverAuctionBidMock.returns(auctionBid.router);
      transactionManager.getRouterLiquidity.resolves(BigNumber.from(auctionBid.amountReceived));

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: auctionBid, gasFeeInReceivingToken: "0" } });
      }, 100);

      const res = await sdk.getTransferQuote(crossChainParams);
      expect(res.bid).to.be.eq(auctionBid);
      expect(res.bidSignature).to.be.eq(bidSignature);
    });

    it("happy: should get a transfer quote from a preferred router", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      const nonPreferredBid: AuctionBid = {
        ...auctionBid,
        router: mkAddress("0xddd"),
        amountReceived: BigNumber.from(auctionBid.amountReceived).add(1).toString(),
      };

      recoverAuctionBidMock.returns(auctionBid.router);
      transactionManager.getRouterLiquidity.resolves(BigNumber.from(auctionBid.amountReceived));

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: nonPreferredBid, gasFeeInReceivingToken: "0" } });
      }, 100);

      setTimeout(() => {
        messageEvt.post({ inbox: "inbox", data: { bidSignature, bid: auctionBid, gasFeeInReceivingToken: "0" } });
      }, 150);
      const res = await sdk.getTransferQuote({ ...crossChainParams, preferredRouters: [auctionBid.router] });

      expect(res.bid).to.be.eq(auctionBid);
      expect(res.bidSignature).to.be.eq(bidSignature);
    });

    it("happy: should sort multiple transfer quotes", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      recoverAuctionBidMock.returns(auctionBid.router);
      transactionManager.getRouterLiquidity.resolves(BigNumber.from(auctionBid.amountReceived));

      setTimeout(() => {
        messageEvt.post({
          inbox: "inbox",
          data: { bidSignature, bid: { ...auctionBid, amountReceived: "100000" }, gasFeeInReceivingToken: "0" },
        });
        messageEvt.post({
          inbox: "inbox",
          data: { bidSignature, bid: { ...auctionBid, amountReceived: "100002" }, gasFeeInReceivingToken: "0" },
        });
        messageEvt.post({
          inbox: "inbox",
          data: { bidSignature, bid: { ...auctionBid, amountReceived: "100004" }, gasFeeInReceivingToken: "0" },
        });
      }, 100);
      const res = await sdk.getTransferQuote(crossChainParams);

      expect(res.bid).to.be.deep.eq({ ...auctionBid, amountReceived: "100004" });
      expect(res.bidSignature).to.be.eq(bidSignature);
    });
  });

  describe("#prepareTransfer", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock({}, { user: "abc" });
        await expect(
          sdk.prepareTransfer({ bid: auctionBid, bidSignature, gasFeeInReceivingToken }),
        ).to.eventually.be.rejectedWith(InvalidParamStructure.getMessage("prepareTransfer", "AuctionResponse"));
      });
    });

    describe("should error if invalid config", () => {
      it("unknown sendingChainId", async () => {
        const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock({}, { sendingChainId: 1400 });

        await expect(
          sdk.prepareTransfer({ bid: auctionBid, bidSignature, gasFeeInReceivingToken }),
        ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage(1400, supportedChains));
      });

      it("unknown receivingChainId", async () => {
        const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock({}, { receivingChainId: 1400 });

        await expect(
          sdk.prepareTransfer({ bid: auctionBid, bidSignature, gasFeeInReceivingToken }),
        ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage(1400, supportedChains));
      });
    });

    it("should error if subgraph not synced", async () => {
      subgraph.getSyncStatus.returns({ latestBlock: 0, synced: false, syncedBlock: 0 });
      const { crossChainParams } = getMock();

      await expect(sdk.getTransferQuote(crossChainParams)).to.eventually.be.rejectedWith(
        SubgraphsNotSynced.getMessage(
          { latestBlock: 0, synced: false, syncedBlock: 0 },
          { latestBlock: 0, synced: false, syncedBlock: 0 },
        ),
      );
    });

    it("should error if bidSignature undefined", async () => {
      const { auctionBid, gasFeeInReceivingToken } = getMock({}, {}, "");
      balanceStub.resolves(BigNumber.from(auctionBid.amount).add(1000));
      await expect(
        sdk.prepareTransfer({ bid: auctionBid, bidSignature: undefined, gasFeeInReceivingToken }),
      ).to.eventually.be.rejectedWith(InvalidBidSignature.getMessage(auctionBid.router, undefined, undefined));
    });

    it("should error if it callTo isn't deployed contract", async () => {
      const mockCallTo = getAddress(mkAddress("0xc"));
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock({}, { callTo: mockCallTo });

      balanceStub.resolves(BigNumber.from(auctionBid.amount).add(1000));
      await expect(
        sdk.prepareTransfer({ bid: auctionBid, bidSignature: bidSignature, gasFeeInReceivingToken }),
      ).to.eventually.be.rejectedWith(InvalidCallTo.getMessage(mockCallTo));
    });

    it("should error if prepare errors", async () => {
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock();
      balanceStub.resolves(BigNumber.from(auctionBid.amount));

      transactionManager.approveTokensIfNeeded.resolves(undefined);
      transactionManager.prepare.rejects(new Error("fail"));
      await expect(
        sdk.prepareTransfer({ bid: auctionBid, bidSignature, gasFeeInReceivingToken }),
      ).to.eventually.be.rejectedWith("fail");
    });

    it("happy: start transfer", async () => {
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock();
      balanceStub.resolves(BigNumber.from(auctionBid.amount));

      transactionManager.prepare.resolves(TxRequest);

      const res = await sdk.prepareTransfer({
        bid: auctionBid,
        bidSignature,
        gasFeeInReceivingToken,
      });
      expect(res).to.deep.eq(TxRequest);
    });
  });

  describe("#fulfillTransfer", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        await expect(
          sdk.fulfillTransfer(
            {
              txData: { ...transaction, ...record },
              encryptedCallData: EmptyCallDataHash,
              encodedBid: EmptyCallDataHash,
              bidSignature: EmptyCallDataHash,
            },
            "0x",
            "0x",
            "0",
            true,
          ),
        ).to.eventually.be.rejectedWith(
          InvalidParamStructure.getMessage("fulfillTransfer", "TransactionPrepareEventParams"),
        );
      });

      it("invalid encryptedCallData", async () => {
        const { transaction, record } = await getTransactionData();

        await expect(
          sdk.fulfillTransfer(
            {
              txData: { ...transaction, ...record },
              encryptedCallData: 1 as any,
              encodedBid: EmptyCallDataHash,
              bidSignature: EmptyCallDataHash,
            },
            "0x",
            "0x",
            "0",
            true,
          ),
        ).to.eventually.be.rejectedWith(
          InvalidParamStructure.getMessage("fulfillTransfer", "TransactionPrepareEventParams"),
        );
      });
    });

    describe("should error if invalid config", () => {
      it("unknown sendingChainId", async () => {
        const { transaction, record } = await getTransactionData({ sendingChainId: 1400 });
        await expect(
          sdk.fulfillTransfer(
            {
              txData: { ...transaction, ...record },

              encryptedCallData: EmptyCallDataHash,
              encodedBid: EmptyCallDataHash,
              bidSignature: EmptyCallDataHash,
            },
            "0x",
            "0x",
            "0",
            true,
          ),
        ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage(1400, supportedChains));
      });

      it("unknown receivingChainId", async () => {
        const { transaction, record } = await getTransactionData({ receivingChainId: 1400 });

        await expect(
          sdk.fulfillTransfer(
            {
              txData: { ...transaction, ...record },

              encryptedCallData: EmptyCallDataHash,
              encodedBid: EmptyCallDataHash,
              bidSignature: EmptyCallDataHash,
            },
            "0x",
            "0x",
            "0",
            true,
          ),
        ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage(1400, supportedChains));
      });
    });

    it("should error if finish transfer => useRelayers:true, metaTxResponse errors", async () => {
      const { transaction, record } = await getTransactionData();
      stub(sdkIndex, "FULFILL_TIMEOUT").value(100);

      subgraph.waitFor.rejects(mockEvtTimeoutErr(100));

      await expect(
        sdk.fulfillTransfer(
          {
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          },
          "0x",
          "0x",
          "0",
          true,
        ),
      ).to.be.rejectedWith(FulfillTimeout.getMessage(100, transaction.receivingChainId));
    });

    it("happy: finish transfer => useRelayers:true no gelato", async () => {
      const { transaction, record } = await getTransactionData();

      isChainSupportedByGelatoStub.returns(false);

      const transactionHash = mkHash("0xc");

      subgraph.waitFor.resolves({
        transactionHash,
        txData: {
          ...transaction,
          ...record,
          sendingChainId: receivingChainId,
          receivingChainId: sendingChainId,
        },
      } as any);

      const res = await sdk.fulfillTransfer(
        {
          txData: { ...transaction, ...record },

          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        },
        "0x",
        "0x",
        "0",
        true,
      );

      expect(res.transactionResponse.transactionHash).to.be.eq(transactionHash);
      expect(res.transactionResponse.chainId).to.be.eq(sendingChainId);
    });

    it("happy: finish transfer => useGelatoRelay:true", async () => {
      const { transaction, record } = await getTransactionData();

      const transactionHash = mkHash("0xc");
      subgraph.waitFor.resolves({
        transactionHash,
        txData: {
          ...transaction,
          ...record,
          sendingChainId: receivingChainId,
          receivingChainId: sendingChainId,
        },
      } as any);

      const res = await sdk.fulfillTransfer(
        {
          txData: { ...transaction, ...record },

          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        },
        "0x",
        "0x",
        "0",
        true,
      );

      expect(res.transactionResponse.transactionHash).to.be.eq(transactionHash);
      expect(res.transactionResponse.chainId).to.be.eq(sendingChainId);
    });

    it("should error if gelato relay fails", async () => {
      const { transaction, record } = await getTransactionData();
      gelatoFulfill.resolves({ taskId: undefined });

      await expect(
        sdk.fulfillTransfer(
          {
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          },
          "0x",
          "0x",
          "0",
          true,
        ),
      ).to.be.rejectedWith(RelayFailed);
    });

    it("should error if finish transfer => useRelayers:false, fulfill errors", async () => {
      const { transaction, record } = await getTransactionData();

      signFulfillTransactionPayloadMock.resolves(EmptyCallDataHash);

      transactionManager.fulfill.rejects(new Error("fail"));
      await expect(
        sdk.fulfillTransfer(
          {
            txData: { ...transaction, ...record },

            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          },
          "0x",
          "0x",
          "0",
          false,
        ),
      ).to.eventually.be.rejectedWith("fail");
    });

    it("happy: finish transfer => useRelayers:false", async () => {
      const { transaction, record } = await getTransactionData();

      transactionManager.fulfill.resolves(TxRequest);
      const res = await sdk.fulfillTransfer(
        {
          txData: { ...transaction, ...record },

          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        },
        "0x",
        "0x",
        "0",
        false,
      );
      expect(res.transactionRequest).to.deep.eq(TxRequest);
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
              signature: "",
            },
            sendingChainId,
          ),
        ).to.eventually.be.rejectedWith(InvalidParamStructure.getMessage("cancel", "CancelParams"));
      });

      it("invalid relayerFee", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        await expect(
          sdk.cancel(
            {
              txData: { ...transaction, ...record },
              signature: EmptyCallDataHash,
            },
            sendingChainId,
          ),
        ).to.eventually.be.rejectedWith(InvalidParamStructure.getMessage("cancel", "CancelParams"));
      });

      it("invalid signature", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });

        await expect(
          sdk.cancel(
            {
              txData: { ...transaction, ...record },
              signature: "",
            },
            sendingChainId,
          ),
        ).to.eventually.be.rejectedWith(InvalidParamStructure.getMessage("cancel", "CancelParams"));
      });
    });

    it("should error if transactionManager cancel fails", async () => {
      const { transaction, record } = await getTransactionData();

      transactionManager.cancel.rejects(new Error("fail"));
      await expect(
        sdk.cancel(
          {
            txData: { ...transaction, ...record },
            signature: EmptyCallDataHash,
          },
          sendingChainId,
        ),
      ).to.eventually.be.rejectedWith("fail");
    });

    it("happy: cancel", async () => {
      const { transaction, record } = await getTransactionData();

      transactionManager.cancel.resolves(TxRequest);

      const res = await sdk.cancel(
        {
          txData: { ...transaction, ...record },
          signature: EmptyCallDataHash,
        },
        sendingChainId,
      );

      expect(res).to.deep.eq(TxRequest);
    });
  });

  describe("#estimateHardcodedFeeForPrepare", () => {
    it("happy: should return valid price if price oracle is configured", async () => {
      const { crossChainParams } = getMock();

      const result = await sdk.estimateHardcodedFeeForPrepare(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        18,
        null,
        null,
      );

      expect(result).to.be.eq(BigNumber.from(GAS_ESTIMATES.prepare).mul("1000000000"));
    });

    it("happy: should return zero price if price oracle isn't configured", async () => {
      getDeployedPriceOracleContractStub.returns({ address: null, abi: null });
      const { crossChainParams } = getMock();

      const result = await sdk.estimateHardcodedFeeForPrepare(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        18,
        null,
        null,
      );

      expect(result).to.be.eq(BigNumber.from("0"));
    });
  });

  describe("#estimateHardcodedFeeForFulfill", () => {
    it("happy: should return valid price if price oracle is configured", async () => {
      const { crossChainParams } = getMock();

      const result = await sdk.estimateHardcodedFeeForFulfill(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        18,
        null,
        null,
      );

      expect(result).to.be.eq(BigNumber.from(GAS_ESTIMATES.fulfill).mul("1000000000"));
    });
    it("happy: should return zero price if price oracle isn't configured", async () => {
      getDeployedPriceOracleContractStub.returns({ address: null, abi: null });
      const { crossChainParams } = getMock();

      const result = await sdk.estimateHardcodedFeeForFulfill(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        18,
        null,
        null,
      );

      expect(result).to.be.eq(BigNumber.from("0"));
    });
  });

  describe("#estimateFeeForRouterTransfer", () => {
    it("happy: should return valid price if price oracle is configured", async () => {
      const { crossChainParams } = getMock();
      const result = await sdk.estimateFeeForRouterTransfer(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        crossChainParams.receivingChainId,
        crossChainParams.receivingAssetId,
        true,
        null,
        null,
      );

      expect(result).to.be.eq(
        BigNumber.from(GAS_ESTIMATES.fulfill).add(BigNumber.from(GAS_ESTIMATES.prepare)).mul("1000000000"),
      );
    });
    it("happy: should return zero price if price oracle isn't configured", async () => {
      const { crossChainParams } = getMock();
      getDeployedChainIdsForGasFeeStub.returns([11111, 22222]);
      const result = await sdk.estimateFeeForRouterTransfer(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        crossChainParams.receivingChainId,
        crossChainParams.receivingAssetId,
        true,
        null,
        null,
      );
      expect(result).to.be.eq("0");
    });
    it("should error for non configured chains", async () => {
      await expect(
        sdk.estimateFeeForRouterTransfer(111, "0x0", 222, "0x0", true, null, null),
      ).to.eventually.rejectedWith(ChainNotConfigured.getMessage(111, supportedChains));
    });
  });

  describe("#estimateFeeForMetaTx", () => {
    it("happy: should return valid price if price oracle is configured", async () => {
      const { crossChainParams } = getMock();
      const result = await sdk.estimateFeeForMetaTx(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        crossChainParams.receivingChainId,
        crossChainParams.receivingAssetId,
        true,
        null,
        null,
      );

      expect(result).to.be.eq(
        BigNumber.from(GAS_ESTIMATES.fulfill)
          .mul("1000000000")
          .mul(utils.getMetaTxBuffer() + 100)
          .div(100),
      );
    });
    it("happy: should return zero price if price oracle isn't configured", async () => {
      const { crossChainParams } = getMock();
      getDeployedChainIdsForGasFeeStub.returns([11111, 22222]);
      const result = await sdk.estimateFeeForMetaTx(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        crossChainParams.receivingChainId,
        crossChainParams.receivingAssetId,
        true,
        null,
        null,
      );
      expect(result).to.be.eq("0");
    });
    it("should error for non configured chains", async () => {
      await expect(sdk.estimateFeeForMetaTx(111, "0x0", 222, "0x0", true, null, null)).to.eventually.rejectedWith(
        ChainNotConfigured.getMessage(111, supportedChains),
      );
    });
  });

  describe("#getGasPrice", () => {
    it("should work for configured chain", async () => {
      const result = await sdk.getGasPrice(sendingChainId);
      expect(result).to.be.eq(BigNumber.from("1000000000"));
    });

    it("should error for non-configured chain", async () => {
      await expect(sdk.getGasPrice(11111)).eventually.be.rejectedWith(
        ChainNotConfigured.getMessage(11111, supportedChains),
      );
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
