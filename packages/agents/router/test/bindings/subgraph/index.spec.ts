import { stub } from "sinon";
import { expect } from "chai";
import { CrossChainTxStatus } from "@connext/nxtp-utils";

import * as bindSubgraphFns from "../../../src/bindings/subgraph/index";
import { mock, stubContext } from "../../mock";

describe("SubgraphBinding", () => {
  const mockContext = stubContext();

  beforeEach(() => {});

  describe("#bindSubgraph", async () => {
    it("should start an interval loop that calls polling fn", async () => {
      const pollStub = stub(bindSubgraphFns, "pollSubgraph").resolves();
      // Override the poll interval to 10ms so we can test the interval loop
      bindSubgraphFns.bindSubgraph(10);
      await expect(pollStub.callCount).to.eventually.be.gte(1);
    });
  });

  describe("#pollSubgraph", () => {
    it("happy: should retrieve prepared transactions from the subgraph and cache them", async () => {
      const mockInfo = {
        [mock.chain.A]: {
          latestBlockNumber: 1234567,
          latestNonce: 232323,
          safeConfirmations: 19,
        },
        [mock.chain.B]: {
          latestBlockNumber: 7654321,
          latestNonce: 454545,
          safeConfirmations: 28,
        },
      };
      mockContext.adapters.txservice.getBlockNumber = stub().callsFake(
        (domain: string) => mockInfo[domain].latestBlockNumber,
      );
      mockContext.adapters.cache.transactions.getLatestNonce = stub().callsFake(
        (domain: string) => mockInfo[domain].latestNonce,
      );
      mockContext.config.chains[mock.chain.A].confirmations = mockInfo[mock.chain.A].safeConfirmations;
      mockContext.config.chains[mock.chain.B].confirmations = mockInfo[mock.chain.B].safeConfirmations;
      const mockSubgraphResponse = [
        mock.entity.crossChainTx(mock.chain.A, mock.chain.B, undefined, CrossChainTxStatus.Prepared),
        mock.entity.crossChainTx(mock.chain.B, mock.chain.A, undefined, CrossChainTxStatus.Prepared),
      ];
      mockContext.adapters.subgraph.getPreparedTransactions = stub().resolves(mockSubgraphResponse);

      await bindSubgraphFns.pollSubgraph();
      expect(mockContext.adapters.txservice.getBlockNumber).to.have.been.calledOnce;
      expect(mockContext.adapters.cache.transactions.getLatestNonce).to.have.been.calledOnce;
      expect(mockContext.adapters.subgraph.getPreparedTransactions).to.have.been.calledOnceWithExactly(
        new Map(
          Object.entries({
            [mock.chain.A]: {
              maxPrepareBlockNumber:
                mockInfo[mock.chain.A].latestBlockNumber - mockInfo[mock.chain.A].safeConfirmations,
              latestNonce: mockInfo[mock.chain.A].latestNonce + 1,
            },
            [mock.chain.B]: {
              maxPrepareBlockNumber:
                mockInfo[mock.chain.B].latestBlockNumber - mockInfo[mock.chain.B].safeConfirmations,
              latestNonce: mockInfo[mock.chain.B].latestNonce + 1,
            },
          }),
        ),
      );
      expect(mockContext.adapters.cache.transactions.storeTxData).to.have.been.calledOnceWithExactly(
        mockSubgraphResponse,
      );
    });
  });
});
