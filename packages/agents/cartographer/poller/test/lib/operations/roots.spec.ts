import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";

import {
  mockAggregatedRootSubgraphResponse,
  mockConnectorMeta,
  mockOriginMessageSubgraphResponse,
  mockPropagatedRootSubgraphResponse,
} from "../../mock";
import { mockContext } from "../../globalTestHook";
import { updateAggregatedRoots, updatePropagatedRoots } from "../../../src/lib/operations/roots";

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
});
