import { expect, mkBytes32, OriginTransfer, XTransfer } from "@connext/nxtp-utils";

import { mock } from "../../mock";
import { mockPubContext } from "../../globalTestHook";
import { getMissingXCalls, getXCalls } from "../../../src/tasks/publisher/operations/getXCalls";
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

describe("Operations:GetXCalls", () => {
  let mockSubgraphResponse: OriginTransfer[];

  describe("#getXCalls", () => {
    beforeEach(() => {
      mockBlockNumber.set(mock.domain.A, 1234567);
      mockBlockNumber.set(mock.domain.B, 1234567);

      (mockPubContext.adapters.cache.transfers.getLatestNonce as SinonStub).callsFake(
        (domain: string) => mockInfo[domain].latestNonce,
      );
      mockPubContext.config.chains[mock.domain.A].confirmations = mockInfo[mock.domain.A].safeConfirmations;
      mockPubContext.config.chains[mock.domain.B].confirmations = mockInfo[mock.domain.B].safeConfirmations;
      mockSubgraphResponse = [
        mock.entity.xtransfer({ transferId: mkBytes32("0x1"), nonce: 9 }) as OriginTransfer,
        mock.entity.xtransfer({ transferId: mkBytes32("0x2"), nonce: 10 }) as OriginTransfer,
      ];
      (mockPubContext.adapters.subgraph.getLatestBlockNumber as SinonStub).resolves(mockBlockNumber);
      (mockPubContext.adapters.subgraph.getDestinationXCalls as SinonStub).resolves(mockSubgraphResponse);

      const xtransfer1 = mock.entity.xtransfer({
        transferId: mkBytes32("0x1"),
        nonce: 9,
        originDomain: "13337",
        destinationDomain: "13338",
      }) as OriginTransfer;
      const xtransfer2 = mock.entity.xtransfer({
        transferId: mkBytes32("0x2"),
        nonce: 10,
        originDomain: "13337",
        destinationDomain: "13338",
      }) as OriginTransfer;
      const txIdsByDestinationDomain: Map<string, string[]> = new Map();
      const allTxById: Map<string, XTransfer> = new Map();
      const latestNonces: Map<string, number> = new Map();
      const txByOriginDomain: Map<string, XTransfer[]> = new Map();
      txIdsByDestinationDomain.set("13338", [xtransfer1.transferId, xtransfer2.transferId]);
      allTxById.set(xtransfer1.transferId, xtransfer1);
      allTxById.set(xtransfer2.transferId, xtransfer2);
      txByOriginDomain.set("13337", [xtransfer1, xtransfer2]);
      latestNonces.set("13337", 10);

      (mockPubContext.adapters.subgraph.getOriginXCalls as SinonStub).resolves({
        txIdsByDestinationDomain,
        allTxById,
        latestNonces,
        txByOriginDomain,
      });
    });

    it("happy: should retrieve xcalls from the subgraph and publish them", async () => {
      await getXCalls();

      // Should have been called once per available/configured chain.
      expect((mockPubContext.adapters.cache.transfers.getLatestNonce as SinonStub).callCount).to.be.eq(
        Object.keys(mockInfo).length,
      );
      expect((mockPubContext.adapters.mqClient.publish as SinonStub).calledWithExactly(mockSubgraphResponse[0]));
      expect((mockPubContext.adapters.mqClient.publish as SinonStub).calledWithExactly(mockSubgraphResponse[1]));
      expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).calledWithExactly(mock.domain.A, 9));
      expect(
        (mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).calledWithExactly(mock.domain.A, 10),
      );
    });

    it("happy: should catch up the missing nonces from the subgraph and store them", async () => {
      await getXCalls();

      // Should have been called once per available/configured chain.
      expect((mockPubContext.adapters.cache.transfers.getLatestNonce as SinonStub).callCount).to.be.eq(
        Object.keys(mockInfo).length,
      );
      expect((mockPubContext.adapters.mqClient.publish as SinonStub).calledWithExactly(mockSubgraphResponse[0]));
      expect((mockPubContext.adapters.mqClient.publish as SinonStub).calledWithExactly(mockSubgraphResponse[1]));
      expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).calledWithExactly(mock.domain.A, 9));
      expect(
        (mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).calledWithExactly(mock.domain.A, 10),
      );
    });

    it("should not publish if nothing available", async () => {
      (mockPubContext.adapters.subgraph.getDestinationXCalls as SinonStub).resolves([]);
      await getXCalls();
      expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(0);
      expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).callCount).to.be.eq(1);
    });

    it("should catch publish error", async () => {
      (mockPubContext.adapters.mqClient.publish as SinonStub).onSecondCall().rejects("BLAH");

      await expect(getXCalls()).to.be.fulfilled;
    });

    it("should work with block number error", async () => {
      mockBlockNumber.set(mock.domain.A, 0);
      mockBlockNumber.set(mock.domain.B, 0);

      await expect(getXCalls()).to.be.fulfilled;

      expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(0);
      expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).callCount).to.be.eq(0);
    });

    it("should work if no latest nonce", async () => {
      (mockPubContext.adapters.cache.transfers.getLatestNonce as SinonStub).rejects("BLAH");

      await expect(getXCalls()).to.be.fulfilled;

      expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(0);
      expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).callCount).to.be.eq(0);
    });
  });

  describe("#getMissingXCalls", () => {
    beforeEach(() => {
      mockBlockNumber.set(mock.domain.A, 1234567);
      mockBlockNumber.set(mock.domain.B, 1234567);

      (mockPubContext.adapters.cache.transfers.getLatestNonce as SinonStub).callsFake(
        (domain: string) => mockInfo[domain].latestNonce,
      );
      mockPubContext.config.chains[mock.domain.A].confirmations = mockInfo[mock.domain.A].safeConfirmations;
      mockPubContext.config.chains[mock.domain.B].confirmations = mockInfo[mock.domain.B].safeConfirmations;
      mockSubgraphResponse = [
        mock.entity.xtransfer({ transferId: mkBytes32("0x1"), nonce: 9 }) as OriginTransfer,
        mock.entity.xtransfer({ transferId: mkBytes32("0x2"), nonce: 10 }) as OriginTransfer,
      ];
      (mockPubContext.adapters.subgraph.getLatestBlockNumber as SinonStub).resolves(mockBlockNumber);
      (mockPubContext.adapters.subgraph.getDestinationXCalls as SinonStub).resolves(mockSubgraphResponse);
      (mockPubContext.adapters.cache.transfers.getMissingNonces as SinonStub).resolves(["111", "222"]);
    });

    it("happy: should retrieve missing xcalls from the subgraph", async () => {
      (mockPubContext.adapters.subgraph.getOriginTransfersByNonces as SinonStub).resolves([
        mock.entity.xtransfer({ transferId: mkBytes32("0x1"), nonce: 9 }) as OriginTransfer,
        mock.entity.xtransfer({ transferId: mkBytes32("0x2"), nonce: 10 }) as OriginTransfer,
      ]);

      await getMissingXCalls();
      expect((mockPubContext.adapters.cache.transfers.getMissingNonces as SinonStub).callCount).to.be.eq(2);
    });

    // it("should not publish if nothing available", async () => {
    //   (mockPubContext.adapters.subgraph.getDestinationXCalls as SinonStub).resolves([]);

    //   await getXCalls();

    //   expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(0);
    //   expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).callCount).to.be.eq(0);
    // });

    // it("should catch publish error", async () => {
    //   (mockPubContext.adapters.mqClient.publish as SinonStub).onSecondCall().rejects("BLAH");

    //   await expect(getXCalls()).to.be.fulfilled;
    // });

    // it("should work with block number error", async () => {
    //   mockBlockNumber.set(mock.domain.A, 0);
    //   mockBlockNumber.set(mock.domain.B, 0);

    //   await expect(getXCalls()).to.be.fulfilled;

    //   expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(0);
    //   expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).callCount).to.be.eq(0);
    // });

    // it("should work if no latest nonce", async () => {
    //   (mockPubContext.adapters.cache.transfers.getLatestNonce as SinonStub).rejects("BLAH");

    //   await expect(getXCalls()).to.be.fulfilled;

    //   expect((mockPubContext.adapters.mqClient.publish as SinonStub).callCount).to.be.eq(0);
    //   expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).callCount).to.be.eq(0);
    // });
  });
});
