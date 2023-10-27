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
      await updateAggregatedRoots();
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
      await updateAggregatedRoots();
      expect(mockContext.adapters.database.saveAggregatedRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#updatePropagatedRoots", () => {
    it("should work", async () => {
      await updatePropagatedRoots();
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
      await updatePropagatedRoots();
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.savePropagatedRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#updateReceivedAggregateRoots", () => {
    it("should work", async () => {
      await updateReceivedAggregateRoots();
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
      await updateReceivedAggregateRoots();
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveReceivedAggregateRoot as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
    it("bad block number", async () => {
      mockReceivedAggregateRootSubgraphResponse[0].blockNumber = undefined;
      mockReceivedAggregateRootSubgraphResponse[1].blockNumber = undefined;
      (mockContext.adapters.subgraph.getReceivedAggregatedRootsByDomain as SinonStub).resolves(
        mockReceivedAggregateRootSubgraphResponse,
      );
      await updateReceivedAggregateRoots();
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveReceivedAggregateRoot as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#updateProposedSnapshots", () => {
    it("should work", async () => {
      (mockContext.adapters.subgraph.getProposedSnapshotsByDomain as SinonStub).resolves(
        mockProposedSnapshotsSubgraphResponse,
        mockProposedSnapshotsSubgraphResponse,
      );
      const newDisputeCliff = mockProposedSnapshotsSubgraphResponse.sort((a, b) => b.endOfDispute - a.endOfDispute)[0]
        .endOfDispute;

      await updateProposedSnapshots();
      expect(mockContext.adapters.database.saveProposedSnapshots as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.subgraph.getProposedSnapshotsByDomain as SinonStub).to.be.calledOnceWithExactly([
        { hub: "1337", snapshotId: 42, limit: 100 },
      ]);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "proposed_optimistic_root_" + mockConnectorMeta[0].hubDomain,
        mockProposedSnapshotsSubgraphResponse[1].endOfDispute,
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "proposed_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getProposedSnapshotsByDomain as SinonStub).resolves([]);
      await updatePropagatedRoots();
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
      await updateFinalizedRoots();
      expect(mockContext.adapters.database.saveFinalizedRoots as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).to.be.calledOnceWithExactly([
        { hub: "1337", timestamp: 42, limit: 100 },
      ]);

      // The second argument is timestamp so it's a little bit hard to put the right value for assertion check
      // without any mocking for the Date.now()
      // expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledOnceWithExactly(
      //   "finalized_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      //   43,
      // );

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "finalized_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).resolves([]);
      await updateFinalizedRoots();
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
      await updateFinalizedSpokeRoots();
      expect(mockContext.adapters.database.saveFinalizedSpokeRoots as SinonStub).callCount(2);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(2);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(2);
      expect(mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).to.be.calledWithExactly([
        { hub: "1337", timestamp: 42, limit: 100 },
      ]);

      // The second argument is timestamp so it's a little bit hard to put the right value for assertion check
      // without any mocking for the Date.now()
      // expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
      //   "finalized_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      //   43,
      // );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "finalized_optimistic_root_" + mockConnectorMeta[0].hubDomain,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getFinalizedRootsByDomain as SinonStub).resolves([]);
      await updateFinalizedSpokeRoots();
      expect(mockContext.adapters.database.saveFinalizedSpokeRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });

  describe("#updatePropagatedOptmisticRoots", () => {
    it("should work", async () => {
      (mockContext.adapters.subgraph.getPropagatedOptimisticRootsByDomain as SinonStub).resolves(
        mockPropagatedOptimisticRootsByDomainSubgraphResponse,
      );
      await updatePropagatedOptmisticRoots();
      expect(mockContext.adapters.database.savePropagatedOptimisticRoots as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(1);
      expect(
        mockContext.adapters.subgraph.getPropagatedOptimisticRootsByDomain as SinonStub,
      ).to.be.calledOnceWithExactly([{ hub: "1337", timestamp: 42, limit: 100 }]);
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
      await updatePropagatedRoots();
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
      await retrieveSavedSnapshotRoot();
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
        { hub: "1337", snapshotId: 42, limit: 100 },
      ]);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "saved_snapshoted_root_" + mockConnectorMeta[0].hubDomain,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getConnectorMeta as SinonStub).resolves([]);
      (mockContext.adapters.subgraph.getSavedSnapshotRootsByDomain as SinonStub).resolves([]);
      await updatePropagatedRoots();
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveSnapshotRoots as SinonStub).to.not.be.called;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.not.be.called;
    });
  });
});
