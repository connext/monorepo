import { mkAddress, getRandomBytes32, TransactionData } from "@connext/nxtp-utils";
import { transactionSubgraphMock, txDataMock } from "@connext/nxtp-utils/src/mock";
import { expect } from "@connext/nxtp-utils/src/expect";
import { Wallet, BigNumber } from "ethers";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, spy, stub } from "sinon";
import { Logger } from "@connext/nxtp-utils";

import { ActiveTransaction, HistoricalTransactionStatus } from "../../src/types";
import * as graphqlsdk from "../../src/subgraph/graphqlsdk";

import { EmptyCallDataHash } from "../helper";
import { NxtpSdkEvent, NxtpSdkEvents } from "../../src";
import { convertTransactionToTxData, createSubgraphEvts, Subgraph, SubgraphEvents } from "../../src/subgraph/subgraph";
import { ChainReader } from "../../../txservice/dist";

const logger = new Logger({ level: process.env.LOG_LEVEL ?? "silent" });

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
    initiator,
  } = mocked;

  return {
    receivingChainTxManagerAddress,
    user: user.id,
    router: router.id,
    initiator,
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
    preparedTimestamp,
  } = mockedSending;
  const tx: ActiveTransaction = {
    status,
    bidSignature,
    encodedBid,
    encryptedCallData,
    preparedTimestamp,
    crosschainTx: {
      invariant: {
        receivingChainTxManagerAddress,
        user: user.id,
        router: router.id,
        initiator: user.id,
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
    },
  };
  if (mockedReceiving) {
    tx.crosschainTx.receiving = {
      amount: mockedReceiving.amount.toString(),
      expiry: mockedReceiving.expiry,
      preparedBlockNumber: mockedReceiving.preparedBlockNumber.toNumber(),
    };
  }
  return tx;
};

const GET_ACTIVE_TX_FAILED = "Failed to get active transactions for all chains";

