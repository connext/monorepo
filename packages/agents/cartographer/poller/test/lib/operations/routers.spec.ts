import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";

import { mockRouterResponse } from "../../mock";
import { mockContext } from "../../globalTestHook";
import { updateRouters } from "../../../src/lib/operations/routers";

describe("Routers operations", () => {
  describe("#updateRouters", () => {
    it("should work", async () => {
      await updateRouters();
      expect(mockContext.adapters.database.saveRouterBalances as SinonStub).to.be.calledTwice;
      expect(mockContext.adapters.database.saveRouterBalances as SinonStub).to.be.calledWithExactly(mockRouterResponse);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledTwice;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[0],
        44,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[1],
        44,
      );
    });
  });
});
