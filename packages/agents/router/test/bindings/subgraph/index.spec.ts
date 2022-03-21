import { SinonStub, stub } from "sinon";
import { expect } from "chai";
import { CrossChainTxStatus, delay } from "@connext/nxtp-utils";

import * as bindSubgraphFns from "../../../src/bindings/subgraph/index";
import { mock, stubContext } from "../../mock";

describe("SubgraphBinding", () => {
  let mockContext: any;

  beforeEach(() => {
    mockContext = stubContext();
  });

  describe("#bindSubgraph", async () => {
    let pollStub: SinonStub;
    before(() => {
      pollStub = stub(bindSubgraphFns, "pollSubgraph").resolves();
    });

    after(() => {
      pollStub.restore();
    });

    it("should start an interval loop that calls polling fn", async () => {
      let done = false;
      // Override the poll interval to 10ms so we can test the interval loop
      bindSubgraphFns.bindSubgraph(10, () => done);
      // TODO: slight race here?
      await delay(20);
      expect(pollStub.callCount).to.be.gte(1);
      done = true;
      await delay(30);
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
      mockContext.adapters.txservice.getBlockNumber.callsFake((domain: string) => {
        return mockInfo[domain].latestBlockNumber;
      });
      mockContext.adapters.cache.transactions.getLatestNonce.callsFake(
        (domain: string) => mockInfo[domain].latestNonce,
      );
      mockContext.config.chains[mock.chain.A].confirmations = mockInfo[mock.chain.A].safeConfirmations;
      mockContext.config.chains[mock.chain.B].confirmations = mockInfo[mock.chain.B].safeConfirmations;
      const mockSubgraphResponse = [
        mock.entity.crossChainTx(mock.chain.A, mock.chain.B, undefined, CrossChainTxStatus.Prepared),
        mock.entity.crossChainTx(mock.chain.B, mock.chain.A, undefined, CrossChainTxStatus.Prepared),
      ];
      mockContext.adapters.subgraph.getPreparedTransactions.resolves(mockSubgraphResponse);

      await bindSubgraphFns.pollSubgraph();
      // Should have been called once per available/configured chain.
      expect(mockContext.adapters.txservice.getBlockNumber.callCount).to.be.eq(Object.keys(mockInfo).length);
      expect(mockContext.adapters.cache.transactions.getLatestNonce.callCount).to.be.eq(Object.keys(mockInfo).length);
      expect(mockContext.adapters.subgraph.getPreparedTransactions.getCall(0).args[0]).to.be.deep.eq(
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
      expect(mockContext.adapters.cache.transactions.storeTxData.getCall(0).args[0]).to.be.deep.eq(
        mockSubgraphResponse,
      );
    });
  });
});
