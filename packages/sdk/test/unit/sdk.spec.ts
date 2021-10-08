import {
  mkAddress,
  mkHash,
  UserNxtpNatsMessagingService,
  getRandomBytes32,
  InvariantTransactionData,
  VariantTransactionData,
  AuctionBid,
  Logger,
} from "@connext/nxtp-utils";
import { expect } from "chai";
import { providers, Wallet, constants, BigNumber } from "ethers";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { NxtpSdk, MAX_SLIPPAGE_TOLERANCE, MIN_SLIPPAGE_TOLERANCE } from "../../src/sdk";

import * as utils from "../../src/utils";
import * as sdkIndex from "../../src/sdk";
import { TxResponse, TxReceipt, EmptyBytes, EmptyCallDataHash, TxRequest } from "../helper";
import { Evt } from "evt";
import {
  ChainNotConfigured,
  EncryptionError,
  InvalidAmount,
  InvalidBidSignature,
  InvalidExpiry,
  InvalidParamStructure,
  InvalidSlippage,
  MetaTxTimeout,
  NoSubgraph,
  NoTransactionManager,
  SubgraphsNotSynced,
  SubmitError,
  UnknownAuctionError,
  InvalidCallTo,
} from "../../src/error";
import { getAddress, keccak256 } from "ethers/lib/utils";
import { CrossChainParams, NxtpSdkEvents, HistoricalTransactionStatus } from "../../src";
import { TransactionManager } from "../../src/transactionManager/transactionManager";
import { NxtpSdkBase } from "../../src/sdkBase";

const logger = new Logger({ level: process.env.LOG_LEVEL ?? "silent" });

const { AddressZero } = constants;
const ApproveReq = TxRequest;
const PrepareReq = { ...TxRequest, data: "0xaaabbb" };

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
    sdkBase = createStubInstance(NxtpSdkBase);
    sdkBase.approveForPrepare.resolves(ApproveReq);
    sdkBase.prepareTransfer.resolves(PrepareReq);

    stub(utils, "getDecimals").resolves(18);
    stub(utils, "getTimestampInSeconds").resolves(Math.floor(Date.now() / 1000));

    balanceStub = stub(utils, "getOnchainBalance");
    balanceStub.resolves(BigNumber.from(0));
    stub(sdkIndex, "createMessagingEvt").returns(messageEvt);

    signFulfillTransactionPayloadMock = stub(utils, "signFulfillTransactionPayload");
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

    it.only("happy: prepare transfer with suffice approval", async () => {
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock();

      sdkBase.approveForPrepare.returns(undefined);

      await sdk.prepareTransfer({ bid: auctionBid, bidSignature, gasFeeInReceivingToken });
      expect(signer.signTransaction).to.be.calledOnceWithExactly(PrepareReq);
    });

    it("happy: start transfer ", async () => {
      const { auctionBid, bidSignature, gasFeeInReceivingToken } = getMock();
      balanceStub.resolves(BigNumber.from(auctionBid.amount));

      transactionManager.approveTokensIfNeeded.resolves(TxResponse);
      transactionManager.prepare.resolves(TxResponse);

      const res = await sdk.prepareTransfer({ bid: auctionBid, bidSignature, gasFeeInReceivingToken });
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
        ).to.eventually.be.rejectedWith(
          InvalidParamStructure.getMessage("fulfillTransfer", "TransactionPrepareEventParams"),
        );
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
        ).to.eventually.be.rejectedWith(
          InvalidParamStructure.getMessage("fulfillTransfer", "TransactionPrepareEventParams"),
        );
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
        ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage(1400, supportedChains));
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
        ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage(1400, supportedChains));
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
      stub(sdkIndex, "META_TX_TIMEOUT").value(1_000);

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
        expect(e.message).to.be.eq(MetaTxTimeout.getMessage(1_000));
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
          "0",
          false,
        ),
      ).to.eventually.be.rejectedWith("fail");
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

      transactionManager.cancel.resolves(TxResponse);

      const res = await sdk.cancel(
        {
          txData: { ...transaction, ...record },
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
