import {
  expect,
  FallbackSubgraph,
  mkAddress,
  requestContextMock,
  SubgraphSyncRecord,
  transactionSubgraphMock,
  txDataMock,
} from "@connext/nxtp-utils";
import { constants } from "ethers";
import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import * as subgraphAdapter from "../../../src/adapters/subgraph";
import { TransactionStatus } from "../../../src/adapters/subgraph/graphqlsdk";
import {
  getActiveTransactions,
  getAssetBalance,
  getSyncRecord,
  getTransactionForChain,
  sdkSenderTransactionToCrosschainTransaction,
} from "../../../src/adapters/subgraph/subgraph";
import { CrosschainTransactionStatus } from "../../../src/lib/entities";
import { ContractReaderNotAvailableForChain } from "../../../src/lib/errors";
import { ctxMock, txServiceMock } from "../../globalTestHook";
import { configMock, routerAddrMock } from "../../utils";

type SdkMock = {
  GetReceiverTransactions: SinonStub;
  GetSenderTransactions: SinonStub;
  GetTransactions: SinonStub;
  GetTransaction: SinonStub;
  GetAssetBalance: SinonStub;
  GetBlockNumber: SinonStub;
};

let sdks: Record<number, SinonStubbedInstance<FallbackSubgraph<SdkMock>>>;
let fallbackSubgraph: SinonStubbedInstance<FallbackSubgraph<SdkMock>>;
let sdk: SdkMock;

let getSdkStub: SinonStub;

const GET_ACTIVE_TX_FAILED = "Failed to get active transactions for all chains";
const TEST_SUBGRAPH_MAX_LAG = 10;

describe("Subgraph Adapter", () => {
  const sendingChainId = txDataMock.sendingChainId;
  const receivingChainId = txDataMock.receivingChainId;
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
      GetBlockNumber: stub().resolves({ _meta: { block: { number: 10000 } } }),
    };

    txServiceMock.getBlockNumber.resolves(10000);

    fallbackSubgraph = createStubInstance(FallbackSubgraph, {
      useSynced: stub<[method: (client: any) => Promise<any>]>().callsFake((method) => method(sdk)),
      sync: stub<[latestBlock: number]>().callsFake(async (latestBlock: number): Promise<SubgraphSyncRecord[]> => {
        // The GetBlockNumber call is normally nested in the fallback subgraph in this case - we reimplement here to avoid using
        // actual fallback subgraph, but to emulate the same behavior.
        const { _meta } = await sdk.GetBlockNumber();
        const syncedBlock = _meta?.block.number ?? 0;
        const synced = latestBlock - syncedBlock <= TEST_SUBGRAPH_MAX_LAG;
        return [
          {
            synced,
            latestBlock,
            syncedBlock,
            lag: latestBlock - syncedBlock,
            uri: "",
          },
        ];
      }),
    });

    sdks = {
      [sendingChainId]: fallbackSubgraph,
    };

    getSdkStub = stub(subgraphAdapter, "getSdks").returns(sdks as any);
    config = {
      ...configMock,
    };
    ctxMock.config = config;
  });

  describe("getSyncRecord", () => {
    it("should work", async () => {
      sdk.GetBlockNumber.resolves({ _meta: { block: { number: 10 } } });
      txServiceMock.getBlockNumber.resolves(10);
      expect(await getSyncRecord(sendingChainId)).to.be.deep.eq([
        {
          synced: true,
          syncedBlock: 10,
          latestBlock: 10,
          lag: 0,
          uri: "",
        },
      ]);
    });
  });

  describe("getActiveTransactions", () => {
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
      const _sdks = {
        [9876]: sdks[sendingChainId],
      };
      getSdkStub.returns(_sdks as any);

      await expect(getActiveTransactions()).to.be.rejectedWith("No chain config");
    });

    it("should return an empty array if the chain is unsynced", async () => {
      const testLatestBlockNumber = 10000;
      const testSyncedBlockNumber = 1;
      const testLag = testLatestBlockNumber - testSyncedBlockNumber;
      sdk.GetBlockNumber.resolves({ _meta: { block: { number: testSyncedBlockNumber } } });
      txServiceMock.getBlockNumber.resolves(testLatestBlockNumber);
      expect(await getActiveTransactions()).to.be.deep.eq([]);
      expect(await getSyncRecord(sendingChainId)).to.be.deep.eq([
        { synced: false, syncedBlock: 1, latestBlock: testLatestBlockNumber, lag: testLag, uri: "" },
      ]);
    });

    it("should return an empty array if GetBlockNumber fails", async () => {
      sdk.GetBlockNumber.rejects("fail");
      expect(await getActiveTransactions()).to.be.deep.eq([]);
    });

    it("should return an empty array if txService.getBlockNumber fails", async () => {
      txServiceMock.getBlockNumber.rejects("fail");
      expect(await getActiveTransactions()).to.be.deep.eq([]);
    });

    it("should fail if GetSenderTransactions fails", async () => {
      sdk.GetSenderTransactions.rejects(new Error("fail"));

      await expect(getActiveTransactions()).to.be.rejectedWith("fail");
    });

    it("should fail if GetTransaction fails", async () => {
      sdk.GetSenderTransactions.resolves({
        router: {
          transactions: [{ ...transactionSubgraphMock, receivingChainId: sendingChainId }],
        },
      });

      sdk.GetTransactions.rejects(new Error("fail"));

      await expect(getActiveTransactions()).to.be.rejectedWith("fail");

      expect(
        sdk.GetSenderTransactions.calledOnceWithExactly({
          routerId: routerAddrMock,
          sendingChainId: sendingChainId,
          status: TransactionStatus.Prepared,
        }),
      ).to.be.true;
    });

    it.only("should return an empty array if subgraph is out of sync", async () => {
      // NOTE: This will ultimately just call our fake function defined in the beforeEach; but it ensures that
      // we will return an out of sync subgraph sync record.
      const testCurrentBlockNumber = 10000;
      txServiceMock.getBlockNumber.resolves(testCurrentBlockNumber);
      sdk.GetBlockNumber.resolves({ _meta: { block: { number: testCurrentBlockNumber - TEST_SUBGRAPH_MAX_LAG * 2 } } });

      sdk.GetSenderTransactions.resolves({
        router: {
          transactions: [transactionSubgraphMock],
        },
      });

      const res = await getActiveTransactions();
      expect(res).to.be.deep.eq([]);
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

  describe("getTransactionForChain", () => {
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

  describe("getAssetBalance", () => {
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
});
