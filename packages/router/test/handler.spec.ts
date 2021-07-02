import {
  FulfillParams,
  mkAddress,
  mkBytes32,
  NatsNxtpMessagingService,
  RouterNxtpNatsMessagingService,
} from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";
import { expect } from "chai";
import { describe } from "mocha";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import pino from "pino";
import { constants, providers, Signer, utils } from "ethers";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager } from "@connext/nxtp-contracts";

import {
  ReceiverFulfillData,
  SenderPrepareData,
  SubgraphTransactionManagerListener,
} from "../src/transactionManagerListener";
import { Handler } from "../src/handler";
import * as config from "../src/config";
import { TransactionStatus } from "../src/graphqlsdk";
import { TransactionManager as TxManager } from "../src/contract";

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

const futureTime = Date.now() + 3600 * 24 * 7; // 1 week

const senderPrepareData: SenderPrepareData = {
  amount: utils.parseEther("100").toString(),
  blockNumber: 1,
  callData: "0x",
  chainId: 1337,
  expiry: futureTime,
  sendingAssetId: constants.AddressZero,
  sendingChainId: 1337,
  receivingAddress: mkAddress(),
  receivingAssetId: constants.AddressZero,
  receivingChainId: 1338,
  router: mkAddress(),
  transactionId: mkBytes32(),
  user: mkAddress(),
  encodedBid: "0x",
  bidSignature: "0x",
  status: TransactionStatus.Prepared,
};

const receiverFulfillDataMock: ReceiverFulfillData = {
  ...senderPrepareData,
  relayerFee: "0",
  signature: "0xdeadbeef",
};

const rinkebyTestTokenAddress = "0x8bad6f387643Ae621714Cd739d26071cFBE3d0C9";
const goerliTestTokenAddress = "0xbd69fC70FA1c3AED524Bb4E82Adc5fcCFFcD79Fa";

describe("Handler", () => {
  let handler: Handler;
  let txService: SinonStubbedInstance<TransactionService>;
  let txManager: SinonStubbedInstance<TxManager>;
  let subgraph: SinonStubbedInstance<SubgraphTransactionManagerListener>;
  const nxtpContract = new utils.Interface(TransactionManagerArtifact.abi) as TransactionManager["interface"];

  beforeEach(() => {
    const messaging = createStubInstance(RouterNxtpNatsMessagingService);

    subgraph = createStubInstance(SubgraphTransactionManagerListener);

    const signer = createStubInstance(Signer);
    (signer as any).getAddress = () => Promise.resolve(mkAddress("0xabc")); // need to do this differently bc the function doesnt exist on the interface

    txManager = createStubInstance(TxManager);

    txService = createStubInstance(TransactionService);
    txService.sendAndConfirmTx.resolves(fakeTxReceipt);
    stub(config, "getConfig").returns(fakeConfig);

    handler = new Handler(messaging as any, subgraph as any, txManager as any, logger);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should send prepare for receiving chain with ETH asset", async () => {
    await handler.handleSenderPrepare(senderPrepareData);

    expect(txManager.prepare.callCount).to.be.eq(1);
    const call = txManager.prepare.getCall(0);
    expect(call.args[0]).to.deep.eq(senderPrepareData);
  });

  it("should send prepare for receiving chain with token asset", async () => {
    const tokenPrepareData = {
      ...senderPrepareData,
      sendingAssetId: rinkebyTestTokenAddress,
      receivingAssetId: goerliTestTokenAddress,
    };

    await handler.handleSenderPrepare(tokenPrepareData);

    const call = txManager.prepare.getCall(0);
    expect(call.args[0]).to.deep.eq(tokenPrepareData);
  });

  it("should fulfill eth asset", async () => {
    subgraph.getSenderTransaction.resolves({ ...receiverFulfillDataMock });
    await handler.handleReceiverFulfill(receiverFulfillDataMock);
    const call = txManager.fulfill.getCall(0);
    const [, data] = call.args;
    expect(data).to.deep.eq({
      relayerFee: receiverFulfillDataMock.relayerFee,
      signature: receiverFulfillDataMock.signature,
      txData: {
        amount: receiverFulfillDataMock.amount,
        callData: receiverFulfillDataMock.callData,
        receivingAddress: receiverFulfillDataMock.receivingAddress,
        receivingAssetId: receiverFulfillDataMock.receivingAssetId,
        sendingAssetId: receiverFulfillDataMock.sendingAssetId,
        router: receiverFulfillDataMock.router,
        user: receiverFulfillDataMock.user,
        expiry: receiverFulfillDataMock.expiry.toString(),
        transactionId: receiverFulfillDataMock.transactionId,
        blockNumber: receiverFulfillDataMock.blockNumber,
        receivingChainId: receiverFulfillDataMock.receivingChainId,
        sendingChainId: receiverFulfillDataMock.sendingChainId,
      },
    } as FulfillParams);
  });

  it(`should fulfill token asset`, async () => {
    // change assetIds
    const tokenRxFulfillDataMock = {
      ...receiverFulfillDataMock,
      sendingAssetId: rinkebyTestTokenAddress,
      receivingAssetId: goerliTestTokenAddress,
    };

    subgraph.getSenderTransaction.resolves({ ...tokenRxFulfillDataMock });

    await handler.handleReceiverFulfill(tokenRxFulfillDataMock);
    const call = txManager.fulfill.getCall(0);
    const [, data] = call.args;

    expect(data).to.deep.eq({
      relayerFee: receiverFulfillDataMock.relayerFee,
      signature: receiverFulfillDataMock.signature,
      txData: {
        amount: receiverFulfillDataMock.amount,
        callData: receiverFulfillDataMock.callData,
        receivingAddress: receiverFulfillDataMock.receivingAddress,
        receivingAssetId: goerliTestTokenAddress,
        sendingAssetId: rinkebyTestTokenAddress,
        router: receiverFulfillDataMock.router,
        user: receiverFulfillDataMock.user,
        expiry: receiverFulfillDataMock.expiry.toString(),
        transactionId: receiverFulfillDataMock.transactionId,
        blockNumber: receiverFulfillDataMock.blockNumber,
        receivingChainId: receiverFulfillDataMock.receivingChainId,
        sendingChainId: receiverFulfillDataMock.sendingChainId,
      },
    } as FulfillParams);
  });
});
