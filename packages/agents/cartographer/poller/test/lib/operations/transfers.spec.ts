import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";

import { mockDestinationSubgraphResponse, mockOriginSubgraphResponse } from "../../mock";
import { mockContext } from "../../globalTestHook";
import { updateTransfers } from "../../../src/lib/operations/transfers";

describe("Transfers operations", () => {
  describe("#updateTransfers", () => {
    it("should work", async () => {
      await updateTransfers();
      expect(mockContext.adapters.database.saveTransfers as SinonStub).callCount(6);
      expect(mockContext.adapters.database.saveTransfers as SinonStub).to.be.calledWithExactly(
        mockOriginSubgraphResponse,
      );
      expect(mockContext.adapters.database.saveTransfers as SinonStub).to.be.calledWithExactly(
        mockDestinationSubgraphResponse,
      );
      // TODO: add more assertions
    });
  });
});