describe("Subgraph", () => {
  let subgraph: Subgraph;
  let signer: SinonStubbedInstance<Wallet>;
  let chainReader: SinonStubbedInstance<ChainReader>;
  let sendingChainId: number = 1337;
  let receivingChainId: number = 1338;
  let user: string = mkAddress("0xa");
  let sdkStub: {
    GetSenderTransactions: SinonStub;
    GetReceiverTransactions: SinonStub;
    GetTransaction: SinonStub;
    GetTransactions: SinonStub;
    GetBlockNumber: SinonStub;
    GetTransactionsWithUser: SinonStub;
  };
  let getSdkStub: SinonStub;

  const chainConfig = {
    [sendingChainId]: {
      subgraph: ["http://example.com"],
      provider: {
        getBlockNumber: () => Promise.resolve(1),
      },
    },
    [receivingChainId]: {
      subgraph: ["http://example.com"],
      provider: {
        getBlockNumber: () => Promise.resolve(1),
      },
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
      initiator: user,
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

    chainReader = createStubInstance(ChainReader);
    chainReader.isSupportedChain.resolves(true);

    sdkStub = {
      GetSenderTransactions: stub().resolves({ transactions: [] }),
      GetReceiverTransactions: stub().resolves({ transactions: [] }),
      GetTransaction: stub().resolves({ transactions: [] }),
      GetTransactions: stub().resolves({ transactions: [] }),
      GetBlockNumber: stub().resolves({ _meta: { block: { number: 1 } } }),
      GetTransactionsWithUser: stub().resolves({ transactions: [] }),
    };

    getSdkStub = stub(graphqlsdk, "getSdk");
    getSdkStub.returns(sdkStub);

    subgraph = new Subgraph(signer.getAddress(), chainConfig as any, chainReader as any, logger);
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

  describe("startPolling", () => {
    it("should work and stop if 0 active txs", async () => {
      subgraph.startPolling();

      const status1 = subgraph.isPolling;
      expect(status1).to.be.true;

      const activetx1 = (subgraph as any).activeTxs.size;
      expect(activetx1).to.be.eq(0);

      await new Promise((resolve) => setTimeout(resolve, (subgraph as any).pollInterval));

      const activetx2 = (subgraph as any).activeTxs.size;
      expect(activetx2).to.be.eq(0);

      const status2 = subgraph.isPolling;
      expect(status2).to.be.false;
    });

    it("should work and continue polling if 1 or more active txs", async () => {
      const transactionId = getRandomBytes32();
      (subgraph as any).activeTxs.set(
        transactionId,
        convertMockedToActiveTransaction(
          NxtpSdkEvents.SenderTransactionPrepared,
          getMockTransaction({ transactionId }),
        ),
      );
      subgraph.startPolling();

      const status1 = subgraph.isPolling;
      expect(status1).to.be.true;

      const activetx1 = (subgraph as any).activeTxs.size;
      expect(activetx1).to.be.eq(1);

      await new Promise((resolve) => setTimeout(resolve, (subgraph as any).pollInterval));

      const activetx2 = (subgraph as any).activeTxs.size;
      expect(activetx2).to.be.eq(1);

      const status2 = subgraph.isPolling;
      expect(status2).to.be.true;
    });
  });

  describe("createSubgraphEvts", () => {
    it("should work", () => {
      const created = createSubgraphEvts();
      expect(Object.keys(created).sort()).to.be.deep.eq(Object.keys(SubgraphEvents).sort());
    });
  });

  describe("getActiveTransactions", async () => {
    describe("sender transactions where status is not Prepared", () => {
      it("should fail if GetTransactionsWithUser for sending chain fails", async () => {
        const transactionId = getRandomBytes32();
        (subgraph as any).activeTxs.set(
          transactionId,
          convertMockedToActiveTransaction(
            NxtpSdkEvents.SenderTransactionPrepared,
            getMockTransaction({ transactionId }),
          ),
        );
        const testError = new Error("test");
        sdkStub.GetTransactionsWithUser.onFirstCall().rejects(testError);

        try {
          await subgraph.getActiveTransactions();
        } catch (e) {
          const expectedErrMessage = testError.message;
          expect(e.context.errors.map((err) => err.message).includes(expectedErrMessage)).to.be.true;
        }

        expect(sdkStub.GetTransactionsWithUser.firstCall.args[0]).to.be.deep.eq({
          transactionIds: [transactionId],
          userId: (await signer.getAddress()).toLowerCase(),
        });
      });

      it("should fail if GetTransactionsWithUser for receiving chain fails", async () => {
        const transactionId = getRandomBytes32();
        const subgraphSending = getMockTransaction({ transactionId, status: graphqlsdk.TransactionStatus.Fulfilled });
        (subgraph as any).activeTxs.set(
          transactionId,
          convertMockedToActiveTransaction(NxtpSdkEvents.SenderTransactionPrepared, subgraphSending),
        );

        sdkStub.GetTransactionsWithUser.onFirstCall().resolves({
          transactions: [subgraphSending],
        });
        const testError = new Error("test");
        sdkStub.GetTransactionsWithUser.onSecondCall().rejects(testError);

        try {
          await subgraph.getActiveTransactions();
        } catch (e) {
          const expectedErrMessage = testError.message;
          expect(e.context.errors.map((err) => err.message).includes(expectedErrMessage)).to.be.true;
        }

        expect(sdkStub.GetTransactionsWithUser.firstCall.args[0]).to.be.deep.eq({
          transactionIds: [transactionId],
          userId: (await signer.getAddress()).toLowerCase(),
        });
        expect(sdkStub.GetTransactionsWithUser.secondCall.args[0]).to.be.deep.eq({
          transactionIds: [transactionId],
          userId: (await signer.getAddress()).toLowerCase(),
        });
      });

      it("should fail if there are receiving chain txs with duplicate txIds", async () => {
        const transactionId = getRandomBytes32();
        const subgraphSending = getMockTransaction({ transactionId, status: graphqlsdk.TransactionStatus.Fulfilled });
        (subgraph as any).activeTxs.set(
          transactionId,
          convertMockedToActiveTransaction(NxtpSdkEvents.SenderTransactionPrepared, subgraphSending),
        );

        sdkStub.GetTransactionsWithUser.onFirstCall().resolves({
          transactions: [subgraphSending],
        });
        sdkStub.GetTransactionsWithUser.onSecondCall().resolves({
          transactions: [subgraphSending, subgraphSending],
        });

        await expect(subgraph.getActiveTransactions()).to.be.rejectedWith("Duplicate transaction ids");
        expect(sdkStub.GetTransactionsWithUser.callCount).to.be.eq(2);
        expect(sdkStub.GetTransactionsWithUser.firstCall.args[0]).to.be.deep.eq({
          transactionIds: [transactionId],
          userId: (await signer.getAddress()).toLowerCase(),
        });
        expect(sdkStub.GetTransactionsWithUser.secondCall.args[0]).to.be.deep.eq({
          transactionIds: [transactionId],
          userId: (await signer.getAddress()).toLowerCase(),
        });
      });

      it("should fail if sender tx is fulfilled and there is no matching receiver tx", async () => {
        const transactionId = getRandomBytes32();
        const subgraphSending = getMockTransaction({ transactionId, status: graphqlsdk.TransactionStatus.Fulfilled });
        (subgraph as any).activeTxs.set(
          transactionId,
          convertMockedToActiveTransaction(NxtpSdkEvents.SenderTransactionPrepared, subgraphSending),
        );

        sdkStub.GetTransactionsWithUser.onFirstCall().resolves({
          transactions: [subgraphSending],
        });
        sdkStub.GetTransactionsWithUser.onSecondCall().resolves({
          transactions: [],
        });

        await expect(subgraph.getActiveTransactions()).to.be.rejectedWith(
          "Sender fulfilled, no fulfilled receiver transaction",
        );
        expect(sdkStub.GetTransactionsWithUser.callCount).to.be.eq(2);
        expect(sdkStub.GetTransactionsWithUser.firstCall.args[0]).to.be.deep.eq({
          transactionIds: [transactionId],
          userId: (await signer.getAddress()).toLowerCase(),
        });
        expect(sdkStub.GetTransactionsWithUser.secondCall.args[0]).to.be.deep.eq({
          transactionIds: [transactionId],
          userId: (await signer.getAddress()).toLowerCase(),
        });
      });

      it("should fail if sender tx is fulfilled and matching receiver tx status is not fulfilled", async () => {
        const transactionId = getRandomBytes32();
        const subgraphSending = getMockTransaction({ transactionId, status: graphqlsdk.TransactionStatus.Fulfilled });
        (subgraph as any).activeTxs.set(
          transactionId,
          convertMockedToActiveTransaction(NxtpSdkEvents.SenderTransactionPrepared, subgraphSending),
        );

        sdkStub.GetTransactionsWithUser.onFirstCall().resolves({
          transactions: [subgraphSending],
        });
        sdkStub.GetTransactionsWithUser.onSecondCall().resolves({
          transactions: [{ ...subgraphSending, status: graphqlsdk.TransactionStatus.Prepared }],
        });

        await expect(subgraph.getActiveTransactions()).to.be.rejectedWith(
          "Sender fulfilled, no fulfilled receiver transaction",
        );
        expect(sdkStub.GetTransactionsWithUser.callCount).to.be.eq(2);
        expect(sdkStub.GetTransactionsWithUser.firstCall.args[0]).to.be.deep.eq({
          transactionIds: [transactionId],
          userId: (await signer.getAddress()).toLowerCase(),
        });
        expect(sdkStub.GetTransactionsWithUser.secondCall.args[0]).to.be.deep.eq({
          transactionIds: [transactionId],
          userId: (await signer.getAddress()).toLowerCase(),
        });
      });

      it("should ignore sender txs where the status is Prepared", async () => {
        const transactionId = getRandomBytes32();
        const subgraphSending = getMockTransaction({ transactionId, status: graphqlsdk.TransactionStatus.Prepared });
        (subgraph as any).activeTxs.set(
          transactionId,
          convertMockedToActiveTransaction(NxtpSdkEvents.SenderTransactionPrepared, subgraphSending),
        );

        sdkStub.GetTransactionsWithUser.resolves({
          transactions: [subgraphSending],
        });

        const res = await subgraph.getActiveTransactions();
        expect(res).to.be.deep.eq([]);
        expect(
          sdkStub.GetTransactionsWithUser.calledOnceWithExactly({
            transactionIds: [transactionId],
            userId: (await signer.getAddress()).toLowerCase(),
          }),
        ).to.be.true;
      });

      it("should post to sender transaction cancelled evt if the sending tx is cancelled", async () => {
        const transactionId = getRandomBytes32();
        const subgraphSending = getMockTransaction({ transactionId, status: graphqlsdk.TransactionStatus.Cancelled });
        const active = convertMockedToActiveTransaction(NxtpSdkEvents.SenderTransactionPrepared, subgraphSending);
        (subgraph as any).activeTxs.set(transactionId, active);

        sdkStub.GetTransactionsWithUser.resolves({
          transactions: [subgraphSending],
        });

        const [res, evt] = await Promise.all([
          subgraph.getActiveTransactions(),
          subgraph.waitFor(SubgraphEvents.SenderTransactionCancelled, 2_000),
        ]);
        expect(evt).to.be.deep.eq({
          txData: { ...active.crosschainTx.invariant, ...active.crosschainTx.sending },
          caller: subgraphSending.cancelCaller,
          transactionHash: subgraphSending.cancelTransactionHash,
        });
        expect(res).to.be.deep.eq([]);
        expect((subgraph as any).activeTxs.get(transactionId)).to.be.undefined;
      });

      it("should post to receiver transaction fulfilled evt if the status is fulfilled", async () => {
        const transactionId = getRandomBytes32();
        const subgraphSending = getMockTransaction({ transactionId, status: graphqlsdk.TransactionStatus.Fulfilled });
        const active = convertMockedToActiveTransaction(NxtpSdkEvents.SenderTransactionPrepared, subgraphSending, {
          ...subgraphSending,
          amount: BigNumber.from(2),
        });
        (subgraph as any).activeTxs.set(transactionId, active);

        sdkStub.GetTransactionsWithUser.resolves({
          transactions: [subgraphSending],
        });

        const [res, evt] = await Promise.all([
          subgraph.getActiveTransactions(),
          subgraph.waitFor(SubgraphEvents.ReceiverTransactionFulfilled, 2_000),
        ]);
        expect(evt).to.be.deep.eq({
          txData: { ...active.crosschainTx.invariant, ...active.crosschainTx.receiving },
          caller: subgraphSending.fulfillCaller,
          transactionHash: subgraphSending.fulfillTransactionHash,
          signature: subgraphSending.signature,
          relayerFee: subgraphSending.relayerFee,
          callData: subgraphSending.callData,
        });
        expect(res).to.be.deep.eq([]);
        expect((subgraph as any).activeTxs.get(transactionId)).to.be.undefined;
      });
    });

    describe("sender transactions where status is Prepared", () => {
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

        sdkStub.GetTransactionsWithUser.withArgs({
          transactionIds: [senderPrepared.transactionId],
          userId: senderPrepared.user.id.toLowerCase(),
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

        sdkStub.GetTransactionsWithUser.withArgs({
          transactionIds: [senderPrepared.transactionId],
          userId: senderPrepared.user.id.toLowerCase(),
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

        sdkStub.GetTransactionsWithUser.withArgs({
          transactionIds: [sender.transactionId],
          userId: sender.user.id.toLowerCase(),
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

        sdkStub.GetTransactionsWithUser.withArgs({
          transactionIds: [sender.transactionId],
          userId: sender.user.id.toLowerCase(),
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
        await expect(subgraph.getActiveTransactions()).to.be.rejectedWith(GET_ACTIVE_TX_FAILED);
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

        sdkStub.GetTransactionsWithUser.rejects(new Error("fail"));
        // We should get back an empty array, indicating that the senderPrepared mock tx we returned above did not get processed
        // because GetTransactions failed.
        const res = await subgraph.getActiveTransactions();
        expect(res).to.be.deep.eq([]);
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

        sdkStub.GetTransactionsWithUser.withArgs({
          transactionIds: [sender.transactionId],
          userId: sender.user.id.toLowerCase(),
        }).resolves({ transactions: [receiver] });

        // We should not get the tx back that has the wrong status.
        const res = await subgraph.getActiveTransactions();
        expect(res).to.be.deep.eq([]);
      });

      it("should throw if all chains throw errors", async () => {
        sdkStub.GetSenderTransactions.rejects(new Error("fail"));
        await expect(subgraph.getActiveTransactions()).to.be.rejectedWith(GET_ACTIVE_TX_FAILED);
      });
    });
  });

  describe("getHistoricalTransactions", async () => {
    it("should fail if GetReceiverTransactions fails", async () => {
      const testError = new Error("test");
      sdkStub.GetReceiverTransactions.rejects(testError);

      try {
        await subgraph.getActiveTransactions();
      } catch (e) {
        const expectedErrMessage = testError.message;
        expect(e.context.errors.map((err) => err.message).includes(expectedErrMessage)).to.be.true;
      }
    });

    it("should fail if GetTransactions fails", async () => {
      sdkStub.GetReceiverTransactions.resolves({ transactions: [transactionSubgraphMock] });
      const testError = new Error("test");
      sdkStub.GetTransactionsWithUser.rejects(testError);

      try {
        await subgraph.getActiveTransactions();
      } catch (e) {
        const expectedErrMessage = testError.message;
        expect(e.context.errors.map((err) => err.message).includes(expectedErrMessage)).to.be.true;
      }
    });

    it("should fail if GetSenderTransactions fails", async () => {
      const testError = new Error("test");
      sdkStub.GetSenderTransactions.rejects(testError);

      try {
        await subgraph.getActiveTransactions();
      } catch (e) {
        const expectedErrMessage = testError.message;
        const chainErrors = e.context.errors;
        const sendingChainErrors = chainErrors.get(sendingChainId).context.errors;
        expect(sendingChainErrors.map((err) => err.message).includes(expectedErrMessage)).to.be.true;
      }
    });

    it("should ignore transactions without matching sender side tx", async () => {
      sdkStub.GetReceiverTransactions.resolves({ transactions: [transactionSubgraphMock] });

      const result = await subgraph.getHistoricalTransactions();
      expect(result).to.be.deep.eq([]);
    });

    it("should return receiver fulfilled transactions", async () => {
      sdkStub.GetReceiverTransactions.onCall(0).resolves({ transactions: [transactionSubgraphMock] });
      sdkStub.GetReceiverTransactions.onCall(1).resolves({ transactions: [] });
      sdkStub.GetTransactionsWithUser.resolves({ transactions: [transactionSubgraphMock] });

      const result = await subgraph.getHistoricalTransactions();
      expect(result).to.be.deep.eq([
        {
          status: HistoricalTransactionStatus.FULFILLED,
          fulfilledTxHash: transactionSubgraphMock.fulfillTransactionHash,
          preparedTimestamp: transactionSubgraphMock.preparedTimestamp,
          crosschainTx: {
            invariant: {
              user,
              initiator: transactionSubgraphMock.initiator,
              router: transactionSubgraphMock.router.id,
              sendingChainId: parseInt(transactionSubgraphMock.sendingChainId.toString()),
              sendingAssetId: transactionSubgraphMock.sendingAssetId,
              sendingChainFallback: transactionSubgraphMock.sendingChainFallback,
              receivingChainId: parseInt(transactionSubgraphMock.receivingChainId.toString()),
              receivingAssetId: transactionSubgraphMock.receivingAssetId,
              receivingAddress: transactionSubgraphMock.receivingAddress,
              callTo: transactionSubgraphMock.callTo,
              callDataHash: transactionSubgraphMock.callDataHash,
              transactionId: transactionSubgraphMock.transactionId,
              receivingChainTxManagerAddress: transactionSubgraphMock.receivingChainTxManagerAddress,
            },
            sending: {
              amount: transactionSubgraphMock.amount,
              expiry: parseInt(transactionSubgraphMock.expiry.toString()),
              preparedBlockNumber: parseInt(transactionSubgraphMock.preparedBlockNumber.toString()),
            },
            receiving: {
              amount: transactionSubgraphMock.amount,
              expiry: parseInt(transactionSubgraphMock.expiry.toString()),
              preparedBlockNumber: parseInt(transactionSubgraphMock.preparedBlockNumber.toString()),
            },
          },
        },
      ]);
    });

    it("should return sender cancelled transactions", async () => {
      sdkStub.GetSenderTransactions.onCall(0).resolves({ transactions: [transactionSubgraphMock] });
      sdkStub.GetSenderTransactions.onCall(1).resolves({ transactions: [] });
      sdkStub.GetTransactionsWithUser.resolves({ transactions: [transactionSubgraphMock] });

      const result = await subgraph.getHistoricalTransactions();
      expect(result).to.be.deep.eq([
        {
          status: HistoricalTransactionStatus.CANCELLED,
          preparedTimestamp: transactionSubgraphMock.preparedTimestamp,
          crosschainTx: {
            invariant: {
              user,
              router: transactionSubgraphMock.router.id,
              initiator: transactionSubgraphMock.initiator,
              sendingChainId: parseInt(transactionSubgraphMock.sendingChainId.toString()),
              sendingAssetId: transactionSubgraphMock.sendingAssetId,
              sendingChainFallback: transactionSubgraphMock.sendingChainFallback,
              receivingChainId: parseInt(transactionSubgraphMock.receivingChainId.toString()),
              receivingAssetId: transactionSubgraphMock.receivingAssetId,
              receivingAddress: transactionSubgraphMock.receivingAddress,
              callTo: transactionSubgraphMock.callTo,
              callDataHash: transactionSubgraphMock.callDataHash,
              transactionId: transactionSubgraphMock.transactionId,
              receivingChainTxManagerAddress: transactionSubgraphMock.receivingChainTxManagerAddress,
            },
            sending: {
              amount: transactionSubgraphMock.amount,
              expiry: parseInt(transactionSubgraphMock.expiry.toString()),
              preparedBlockNumber: parseInt(transactionSubgraphMock.preparedBlockNumber.toString()),
            },
          },
        },
      ]);
    });

    it("should return an empty array if there were no receiver fulfilled transactions and no cancelled transactions", async () => {
      const result = await subgraph.getHistoricalTransactions();
      expect(result).to.be.deep.eq([]);
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

      sdkStub.GetTransactionsWithUser.withArgs({
        transactionIds: [senderPrepared.transactionId],
        userId: senderPrepared.user.id.toLowerCase(),
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

      sdkStub.GetTransactionsWithUser.withArgs({
        transactionIds: [senderPrepared.transactionId],
        userId: senderPrepared.user.id.toLowerCase(),
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
