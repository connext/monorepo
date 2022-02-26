import { constants } from "ethers";
import Sinon, { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import {
  expect,
  FallbackSubgraph,
  mkAddress,
  requestContextMock,
  SubgraphSyncRecord,
  transactionSubgraphMock,
  txDataMock,
} from "@connext/nxtp-utils";

import * as subgraphAdapter from "../../../src/adapters/subgraph";
import { TransactionStatus } from "../../../src/adapters/subgraph/runtime/graphqlsdk";
import {
  getActiveTransactions,
  getAssetBalance,
  getAssetBalances,
  getExpressiveAssetBalances,
  getSyncRecords,
  getTransactionForChain,
  sdkSenderTransactionToCrosschainTransaction,
} from "../../../src/adapters/subgraph/subgraph";
import { CrosschainTransactionStatus } from "../../../src/lib/entities";
import { ContractReaderNotAvailableForChain, NoChainConfig } from "../../../src/lib/errors";
import { getNtpTimeSeconds } from "../../../src/lib/helpers";
import { ctxMock, txServiceMock } from "../../globalTestHook";
import { configMock, routerAddrMock } from "../../utils";

type SdkMock = {
  GetReceiverTransactions: SinonStub;
  GetSenderTransactions: SinonStub;
  GetTransactions: SinonStub;
  GetTransaction: SinonStub;
  GetAssetBalance: SinonStub;
  GetAssetBalances: SinonStub;
  GetExpressiveAssetBalances: SinonStub;
  GetBlockNumber: SinonStub;
  GetTransactionsWithRouter: SinonStub;
};

let sdks: Record<number, SinonStubbedInstance<FallbackSubgraph<SdkMock>>>;
let fallbackSubgraph: SinonStubbedInstance<FallbackSubgraph<SdkMock>>;
let sdk: SdkMock;

let getSdkStub: SinonStub;
let getAnalyticsSdksStub: SinonStub;

const GET_ACTIVE_TX_FAILED = "Failed to get active transactions for all chains";
const TEST_SUBGRAPH_MAX_LAG = 10;

describe("Subgraph Adapter", () => {
  const sendingChainId = txDataMock.sendingChainId;
  const receivingChainId = txDataMock.receivingChainId;
  const mockInSyncSubgraphRecord = {
    name: "test",
    synced: true,
    latestBlock: 100,
    syncedBlock: 100,
    lag: 0,
  };
  const mockOutOfSyncRecord: SubgraphSyncRecord = {
    name: "test",
    synced: false,
    syncedBlock: 73,
    latestBlock: 100,
    lag: 27,
  };
  let mockSyncRecords: SubgraphSyncRecord[];
  let mockHasSynced = true;

  let config;
  afterEach(() => {
    restore();
    reset();
  });

  beforeEach(() => {
    sdk = {
      GetReceiverTransactions: stub().resolves({ router: { transactions: [] } }),
      GetSenderTransactions: stub().resolves({ router: { transactions: [] } }),
      GetTransactions: stub().resolves({ transactions: [] }),
      GetTransaction: stub().resolves(undefined),
      GetAssetBalance: stub().resolves(constants.Zero),
      GetAssetBalances: stub().resolves([]),
      GetExpressiveAssetBalances: stub().resolves([]),
      GetBlockNumber: stub().resolves({ _meta: { block: { number: 10000 } } }),
      GetTransactionsWithRouter: stub().resolves({ transactions: [] }),
    };

    fallbackSubgraph = createStubInstance(FallbackSubgraph);
    fallbackSubgraph.request.callsFake((method) => method(sdk, ""));
    fallbackSubgraph.sync.resolves([mockInSyncSubgraphRecord]);
    Sinon.stub(fallbackSubgraph, "inSync").get(() => true);
    mockHasSynced = true;
    Sinon.stub(fallbackSubgraph, "hasSynced").get(() => mockHasSynced);
    mockSyncRecords = [mockInSyncSubgraphRecord];
    Sinon.stub(fallbackSubgraph, "records").get(() => mockSyncRecords);

    sdks = {
      [sendingChainId]: fallbackSubgraph,
    };

    getSdkStub = stub(subgraphAdapter, "getSdks").returns(sdks as any);
    getAnalyticsSdksStub = stub(subgraphAdapter, "getAnalyticsSdks").returns(sdks as any);

    config = {
      ...configMock,
    };
    ctxMock.config = config;
  });

  describe("#getSyncRecords", () => {
    it("should work", async () => {
      mockHasSynced = false;
      expect(await getSyncRecords(sendingChainId)).to.be.deep.eq(mockSyncRecords);
    });

    it("should error if invalid chain id", async () => {
      const testChainId = 9876;
      mockHasSynced = false;
      const _sdks = {
        [testChainId]: sdks[sendingChainId],
      };
      getSdkStub.returns(_sdks as any);
      try {
        await getSyncRecords(testChainId);
      } catch (e) {
        const expectedErrMessage = new NoChainConfig(testChainId).message;
        expect(e.context.errors.get(testChainId.toString()).message).to.eq(expectedErrMessage);
      }
    });
  });

  describe("#getActiveTransactions", () => {
    it("happy", async () => {
      const _sdks = {
        ...sdks,
        [receivingChainId]: fallbackSubgraph,
      };
      getSdkStub.returns(_sdks as any);

      sdk.GetSenderTransactions.resolves({ router: { transactions: [transactionSubgraphMock] } });
      await getActiveTransactions(requestContextMock);
    });

    it("should fail if theres no chain config for that chain", async () => {
      const testChainId = 9876;
      const _sdks = {
        [testChainId]: sdks[sendingChainId],
      };
      getSdkStub.returns(_sdks as any);
      try {
        await getActiveTransactions(requestContextMock);
      } catch (e) {
        const expectedErrMessage = new NoChainConfig(testChainId).message;
        expect(e.context.errors.get(testChainId.toString()).message).to.eq(expectedErrMessage);
      }
    });

    it("should return an empty array if the chain is unsynced", async () => {
      mockSyncRecords = [mockOutOfSyncRecord];
      expect(await getActiveTransactions()).to.be.deep.eq([]);
      expect(await getSyncRecords(sendingChainId)).to.be.deep.eq([mockOutOfSyncRecord]);
    });

    it("should fail if GetSenderTransactions fails", async () => {
      const testError = new Error("fail");
      sdk.GetSenderTransactions.rejects(testError);

      try {
        await getActiveTransactions(requestContextMock);
      } catch (e) {
        const testChainId = Object.keys(sdks)[0];
        const expectedErrMessage = testError.message;
        expect(e.context.errors.get(testChainId.toString()).message).to.eq(expectedErrMessage);
      }
    });

    it("should fail if GetTransaction fails", async () => {
      sdk.GetSenderTransactions.resolves({
        router: {
          transactions: [{ ...transactionSubgraphMock, receivingChainId: sendingChainId }],
        },
      });
      const testError = new Error("fail");
      sdk.GetTransactionsWithRouter.rejects(testError);

      try {
        await getActiveTransactions(requestContextMock);
      } catch (e) {
        const testChainId = Object.keys(sdks)[0];
        const expectedErrMessage = testError.message;
        expect(e.context.errors.get(testChainId.toString()).message).to.eq(expectedErrMessage);
      }

      expect(
        sdk.GetSenderTransactions.calledOnceWithExactly({
          routerId: routerAddrMock,
          sendingChainId: sendingChainId,
          status: TransactionStatus.Prepared,
        }),
      ).to.be.true;
    });

    it("should work if subgraph is out of sync", async () => {
      // NOTE: This will ultimately just call our fake function defined in the beforeEach; but it ensures that
      // we will return an out of sync subgraph sync record.
      const testCurrentBlockNumber = 10000;
      txServiceMock.getBlockNumber.resolves(100);
      sdk.GetBlockNumber.resolves({ _meta: { block: { number: testCurrentBlockNumber - TEST_SUBGRAPH_MAX_LAG - 1 } } });

      sdk.GetSenderTransactions.resolves({
        router: {
          transactions: [transactionSubgraphMock],
        },
      });

      const res = await getActiveTransactions();
      const { invariant, sending } = sdkSenderTransactionToCrosschainTransaction(transactionSubgraphMock);

      expect(res[0].crosschainTx.invariant).to.include(invariant);
      expect(res[0].crosschainTx.sending).to.include(sending);
      expect(res[0].status).to.be.eq(CrosschainTransactionStatus.ReceiverNotConfigured);

      expect(
        sdk.GetSenderTransactions.calledOnceWithExactly({
          routerId: routerAddrMock,
          sendingChainId: sendingChainId,
          status: TransactionStatus.Prepared,
        }),
      ).to.be.true;
    });

    it("should handle ReceiverExpired", async () => {
      const _sdks = {
        ...sdks,
        [receivingChainId]: fallbackSubgraph,
      };
      getSdkStub.returns(_sdks as any);
      sdk.GetSenderTransactions.callsFake(() => {
        return {
          router: {
            transactions: [transactionSubgraphMock],
          },
        };
      });
      sdk.GetTransactionsWithRouter.onCall(0).callsFake(async ({ transactionIds }) => {
        const expectedId = transactionSubgraphMock.transactionId.toLowerCase();
        expect(transactionIds).to.deep.eq([expectedId]);
        return {
          transactions: [
            {
              ...transactionSubgraphMock,
              expiry: (await getNtpTimeSeconds()) - 10,
              status: TransactionStatus.Prepared,
            },
          ],
        };
      });

      const res = await getActiveTransactions();
      expect(res[0].status).to.be.eq(CrosschainTransactionStatus.ReceiverExpired);
    });

    it("should handle ReceiverCancelled", async () => {
      const _sdks = {
        ...sdks,
        [receivingChainId]: fallbackSubgraph,
      };
      getSdkStub.returns(_sdks as any);
      sdk.GetSenderTransactions.callsFake(() => {
        return {
          router: {
            transactions: [transactionSubgraphMock],
          },
        };
      });
      sdk.GetTransactionsWithRouter.onCall(0).callsFake(async ({ transactionIds }) => {
        const expectedId = transactionSubgraphMock.transactionId.toLowerCase();
        expect(transactionIds).to.deep.eq([expectedId]);
        return {
          transactions: [
            {
              ...transactionSubgraphMock,
              status: TransactionStatus.Cancelled,
            },
          ],
        };
      });

      const res = await getActiveTransactions();
      expect(res[0].status).to.be.eq(CrosschainTransactionStatus.ReceiverCancelled);
    });

    it("should handle ReceiverFulfilled", async () => {
      const _sdks = {
        ...sdks,
        [receivingChainId]: fallbackSubgraph,
      };
      getSdkStub.returns(_sdks as any);
      sdk.GetSenderTransactions.callsFake(() => {
        return {
          router: {
            transactions: [transactionSubgraphMock],
          },
        };
      });
      sdk.GetTransactionsWithRouter.onCall(0).callsFake(async ({ transactionIds }) => {
        const expectedId = transactionSubgraphMock.transactionId.toLowerCase();
        expect(transactionIds).to.deep.eq([expectedId]);
        return {
          transactions: [
            {
              ...transactionSubgraphMock,
              status: TransactionStatus.Fulfilled,
            },
          ],
        };
      });

      const res = await getActiveTransactions();
      expect(res[0].status).to.be.eq(CrosschainTransactionStatus.ReceiverFulfilled);
    });

    it("should work if status ReceiverNotConfigured", async () => {
      sdk.GetSenderTransactions.resolves({
        router: {
          transactions: [transactionSubgraphMock],
        },
      });

      const res = await getActiveTransactions();
      const { invariant, sending } = sdkSenderTransactionToCrosschainTransaction(transactionSubgraphMock);

      expect(res[0].crosschainTx.invariant).to.include(invariant);
      expect(res[0].crosschainTx.sending).to.include(sending);
      expect(res[0].status).to.be.eq(CrosschainTransactionStatus.ReceiverNotConfigured);

      expect(
        sdk.GetSenderTransactions.calledOnceWithExactly({
          routerId: routerAddrMock,
          sendingChainId: sendingChainId,
          status: TransactionStatus.Prepared,
        }),
      ).to.be.true;
    });

    it("should throw if all chains throw errors", async () => {
      const _sdks = {
        ...sdks,
        [receivingChainId]: fallbackSubgraph,
      };
      getSdkStub.returns(_sdks as any);
      sdk.GetSenderTransactions.rejects(new Error("fail"));
      await expect(getActiveTransactions()).to.be.rejectedWith(GET_ACTIVE_TX_FAILED);
    });
  });

  describe("#getTransactionForChain", () => {
    it("should work", async () => {
      const transaction = transactionSubgraphMock;
      const transactionId = transaction.transactionId;
      const user = transaction.user.id;

      sdk.GetTransaction.resolves({ transaction });
      getSdkStub.returns(sdks);

      const result = await getTransactionForChain(transactionId, user, sendingChainId);
      expect(result).to.containSubset({
        txData: {
          ...transaction,
          sendingChainId: parseInt(transaction.sendingChainId),
          receivingChainId: parseInt(transaction.receivingChainId),
          expiry: parseInt(transaction.expiry),
          preparedBlockNumber: parseInt(transaction.preparedBlockNumber),
          user,
          router: transaction.router.id,
        },
      });
    });

    it("should return undefined if it does not exist", async () => {
      const transactionId = mkAddress("0xa");
      const user = mkAddress("0xbbb");

      sdk.GetTransaction.resolves({ transaction: null });
      getSdkStub.returns(sdks);

      const result = await getTransactionForChain(transactionId, user, sendingChainId);
      expect(result).to.be.undefined;
      expect(
        sdk.GetTransaction.calledOnceWithExactly({
          transactionId: `${transactionId}-${user}-${routerAddrMock}`,
        }),
      ).to.be.true;
    });

    it("should throw if sdk throws", async () => {
      const transactionId = mkAddress("0xa");
      const user = mkAddress("0xbbb");

      sdk.GetTransaction.rejects(new Error("fail"));

      await expect(getTransactionForChain(transactionId, user, sendingChainId)).to.be.rejectedWith("fail");
    });

    it("should throw if there is no sdk", async () => {
      const transactionId = mkAddress("0xa");
      const user = mkAddress("0xbbb");
      sdks[sendingChainId] = undefined;
      getSdkStub.returns(sdks);

      await expect(getTransactionForChain(transactionId, user, sendingChainId)).to.be.rejectedWith(
        (new ContractReaderNotAvailableForChain(sendingChainId) as any).message,
      );
    });
  });

  describe("#getAssetBalance", () => {
    it("should work", async () => {
      const assetId = mkAddress("0xa");
      const amount = "1000";
      sdk.GetAssetBalance.resolves({ assetBalance: { amount } });
      getSdkStub.returns(sdks);

      const result = await getAssetBalance(assetId, sendingChainId);
      expect(result.eq(amount)).to.be.true;
      expect(sdk.GetAssetBalance.calledOnceWithExactly({ assetBalanceId: `${assetId}-${routerAddrMock}` }));
    });

    it("should throw if there is no sdk", async () => {
      const assetId = mkAddress("0xa");
      sdks[sendingChainId] = undefined;
      getSdkStub.returns(sdks);

      await expect(getAssetBalance(assetId, sendingChainId)).to.be.rejectedWith(
        (new ContractReaderNotAvailableForChain(sendingChainId) as any).message,
      );
    });
  });

  describe("#getAssetBalances", () => {
    it("should work", async () => {
      const assetId = mkAddress("0xa");
      const amount = "1000";
      sdk.GetAssetBalances.resolves({ assetBalances: [{ assetId, amount }] });
      getSdkStub.returns(sdks);

      const result = await getAssetBalances(sendingChainId);
      expect(result[0].amount.eq(amount)).to.be.true;
      expect(sdk.GetAssetBalances.calledOnceWithExactly({ routerId: `${routerAddrMock}` }));
    });

    it("should throw if there is no sdk", async () => {
      sdks[sendingChainId] = undefined;
      getSdkStub.returns(sdks);

      await expect(getAssetBalances(sendingChainId)).to.be.rejectedWith(
        (new ContractReaderNotAvailableForChain(sendingChainId) as any).message,
      );
    });
  });

  describe("#getExpressiveAssetBalances", () => {
    it("should work", async () => {
      const assetId = mkAddress("0xa");
      const amount = "1000";
      sdk.GetExpressiveAssetBalances.resolves({
        assetBalances: [
          {
            assetId: assetId,
            amount: amount,
            supplied: "0",
            locked: "0",
            removed: "0",
          },
        ],
      });
      getAnalyticsSdksStub.returns(sdks);

      const result = await getExpressiveAssetBalances(sendingChainId);
      expect(result[0].amount.eq(amount)).to.be.true;
      expect(
        sdk.GetExpressiveAssetBalances.calledOnceWithExactly({
          routerId: `${routerAddrMock.toLowerCase()}`,
        }),
      );
    });

    it("should lower case router address", async () => {
      ctxMock.routerAddress = routerAddrMock.toUpperCase();
      sdk.GetExpressiveAssetBalances.resolves({ assetBalances: [] });
      const ret = await getExpressiveAssetBalances(sendingChainId);
      expect(ret).to.be.deep.eq(ret);
      expect(
        sdk.GetExpressiveAssetBalances.calledOnceWithExactly({
          routerId: `${routerAddrMock.toLowerCase()}`,
        }),
      );
    });

    it("should throw if there is no sdk", async () => {
      sdks[sendingChainId] = undefined;
      getAnalyticsSdksStub.returns(sdks);

      await expect(getExpressiveAssetBalances(sendingChainId)).to.be.rejectedWith(
        (new ContractReaderNotAvailableForChain(sendingChainId) as any).message,
      );
    });
  });
});
