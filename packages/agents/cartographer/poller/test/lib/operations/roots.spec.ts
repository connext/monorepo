import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import {
  mockConnectorMeta,
  mockAggregatedRootSubgraphResponse,
  mockOriginMessageSubgraphResponse,
  mockPropagatedRootSubgraphResponse,
  mockReceivedAggregateRootSubgraphResponse,
} from "@connext/nxtp-adapters-subgraph/test/mock";

import { mockContext } from "../../globalTestHook";
import {
  updateAggregatedRoots,
  updatePropagatedRoots,
  updateReceivedAggregateRoots,
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
});
