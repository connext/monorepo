import { mkAddress, getRandomBytes32, TransactionData } from "@connext/nxtp-utils";
import { transactionSubgraphMock, txDataMock } from "@connext/nxtp-utils/src/mock";
import { expect } from "@connext/nxtp-utils/src/expect";
import { Wallet, BigNumber } from "ethers";
import pino from "pino";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, spy, stub } from "sinon";

import {
  Subgraph,
  convertTransactionToTxData,
  ActiveTransaction,
  createSubgraphEvts,
  SubgraphEvents,
} from "../../src/subgraph";
import * as graphqlsdk from "../../src/graphqlsdk";

import { EmptyCallDataHash } from "../helper";
import { NxtpSdkEvent, NxtpSdkEvents } from "../../src";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });

const convertMockedToTransactionData = (mocked: graphqlsdk.Transaction): TransactionData => {
  const {
    receivingChainTxManagerAddress,
    user,
    router,
    sendingAssetId,
    receivingAssetId,
    sendingChainFallback,
    callTo,
    receivingAddress,
    sendingChainId,
    receivingChainId,
    callDataHash,
    transactionId,
    expiry,
    amount,
    preparedBlockNumber,
  } = mocked;

  return {
    receivingChainTxManagerAddress,
    user: user.id,
    router: router.id,
    sendingAssetId,
    receivingAssetId,
    sendingChainFallback,
    callTo,
    receivingAddress,
    sendingChainId,
    receivingChainId,
    callDataHash,
    transactionId,
    amount: amount.toString(),
    expiry,
    preparedBlockNumber: preparedBlockNumber.toNumber(),
  };
};

const convertMockedToActiveTransaction = (
  status: NxtpSdkEvent,
  mockedSending: graphqlsdk.Transaction,
  mockedReceiving?: graphqlsdk.Transaction,
): ActiveTransaction => {
  const {
    bidSignature,
    encodedBid,
    encryptedCallData,
    receivingChainTxManagerAddress,
    user,
    router,
    sendingAssetId,
    receivingAssetId,
    sendingChainFallback,
    callTo,
    receivingAddress,
    sendingChainId,
    receivingChainId,
    callDataHash,
    transactionId,
  } = mockedSending;
  return {
    status,
    bidSignature,
    encodedBid,
    encryptedCallData,
    preparedTimestamp: Math.floor(Date.now() / 1000),
    crosschainTx: {
      invariant: {
        receivingChainTxManagerAddress,
        user: user.id,
        router: router.id,
        sendingAssetId,
        receivingAssetId,
        sendingChainFallback,
        callTo,
        receivingAddress,
        sendingChainId,
        receivingChainId,
        callDataHash,
        transactionId,
      },
      sending: {
        amount: mockedSending.amount.toString(),
        expiry: mockedSending.expiry,
        preparedBlockNumber: mockedSending.preparedBlockNumber.toNumber(),
      },
      receiving: mockedReceiving
        ? {
            amount: mockedReceiving.amount.toString(),
            expiry: mockedReceiving.expiry,
            preparedBlockNumber: mockedReceiving.preparedBlockNumber.toNumber(),
          }
        : undefined,
    },
  };
};

