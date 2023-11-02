import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import {
  mockConnectorMeta,
  mockAggregatedRootSubgraphResponse,
  mockOriginMessageSubgraphResponse,
  mockPropagatedRootSubgraphResponse,
  mockReceivedAggregateRootSubgraphResponse,
  mockProposedSnapshotsSubgraphResponse,
  mockFinalizedRootsByDomainSubgraphResponse,
  mockPropagatedOptimisticRootsByDomainSubgraphResponse,
  mockgetSavedSnapshotRootsByDomainSubgraphResponse,
  mockBlockNumber,
} from "@connext/nxtp-adapters-subgraph/test/mock";

import { mockContext } from "../../globalTestHook";
import {
  updateAggregatedRoots,
  updatePropagatedRoots,
  updateReceivedAggregateRoots,
  updateProposedSnapshots,
  updateFinalizedRoots,
  updateFinalizedSpokeRoots,
  updatePropagatedOptmisticRoots,
  retrieveSavedSnapshotRoot,
} from "../../../src/lib/operations";

describe("Roots operations", () => {
  describe("#updateAggregatedRoots", () => {
    it("should work", async () => {
      await updateAggregatedRoots(mockBlockNumber);
      expect(mockContext.adapters.database.saveAggregatedRoots as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.saveAggregatedRoots as SinonStub).to.be.calledWithExactly(
        mockAggregatedRootSubgraphResponse,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "aggregated_root_" + mockConnectorMeta[0].hubDomain,
        mockOriginMessageSubgraphResponse[1].index,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getGetAggregatedRootsByDomain as SinonStub).resolves([]);
      await updateAggregatedRoots(mockBlockNumber);
      expect(mockContext.adapters.database.saveAggregatedRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
    it("should fail bad block number", async () => {
      await updateAggregatedRoots(new Map());
      expect(mockContext.adapters.database.saveAggregatedRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#updateReceivedAggregateRoots", () => {
    it("should work", async () => {
      await updatePropagatedRoots(mockBlockNumber);
      expect(mockContext.adapters.database.savePropagatedRoots as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.savePropagatedRoots as SinonStub).to.be.calledOnceWithExactly(
        mockPropagatedRootSubgraphResponse,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "propagated_root_" + mockConnectorMeta[0].hubDomain,
        mockPropagatedRootSubgraphResponse[1].count,
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "propagated_root_" + mockConnectorMeta[0].hubDomain,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getGetPropagatedRoots as SinonStub).resolves([]);
      await updatePropagatedRoots(mockBlockNumber);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.savePropagatedRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
    it("should handle bad block number", async () => {
      await updatePropagatedRoots(new Map());
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.savePropagatedRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#updateReceivedAggregateRoots", () => {
    it("should work", async () => {
      await updateReceivedAggregateRoots(mockBlockNumber);
      expect(mockContext.adapters.database.saveReceivedAggregateRoot as SinonStub).callCount(
        mockContext.domains.length,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveReceivedAggregateRoot as SinonStub).to.be.calledWithExactly(
        mockReceivedAggregateRootSubgraphResponse,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "received_aggregate_root_" + mockContext.domains[0],
        mockReceivedAggregateRootSubgraphResponse[1].blockNumber,
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "received_aggregate_root_" + mockContext.domains[1],
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getReceivedAggregatedRootsByDomain as SinonStub).resolves([]);
      await updateReceivedAggregateRoots(mockBlockNumber);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveReceivedAggregateRoot as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
    it("bad block number", async () => {
      mockReceivedAggregateRootSubgraphResponse[0].blockNumber = 0;
      mockReceivedAggregateRootSubgraphResponse[1].blockNumber = 0;
      (mockContext.adapters.subgraph.getReceivedAggregatedRootsByDomain as SinonStub).resolves(
        mockReceivedAggregateRootSubgraphResponse,
      );
      await updateReceivedAggregateRoots(mockBlockNumber);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveReceivedAggregateRoot as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
    it("bad max block number", async () => {
      await updateReceivedAggregateRoots(new Map());
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveReceivedAggregateRoot as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#updateProposedSnapshots", () => {
    it("should work", async () => {
      (mockContext.adapters.database.getCheckPoint as SinonStub).resolves(0);
      (mockContext.adapters.subgraph.getProposedSnapshotsByDomain as SinonStub).resolves(
        mockProposedSnapshotsSubgraphResponse,
      );
      const newDisputeCliff = mockProposedSnapshotsSubgraphResponse.sort((a, b) => b.endOfDispute - a.endOfDispute)[0]
        .endOfDispute;

      await updateProposedSnapshots(mockBlockNumber);
      expect(mockContext.adapters.database.saveProposedSnapshots as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.subgraph.getProposedSnapshotsByDomain as SinonStub).to.be.calledOnceWithExactly([
        { hub: "1337", snapshotId: 0, limit: 100, maxBlockNumber: 1234567 },
      ]);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "proposed_optimistic_root_" + mockConnectorMeta[0].hubDomain,
        newDisputeCliff,
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "proposed_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getProposedSnapshotsByDomain as SinonStub).resolves([]);
      await updatePropagatedRoots(mockBlockNumber);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.savePropagatedRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
    it("should handle bad block numbers", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getProposedSnapshotsByDomain as SinonStub).resolves([]);
      await updatePropagatedRoots(new Map());
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.savePropagatedRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#updateFinalizedRoots", () => {
    it("should work", async () => {
      (mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).resolves(
        mockFinalizedRootsByDomainSubgraphResponse,
      );
      await updateFinalizedRoots(mockBlockNumber);
      expect(mockContext.adapters.database.saveFinalizedRoots as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).to.be.calledOnceWithExactly(
        [{ domain: "1337", timestamp: 42, limit: 100, maxBlockNumber: 1234567 }],
        true,
      );

      // The second argument is timestamp so it's a little bit hard to put the right value for assertion check
      // without any mocking for the Date.now()
      // expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledOnceWithExactly(
      //   "finalized_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      //   43,
      // );

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "finalized_hub_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).resolves([]);
      await updateFinalizedRoots(mockBlockNumber);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveFinalizedRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
    it("should handle bad block numbers", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).resolves([]);
      await updateFinalizedRoots(new Map());
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveFinalizedRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#updateFinalizedSpokeRoots", () => {
    it("should work", async () => {
      (mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).resolves(
        mockFinalizedRootsByDomainSubgraphResponse,
      );
      await updateFinalizedSpokeRoots(mockBlockNumber);
      expect(mockContext.adapters.database.saveFinalizedSpokeRoots as SinonStub).callCount(2);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(2);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(2);
      expect(mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).to.be.calledWithExactly(
        [{ domain: "1337", timestamp: 42, limit: 100, maxBlockNumber: 1234567 }],
        false,
      );
      expect(mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).to.be.calledWithExactly(
        [{ domain: "1338", timestamp: 42, limit: 100, maxBlockNumber: 1234567 }],
        false,
      );

      // The second argument is timestamp so it's a little bit hard to put the right value for assertion check
      // without any mocking for the Date.now()
      // expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
      //   "finalized_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      //   43,
      // );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "finalized_spoke_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).resolves([]);
      await updateFinalizedSpokeRoots(mockBlockNumber);
      expect(mockContext.adapters.database.saveFinalizedSpokeRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });

    it("should handle bad block numbers", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).resolves([]);
      await updateFinalizedSpokeRoots(new Map());
      expect(mockContext.adapters.database.saveFinalizedSpokeRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#updatePropagatedOptmisticRoots", () => {
    it("should work", async () => {
      (mockContext.adapters.subgraph.getPropagatedOptimisticRootsByDomain as SinonStub).resolves(
        mockPropagatedOptimisticRootsByDomainSubgraphResponse,
      );
      await updatePropagatedOptmisticRoots(mockBlockNumber);
      expect(mockContext.adapters.database.savePropagatedOptimisticRoots as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(1);
      expect(
        mockContext.adapters.subgraph.getPropagatedOptimisticRootsByDomain as SinonStub,
      ).to.be.calledOnceWithExactly([{ hub: "1337", timestamp: 42, limit: 100, maxBlockNumber: 1234567 }]);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "propagated_optimistic_root_" + mockConnectorMeta[0].hubDomain,
        43,
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "propagated_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      );
    });

    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getPropagatedOptimisticRootsByDomain as SinonStub).resolves([]);
      await updatePropagatedRoots(mockBlockNumber);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.savePropagatedOptimisticRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });

    it("should handle bad block numbers", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getPropagatedOptimisticRootsByDomain as SinonStub).resolves([]);
      await updatePropagatedRoots(new Map());
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.savePropagatedOptimisticRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#retrieveSavedSnapshotRoot", () => {
    it("should work", async () => {
      (mockContext.adapters.subgraph.getSavedSnapshotRootsByDomain as SinonStub).resolves(
        mockgetSavedSnapshotRootsByDomainSubgraphResponse,
      );
      await retrieveSavedSnapshotRoot(mockBlockNumber);
      expect(mockContext.adapters.database.saveSnapshotRoots as SinonStub).callCount(
        mockgetSavedSnapshotRootsByDomainSubgraphResponse.length,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(
        mockgetSavedSnapshotRootsByDomainSubgraphResponse.length,
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(
        mockgetSavedSnapshotRootsByDomainSubgraphResponse.length,
      );
      expect(mockContext.adapters.subgraph.getSavedSnapshotRootsByDomain as SinonStub).to.be.calledWithExactly([
        { hub: "1337", snapshotId: 42, limit: 100, maxBlockNumber: 1234567 },
      ]);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "saved_snapshoted_root_" + mockConnectorMeta[0].hubDomain,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getSavedSnapshotRootsByDomain as SinonStub).resolves([]);
      await updatePropagatedRoots(mockBlockNumber);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveSnapshotRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
    it("should handle bad block numbers", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getSavedSnapshotRootsByDomain as SinonStub).resolves([]);
      await updatePropagatedRoots(new Map());
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveSnapshotRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });
});
