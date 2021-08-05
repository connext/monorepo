import {
  AuctionPayload,
  createRequestContext,
  FulfillParams,
  getRandomBytes32,
  mkAddress,
  mkBytes32,
  PrepareParams,
  RequestContext,
  RouterNxtpNatsMessagingService,
  jsonifyError,
  mkSig,
  senderPrepareDataMock,
  receiverFulfillDataMock,
  fakeTxReceipt,
  fulfillParamsMock,
} from "@connext/nxtp-utils";
import { err, ok, errAsync } from "neverthrow";
import { TransactionService } from "@connext/nxtp-txservice";
import { expect } from "chai";
import { createStubInstance, SinonStub, reset, restore, SinonStubbedInstance, stub } from "sinon";
import pino from "pino";
import { BigNumber, constants, Wallet, utils } from "ethers";

import { Subgraph, SubgraphError } from "../src/subgraph";
import { TransactionManager as TxManager, TransactionManagerError } from "../src/contract";
import { getBidExpiry, Handler, HandlerError, mutateExpiry } from "../src/handler";
import * as config from "../src/config";
import { TransactionStatus } from "../src/graphqlsdk";
import * as handlerUtils from "../src/handler";
import { fakeConfig } from "./utils";
import { parseEther } from "@ethersproject/units";
import { okAsync } from "neverthrow";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });

const rinkebyTestTokenAddress = "0x8bad6f387643Ae621714Cd739d26071cFBE3d0C9";
const goerliTestTokenAddress = "0xbd69fC70FA1c3AED524Bb4E82Adc5fcCFFcD79Fa";

const MUTATED_AMOUNT = "100";

const SignatureMock = mkSig("0xeee");
const mockMethod = "test";
const mockMethodId = getRandomBytes32();
const requestContext = (createRequestContext("TEST") as unknown) as RequestContext;

