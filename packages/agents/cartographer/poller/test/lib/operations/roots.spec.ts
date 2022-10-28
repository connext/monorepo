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
      expect(mockContext.adapters.database.saveAggregatedRoots as SinonStub).to.be.calledTwice;
      expect(mockContext.adapters.database.saveAggregatedRoots as SinonStub).to.be.calledWithExactly(
        mockAggregatedRootSubgraphResponse,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledTwice;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "aggregated_root_" + mockContext.domains[0] + "_" + mockConnectorMeta[0].hubDomain,
        mockOriginMessageSubgraphResponse[1].index,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "aggregated_root_" + mockContext.domains[1] + "_" + mockConnectorMeta[0].hubDomain,
        mockOriginMessageSubgraphResponse[1].index,
      );
    });
  });

  describe("#updatePropagatedRoots", () => {
    it("should work", async () => {
      await updatePropagatedRoots();
      expect(mockContext.adapters.database.savePropagatedRoots as SinonStub).to.be.calledOnceWithExactly(
        mockPropagatedRootSubgraphResponse,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "propagated_root_",
        mockPropagatedRootSubgraphResponse[1].count,
      );
    });
  });
});
