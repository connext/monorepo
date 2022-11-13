import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";

import { mockRouterResponse } from "../../mock";
import { mockContext } from "../../globalTestHook";
import { updateRouters } from "../../../src/lib/operations";

describe("Routers operations", () => {
  describe("#updateRouters", () => {
    it("should work", async () => {
      await updateRouters();

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[1],
      );

      expect(mockContext.adapters.database.saveRouterBalances as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveRouterBalances as SinonStub).to.be.calledWithExactly(mockRouterResponse);

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[0],
        44,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[1],
        44,
      );
    });
    it("intial conditions", async () => {
      (mockContext.adapters.subgraph.getAssetBalancesRouters as SinonStub).resolves([]);
      await updateRouters();

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[1],
      );

      expect(mockContext.adapters.database.saveRouterBalances as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveRouterBalances as SinonStub).to.be.calledWithExactly([]);

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[0],
        0,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[1],
        0,
      );
    });
  });
});
