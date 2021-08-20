import { expect, mkAddress, transactionSubgraphMock } from "@connext/nxtp-utils";
import { constants } from "ethers";
import { reset, restore, SinonStub, stub } from "sinon";
import * as subgraphAdapter from "../../../src/adapters/subgraph";
import { TransactionStatus } from "../../../src/adapters/subgraph/graphqlsdk";
import {
  getActiveTransactions,
  getAssetBalance,
  getTransactionForChain,
} from "../../../src/adapters/subgraph/subgraph";
import { ContractReaderNotAvailableForChain } from "../../../src/lib/errors";
import { routerAddrMock } from "../../utils";

let sdks: Record<
  number,
  {
    GetSenderTransactions: SinonStub;
    GetTransactions: SinonStub;
    GetTransaction: SinonStub;
    GetAssetBalance: SinonStub;
  }
>;

let getSdkStub: SinonStub;

describe("Subgraph Adapter", () => {
  const chainId = 12345;
  afterEach(() => {
    restore();
    reset();
  });

  beforeEach(() => {
    sdks = {
      [chainId]: {
        GetSenderTransactions: stub().resolves({ router: { transactions: [] } }),
        GetTransactions: stub().resolves({ transactions: [] }),
        GetTransaction: stub().resolves(undefined),
        GetAssetBalance: stub().resolves(constants.Zero),
      },
    };

    getSdkStub = stub(subgraphAdapter, "getSdks").returns(sdks as any);
  });

  describe("getActiveTransactions", () => {
    it("should fail GetSenderTransactions fails", async () => {
      sdks[chainId].GetSenderTransactions.rejects(new Error("fail"));

      await expect(getActiveTransactions()).to.be.rejectedWith("fail");
    });

    it("should fail GetTransaction fails", async () => {
      sdks[chainId].GetSenderTransactions.resolves({
        router: {
          transactions: [{ ...transactionSubgraphMock, receivingChainId: chainId }],
        },
      });

      sdks[chainId].GetTransactions.rejects(new Error("fail"));

      await expect(getActiveTransactions()).to.be.rejectedWith("fail");

      expect(
        sdks[chainId].GetSenderTransactions.calledOnceWithExactly({
          routerId: routerAddrMock,
          sendingChainId: chainId,
          status: TransactionStatus.Prepared,
        }),
      ).to.be.true;
    });
  });

  describe("getTransactionForChain", () => {
    it("should work", async () => {
      const transaction = transactionSubgraphMock;
      const transactionId = transaction.transactionId;
      const user = transaction.user.id;

      sdks[chainId].GetTransaction.resolves({ transaction });
      getSdkStub.returns(sdks);

      const result = await getTransactionForChain(transactionId, user, chainId);
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

      sdks[chainId].GetTransaction.resolves({ transaction: null });
      getSdkStub.returns(sdks);

      const result = await getTransactionForChain(transactionId, user, chainId);
      expect(result).to.be.undefined;
      expect(
        sdks[chainId].GetTransaction.calledOnceWithExactly({
          transactionId: `${transactionId}-${user}-${routerAddrMock}`,
        }),
      ).to.be.true;
    });

    it("should throw if sdk throws", async () => {
      const transactionId = mkAddress("0xa");
      const user = mkAddress("0xbbb");

      sdks[chainId].GetTransaction.rejects(new Error("fail"));

      await expect(getTransactionForChain(transactionId, user, chainId)).to.be.rejectedWith("fail");
    });

    it("should throw if there is no sdk", async () => {
      const transactionId = mkAddress("0xa");
      const user = mkAddress("0xbbb");
      sdks[chainId] = undefined;
      getSdkStub.returns(sdks);

      await expect(getTransactionForChain(transactionId, user, chainId)).to.be.rejectedWith(
        (new ContractReaderNotAvailableForChain(chainId) as any).message,
      );
    });
  });

  describe("getAssetBalance", () => {
    it("should work", async () => {
      const assetId = mkAddress("0xa");
      const amount = "1000";
      sdks[chainId].GetAssetBalance.resolves({ assetBalance: { amount } });
      getSdkStub.returns(sdks);

      const result = await getAssetBalance(assetId, chainId);
      expect(result.eq(amount)).to.be.true;
      expect(sdks[chainId].GetAssetBalance.calledOnceWithExactly({ assetBalanceId: `${assetId}-${routerAddrMock}` }));
    });

    it("should throw if there is no sdk", async () => {
      const assetId = mkAddress("0xa");
      sdks[chainId] = undefined;
      getSdkStub.returns(sdks);

      await expect(getAssetBalance(assetId, chainId)).to.be.rejectedWith(
        (new ContractReaderNotAvailableForChain(chainId) as any).message,
      );
    });
  });
});
