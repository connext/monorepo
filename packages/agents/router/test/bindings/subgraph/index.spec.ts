import { SinonStub, stub } from "sinon";
import { expect } from "chai";
import { XTransferStatus, delay } from "@connext/nxtp-utils";

import * as bindSubgraphFns from "../../../src/bindings/subgraph/index";
import { mock, stubContext } from "../../mock";

describe("Bindings:Subgraph", () => {
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

    it("happy: should start an interval loop that calls polling fn", async () => {
      // Override the poll interval to 10ms so we can test the interval loop
      bindSubgraphFns.bindSubgraph(10);
      // TODO: slight race here?
      await delay(20);
      mockContext.config.mode.cleanup = true;
      await delay(10);
      expect(pollStub.callCount).to.be.gte(1);
    });
    it("happy: should read default interval", async () => {
      bindSubgraphFns.SUBGRAPH_POLL_INTERVAL = 10;
      bindSubgraphFns.bindSubgraph();
      await delay(20);
      mockContext.config.mode.cleanup = true;
      expect(pollStub.callCount).to.be.gte(1);
    });
  });

  describe("#pollSubgraph", () => {
    it("happy: should retrieve xcalls from the subgraph and cache them", async () => {
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
        mock.entity.xtransfer(mock.chain.A, mock.chain.B, undefined, XTransferStatus.XCalled),
        mock.entity.xtransfer(mock.chain.B, mock.chain.A, undefined, XTransferStatus.XCalled),
      ];
      mockContext.adapters.subgraph.getXCalls.resolves(mockSubgraphResponse);

      await bindSubgraphFns.pollSubgraph();
      // Should have been called once per available/configured chain.
      expect(mockContext.adapters.txservice.getBlockNumber.callCount).to.be.eq(Object.keys(mockInfo).length);
      expect(mockContext.adapters.cache.transactions.getLatestNonce.callCount).to.be.eq(Object.keys(mockInfo).length);
      expect(mockContext.adapters.subgraph.getXCalls.getCall(0).args[0]).to.be.deep.eq(
        new Map(
          Object.entries({
            [mock.chain.A]: {
              maxXCallBlockNumber: mockInfo[mock.chain.A].latestBlockNumber - mockInfo[mock.chain.A].safeConfirmations,
              latestNonce: mockInfo[mock.chain.A].latestNonce + 1,
            },
            [mock.chain.B]: {
              maxXCallBlockNumber: mockInfo[mock.chain.B].latestBlockNumber - mockInfo[mock.chain.B].safeConfirmations,
              latestNonce: mockInfo[mock.chain.B].latestNonce + 1,
            },
          }),
        ),
      );
      expect(mockContext.adapters.cache.transactions.storeTxData.getCall(0).args[0]).to.be.deep.eq(
        mockSubgraphResponse,
      );
    });
    it("should throw an error", async () => {
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
      mockContext.adapters.subgraph.getXCalls.throws(new Error("getXCalls failed!"));

      await bindSubgraphFns.pollSubgraph();

      expect(mockContext.adapters.cache.transactions.storeTxData.callCount).to.be.eq(0);
    });
  });
});