describe("Subgraph", () => {
  let subgraph: Subgraph;
  let signer: SinonStubbedInstance<Wallet>;
  let sendingChainId: number = 1337;
  let receivingChainId: number = 1338;
  let user: string = mkAddress("0xa");
  let sdkStub: {
    GetSenderTransactions: SinonStub;
    GetReceiverTransactions: SinonStub;
    GetTransaction: SinonStub;
    GetTransactions: SinonStub;
  };

  const chainConfig = {
    [sendingChainId]: {
      subgraph: "http://example.com",
    },
    [receivingChainId]: {
      subgraph: "http://example.com",
    },
  };

  const getMockTransaction = (overrides: Partial<graphqlsdk.Transaction> = {}): graphqlsdk.Transaction => {
    const day = 24 * 60 * 60;

    const transaction: graphqlsdk.Transaction = {
      id: "123",
      status: graphqlsdk.TransactionStatus.Prepared,
      chainId: sendingChainId,
      user: {
        id: user,
      } as graphqlsdk.User,
      router: {} as graphqlsdk.Router,
      receivingChainTxManagerAddress: mkAddress("0xaa"),
      sendingAssetId: mkAddress("0xc"),
      receivingAssetId: mkAddress("0xd"),
      sendingChainFallback: user,
      callTo: mkAddress("0xe"),
      receivingAddress: mkAddress("0xf"),
      callDataHash: getRandomBytes32(),
      transactionId: getRandomBytes32(),
      sendingChainId,
      receivingChainId,
      amount: BigNumber.from(1),
      expiry: Math.floor(Date.now() / 1000) + day + 5_000,
      preparedBlockNumber: BigNumber.from(1),
      encryptedCallData: EmptyCallDataHash,
      preparedTimestamp: Math.floor(Date.now() / 1000),
      prepareCaller: user,
      bidSignature: EmptyCallDataHash,
      encodedBid: EmptyCallDataHash,
      prepareTransactionHash: EmptyCallDataHash,
      ...overrides,
    };
    return transaction;
  };

  beforeEach(() => {
    signer = createStubInstance(Wallet);
    signer.getAddress.resolves(user);

    sdkStub = {
      GetSenderTransactions: stub().resolves({ transactions: [] }),
      GetReceiverTransactions: stub().resolves({ transactions: [] }),
      GetTransaction: stub().resolves({ transactions: [] }),
      GetTransactions: stub().resolves({ transactions: [] }),
    };

    stub(graphqlsdk, "getSdk").returns(sdkStub);

    subgraph = new Subgraph(signer, chainConfig, logger);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("happy: constructor", () => {
    expect(subgraph instanceof Subgraph).to.be.true;
  });

  describe("convertTransactionToTxData", () => {
    it("should work", () => {
      const res = convertTransactionToTxData(transactionSubgraphMock);
      expect(res).to.containSubset(txDataMock);
    });
  });

  describe("createSubgraphEvts", () => {
    it("should work", () => {
      const created = createSubgraphEvts();
      expect(Object.keys(created).sort()).to.be.deep.eq(Object.keys(SubgraphEvents).sort());
    });
  });

  describe("getActiveTransactions", async () => {
    it("should work if there are no sender transactions", async () => {
      const res = await subgraph.getActiveTransactions();
      expect(res).to.be.deep.eq([]);
      expect(sdkStub.GetSenderTransactions.callCount).to.be.eq(2);
      expect(sdkStub.GetSenderTransactions.getCall(0).args[0]).to.containSubset({
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      });
      expect(sdkStub.GetSenderTransactions.getCall(1).args[0]).to.containSubset({
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      });
    });

    it("should work if there is a sender chain tx that is prepared", async () => {
      const senderPrepared = getMockTransaction();
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [senderPrepared] });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId: receivingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [] });

      sdkStub.GetTransactions.withArgs({
        transactionIds: [senderPrepared.transactionId],
      }).resolves({ transactions: [] });

      const [res, event] = await Promise.all([
        subgraph.getActiveTransactions(),
        subgraph.waitFor(NxtpSdkEvents.SenderTransactionPrepared, 5_000),
      ]);
      expect(res.length).to.be.eq(1);
      expect(res[0]).to.containSubset(
        convertMockedToActiveTransaction(NxtpSdkEvents.SenderTransactionPrepared, senderPrepared),
      );
      expect(event.txData).to.be.deep.eq(convertMockedToTransactionData(senderPrepared));
    });

    it("should work if there is a sender chain tx prepared and a receiver chain tx prepared", async () => {
      const senderPrepared = getMockTransaction();
      const receiverPrepared = getMockTransaction({
        chainId: receivingChainId,
        transactionId: senderPrepared.transactionId,
        callDataHash: senderPrepared.callDataHash,
      });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [senderPrepared] });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId: receivingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [] });

      sdkStub.GetTransactions.withArgs({
        transactionIds: [senderPrepared.transactionId],
      }).resolves({ transactions: [receiverPrepared] });

      const [res, event] = await Promise.all([
        subgraph.getActiveTransactions(),
        subgraph.waitFor(NxtpSdkEvents.ReceiverTransactionPrepared, 5_000),
      ]);
      expect(res.length).to.be.eq(1);
      expect(res[0]).to.containSubset(
        convertMockedToActiveTransaction(NxtpSdkEvents.ReceiverTransactionPrepared, senderPrepared, receiverPrepared),
      );
      expect(event.txData).to.be.deep.eq(convertMockedToTransactionData(receiverPrepared));
    });

    it("should work if the sender tx is prepared and receiver tx is fulfilled", async () => {
      const sender = getMockTransaction();
      const receiver = getMockTransaction({
        chainId: receivingChainId,
        transactionId: sender.transactionId,
        callDataHash: sender.callDataHash,
        status: graphqlsdk.TransactionStatus.Fulfilled,
      });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [sender] });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId: receivingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [] });

      sdkStub.GetTransactions.withArgs({
        transactionIds: [sender.transactionId],
      }).resolves({ transactions: [receiver] });

      // const res = await subgraph.getActiveTransactions();
      const [res, event] = await Promise.all([
        subgraph.getActiveTransactions(),
        subgraph.waitFor(NxtpSdkEvents.ReceiverTransactionFulfilled, 5_000),
      ]);
      expect(res).to.be.deep.eq([]);
      expect(event.txData).to.be.deep.eq(convertMockedToTransactionData(receiver));
    });

    it("should work if the sender tx is prepared and receiver tx is cancelled", async () => {
      const sender = getMockTransaction();
      const receiver = getMockTransaction({
        chainId: receivingChainId,
        transactionId: sender.transactionId,
        callDataHash: sender.callDataHash,
        status: graphqlsdk.TransactionStatus.Cancelled,
      });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [sender] });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId: receivingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [] });

      sdkStub.GetTransactions.withArgs({
        transactionIds: [sender.transactionId],
      }).resolves({ transactions: [receiver] });

      const [res, event] = await Promise.all([
        subgraph.getActiveTransactions(),
        subgraph.waitFor(NxtpSdkEvents.ReceiverTransactionCancelled, 5_000),
      ]);
      expect(res).to.be.deep.eq([]);
      expect(event.txData).to.be.deep.eq(convertMockedToTransactionData(receiver));
    });

    it("should fail if it cannot call `GetSenderTransactions`", async () => {
      sdkStub.GetSenderTransactions.rejects(new Error("fail"));
      await expect(subgraph.getActiveTransactions()).to.be.rejectedWith("fail");
    });

    it("should fail if there is a sender tx, but it fails to call `GetTransactions`", async () => {
      const senderPrepared = getMockTransaction();
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [senderPrepared] });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId: receivingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [] });

      sdkStub.GetTransactions.rejects(new Error("fail"));
      await expect(subgraph.getActiveTransactions()).to.be.rejectedWith("fail");
    });

    it("should return empty array if it cannot find an sdk for the receiving chain on sender tx", async () => {
      const senderPrepared = getMockTransaction({ receivingChainId: 9876 });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [senderPrepared] });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId: receivingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [] });

      const res = await subgraph.getActiveTransactions();
      expect(res).to.be.deep.eq([]);
    });

    it("should fail if the receiver tx status is unrecognized", async () => {
      const sender = getMockTransaction();
      const receiver = getMockTransaction({
        chainId: receivingChainId,
        transactionId: sender.transactionId,
        callDataHash: sender.callDataHash,
        status: "fail" as any,
      });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [sender] });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId: receivingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [] });

      sdkStub.GetTransactions.withArgs({
        transactionIds: [sender.transactionId],
      }).resolves({ transactions: [receiver] });

      await expect(subgraph.getActiveTransactions()).to.be.rejectedWith("Invalid tx status (fail), check subgraph");
    });
  });

  describe("waitFor", () => {
    it("should work", async () => {
      const waitForSpy = spy();
      subgraph.attach(SubgraphEvents.SenderTransactionPrepared, waitForSpy);

      const senderPrepared = getMockTransaction();
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [senderPrepared] });
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId: receivingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [] });

      sdkStub.GetTransactions.withArgs({
        transactionIds: [senderPrepared.transactionId],
      }).resolves({ transactions: [] });

      // Wrap in a promise here to be sure that the waitFor call is blocking.
      const promise = new Promise<boolean>(async (resolve) => {
        await subgraph.waitFor(SubgraphEvents.SenderTransactionPrepared, 10_000);
        resolve(waitForSpy.callCount === 1);
      });

      expect(promise).to.eventually.be.true;
      await subgraph.getActiveTransactions();
    });
  });

  describe("detach", () => {
    it("should work", async () => {
      const detachSpy = spy();
      subgraph.attach(SubgraphEvents.SenderTransactionPrepared, detachSpy);

      const senderPrepared = getMockTransaction();
      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [senderPrepared] });

      sdkStub.GetSenderTransactions.withArgs({
        sendingChainId: receivingChainId,
        userId: user,
        status: graphqlsdk.TransactionStatus.Prepared,
      }).resolves({ transactions: [] });

      sdkStub.GetTransactions.withArgs({
        transactionIds: [senderPrepared.transactionId],
      }).resolves({ transactions: [] });

      // Event should be triggered for this round.
      await subgraph.getActiveTransactions();
      expect(detachSpy.callCount).to.equal(1);

      subgraph.detach(SubgraphEvents.SenderTransactionPrepared);

      await subgraph.getActiveTransactions();
      expect(detachSpy.callCount).to.be.eq(1);
    });
  });
});
