import { expect, mkBytes32, OriginTransfer, DestinationTransfer } from "@connext/nxtp-utils";

import { mock } from "../../mock";
import { mockPubContext } from "../../globalTestHook";
import { retryXCalls } from "../../../src/tasks/publisher/operations/retryXCalls";
import { SinonStub } from "sinon";
const mockInfo = {
  [mock.domain.A]: {
    latestBlockNumber: 1234567,
    latestNonce: 232323,
    safeConfirmations: 19,
  },
  [mock.domain.B]: {
    latestBlockNumber: 1234567,
    latestNonce: 454545,
    safeConfirmations: 28,
  },
};
const mockBlockNumber: Map<string, number> = new Map();

describe("Operations:retryXCalls", () => {
  let mockOriginSubgraphResponse: OriginTransfer[];
  let mockDestSubgraphResponse: DestinationTransfer[];
  let domainCount = 0;

  describe("#retryXCalls", () => {
    beforeEach(() => {
      mockBlockNumber.set(mock.domain.A, 1234567);
      mockBlockNumber.set(mock.domain.B, 1234567);

      (mockPubContext.adapters.cache.transfers.getLatestNonce as SinonStub).callsFake(
        (domain: string) => mockInfo[domain].latestNonce,
      );
      mockPubContext.config.chains[mock.domain.A].confirmations = mockInfo[mock.domain.A].safeConfirmations;
      mockPubContext.config.chains[mock.domain.B].confirmations = mockInfo[mock.domain.B].safeConfirmations;
      mockOriginSubgraphResponse = [
        mock.entity.xtransfer({ transferId: mkBytes32("0x1"), nonce: 9 }) as OriginTransfer,
        mock.entity.xtransfer({ transferId: mkBytes32("0x2"), nonce: 10 }) as OriginTransfer,
      ];
      mockDestSubgraphResponse = [
        mock.entity.xtransfer({ transferId: mkBytes32("0x1"), nonce: 9 }) as DestinationTransfer,
        mock.entity.xtransfer({ transferId: mkBytes32("0x2"), nonce: 10 }) as DestinationTransfer,
      ];
      (mockPubContext.adapters.subgraph.getLatestBlockNumber as SinonStub).resolves(mockBlockNumber);
      (mockPubContext.adapters.subgraph.getDestinationTransfers as SinonStub).resolves(mockDestSubgraphResponse);
      (mockPubContext.adapters.subgraph.getOriginTransfersByDomain as SinonStub).resolves(mockDestSubgraphResponse);
      (mockPubContext.adapters.cache.transfers.getPending as SinonStub).callsFake((domain: string) => [
        mockOriginSubgraphResponse[0].transferId,
        mockOriginSubgraphResponse[1].transferId,
      ]);
      (mockPubContext.adapters.cache.transfers.getTransfer as SinonStub).callsFake((transferId: string) =>
        mockOriginSubgraphResponse.filter((transfer) => transfer.transferId === transferId),
      );
      domainCount = Object.keys(mock.domain).length;
    });

    it("happy: should retry xcalls from the cache and publish them", async () => {
      (mockPubContext.adapters.subgraph.getDestinationTransfers as SinonStub).resolves([]);
      await retryXCalls();

      // Should have been called once per available/configured chain.
      expect((mockPubContext.adapters.cache.transfers.getTransfer as SinonStub).callCount).to.be.eq(
        mockOriginSubgraphResponse.length * domainCount,
      );
      expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(
        mockOriginSubgraphResponse.length * domainCount,
      );
      expect((mockPubContext.adapters.mqClient.publish as SinonStub).calledWithExactly(mockOriginSubgraphResponse[0]));
      expect((mockPubContext.adapters.mqClient.publish as SinonStub).calledWithExactly(mockOriginSubgraphResponse[1]));
      expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).calledWithExactly(mock.domain.A, 9));
      expect(
        (mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).calledWithExactly(mock.domain.A, 10),
      );
    });

    it("should not publish if nothing is pending", async () => {
      await retryXCalls();

      expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(0);
      expect((mockPubContext.adapters.cache.transfers.getTransfer as SinonStub).callCount).to.be.eq(
        mockOriginSubgraphResponse.length * domainCount,
      );
    });

    it("should work with block number error", async () => {
      mockBlockNumber.set(mock.domain.A, 0);
      mockBlockNumber.set(mock.domain.B, 0);

      await expect(retryXCalls()).to.be.fulfilled;

      expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(0);
      expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).callCount).to.be.eq(0);
      expect((mockPubContext.adapters.cache.transfers.getTransfer as SinonStub).callCount).to.be.eq(
        mockOriginSubgraphResponse.length * domainCount,
      );
    });

    it("should work if pending set is empty", async () => {
      (mockPubContext.adapters.cache.transfers.getPending as SinonStub).resolves([]);
      (mockPubContext.adapters.subgraph.getOriginTransfersByDomain as SinonStub).resolves([]);
      await expect(retryXCalls()).to.be.fulfilled;

      expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(0);
      expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).callCount).to.be.eq(0);
      expect((mockPubContext.adapters.cache.transfers.getTransfer as SinonStub).callCount).to.be.eq(0);
    });

    it("should work if transfers cache is empty", async () => {
      (mockPubContext.adapters.cache.transfers.getTransfer as SinonStub).resolves(undefined);
      await expect(retryXCalls()).to.be.fulfilled;

      expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(0);
      expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).callCount).to.be.eq(0);
      expect((mockPubContext.adapters.cache.transfers.getTransfer as SinonStub).callCount).to.be.eq(
        mockOriginSubgraphResponse.length * domainCount,
      );
    });
  });
});
