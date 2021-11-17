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
import { getAddress, keccak256 } from "ethers/lib/utils";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { NxtpSdk } from "../../src/sdk";

import * as utils from "../../src/utils";
import * as sdkIndex from "../../src/sdk";
import { TxResponse, TxReceipt, EmptyBytes, EmptyCallDataHash, TxRequest } from "../helper";
import { Evt } from "evt";
import {
  EncryptionError,
  SubmitError,
  NoTransactionManager,
  NoSubgraph,
  ChainNotConfigured,
  FulfillTimeout,
} from "../../src/error";
import { CrossChainParams } from "../../src";
import { TransactionManager } from "../../src/transactionManager/transactionManager";
import { NxtpSdkBase } from "../../src/sdkBase";
import * as TransactionManagerHelperFns from "../../src/transactionManager/transactionManager";

const logger = new Logger({ level: process.env.LOG_LEVEL ?? "silent" });

const { AddressZero } = constants;
const ApproveReq = TxRequest;
const PrepareReq = { ...TxRequest, data: "0xaaabbb" };
const FulfillReq = { ...TxRequest, data: "0xaaabbbccc" };
const CancelReq = { ...TxRequest, data: "0xaaabbbcccddd" };

describe("NxtpSdk", () => {
  let sdk: NxtpSdk;
  let signer: SinonStubbedInstance<Wallet>;
  let provider1337: SinonStubbedInstance<providers.FallbackProvider>;
  let provider1338: SinonStubbedInstance<providers.FallbackProvider>;
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

  const messageEvt = Evt.create<{ inbox: string; data?: any; err?: any }>();
  const supportedChains = [sendingChainId.toString(), receivingChainId.toString()];

  beforeEach(async () => {
    transactionManagerStub = createStubInstance(TransactionManager);
    provider1337 = createStubInstance(providers.FallbackProvider);
    (provider1337 as any)._isProvider = true;
    provider1338 = createStubInstance(providers.FallbackProvider);
    (provider1338 as any)._isProvider = true;
    const chainConfig = {
      [sendingChainId]: {
        provider: provider1337,
        subgraph: "http://example.com",
        transactionManagerAddress: sendingChainTxManagerAddress,
        priceOracleAddress: constants.AddressZero,
      },
      [receivingChainId]: {
        provider: provider1338,
        subgraph: "http://example.com",
        transactionManagerAddress: receivingChainTxManagerAddress,
        priceOracleAddress: constants.AddressZero,
      },
    };

    signer = createStubInstance(Wallet);
    signer.sendTransaction.resolves(TxResponse);
    signer.connect.returns(signer);
    sdkBase = createStubInstance(NxtpSdkBase);
    sdkBase.approveForPrepare.resolves(ApproveReq);
    sdkBase.prepareTransfer.resolves(PrepareReq);
    sdkBase.cancel.resolves(CancelReq);

    stub(utils, "getTimestampInSeconds").resolves(Math.floor(Date.now() / 1000));
    stub(TransactionManagerHelperFns, "getDeployedChainIdsForGasFee").returns([1337, 1338]);

    balanceStub = stub(utils, "getOnchainBalance");
    balanceStub.resolves(BigNumber.from(0));
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
          provider: provider1337,
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

      expect(error.message).to.be.eq(NoTransactionManager.getMessage(sendingChainId));
    });

    it("should error if subgraph doesn't exist for chainId", async () => {
      const _chainConfig = {
        [sendingChainId]: {
          provider: provider1337,
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
      expect(error.message).to.be.eq(NoSubgraph.getMessage(sendingChainId));
    });

    it("happy: constructor, get transactionManager address", async () => {
      const chainConfig = {
        [4]: {
          provider: provider1337,
          subgraph: "http://example.com",
          priceOracleAddress: priceOracleAddress,
        },
        [5]: {
          provider: provider1338,
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

  describe("#getTransferQuote", () => {
    it("should error if eth_getEncryptionPublicKey errors", async () => {
      const callData = getRandomBytes32();
      const { crossChainParams } = getMock({ callData });

      ethereumRequestMock.throws(new Error("fails"));

      await expect(sdk.getTransferQuote(crossChainParams)).to.be.rejectedWith(
        EncryptionError.getMessage("public key encryption failed"),
      );
    });

    it("should fail if encrypt fails", async () => {
      const callData = getRandomBytes32();
      const { crossChainParams } = getMock({ callData });

      encryptMock.throws(new Error("fails"));

      await expect(sdk.getTransferQuote(crossChainParams)).to.be.rejectedWith(
        EncryptionError.getMessage("public key encryption failed"),
      );
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
      ).to.eventually.be.rejectedWith(
        SubmitError.getMessage(user, "approve", auctionBid.sendingAssetId, auctionBid.sendingChainId),
      );
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
        ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage(1400, supportedChains));
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
        ).to.eventually.be.rejectedWith(ChainNotConfigured.getMessage(1400, supportedChains));
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
      ).to.eventually.be.rejectedWith(EncryptionError.getMessage("decryption failed"));
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
      ).to.eventually.be.rejectedWith(FulfillTimeout.getMessage(1_000, transaction.receivingChainId));
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
