import {
  mkAddress,
  getRandomBytes32,
  InvariantTransactionData,
  VariantTransactionData,
  AuctionBid,
  Logger,
  sigMock,
  mkBytes32,
  chainDataMock,
} from "@connext/nxtp-utils";

import { expect } from "chai";
import { Wallet, constants, BigNumber } from "ethers";
import { getAddress, keccak256 } from "ethers/lib/utils";
import Sinon, { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { NxtpSdk } from "../../src/sdk";

import * as utils from "../../src/utils";
import * as sdkIndex from "../../src/sdk";
import { TxResponse, TxReceipt, EmptyBytes, EmptyCallDataHash, TxRequest } from "../helper";
import { Evt, EvtError } from "evt";
import {
  EncryptionError,
  SubmitError,
  NoTransactionManager,
  NoSubgraph,
  ChainNotConfigured,
  FulfillTimeout,
} from "../../src/error";
import { CrossChainParams, NxtpSdkEvent, NxtpSdkEventPayloads, NxtpSdkEvents } from "../../src";
import { TransactionManager } from "../../src/transactionManager/transactionManager";
import { NxtpSdkBase } from "../../src/sdkBase";
import * as TransactionManagerHelperFns from "../../src/transactionManager/transactionManager";
import { ChainReader } from "../../../txservice/dist";

const logger = new Logger({ level: process.env.LOG_LEVEL ?? "silent" });

const { AddressZero } = constants;
const ApproveReq = TxRequest;
const PrepareReq = { ...TxRequest, data: "0xaaabbb" };
const FulfillReq = { ...TxRequest, data: "0xaaabbbccc" };
const CancelReq = { ...TxRequest, data: "0xaaabbbcccddd" };

describe("NxtpSdk", () => {
  let sdk: NxtpSdk;
  let signer: SinonStubbedInstance<Wallet>;
  let chainReader: SinonStubbedInstance<ChainReader>;
  let signFulfillTransactionPayloadMock: SinonStub;
  let recoverAuctionBidMock: SinonStub;
  let ethereumRequestMock: SinonStub;
  let encryptMock: SinonStub;
  let balanceStub: SinonStub;
  let sdkBase: SinonStubbedInstance<NxtpSdkBase>;
  let transactionManagerStub: SinonStubbedInstance<TransactionManager>;

  let user: string = getAddress(mkAddress("0xa"));
  let router: string = getAddress(mkAddress("0xb"));
  let sendingChainId: number = 1337;
  let receivingChainId: number = 1338;
  let sendingChainTxManagerAddress: string = mkAddress("0xaaa");
  let receivingChainTxManagerAddress: string = mkAddress("0xbbb");
  let priceOracleAddress: string = mkAddress("0xccc");
  let assetAddress: string = mkAddress("0xccc");

  const messageEvt = Evt.create<{ inbox: string; data?: any; err?: any }>();
  const supportedChains = [sendingChainId.toString(), receivingChainId.toString()];

  beforeEach(async () => {
    chainReader = createStubInstance(ChainReader);
    transactionManagerStub = createStubInstance(TransactionManager);
    const chainConfig = {
      [sendingChainId]: {
        providers: ["http://----------------------"],
        subgraph: "http://example.com",
        transactionManagerAddress: sendingChainTxManagerAddress,
        priceOracleAddress: constants.AddressZero,
      },
      [receivingChainId]: {
        providers: ["http://----------------------"],
        subgraph: "http://example.com",
        transactionManagerAddress: receivingChainTxManagerAddress,
        priceOracleAddress: constants.AddressZero,
      },
    };

    signer = createStubInstance(Wallet);
    signer.sendTransaction.resolves(TxResponse);
    signer.connect.returns(signer);
    signer.getTransactionCount.resolves(1);
    sdkBase = createStubInstance(NxtpSdkBase);
    sdkBase.approveForPrepare.resolves(ApproveReq);
    sdkBase.prepareTransfer.resolves(PrepareReq);
    sdkBase.cancel.resolves(CancelReq);
    (sdkBase as any).chainReader = chainReader;
    chainReader.getDecimalsForAsset.resolves(18);
    chainReader.getBalance.resolves(BigNumber.from("100"));

    stub(TransactionManagerHelperFns, "getDeployedChainIdsForGasFee").returns([1337, 1338]);
    stub(utils, "getTimestampInSeconds").resolves(Math.floor(Date.now() / 1000));

    balanceStub = stub(utils, "getOnchainBalance");
    balanceStub.resolves(BigNumber.from(0));
    stub(utils, "getChainData").resolves(chainDataMock);
    stub(sdkIndex, "createMessagingEvt").returns(messageEvt);

    signFulfillTransactionPayloadMock = stub(utils, "signFulfillTransactionPayload");
    signFulfillTransactionPayloadMock.resolves(sigMock);
    recoverAuctionBidMock = stub(utils, "recoverAuctionBid");
    recoverAuctionBidMock.returns(router);
    ethereumRequestMock = stub(utils, "ethereumRequest");
    encryptMock = stub(utils, "encrypt");

    stub(sdkIndex, "AUCTION_TIMEOUT").value(1_000);
    stub(utils, "generateMessagingInbox").returns("inbox");

    signFulfillTransactionPayloadMock.resolves(EmptyCallDataHash);

    signer.getAddress.resolves(user);

    sdk = new NxtpSdk({
      chainConfig,
      signer,
      sdkBase: sdkBase as any,
      logger,
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
    _metaTxRelayerFee = "0",
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
      amount: "1000000",
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
      amount: "1000000",
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
    const metaTxRelayerFee = _metaTxRelayerFee;

    return { crossChainParams, auctionBid, bidSignature, gasFeeInReceivingToken, metaTxRelayerFee };
  };

  describe("#constructor", () => {
    it("should error if transaction manager doesn't exist for chainId", async () => {
      const _chainConfig = {
        [sendingChainId]: {
          providers: ["http://----------------------"],
          subgraph: "http://example.com",
        },
      };
      let error;
      try {
        const instance = new NxtpSdk({
          chainConfig: _chainConfig,
          signer,
          natsUrl: "http://example.com",
          authUrl: "http://example.com",
          messaging: undefined,
          logger,
          network: "mainnet",
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");

      expect(error.message).to.be.eq(NoTransactionManager.getMessage());
    });

    it("should error if subgraph doesn't exist for chainId", async () => {
      const _chainConfig = {
        [sendingChainId]: {
          providers: ["http://----------------------"],
          transactionManagerAddress: sendingChainTxManagerAddress,
          priceOracleAddress: priceOracleAddress,
        },
      };

      let error;
      try {
        const instance = new NxtpSdk({
          chainConfig: _chainConfig,
          signer,
          natsUrl: "http://example.com",
          authUrl: "http://example.com",
          messaging: undefined,
          logger,
          network: "local",
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NoSubgraph.getMessage());
    });

    it("happy: constructor, get transactionManager address", async () => {
      const chainConfig = {
        [4]: {
          providers: ["http://----------------------"],
          subgraph: "http://example.com",
          priceOracleAddress: priceOracleAddress,
        },
        [5]: {
          providers: ["http://----------------------"],
          subgraph: "http://example.com",
          priceOracleAddress: priceOracleAddress,
        },
      };
      const instance = new NxtpSdk({
        chainConfig,
        signer,
        natsUrl: "http://example.com",
        authUrl: "http://example.com",
        messaging: undefined,
        network: "testnet",
        logger,
      });

      const instanceFromCreate = NxtpSdk.create({
        chainConfig,
        signer,
        natsUrl: "http://example.com",
        authUrl: "http://example.com",
        messaging: undefined,
        network: "testnet",
        logger,
      });
    });
  });

  describe("#connectMessaging", () => {
    it("should work", async () => {
      await sdk.connectMessaging("foo");
      expect(sdkBase.connectMessaging).to.be.calledOnceWithExactly("foo");
    });
  });

  describe("#getActiveTransactions", () => {
    it("happy getActiveTransactions", async () => {
      await sdk.getActiveTransactions();
      expect(sdkBase.getActiveTransactions).to.be.calledOnceWithExactly();
    });
  });

  describe("#getHistoricalTransactions", () => {
    it("should work", async () => {
      await sdk.getHistoricalTransactions();
      expect(sdkBase.getHistoricalTransactions).to.be.calledOnceWithExactly();
    });
  });

  describe("#getRouterStatus", () => {
    it("happy getRouterStatus", async () => {
      await sdk.getRouterStatus("test");
      expect(sdkBase.getRouterStatus).to.be.calledOnceWithExactly("test");
    });
  });

  describe("#getSubgraphSyncStatus", () => {
    it("happy getSubgraphSyncStatus", async () => {
      await sdk.getSubgraphSyncStatus(1);
      expect(sdkBase.getSubgraphSyncStatus).to.be.calledOnceWithExactly(1);
    });
  });

  describe("#getTransferQuote", () => {
    it("should error if eth_getEncryptionPublicKey errors", async () => {
      const callData = getRandomBytes32();
      const { crossChainParams } = getMock({ callData });

      ethereumRequestMock.throws(new Error("fails"));

      await expect(sdk.getTransferQuote(crossChainParams)).to.be.rejectedWith(EncryptionError.getMessage());
    });

    it("should fail if encrypt fails", async () => {
      const callData = getRandomBytes32();
      const { crossChainParams } = getMock({ callData });

      encryptMock.throws(new Error("fails"));

      await expect(sdk.getTransferQuote(crossChainParams)).to.be.rejectedWith(EncryptionError.getMessage());
    });

    it("happy: should get a transfer quote ", async () => {
      const { crossChainParams } = getMock();
      const randomHash = keccak256(getRandomBytes32());
      ethereumRequestMock.resolves(randomHash);

      await sdk.getTransferQuote(crossChainParams);
      expect(sdkBase.getTransferQuote).to.be.calledOnceWithExactly(crossChainParams);
    });
  });

  describe("#prepareTransfer", () => {
    it("should error if approve transaction reverts", async () => {
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock();

      const TxResponseMock = JSON.parse(JSON.stringify(TxResponse));
      const TxReceiptMock = JSON.parse(JSON.stringify(TxReceipt));
      TxReceiptMock.status = 0;

      TxResponseMock.wait = () => Promise.resolve(TxReceiptMock);

      signer.sendTransaction.resolves(TxResponseMock);

      await expect(
        sdk.prepareTransfer({ bid: auctionBid, bidSignature, gasFeeInReceivingToken }),
      ).to.eventually.be.rejectedWith(SubmitError.getMessage());
    });

    it("happy: prepare transfer with suffice approval", async () => {
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock();

      sdkBase.approveForPrepare.resolves(undefined);

      const res = await sdk.prepareTransfer({
        bid: auctionBid,
        bidSignature,
        gasFeeInReceivingToken,
      });
      expect(signer.sendTransaction).to.be.calledOnceWithExactly({ ...PrepareReq, gasLimit: undefined });
      expect(res.prepareResponse).to.be.deep.eq(TxResponse);
    });

    it("happy: prepare transfer with approval ", async () => {
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock();

      const res = await sdk.prepareTransfer({
        bid: auctionBid,
        bidSignature,
        gasFeeInReceivingToken,
      });

      expect(signer.sendTransaction).to.be.calledWithExactly({ ...ApproveReq, gasLimit: undefined });
      expect(signer.sendTransaction).to.be.calledWithExactly({ ...PrepareReq, gasLimit: undefined });
      expect(res.prepareResponse).to.be.deep.eq(TxResponse);
    });

    it("happy: prepare transfer with actualAmount ", async () => {
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock();

      const actualAmount = String(Number(auctionBid.amount) - 1000);
      const res = await sdk.prepareTransfer(
        {
          bid: auctionBid,
          bidSignature,
          gasFeeInReceivingToken,
        },
        false,
        actualAmount,
      );

      expect(signer.sendTransaction).to.be.calledWithExactly({ ...ApproveReq, gasLimit: undefined });
      expect(signer.sendTransaction).to.be.calledWithExactly({ ...PrepareReq, gasLimit: undefined });
      expect(res.prepareResponse).to.be.deep.eq(TxResponse);
    });
  });

  describe("#fulfillTransfer", () => {
    describe("should error if invalid config", () => {
      it("unknown sendingChainId", async () => {
        const { transaction, record } = await getTransactionData({ sendingChainId: 1400 });
        await expect(
          sdk.fulfillTransfer({
            txData: { ...transaction, ...record },
            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          }),
        ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage());
      });

      it("unknown receivingChainId", async () => {
        const { transaction, record } = await getTransactionData({ receivingChainId: 1400 });
        await expect(
          sdk.fulfillTransfer({
            txData: { ...transaction, ...record },
            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          }),
        ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage());
      });
    });

    it("should error if signFulfillTransactionPayload errors", async () => {
      sdkBase.estimateFeeForMetaTx.resolves(BigNumber.from(1));
      sdkBase.estimateFeeForRouterTransfer.resolves(BigNumber.from(1));
      const { transaction, record } = await getTransactionData();

      ethereumRequestMock.rejects("foo");

      await expect(
        sdk.fulfillTransfer({
          txData: { ...transaction, callDataHash: mkBytes32("0xabcde"), ...record },
          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        }),
      ).to.eventually.be.rejectedWith(EncryptionError.getMessage());
    });

    it("should error if finish transfer => useRelayers:true, metaTxResponse errors", async () => {
      sdkBase.estimateFeeForMetaTx.resolves(BigNumber.from(1));
      sdkBase.estimateFeeForRouterTransfer.resolves(BigNumber.from(1));
      const { transaction, record } = await getTransactionData();
      sdkBase.fulfillTransfer.throws(
        new FulfillTimeout(transaction.transactionId, 1_000, transaction.receivingChainId, {} as any),
      );

      await expect(
        sdk.fulfillTransfer({
          txData: { ...transaction, ...record },

          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        }),
      ).to.eventually.be.rejectedWith(FulfillTimeout.getMessage());
    });

    it("happy: finish transfer => useRelayers:true", async () => {
      sdkBase.estimateFeeForMetaTx.resolves(BigNumber.from(1));
      sdkBase.estimateFeeForRouterTransfer.resolves(BigNumber.from(1));

      const { transaction, record } = await getTransactionData();

      const mockTransactionHash = getRandomBytes32();
      const mockMetaTxResponse = {
        transactionHash: mockTransactionHash,
        chainId: transaction.receivingChainId,
      };
      sdkBase.fulfillTransfer.resolves({ transactionResponse: mockMetaTxResponse });

      const res = await sdk.fulfillTransfer({
        txData: { ...transaction, ...record },
        encryptedCallData: EmptyCallDataHash,
        encodedBid: EmptyCallDataHash,
        bidSignature: EmptyCallDataHash,
      });

      expect(res).to.deep.eq({ transactionHash: mockTransactionHash });
    });

    it("happy: finish transfer => useRelayers:false", async () => {
      sdkBase.estimateFeeForMetaTx.resolves(BigNumber.from(1));
      sdkBase.estimateFeeForRouterTransfer.resolves(BigNumber.from(1));

      const { transaction, record } = await getTransactionData();

      sdkBase.fulfillTransfer.resolves({ transactionRequest: FulfillReq });

      const res = await sdk.fulfillTransfer(
        {
          txData: { ...transaction, ...record },

          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        },
        false,
      );

      expect(signer.sendTransaction).to.be.calledOnceWithExactly(FulfillReq);
      expect(res.transactionHash).to.be.eq(TxResponse.hash);
    });
  });

  describe("#estimateMetaTxFeeInSendingToken", () => {
    it("happy: should work", async () => {
      sdkBase.estimateFeeForMetaTx.resolves(BigNumber.from(1));
      const { crossChainParams } = getMock();

      const res = await sdk.estimateMetaTxFeeInSendingToken(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        crossChainParams.receivingChainId,
        crossChainParams.receivingAssetId,
      );

      expect(res).to.be.eq("1");
    });
  });

  describe("#estimateMetaTxFeeInReceivingToken", () => {
    it("happy: should work", async () => {
      sdkBase.estimateFeeForMetaTx.resolves(BigNumber.from(1));
      const { crossChainParams } = getMock();

      const res = await sdk.estimateMetaTxFeeInReceivingToken(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        crossChainParams.receivingChainId,
        crossChainParams.receivingAssetId,
      );

      expect(res).to.be.eq("1");
    });
  });

  describe("#estimateFeeForRouterTransferInSendingToken", () => {
    it("happy: should work", async () => {
      sdkBase.estimateFeeForRouterTransfer.resolves(BigNumber.from(1));
      const { crossChainParams } = getMock();

      const res = await sdk.estimateFeeForRouterTransferInSendingToken(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        crossChainParams.receivingChainId,
        crossChainParams.receivingAssetId,
      );

      expect(res).to.be.eq("1");
    });
  });

  describe("#estimateFeeForRouterTransferInReceivingToken", () => {
    it("happy: should work", async () => {
      sdkBase.estimateFeeForRouterTransfer.resolves(BigNumber.from(1));
      const { crossChainParams } = getMock();

      const res = await sdk.estimateFeeForRouterTransferInReceivingToken(
        crossChainParams.sendingChainId,
        crossChainParams.sendingAssetId,
        crossChainParams.receivingChainId,
        crossChainParams.receivingAssetId,
      );

      expect(res).to.be.eq("1");
    });
  });

  describe("#cancel", () => {
    it("should throw if invalid config for chainId", async () => {
      const { transaction, record } = await getTransactionData();
      await expect(
        sdk.cancel(
          {
            txData: { ...transaction, ...record },
            signature: EmptyCallDataHash,
          },
          1400000,
        ),
      ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage());
    });

    it("happy: cancel", async () => {
      const { transaction, record } = await getTransactionData();

      const res = await sdk.cancel(
        {
          txData: { ...transaction, ...record },
          signature: EmptyCallDataHash,
        },
        sendingChainId,
      );

      expect(signer.sendTransaction).to.be.calledOnceWithExactly(CancelReq);
      expect(res).to.be.eq(TxResponse);
    });
  });

  describe("#getBalance", () => {
    it("happy getBalance", async () => {
      expect(await sdk.getBalance(sendingChainId, assetAddress)).to.be.eq(BigNumber.from("100"));
    });
  });

  describe("#getDecimalsForAsset", () => {
    it("happy getDecimalsForAsset", async () => {
      expect(await sdk.getDecimalsForAsset(sendingChainId, assetAddress)).to.be.eq(18);
    });
  });

  describe("#querySubgraph", () => {
    it("happy querySubgraph", async () => {
      await sdk.querySubgraph(sendingChainId, "");
      expect(sdkBase.querySubgraph).to.be.calledOnceWithExactly(sendingChainId, "");
    });
  });

  describe("#attach", () => {
    it("should attach callback to event", async () => {
      const { transaction, record } = await getTransactionData({ sendingChainId: 1400 });
      const SenderTokenApprovalSubmittedSpy = Sinon.spy();
      sdk.attach(NxtpSdkEvents.SenderTokenApprovalSubmitted, SenderTokenApprovalSubmittedSpy);

      const SenderTokenApprovalMinedSpy = Sinon.spy();
      sdk.attach(NxtpSdkEvents.SenderTokenApprovalMined, SenderTokenApprovalMinedSpy);

      const SenderTransactionPrepareSubmittedSpy = Sinon.spy();
      sdk.attach(NxtpSdkEvents.SenderTransactionPrepareSubmitted, SenderTransactionPrepareSubmittedSpy);

      const SenderTransactionFulfilledSpy = Sinon.spy();
      sdk.attach(NxtpSdkEvents.SenderTransactionFulfilled, SenderTransactionFulfilledSpy);

      (sdk as any).evts.SenderTokenApprovalSubmitted.post({
        assetId: assetAddress,
        chainId: sendingChainId,
        transactionResponse: TxResponse,
      });

      (sdk as any).evts.SenderTokenApprovalMined.post({
        assetId: assetAddress,
        chainId: sendingChainId,
        transactionResponse: TxResponse,
      });

      (sdk as any).evts.SenderTransactionPrepareSubmitted.post({
        assetId: assetAddress,
        chainId: sendingChainId,
        transactionResponse: TxResponse,
      });

      (sdk as any).evts.SenderTransactionFulfilled.post({
        txData: { ...transaction, ...record },
        signature: "",
        relayerFee: "0",
        callData: "0x",
        caller: user,
      });

      expect(SenderTokenApprovalSubmittedSpy.callCount).to.be.eq(1);
      expect(SenderTokenApprovalMinedSpy.callCount).to.be.eq(1);
      expect(SenderTransactionPrepareSubmittedSpy.callCount).to.be.eq(1);
      expect(SenderTransactionFulfilledSpy.callCount).to.be.eq(1);
    });

    it("should attach callback of sdkBase for subgraph events", async () => {
      sdk.attach(NxtpSdkEvents.SenderTransactionPrepared, null, null);
      expect(sdkBase.attach).to.be.calledOnceWithExactly(NxtpSdkEvents.SenderTransactionPrepared, null, null);
    });
  });

  describe("#attachOnce", () => {
    it("happy", async () => {
      const spy = Sinon.spy();
      sdk.attachOnce(NxtpSdkEvents.SenderTokenApprovalSubmitted, spy);
      (sdk as any).evts.SenderTokenApprovalSubmitted.post({
        assetId: assetAddress,
        chainId: sendingChainId,
        transactionResponse: TxResponse,
      });

      expect(spy.callCount).to.equal(1);
    });

    it("should attachOnce callback of sdkBase for subgraph events", async () => {
      sdk.attachOnce(NxtpSdkEvents.ReceiverTransactionCancelled, null, null, 0);

      expect(sdkBase.attachOnce).to.be.calledOnceWithExactly(NxtpSdkEvents.ReceiverTransactionCancelled, null, null, 0);
    });
  });

  describe("#detach", () => {
    it("should remove listener from event", async () => {
      const spy = Sinon.spy();
      sdk.attach(NxtpSdkEvents.SenderTokenApprovalSubmitted, spy);

      // Event should be triggered for this round.
      (sdk as any).evts.SenderTokenApprovalSubmitted.post({
        assetId: assetAddress,
        chainId: sendingChainId,
        transactionResponse: TxResponse,
      });
      expect(spy.callCount).to.equal(1);

      // Event should NOT be triggered for this round.
      sdk.detach(NxtpSdkEvents.SenderTokenApprovalSubmitted);
      (sdk as any).evts.SenderTokenApprovalSubmitted.post({
        assetId: assetAddress,
        chainId: sendingChainId,
        transactionResponse: TxResponse,
      });

      // Call count should remain the same.
      expect(spy.callCount).to.equal(1);
    });

    it("should detach all listeners if no event specified", async () => {
      const { transaction, record } = await getTransactionData({ sendingChainId: 1400 });
      const SenderTokenApprovalSubmittedSpy = Sinon.spy();
      sdk.attach(NxtpSdkEvents.SenderTokenApprovalSubmitted, SenderTokenApprovalSubmittedSpy);

      const SenderTokenApprovalMinedSpy = Sinon.spy();
      sdk.attach(NxtpSdkEvents.SenderTokenApprovalMined, SenderTokenApprovalMinedSpy);

      const SenderTransactionPrepareSubmittedSpy = Sinon.spy();
      sdk.attach(NxtpSdkEvents.SenderTransactionPrepareSubmitted, SenderTransactionPrepareSubmittedSpy);

      const SenderTransactionFulfilledSpy = Sinon.spy();
      sdk.attach(NxtpSdkEvents.SenderTransactionFulfilled, SenderTransactionFulfilledSpy);

      (sdk as any).evts.SenderTokenApprovalSubmitted.post({
        assetId: assetAddress,
        chainId: sendingChainId,
        transactionResponse: TxResponse,
      });

      (sdk as any).evts.SenderTokenApprovalMined.post({
        assetId: assetAddress,
        chainId: sendingChainId,
        transactionResponse: TxResponse,
      });

      (sdk as any).evts.SenderTransactionPrepareSubmitted.post({
        assetId: assetAddress,
        chainId: sendingChainId,
        transactionResponse: TxResponse,
      });

      (sdk as any).evts.SenderTransactionFulfilled.post({
        txData: { ...transaction, ...record },
        signature: "",
        relayerFee: "0",
        callData: "0x",
        caller: user,
      });

      expect(SenderTokenApprovalSubmittedSpy.callCount).to.be.eq(1);
      expect(SenderTokenApprovalMinedSpy.callCount).to.be.eq(1);
      expect(SenderTransactionPrepareSubmittedSpy.callCount).to.be.eq(1);
      expect(SenderTransactionFulfilledSpy.callCount).to.be.eq(1);

      // Events should NOT be triggered for this round.
      sdk.detach();

      for (let i = 0; i < 10; i++) {
        (sdk as any).evts.SenderTokenApprovalSubmitted.post({
          assetId: assetAddress,
          chainId: sendingChainId,
          transactionResponse: TxResponse,
        });

        (sdk as any).evts.SenderTokenApprovalMined.post({
          assetId: assetAddress,
          chainId: sendingChainId,
          transactionResponse: TxResponse,
        });

        (sdk as any).evts.SenderTransactionPrepareSubmitted.post({
          assetId: assetAddress,
          chainId: sendingChainId,
          transactionResponse: TxResponse,
        });

        (sdk as any).evts.SenderTransactionFulfilled.post({
          txData: { ...transaction, ...record },
          signature: "",
          relayerFee: "0",
          callData: "0x",
          caller: user,
        });
      }

      // Call count should remain the same.
      expect(SenderTokenApprovalSubmittedSpy.callCount).to.be.eq(1);
      expect(SenderTokenApprovalMinedSpy.callCount).to.be.eq(1);
      expect(SenderTransactionPrepareSubmittedSpy.callCount).to.be.eq(1);
      expect(SenderTransactionFulfilledSpy.callCount).to.be.eq(1);
    });

    it("should detach callback of sdkBase for subgraph events", async () => {
      sdk.detach(NxtpSdkEvents.ReceiverTransactionCancelled);

      expect(sdkBase.detach).to.be.calledOnceWithExactly(NxtpSdkEvents.ReceiverTransactionCancelled);
    });
  });

  describe("#waitFor", () => {
    it("should wait for event", async () => {
      const spy = Sinon.spy();
      sdk.attach(NxtpSdkEvents.SenderTokenApprovalSubmitted, spy);

      // Wrap in a promise here to be sure that the waitFor call is blocking.
      const promise = new Promise<boolean>(async (resolve) => {
        await sdk.waitFor(NxtpSdkEvents.SenderTokenApprovalSubmitted, 10_000);
        resolve(spy.callCount === 1);
      });

      expect(promise).to.eventually.be.true;

      (sdk as any).evts.SenderTokenApprovalSubmitted.post({
        assetId: assetAddress,
        chainId: sendingChainId,
        transactionResponse: TxResponse,
      });
    });

    it("should expire after timeout", async () => {
      sdk.attach(NxtpSdkEvents.SenderTokenApprovalSubmitted, () => {});
      await expect(sdk.waitFor(NxtpSdkEvents.SenderTokenApprovalSubmitted, 10)).to.be.rejectedWith(EvtError.Timeout);
    });

    it("should waitFor of sdkBase for subgraph events", async () => {
      sdk.waitFor(NxtpSdkEvents.ReceiverTransactionCancelled, 10_000, null);

      expect(sdkBase.waitFor).to.be.calledOnceWithExactly(NxtpSdkEvents.ReceiverTransactionCancelled, 10_000, null);
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