describe("Handler", () => {
  let handler: Handler;
  let txService: SinonStubbedInstance<TransactionService>;
  let txManager: SinonStubbedInstance<TxManager>;
  let subgraph: SinonStubbedInstance<Subgraph>;
  let wallet: SinonStubbedInstance<Wallet>;
  let messaging: SinonStubbedInstance<RouterNxtpNatsMessagingService>;
  let bidExpiry: number;

  let getConfigMock: SinonStub;
  let recoverAuctionSignerMock: SinonStub;
  let mutateAmountMock: SinonStub;

  const addr = mkAddress("0xb");

  beforeEach(() => {
    messaging = createStubInstance(RouterNxtpNatsMessagingService);
    messaging.publishAuctionResponse.resolves(undefined);
    messaging.publishMetaTxResponse.resolves(undefined);

    subgraph = createStubInstance(Subgraph);

    txManager = createStubInstance(TxManager);
    txManager.prepare.returns(okAsync(fakeTxReceipt));
    txManager.fulfill.returns(okAsync(fakeTxReceipt));
    txManager.cancel.returns(okAsync(fakeTxReceipt));

    txService = createStubInstance(TransactionService);
    recoverAuctionSignerMock = stub(handlerUtils, "recoverAuctionSigner");

    getConfigMock = stub(config, "getConfig");
    mutateAmountMock = stub(handlerUtils, "mutateAmount");

    getConfigMock.returns(fakeConfig);
    mutateAmountMock.returns(MUTATED_AMOUNT);
    recoverAuctionSignerMock.returns(addr);

    wallet = createStubInstance(Wallet);
    bidExpiry = getBidExpiry();
    (wallet as any).address = addr; // need to do this differently bc the function doesnt exist on the interface
    wallet.signMessage.resolves(SignatureMock);

    handler = new Handler(messaging as any, subgraph as any, txManager as any, txService as any, wallet, logger);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("class HandlerError", () => {
    it("happy constructor", () => {
      const method = "test";
      const methodId = getRandomBytes32();
      const error = new HandlerError(HandlerError.reasons.MessagingError, {
        calling: "messagingService.publishAuctionResponse",
        methodId,
        requestContext,
        method,
      });

      expect(error.message).to.be.eq(HandlerError.reasons.MessagingError);
      expect(error.context.method).to.be.eq(method);
      expect(error.context.methodId).to.be.eq(methodId);
    });
  });

  it("happy: mutateExpiry, should error if expiry happened", () => {
    const day = 3600 * 24;
    const expiry = day;

    let res;
    let error;
    try {
      res = mutateExpiry(expiry);
    } catch (e) {
      error = e;
    }
    expect(error).to.be.an("error");
    expect(error.message).to.be.eq("Expiration already happened");
  });

  it("happy: mutateExpiry", () => {
    const day = 3600 * 24;
    const expiry = Date.now() / 1000 + day * 2;
    const res = mutateExpiry(expiry);

    expect(Math.floor(res)).to.be.eq(Math.floor(Date.now() / 1000) + day);
  });

  describe("handleNewAuction", () => {
    const auctionPayload: AuctionPayload = {
      user: mkAddress("0xa"),
      sendingChainId: 1337,
      sendingAssetId: mkAddress("0xc"),
      amount: "1",
      receivingChainId: 1338,
      receivingAssetId: mkAddress("0xf"),
      receivingAddress: mkAddress("0xd"),
      expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
      transactionId: mkBytes32("0xa"),
      encryptedCallData: "0x",
      callDataHash: mkBytes32("0xb"),
      callTo: mkAddress("0xe"),
      dryRun: false,
    };

    beforeEach(() => {
      subgraph.getAssetBalance.returns(okAsync(BigNumber.from(100)));
      txService.getBalance.resolves(parseEther("1"));
    });

    it("should log error if config errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      getConfigMock.throws(new Error("fails"));

      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(getConfigMock.callCount).to.eq(1);
      expect(messaging.publishAuctionResponse.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if subgraph.getAssetBalance errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event
      subgraph.getAssetBalance.returns(
        errAsync(
          new SubgraphError(SubgraphError.reasons.SDKError, {
            method: mockMethod,
            methodId: mockMethodId,
            sdkError: jsonifyError(new Error("fails")),
          }),
        ),
      );

      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(getConfigMock.callCount).to.eq(2);
      expect(subgraph.getAssetBalance.callCount).to.eq(1);
      expect(messaging.publishAuctionResponse.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if not enough available liquidity for auction", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event
      mutateAmountMock.returns("1000");
      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(getConfigMock.callCount).to.eq(2);
      expect(subgraph.getAssetBalance.callCount).to.eq(1);
      expect(messaging.publishAuctionResponse.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if txService.getBalance errors for sendingChainId", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      txService.getBalance.onCall(0).rejects(new Error("fails"));

      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(getConfigMock.callCount).to.eq(2);
      expect(subgraph.getAssetBalance.callCount).to.eq(1);
      expect(txService.getBalance.callCount).to.eq(2);
      expect(messaging.publishAuctionResponse.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if txService.getBalance errors for receivingChainId", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      txService.getBalance.onCall(1).rejects(new Error("fails"));

      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(getConfigMock.callCount).to.eq(2);
      expect(subgraph.getAssetBalance.callCount).to.eq(1);
      expect(txService.getBalance.callCount).to.eq(2);
      expect(messaging.publishAuctionResponse.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if txService.getBalance for sendingChainId is lower than minGasFee", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      txService.getBalance.onCall(0).resolves(parseEther("0"));

      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(getConfigMock.callCount).to.eq(2);
      expect(subgraph.getAssetBalance.callCount).to.eq(1);
      expect(txService.getBalance.callCount).to.eq(2);
      expect(messaging.publishAuctionResponse.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if txService.getBalance for receivingChainId is lower than minGasFee", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      txService.getBalance.onCall(1).resolves(parseEther("0"));

      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(getConfigMock.callCount).to.eq(2);
      expect(subgraph.getAssetBalance.callCount).to.eq(1);
      expect(txService.getBalance.callCount).to.eq(2);
      expect(messaging.publishAuctionResponse.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if routerSignAuctionBid errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      wallet.signMessage.rejects(new Error("fails"));

      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(getConfigMock.callCount).to.eq(2);
      expect(subgraph.getAssetBalance.callCount).to.eq(1);
      expect(txService.getBalance.callCount).to.eq(2);
      expect(wallet.signMessage.callCount).to.eq(1);
      expect(messaging.publishAuctionResponse.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if messaging.publishAuctionResponse errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      messaging.publishAuctionResponse.rejects(new Error("fails"));

      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(getConfigMock.callCount).to.eq(2);
      expect(subgraph.getAssetBalance.callCount).to.eq(1);
      expect(txService.getBalance.callCount).to.eq(2);
      expect(wallet.signMessage.callCount).to.eq(1);
      expect(messaging.publishAuctionResponse.callCount).to.eq(1);
      expect(update).to.be.eq("error");
    });

    it("happy: should publish auction response for a valid swap", async () => {
      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(messaging.publishAuctionResponse.callCount).to.eq(1);
      const publishCall = messaging.publishAuctionResponse.getCall(0);
      expect(publishCall.args[0]).to.eq("_INBOX.abc");
      expect(publishCall.args[1].bid).to.deep.eq({
        bidExpiry: bidExpiry,
        user: auctionPayload.user,
        router: mkAddress("0xb"),
        sendingChainId: auctionPayload.sendingChainId,
        sendingAssetId: auctionPayload.sendingAssetId,
        amount: auctionPayload.amount,
        receivingChainId: auctionPayload.receivingChainId,
        receivingAssetId: auctionPayload.receivingAssetId,
        amountReceived: MUTATED_AMOUNT,
        receivingAddress: auctionPayload.receivingAddress,
        transactionId: auctionPayload.transactionId,
        expiry: auctionPayload.expiry,
        callDataHash: auctionPayload.callDataHash,
        callTo: auctionPayload.callTo,
        encryptedCallData: auctionPayload.encryptedCallData,
        sendingChainTxManagerAddress: fakeConfig.chainConfig[auctionPayload.sendingChainId].transactionManagerAddress,
        receivingChainTxManagerAddress:
          fakeConfig.chainConfig[auctionPayload.receivingChainId].transactionManagerAddress,
      });
      expect(publishCall.args[1].bidSignature).to.eq(SignatureMock);
    });
  });

  describe("handleMetaTxRequest", () => {
    const dataMock = {
      type: "Fulfill",
      relayerFee: "1",
      to: fakeConfig.chainConfig[1337].transactionManagerAddress,
      data: {
        Fulfill: fulfillParamsMock,
      },
      chainId: 1337,
    };

    it("should log error if config errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      getConfigMock.throws(new Error("fails"));

      await handler.handleMetaTxRequest(dataMock, "_INBOX.abc", requestContext);

      expect(getConfigMock.callCount).to.eq(1);
      expect(txManager.fulfill.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if config doesn't exist for chainId", async () => {
      const mock = JSON.parse(JSON.stringify(dataMock));
      mock.chainId = 1400;

      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      await handler.handleMetaTxRequest(mock, "_INBOX.abc", requestContext);

      expect(getConfigMock.callCount).to.eq(2);
      expect(txManager.fulfill.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error iff to !== transactionManagerAddress for chainId", async () => {
      const mock = JSON.parse(JSON.stringify(dataMock));
      mock.to = mkAddress("0xa");

      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      await handler.handleMetaTxRequest(mock, "_INBOX.abc", requestContext);

      expect(getConfigMock.callCount).to.eq(2);
      expect(txManager.fulfill.callCount).to.eq(0);
      expect(update).to.be.eq("error");
    });

    it("happy publish: should log error if txManager.fulfill errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      txManager.fulfill.returns(
        errAsync(
          new TransactionManagerError(TransactionManagerError.reasons.NoTransactionManagerAddress, {
            chainId: dataMock.chainId,
            configError: "No contract exists for chain",
            method: mockMethod,
            methodId: mockMethodId,
          }),
        ),
      );

      await handler.handleMetaTxRequest(dataMock, "_INBOX.abc", requestContext);

      expect(getConfigMock.callCount).to.eq(2);
      expect(txManager.fulfill.callCount).to.eq(1);
      expect(messaging.publishMetaTxResponse.callCount).to.eq(1);
      expect(update).to.be.eq("error");
    });

    it("should log error if txManager.fulfill errors as well as messaging publish errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      txManager.fulfill.returns(
        errAsync(
          new TransactionManagerError(TransactionManagerError.reasons.NoTransactionManagerAddress, {
            chainId: dataMock.chainId,
            configError: "No contract exists for chain",
            method: mockMethod,
            methodId: mockMethodId,
          }),
        ),
      );

      messaging.publishMetaTxResponse.rejects(new Error("fails"));

      await handler.handleMetaTxRequest(dataMock, "_INBOX.abc", requestContext);

      expect(getConfigMock.callCount).to.eq(2);
      expect(txManager.fulfill.callCount).to.eq(1);
      expect(messaging.publishMetaTxResponse.callCount).to.eq(1);
      expect(update).to.be.eq("error");
    });

    it("should log error if txManager.fulfill success but messaging publish errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      messaging.publishMetaTxResponse.rejects(new Error("fails"));

      await handler.handleMetaTxRequest(dataMock, "_INBOX.abc", requestContext);

      expect(getConfigMock.callCount).to.eq(2);
      expect(txManager.fulfill.callCount).to.eq(1);
      expect(messaging.publishMetaTxResponse.callCount).to.eq(2);
      expect(update).to.be.eq("error");
    });

    it("should log error if txManager.fulfill success but messaging publish errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      messaging.publishMetaTxResponse.rejects(new Error("fails"));

      await handler.handleMetaTxRequest(dataMock, "_INBOX.abc", requestContext);

      expect(getConfigMock.callCount).to.eq(2);
      expect(txManager.fulfill.callCount).to.eq(1);
      expect(messaging.publishMetaTxResponse.callCount).to.eq(2);
      expect(update).to.be.eq("error");
    });

    it("happy handleMetaTxRequest", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      await handler.handleMetaTxRequest(dataMock, "_INBOX.abc", requestContext);

      expect(getConfigMock.callCount).to.eq(2);
      expect(txManager.fulfill.callCount).to.eq(1);
      expect(messaging.publishMetaTxResponse.callCount).to.eq(1);
      expect(update).to.be.eq("error");
    });
  });

  describe("handleSenderPrepare", () => {
    it.skip("should log info if receiverPreparing already", async () => {});

    it("should log error if decodeAuctionBid errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));
      ethPrepareDataMock.encodedBid = constants.AddressZero;

      await handler.handleSenderPrepare(ethPrepareDataMock, requestContext);

      expect(recoverAuctionSignerMock.callCount).to.be.eq(0);
      expect(txManager.prepare.callCount).to.be.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if recoverAuctionSigner errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));

      recoverAuctionSignerMock.throws(new Error("fails"));

      await handler.handleSenderPrepare(ethPrepareDataMock, requestContext);

      expect(recoverAuctionSignerMock.callCount).to.be.eq(1);
      expect(txManager.prepare.callCount).to.be.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if caller isn't signer", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));

      recoverAuctionSignerMock.returns(mkAddress("0xe"));

      await handler.handleSenderPrepare(ethPrepareDataMock, requestContext);

      expect(recoverAuctionSignerMock.callCount).to.be.eq(1);
      expect(txManager.prepare.callCount).to.be.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if bid amount is different from txData amount", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));
      ethPrepareDataMock.txData.amount = BigNumber.from(senderPrepareDataMock.txData.amount).sub(1).toString();

      await handler.handleSenderPrepare(ethPrepareDataMock, requestContext);

      expect(recoverAuctionSignerMock.callCount).to.be.eq(1);
      expect(txManager.prepare.callCount).to.be.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if bid transactionId is different from txData transactionId", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));
      ethPrepareDataMock.txData.transactionId = getRandomBytes32();

      await handler.handleSenderPrepare(ethPrepareDataMock, requestContext);

      expect(recoverAuctionSignerMock.callCount).to.be.eq(1);
      expect(txManager.prepare.callCount).to.be.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if bid transactionId is different from txData transactionId", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));
      ethPrepareDataMock.txData.transactionId = getRandomBytes32();

      await handler.handleSenderPrepare(ethPrepareDataMock, requestContext);

      expect(recoverAuctionSignerMock.callCount).to.be.eq(1);
      expect(txManager.prepare.callCount).to.be.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if mutateExpiry errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));
      ethPrepareDataMock.txData.expiry = 3600 * 24;

      await handler.handleSenderPrepare(ethPrepareDataMock, requestContext);

      expect(recoverAuctionSignerMock.callCount).to.be.eq(1);
      expect(txManager.prepare.callCount).to.be.eq(0);
      expect(update).to.be.eq("error");
    });

    it("should log error if transaction already prepared ", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));

      txManager.prepare.returns(
        errAsync(
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
            method: mockMethod,
            methodId: mockMethodId,
            chainId: ethPrepareDataMock.txData.chainId,
            txServiceError: jsonifyError(new Error("#p:015")),
          }),
        ),
      );

      await handler.handleSenderPrepare(ethPrepareDataMock, requestContext);

      expect(recoverAuctionSignerMock.callCount).to.be.eq(1);
      expect(txManager.prepare.callCount).to.be.eq(1);
      expect(update).to.be.eq("error");
    });

    it("should log error if prepare fails ", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));

      txManager.prepare.returns(
        errAsync(
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
            method: mockMethod,
            methodId: mockMethodId,
            chainId: ethPrepareDataMock.txData.chainId,
            txServiceError: jsonifyError(new Error("fails")),
          }),
        ),
      );

      await handler.handleSenderPrepare(ethPrepareDataMock, requestContext);

      expect(recoverAuctionSignerMock.callCount).to.be.eq(1);
      expect(txManager.prepare.callCount).to.be.eq(1);
      expect(update).to.be.eq("error");
    });

    it("should send prepare for receiving chain with ETH asset", async () => {
      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));
      ethPrepareDataMock.txData.sendingAssetId = constants.AddressZero;
      ethPrepareDataMock.txData.receivingAssetId = constants.AddressZero;
      await handler.handleSenderPrepare(ethPrepareDataMock, requestContext);

      expect(txManager.prepare.callCount).to.be.eq(1);
      const call = txManager.prepare.getCall(0);
      expect(call.args[0]).to.eq(ethPrepareDataMock.txData.receivingChainId);
      expect(call.args[1]).to.deep.eq({
        txData: {
          user: ethPrepareDataMock.txData.user,
          router: ethPrepareDataMock.txData.router,
          sendingAssetId: ethPrepareDataMock.txData.sendingAssetId,
          receivingAssetId: ethPrepareDataMock.txData.receivingAssetId,
          sendingChainFallback: ethPrepareDataMock.txData.sendingChainFallback,
          receivingAddress: ethPrepareDataMock.txData.receivingAddress,
          callTo: ethPrepareDataMock.txData.callTo,
          sendingChainId: ethPrepareDataMock.txData.sendingChainId,
          receivingChainId: ethPrepareDataMock.txData.receivingChainId,
          callDataHash: ethPrepareDataMock.txData.callDataHash,
          transactionId: ethPrepareDataMock.txData.transactionId,
          amount: ethPrepareDataMock.txData.amount,
          expiry: ethPrepareDataMock.txData.expiry,
          preparedBlockNumber: ethPrepareDataMock.txData.preparedBlockNumber,
        },
        amount: MUTATED_AMOUNT,
        expiry: mutateExpiry(ethPrepareDataMock.txData.expiry),
        bidSignature: ethPrepareDataMock.bidSignature,
        encodedBid: ethPrepareDataMock.encodedBid,
        encryptedCallData: ethPrepareDataMock.encryptedCallData,
      } as PrepareParams);
    });

    it("should send prepare for receiving chain with token asset", async () => {
      const tokenPrepareData = JSON.parse(JSON.stringify(senderPrepareDataMock));
      tokenPrepareData.txData.sendingAssetId = rinkebyTestTokenAddress;
      tokenPrepareData.txData.receivingAssetId = goerliTestTokenAddress;

      // TODO: where is approve??
      await handler.handleSenderPrepare(tokenPrepareData, requestContext);

      expect(txManager.prepare.callCount).to.be.eq(1);
      const call = txManager.prepare.getCall(0);
      expect(call.args[0]).to.eq(tokenPrepareData.txData.receivingChainId);
      expect(call.args[1]).to.deep.eq({
        txData: {
          user: tokenPrepareData.txData.user,
          router: tokenPrepareData.txData.router,
          sendingAssetId: tokenPrepareData.txData.sendingAssetId,
          receivingAssetId: tokenPrepareData.txData.receivingAssetId,
          sendingChainFallback: tokenPrepareData.txData.sendingChainFallback,
          receivingAddress: tokenPrepareData.txData.receivingAddress,
          callTo: tokenPrepareData.txData.callTo,
          sendingChainId: tokenPrepareData.txData.sendingChainId,
          receivingChainId: tokenPrepareData.txData.receivingChainId,
          callDataHash: tokenPrepareData.txData.callDataHash,
          transactionId: tokenPrepareData.txData.transactionId,
          amount: tokenPrepareData.txData.amount,
          expiry: tokenPrepareData.txData.expiry,
          preparedBlockNumber: tokenPrepareData.txData.preparedBlockNumber,
        },
        amount: MUTATED_AMOUNT,
        expiry: mutateExpiry(tokenPrepareData.txData.expiry),
        bidSignature: tokenPrepareData.bidSignature,
        encodedBid: tokenPrepareData.encodedBid,
        encryptedCallData: tokenPrepareData.encryptedCallData,
      } as PrepareParams);
    });
  });

  describe("handleReceiverFulfill", () => {
    it("should error if fulfill errors", async () => {
      let update;
      logger.on("level-change", (lvl) => {
        update = lvl;
      });
      logger.level = "error"; // trigger event

      const ethReceiverFulfillDataMock = JSON.parse(JSON.stringify(receiverFulfillDataMock));
      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));
      const ethRxFulfillDataMock = {
        ...ethReceiverFulfillDataMock,
        sendingAssetId: constants.AddressZero,
        receivingAssetId: constants.AddressZero,
      };

      txManager.fulfill.returns(
        errAsync(
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, {
            method: mockMethod,
            methodId: mockMethodId,
            chainId: ethPrepareDataMock.txData.sendingChainId,
            txServiceError: jsonifyError(new Error("fails")),
          }),
        ),
      );

      await handler.handleReceiverFulfill(ethPrepareDataMock, ethRxFulfillDataMock, requestContext);

      expect(update).to.be.eq("error");
    });

    it("should fulfill eth asset", async () => {
      const ethRxFulfillDataMock = JSON.parse(JSON.stringify(receiverFulfillDataMock));
      ethRxFulfillDataMock.txData.sendingAssetId = constants.AddressZero;
      ethRxFulfillDataMock.txData.receivingAssetId = constants.AddressZero;

      const ethPrepareDataMock = JSON.parse(JSON.stringify(senderPrepareDataMock));
      ethPrepareDataMock.txData.sendingAssetId = constants.AddressZero;
      ethPrepareDataMock.txData.receivingAssetId = constants.AddressZero;

      subgraph.getTransactionForChain.returns(
        okAsync({
          status: TransactionStatus.Prepared,
          ...senderPrepareDataMock,
        }),
      );
      await handler.handleReceiverFulfill(ethPrepareDataMock, ethRxFulfillDataMock, requestContext);
      const call = txManager.fulfill.getCall(0);
      const [, data] = call.args;
      expect(data).to.deep.eq({
        relayerFee: ethRxFulfillDataMock.relayerFee,
        signature: ethRxFulfillDataMock.signature,
        callData: ethRxFulfillDataMock.callData,
        txData: {
          user: ethRxFulfillDataMock.txData.user,
          router: ethRxFulfillDataMock.txData.router,
          sendingAssetId: ethRxFulfillDataMock.txData.sendingAssetId,
          receivingAssetId: ethRxFulfillDataMock.txData.receivingAssetId,
          sendingChainFallback: ethRxFulfillDataMock.txData.sendingChainFallback,
          receivingAddress: ethRxFulfillDataMock.txData.receivingAddress,
          callTo: ethRxFulfillDataMock.txData.callTo,
          sendingChainId: ethRxFulfillDataMock.txData.sendingChainId,
          receivingChainId: ethRxFulfillDataMock.txData.receivingChainId,
          callDataHash: ethRxFulfillDataMock.txData.callDataHash,
          transactionId: ethRxFulfillDataMock.txData.transactionId,
          amount: ethRxFulfillDataMock.txData.amount,
          expiry: ethRxFulfillDataMock.txData.expiry,
          preparedBlockNumber: ethRxFulfillDataMock.txData.preparedBlockNumber,
        },
      } as FulfillParams);
    });

    it("should fulfill token asset", async () => {
      // change assetIds
      const tokenRxFulfillDataMock = JSON.parse(JSON.stringify(receiverFulfillDataMock));
      tokenRxFulfillDataMock.txData.sendingAssetId = rinkebyTestTokenAddress;
      tokenRxFulfillDataMock.txData.receivingAssetId = goerliTestTokenAddress;

      const tokenPrepareData = JSON.parse(JSON.stringify(senderPrepareDataMock));
      tokenPrepareData.txData.sendingAssetId = rinkebyTestTokenAddress;
      tokenPrepareData.txData.receivingAssetId = goerliTestTokenAddress;

      subgraph.getTransactionForChain.returns(
        okAsync({
          status: TransactionStatus.Prepared,
          bidSignature: "0x",
          encodedBid: "0x",
          encryptedCallData: "0x",
          ...tokenRxFulfillDataMock,
        }),
      );

      await handler.handleReceiverFulfill(tokenPrepareData, tokenRxFulfillDataMock, requestContext);
      const call = txManager.fulfill.getCall(0);
      const [, data] = call.args;

      expect(data).to.deep.eq({
        relayerFee: tokenRxFulfillDataMock.relayerFee,
        signature: tokenRxFulfillDataMock.signature,
        callData: tokenRxFulfillDataMock.callData,
        txData: {
          user: tokenRxFulfillDataMock.txData.user,
          router: tokenRxFulfillDataMock.txData.router,
          sendingAssetId: tokenRxFulfillDataMock.txData.sendingAssetId,
          receivingAssetId: tokenRxFulfillDataMock.txData.receivingAssetId,
          sendingChainFallback: tokenRxFulfillDataMock.txData.sendingChainFallback,
          receivingAddress: tokenRxFulfillDataMock.txData.receivingAddress,
          callTo: tokenRxFulfillDataMock.txData.callTo,
          sendingChainId: tokenRxFulfillDataMock.txData.sendingChainId,
          receivingChainId: tokenRxFulfillDataMock.txData.receivingChainId,
          callDataHash: tokenRxFulfillDataMock.txData.callDataHash,
          transactionId: tokenRxFulfillDataMock.txData.transactionId,
          amount: tokenRxFulfillDataMock.txData.amount,
          expiry: tokenRxFulfillDataMock.txData.expiry,
          preparedBlockNumber: tokenRxFulfillDataMock.txData.preparedBlockNumber,
        },
      } as FulfillParams);
    });
  });
});
