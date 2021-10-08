import {
  mkAddress,
  getRandomBytes32,
  InvariantTransactionData,
  VariantTransactionData,
  AuctionBid,
  Logger,
  sigMock,
  mkBytes32,
} from "@connext/nxtp-utils";
import { expect } from "chai";
import { providers, Wallet, constants, BigNumber } from "ethers";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { NxtpSdk } from "../../src/sdk";

import * as utils from "../../src/utils";
import * as sdkIndex from "../../src/sdk";
import { TxResponse, TxReceipt, EmptyBytes, EmptyCallDataHash, TxRequest } from "../helper";
import { Evt } from "evt";
import { EncryptionError, SubmitError } from "../../src/error";
import { getAddress } from "ethers/lib/utils";
import { CrossChainParams } from "../../src";
import { TransactionManager } from "../../src/transactionManager/transactionManager";
import { NxtpSdkBase } from "../../src/sdkBase";

const logger = new Logger({ level: process.env.LOG_LEVEL ?? "silent" });

const { AddressZero } = constants;
const ApproveReq = TxRequest;
const PrepareReq = { ...TxRequest, data: "0xaaabbb" };
const FulfillReq = { ...TxRequest, data: "0xaaabbbccc" };
const CancelReq = { ...TxRequest, data: "0xaaabbbcccddd" };

describe.only("NxtpSdk", () => {
  let sdk: NxtpSdk;
  let signer: SinonStubbedInstance<Wallet>;
  let transactionManager: SinonStubbedInstance<TransactionManager>;
  let provider1337: SinonStubbedInstance<providers.FallbackProvider>;
  let provider1338: SinonStubbedInstance<providers.FallbackProvider>;
  let signFulfillTransactionPayloadMock: SinonStub;
  let recoverAuctionBidMock: SinonStub;
  let balanceStub: SinonStub;
  let sdkBase: SinonStubbedInstance<NxtpSdkBase>;
  let ethereumRequestStub: SinonStub<[method: string, params: string[]], Promise<any>>;

  let user: string = getAddress(mkAddress("0xa"));
  let router: string = getAddress(mkAddress("0xb"));
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
    signer.sendTransaction.resolves(TxResponse);
    sdkBase = createStubInstance(NxtpSdkBase);
    sdkBase.approveForPrepare.resolves(ApproveReq);
    sdkBase.prepareTransfer.resolves(PrepareReq);
    sdkBase.cancel.resolves(CancelReq);

    stub(utils, "getDecimals").resolves(18);
    stub(utils, "getTimestampInSeconds").resolves(Math.floor(Date.now() / 1000));
    ethereumRequestStub = stub(utils, "ethereumRequest");

    balanceStub = stub(utils, "getOnchainBalance");
    balanceStub.resolves(BigNumber.from(0));
    stub(sdkIndex, "createMessagingEvt").returns(messageEvt);

    signFulfillTransactionPayloadMock = stub(utils, "signFulfillTransactionPayload");
    signFulfillTransactionPayloadMock.resolves(sigMock);
    recoverAuctionBidMock = stub(utils, "recoverAuctionBid");
    recoverAuctionBidMock.returns(router);

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
  ): {
    crossChainParams: CrossChainParams;
    auctionBid: AuctionBid;
    bidSignature: string;
    gasFeeInReceivingToken: string;
  } => {
    const transactionId = getRandomBytes32();
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

    return { crossChainParams, auctionBid, bidSignature, gasFeeInReceivingToken };
  };

  describe("#constructor", () => {});

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
      expect(sdkBase.getActiveTransactions).to.be.calledOnceWithExactly();
    });
  });

  describe("#getTransferQuote", () => {
    it("happy: should get a transfer quote ", async () => {
      const { crossChainParams } = getMock();

      await sdk.getTransferQuote(crossChainParams);
      expect(sdkBase.getActiveTransactions).to.be.calledOnceWithExactly(crossChainParams);
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
      ).to.eventually.be.rejectedWith(
        SubmitError.getMessage(user, "approve", auctionBid.sendingAssetId, auctionBid.sendingChainId),
      );
    });

    it("happy: prepare transfer with suffice approval", async () => {
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock();

      sdkBase.approveForPrepare.resolves(undefined);

      const res = await sdk.prepareTransfer({ bid: auctionBid, bidSignature, gasFeeInReceivingToken });
      expect(signer.sendTransaction).to.be.calledOnceWithExactly(PrepareReq);
      expect(res.prepareResponse).to.be.deep.eq(TxResponse);
    });

    it("happy: prepare transfer with approval ", async () => {
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock();

      const res = await sdk.prepareTransfer({ bid: auctionBid, bidSignature, gasFeeInReceivingToken });

      expect(signer.sendTransaction).to.be.calledWithExactly(ApproveReq);
      expect(signer.sendTransaction).to.be.calledWithExactly(PrepareReq);
      expect(res.prepareResponse).to.be.deep.eq(TxResponse);
    });
  });

  describe("#fulfillTransfer", () => {
    it("throws error if calldata needs to be decrypted and fails", async () => {
      const { transaction, record } = await getTransactionData();

      ethereumRequestStub.rejects("foo");

      await expect(
        sdk.fulfillTransfer({
          txData: { ...transaction, callDataHash: mkBytes32("0xabcde"), ...record },
          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        }),
      ).to.eventually.be.rejectedWith(EncryptionError.getMessage("decryption failed"));
    });

    it("happy: finish transfer => useRelayers:true", async () => {
      const { transaction, record } = await getTransactionData();
      const metaTxResponse = { chainId: 1337, transactionHash: mkBytes32() };

      sdkBase.fulfillTransfer.resolves({ metaTxResponse });

      const res = await sdk.fulfillTransfer({
        txData: { ...transaction, ...record },
        encryptedCallData: EmptyCallDataHash,
        encodedBid: EmptyCallDataHash,
        bidSignature: EmptyCallDataHash,
      });

      expect(res.metaTxResponse).to.deep.eq(metaTxResponse);
      expect(res.fulfillResponse).to.be.undefined;
    });

    it("happy: finish transfer => useRelayers:false", async () => {
      const { transaction, record } = await getTransactionData();

      sdkBase.fulfillTransfer.resolves({ fulfillRequest: FulfillReq });

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

      expect(signer.sendTransaction).to.be.calledOnceWithExactly(FulfillReq);
      expect(res.fulfillResponse).to.be.eq(TxResponse);
      expect(res.metaTxResponse).to.be.undefined;
    });
  });

  describe("#cancel", () => {
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

  it("happy changeInjectedSigner", () => {
    const signer = createStubInstance(Wallet);
    const res = sdk.changeInjectedSigner(signer);
  });

  it("happy removeAllListeners", () => {
    const res = sdk.removeAllListeners();
  });
});
