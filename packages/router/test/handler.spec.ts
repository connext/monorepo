import {
  AuctionPayload,
  createRequestContext,
  FulfillParams,
  mkAddress,
  mkBytes32,
  PrepareParams,
  RequestContext,
  RouterNxtpNatsMessagingService,
} from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";
import { expect } from "chai";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import pino from "pino";
import { BigNumber, constants, Wallet } from "ethers";

import { Subgraph } from "../src/subgraph";
import { Handler } from "../src/handler";
import * as config from "../src/config";
import { TransactionStatus } from "../src/graphqlsdk";
import { TransactionManager as TxManager } from "../src/contract";
import * as handlerUtils from "../src/handler";
import { fakeConfig, senderPrepareData, receiverFulfillDataMock, fakeTxReceipt } from "./utils";
import { parseEther } from "@ethersproject/units";
import { okAsync } from "neverthrow";

const logger = pino({ level: "info" /** process.env.LOG_LEVEL ?? "silent" */ });

const rinkebyTestTokenAddress = "0x8bad6f387643Ae621714Cd739d26071cFBE3d0C9";
const goerliTestTokenAddress = "0xbd69fC70FA1c3AED524Bb4E82Adc5fcCFFcD79Fa";

const MUTATED_AMOUNT = "100";
const MUTATED_EXPIRY = 123400;
const BID_EXPIRY = 123401;

const requestContext = createRequestContext("TEST") as unknown as RequestContext;

describe("Handler", () => {
  let handler: Handler;
  let txService: SinonStubbedInstance<TransactionService>;
  let txManager: SinonStubbedInstance<TxManager>;
  let subgraph: SinonStubbedInstance<Subgraph>;
  let wallet: SinonStubbedInstance<Wallet>;
  let messaging: SinonStubbedInstance<RouterNxtpNatsMessagingService>;

  const addr = mkAddress("0xb");

  beforeEach(() => {
    messaging = createStubInstance(RouterNxtpNatsMessagingService);
    messaging.publishAuctionResponse.resolves(undefined);

    subgraph = createStubInstance(Subgraph);

    txManager = createStubInstance(TxManager);
    txManager.prepare.returns(okAsync(fakeTxReceipt));
    txManager.fulfill.returns(okAsync(fakeTxReceipt));
    txManager.cancel.returns(okAsync(fakeTxReceipt));
    txManager.getRouterBalance.returns(okAsync(BigNumber.from(100)));

    txService = createStubInstance(TransactionService);
    stub(config, "getConfig").returns(fakeConfig);
    stub(handlerUtils, "mutateAmount").returns(MUTATED_AMOUNT);
    stub(handlerUtils, "mutateExpiry").returns(MUTATED_EXPIRY);
    stub(handlerUtils, "getBidExpiry").returns(BID_EXPIRY);
    stub(handlerUtils, "recoverAuctionSigner").returns(addr);

    wallet = createStubInstance(Wallet);
    (wallet as any).address = addr; // need to do this differently bc the function doesnt exist on the interface
    wallet.signMessage.resolves("0xabcdef");

    handler = new Handler(messaging as any, subgraph as any, txManager as any, txService as any, wallet, logger);
  });

  afterEach(() => {
    restore();
    reset();
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
      subgraph.getRouterShares.returns(okAsync(BigNumber.from(100)));
      txService.getBalance.resolves(parseEther("1"));
    });

    it("happy: should publish auction response for a valid swap", async () => {
      await handler.handleNewAuction(auctionPayload, "_INBOX.abc", requestContext);
      expect(messaging.publishAuctionResponse.callCount).to.eq(1);
      const publishCall = messaging.publishAuctionResponse.getCall(0);
      expect(publishCall.args[0]).to.eq("_INBOX.abc");
      expect(publishCall.args[1].bid).to.deep.eq({
        bidExpiry: BID_EXPIRY,
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
      expect(publishCall.args[1].bidSignature).to.eq("0xabcdef");
    });
  });

  describe("handleSenderPrepare", () => {
    it("should send prepare for receiving chain with ETH asset", async () => {
      const ethPrepareDataMock = senderPrepareData;
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
          shares: ethPrepareDataMock.txData.shares,
          expiry: ethPrepareDataMock.txData.expiry,
          preparedBlockNumber: ethPrepareDataMock.txData.preparedBlockNumber,
        },
        amount: MUTATED_AMOUNT,
        expiry: MUTATED_EXPIRY,
        bidSignature: ethPrepareDataMock.bidSignature,
        encodedBid: ethPrepareDataMock.encodedBid,
        encryptedCallData: ethPrepareDataMock.encryptedCallData,
      } as PrepareParams);
    });

    it("should send prepare for receiving chain with token asset", async () => {
      const tokenPrepareData = senderPrepareData;
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
          shares: tokenPrepareData.txData.shares,
          expiry: tokenPrepareData.txData.expiry,
          preparedBlockNumber: tokenPrepareData.txData.preparedBlockNumber,
        },
        amount: MUTATED_AMOUNT,
        expiry: MUTATED_EXPIRY,
        bidSignature: tokenPrepareData.bidSignature,
        encodedBid: tokenPrepareData.encodedBid,
        encryptedCallData: tokenPrepareData.encryptedCallData,
      } as PrepareParams);
    });
  });

  describe("handleReceiverFulfill", () => {
    it("should fulfill eth asset", async () => {
      const ethRxFulfillDataMock = {
        ...receiverFulfillDataMock,
        sendingAssetId: constants.AddressZero,
        receivingAssetId: constants.AddressZero,
      };

      const ethPrepareDataMock = senderPrepareData;
      ethPrepareDataMock.txData.sendingAssetId = constants.AddressZero;
      ethPrepareDataMock.txData.receivingAssetId = constants.AddressZero;

      subgraph.getTransactionForChain.returns(
        okAsync({
          status: TransactionStatus.Prepared,
          ...senderPrepareData,
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
          shares: ethRxFulfillDataMock.txData.shares,
          expiry: ethRxFulfillDataMock.txData.expiry,
          preparedBlockNumber: ethRxFulfillDataMock.txData.preparedBlockNumber,
        },
      } as FulfillParams);
    });

    it("should fulfill token asset", async () => {
      // change assetIds
      const tokenRxFulfillDataMock = {
        ...receiverFulfillDataMock,
        sendingAssetId: rinkebyTestTokenAddress,
        receivingAssetId: goerliTestTokenAddress,
      };

      const tokenPrepareData = senderPrepareData;
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
          shares: tokenRxFulfillDataMock.txData.shares,
          expiry: tokenRxFulfillDataMock.txData.expiry,
          preparedBlockNumber: tokenRxFulfillDataMock.txData.preparedBlockNumber,
        },
      } as FulfillParams);
    });
  });
});
