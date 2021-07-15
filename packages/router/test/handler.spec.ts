import {
  FulfillParams,
  InvariantTransactionData,
  mkAddress,
  mkBytes32,
  PrepareParams,
  RouterNxtpNatsMessagingService,
  TransactionData,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
  VariantTransactionData,
} from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";
import { expect } from "chai";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import pino from "pino";
import { constants, providers, Signer } from "ethers";

import { SubgraphTransactionManagerListener } from "../src/transactionManagerListener";
import { Handler } from "../src/handler";
import * as config from "../src/config";
import { TransactionStatus } from "../src/graphqlsdk";
import { TransactionManager as TxManager } from "../src/contract";
import * as handlerUtils from "../src/handler";

const logger = pino();

const fakeTxReceipt = {
  blockHash: "foo",
  blockNumber: 1,
  byzantium: true,
  confirmations: 1,
  contractAddress: mkAddress(),
  cumulativeGasUsed: constants.One,
  from: mkAddress(),
  transactionHash: mkBytes32(),
  gasUsed: constants.One,
  to: mkAddress(),
  logs: [],
  logsBloom: "",
  transactionIndex: 1,
} as unknown as providers.TransactionReceipt;

const fakeConfig: config.NxtpRouterConfig = {
  adminToken: "foo",
  authUrl: "http://example.com",
  chainConfig: {
    1337: {
      confirmations: 1,
      provider: ["http://example.com"],
      subgraph: "http://example.com",
      transactionManagerAddress: mkAddress("0xaaa"),
    },
    1338: {
      confirmations: 1,
      provider: ["http://example.com"],
      subgraph: "http://example.com",
      transactionManagerAddress: mkAddress("0xaaa"),
    },
  },
  mnemonic: "hello world",
  natsUrl: "http://example.com",
  logLevel: "info",
};

const invariantDataMock: InvariantTransactionData = {
  user: mkAddress("0xa"),
  router: mkAddress("0xb"),
  sendingAssetId: mkAddress("0xc"),
  receivingAssetId: mkAddress("0xd"),
  sendingChainFallback: mkAddress("0xe"),
  receivingAddress: mkAddress("0xf"),
  callTo: mkAddress("0xaa"),
  sendingChainId: 1337,
  receivingChainId: 1338,
  callDataHash: mkBytes32("0xa"),
  transactionId: mkBytes32("0xb"),
};

const variantDataMock: VariantTransactionData = {
  amount: "123",
  expiry: "123456",
  preparedBlockNumber: 1234,
};

const txDataMock: TransactionData = {
  ...invariantDataMock,
  ...variantDataMock,
};

const senderPrepareData: TransactionPreparedEvent = {
  txData: txDataMock,
  caller: mkAddress("0xf"),
  encryptedCallData: "0xabc",
  encodedBid: "0xdef",
  bidSignature: "0xbca",
};

const receiverFulfillDataMock: TransactionFulfilledEvent = {
  txData: txDataMock,
  caller: mkAddress("0xf"),
  relayerFee: "5678",
  callData: "0x",
  signature: "0xdeadbeef",
};

const rinkebyTestTokenAddress = "0x8bad6f387643Ae621714Cd739d26071cFBE3d0C9";
const goerliTestTokenAddress = "0xbd69fC70FA1c3AED524Bb4E82Adc5fcCFFcD79Fa";

const MUTATED_AMOUNT = "100";
const MUTATED_EXPIRY = 123400;

describe("Handler", () => {
  let handler: Handler;
  let txService: SinonStubbedInstance<TransactionService>;
  let txManager: SinonStubbedInstance<TxManager>;
  let subgraph: SinonStubbedInstance<SubgraphTransactionManagerListener>;

  beforeEach(() => {
    const messaging = createStubInstance(RouterNxtpNatsMessagingService);

    subgraph = createStubInstance(SubgraphTransactionManagerListener);

    const signer = createStubInstance(Signer);
    (signer as any).getAddress = () => Promise.resolve(mkAddress("0xabc")); // need to do this differently bc the function doesnt exist on the interface

    txManager = createStubInstance(TxManager);

    txService = createStubInstance(TransactionService);
    txService.sendTx.resolves(fakeTxReceipt);
    stub(config, "getConfig").returns(fakeConfig);
    stub(handlerUtils, "mutateAmount").returns(MUTATED_AMOUNT);
    stub(handlerUtils, "mutateExpiry").returns(MUTATED_EXPIRY);

    handler = new Handler(messaging as any, subgraph as any, txManager as any, logger);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should send prepare for receiving chain with ETH asset", async () => {
    const ethPrepareDataMock = senderPrepareData;
    ethPrepareDataMock.txData.sendingAssetId = constants.AddressZero;
    ethPrepareDataMock.txData.receivingAssetId = constants.AddressZero;
    await handler.handleSenderPrepare(ethPrepareDataMock);

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
      expiry: MUTATED_EXPIRY.toString(),
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
    await handler.handleSenderPrepare(tokenPrepareData);

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
      expiry: MUTATED_EXPIRY.toString(),
      bidSignature: tokenPrepareData.bidSignature,
      encodedBid: tokenPrepareData.encodedBid,
      encryptedCallData: tokenPrepareData.encryptedCallData,
    } as PrepareParams);
  });

  it("should fulfill eth asset", async () => {
    const ethRxFulfillDataMock = {
      ...receiverFulfillDataMock,
      sendingAssetId: constants.AddressZero,
      receivingAssetId: constants.AddressZero,
    };

    subgraph.getTransactionForChain.resolves({
      status: TransactionStatus.Prepared,
      ...senderPrepareData,
    });
    await handler.handleReceiverFulfill(ethRxFulfillDataMock);
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
        expiry: ethRxFulfillDataMock.txData.expiry.toString(),
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

    subgraph.getTransactionForChain.resolves({
      status: TransactionStatus.Prepared,
      bidSignature: "0x",
      encodedBid: "0x",
      encryptedCallData: "0x",
      ...tokenRxFulfillDataMock,
    });

    await handler.handleReceiverFulfill(tokenRxFulfillDataMock);
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
        expiry: tokenRxFulfillDataMock.txData.expiry.toString(),
        preparedBlockNumber: tokenRxFulfillDataMock.txData.preparedBlockNumber,
      },
    } as FulfillParams);
  });

  it(`should get liquidity`, async () => {
    const mockLiquidity = "169.00";
    txManager.getLiquidity.resolves(mockLiquidity);
    await txManager.getLiquidity(4, constants.AddressZero);
    const call = txManager.getLiquidity.getCall(0);

    expect(await call.returnValue).to.eq("169.00");
  });

  it(`should add liquidity`, async () => {
    await txManager.addLiquidity(4, invariantDataMock.router, "100", constants.AddressZero);
    const call = txManager.addLiquidity.getCall(0);

    console.log(call);
  });
});
