import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";

import { mockDestinationSubgraphResponse, mockOriginSubgraphResponse } from "../../mock";
import { mockContext } from "../../globalTestHook";
import { updateTransfers } from "../../../src/lib/operations/transfers";

describe("Transfers operations", () => {
  describe("#updateTransfers", () => {
    it("not proceed if latest block number not available", async () => {
      (mockContext.adapters.subgraph.getLatestBlockNumber as SinonStub).resolves(new Map());
      await updateTransfers();
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(0);
      expect(mockContext.adapters.database.getTransfersWithOriginPending as SinonStub).callCount(0);
      expect(mockContext.adapters.database.getTransfersWithDestinationPending as SinonStub).callCount(0);
      // TODO: add more assertions
    });

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
