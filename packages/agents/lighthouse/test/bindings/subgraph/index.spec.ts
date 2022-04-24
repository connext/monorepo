import { SinonStub, stub, restore, reset } from "sinon";
import { expect, XTransferStatus, delay } from "@connext/nxtp-utils";

import * as bindSubgraphFns from "../../../src/bindings/subgraph/index";
import { mock, stubContext } from "../../mock";
import * as SharedFns from "../../../src/lib/helpers/shared";

describe("Bindings:Subgraph", () => {
  let mockContext: any;
  let getSubgraphHealthStub: SinonStub;

  beforeEach(() => {
    mockContext = stubContext();
    stub(SharedFns, "getSubgraphName").returns("mockSubgraph");
    getSubgraphHealthStub = stub(SharedFns, "getSubgraphHealth");
  });

  afterEach(() => {
    restore();
    reset();
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
      bindSubgraphFns.bindSubgraph(10);
      await delay(20);
      mockContext.config.mode.cleanup = true;
      expect(pollStub.callCount).to.be.gte(1);
    });
  });

  describe("#pollSubgraph", () => {
    it("happy: should retrieve xcalls from the subgraph and cache them", async () => {
      getSubgraphHealthStub.resolves({
        chainHeadBlock: 1234567,
        latestBlock: 1234567,
        lastHealthyBlock: 100,
        network: "mocknet",
        fatalError: undefined,
        health: "healthy",
        synced: true,
        url: "https://example.com",
      });
      const mockInfo = {
        [mock.chain.A]: {
          latestBlockNumber: 1234567,
          latestNonce: 232323,
          safeConfirmations: 19,
        },
        [mock.chain.B]: {
          latestBlockNumber: 1234567,
          latestNonce: 454545,
          safeConfirmations: 28,
        },
      };

      mockContext.adapters.cache.transfers.getLatestNonce.callsFake((domain: string) => mockInfo[domain].latestNonce);
      mockContext.config.chains[mock.chain.A].confirmations = mockInfo[mock.chain.A].safeConfirmations;
      mockContext.config.chains[mock.chain.B].confirmations = mockInfo[mock.chain.B].safeConfirmations;
      const mockSubgraphResponse = [
        mock.entity.xtransfer(mock.chain.A, mock.chain.B, undefined, XTransferStatus.XCalled),
        mock.entity.xtransfer(mock.chain.B, mock.chain.A, undefined, XTransferStatus.XCalled),
      ];
      mockContext.adapters.subgraph.getTransactionsWithStatuses.resolves(mockSubgraphResponse);

      await bindSubgraphFns.pollSubgraph();

      // Should have been called once per available/configured chain.
      expect(mockContext.adapters.cache.transfers.getLatestNonce.callCount).to.be.eq(Object.keys(mockInfo).length);
      expect(mockContext.adapters.subgraph.getTransactionsWithStatuses.getCall(0).args[0]).to.be.deep.eq(
        new Map(
          Object.entries({
            [mock.chain.A]: {
              maxBlockNumber: mockInfo[mock.chain.A].latestBlockNumber - mockInfo[mock.chain.A].safeConfirmations,
              latestNonce: mockInfo[mock.chain.A].latestNonce + 1,
            },
            [mock.chain.B]: {
              maxBlockNumber: mockInfo[mock.chain.B].latestBlockNumber - mockInfo[mock.chain.B].safeConfirmations,
              latestNonce: mockInfo[mock.chain.B].latestNonce + 1,
            },
          }),
        ),
      );
      expect(mockContext.adapters.cache.transfers.storeTransfers.getCall(0).args[0]).to.be.deep.eq(
        mockSubgraphResponse,
      );
    });

    it("happy: should read DEFAULT_SAFE_CONFIRMATIONS if `confirmation` doesn't exist", async () => {
      getSubgraphHealthStub.resolves({
        chainHeadBlock: 1234567,
        latestBlock: 1234567,
        lastHealthyBlock: 100,
        network: "mocknet",
        fatalError: undefined,
        health: "healthy",
        synced: true,
        url: "https://example.com",
      });
      const mockInfo = {
        [mock.chain.A]: {
          latestBlockNumber: 1234567,
          latestNonce: 232323,
        },
        [mock.chain.B]: {
          latestBlockNumber: 1234567,
          latestNonce: 454545,
        },
      };

      mockContext.adapters.cache.transfers.getLatestNonce.callsFake((domain: string) => mockInfo[domain].latestNonce);
      mockContext.config.chains[mock.chain.A].confirmations = null;
      mockContext.config.chains[mock.chain.B].confirmations = null;
      const mockSubgraphResponse = [
        mock.entity.xtransfer(mock.chain.A, mock.chain.B, undefined, XTransferStatus.XCalled),
        mock.entity.xtransfer(mock.chain.B, mock.chain.A, undefined, XTransferStatus.XCalled),
      ];
      mockContext.adapters.subgraph.getTransactionsWithStatuses.resolves(mockSubgraphResponse);

      await bindSubgraphFns.pollSubgraph();

      // Should have been called once per available/configured chain.
      expect(mockContext.adapters.cache.transfers.getLatestNonce.callCount).to.be.eq(Object.keys(mockInfo).length);
      expect(mockContext.adapters.subgraph.getTransactionsWithStatuses.getCall(0).args[0]).to.be.deep.eq(
        new Map(
          Object.entries({
            [mock.chain.A]: {
              maxBlockNumber: mockInfo[mock.chain.A].latestBlockNumber - bindSubgraphFns.DEFAULT_SAFE_CONFIRMATIONS,
              latestNonce: mockInfo[mock.chain.A].latestNonce + 1,
            },
            [mock.chain.B]: {
              maxBlockNumber: mockInfo[mock.chain.B].latestBlockNumber - bindSubgraphFns.DEFAULT_SAFE_CONFIRMATIONS,
              latestNonce: mockInfo[mock.chain.B].latestNonce + 1,
            },
          }),
        ),
      );
      expect(mockContext.adapters.cache.transfers.storeTransfers.getCall(0).args[0]).to.be.deep.eq(
        mockSubgraphResponse,
      );
    });

    it("should not retrieve xcalls from the subgraph if health check fails", async () => {
      getSubgraphHealthStub.resolves({
        chainHeadBlock: 0,
        latestBlock: 0,
        lastHealthyBlock: 0,
        network: "mocknet",
        fatalError: undefined,
        health: "healthy",
        synced: true,
        url: "https://example.com",
      });

      const mockInfo = {
        [mock.chain.A]: {
          latestBlockNumber: 0,
          latestNonce: 232323,
          safeConfirmations: 19,
        },
        [mock.chain.B]: {
          latestBlockNumber: 0,
          latestNonce: 454545,
          safeConfirmations: 28,
        },
      };

      mockContext.adapters.cache.transfers.getLatestNonce.callsFake((domain: string) => mockInfo[domain].latestNonce);
      mockContext.config.chains[mock.chain.A].confirmations = mockInfo[mock.chain.A].safeConfirmations;
      mockContext.config.chains[mock.chain.B].confirmations = mockInfo[mock.chain.B].safeConfirmations;
      const mockSubgraphResponse = [
        mock.entity.xtransfer(mock.chain.A, mock.chain.B, undefined, XTransferStatus.XCalled),
        mock.entity.xtransfer(mock.chain.B, mock.chain.A, undefined, XTransferStatus.XCalled),
      ];
      mockContext.adapters.subgraph.getTransactionsWithStatuses.resolves(mockSubgraphResponse);

      await bindSubgraphFns.pollSubgraph();

      expect(mockContext.adapters.cache.transfers.getLatestNonce.callCount).to.be.eq(0);
      expect(mockContext.adapters.subgraph.getTransactionsWithStatuses.callCount).to.be.eq(0);
      expect(mockContext.adapters.cache.transfers.storeTransfers.callCount).to.be.eq(0);
    });

    it("should throw an error", async () => {
      getSubgraphHealthStub.resolves({
        chainHeadBlock: 1234567,
        latestBlock: 1234567,
        lastHealthyBlock: 100,
        network: "mocknet",
        fatalError: undefined,
        health: "healthy",
        synced: true,
        url: "https://example.com",
      });

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
      mockContext.adapters.cache.transfers.getLatestNonce.callsFake((domain: string) => mockInfo[domain].latestNonce);
      mockContext.config.chains[mock.chain.A].confirmations = mockInfo[mock.chain.A].safeConfirmations;
      mockContext.config.chains[mock.chain.B].confirmations = mockInfo[mock.chain.B].safeConfirmations;
      mockContext.adapters.subgraph.getTransactionsWithStatuses.throws(
        new Error("getTransactionsWithStatuses failed!"),
      );

      await bindSubgraphFns.pollSubgraph();

      expect(mockContext.adapters.cache.transfers.storeTransfers.callCount).to.be.eq(0);
    });
  });
});
