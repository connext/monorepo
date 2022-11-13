import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";

import { mockDestinationSubgraphResponse, mockOriginSubgraphResponse } from "../../mock";
import { mockContext, mochaHooks } from "../../globalTestHook";
import { updateTransfers } from "../../../src/lib/operations";

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
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(6);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(6);
    });

    it("not proceed if latest block number not available", async () => {
      (mockContext.adapters.subgraph.getLatestBlockNumber as SinonStub).resolves(new Map());
      await updateTransfers();

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(0);
      expect(mockContext.adapters.database.getTransfersWithOriginPending as SinonStub).callCount(0);
      expect(mockContext.adapters.database.getTransfersWithDestinationPending as SinonStub).callCount(0);
      expect(mockContext.adapters.database.saveTransfers as SinonStub).callCount(0);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(0);
    });

    it("initial condition: no origin transfers ", async () => {
      (mockContext.adapters.subgraph.getOriginTransfersByNonce as SinonStub).resolves([]);
      await updateTransfers();

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).is.not.calledWithExactly(
        "origin_nonce_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).is.not.calledWithExactly(
        "origin_nonce_" + mockContext.domains[1],
      );
    });

    it("initial condition: no destination transfers", async () => {
      (mockContext.adapters.subgraph.getDestinationTransfersByDomainAndReconcileTimestamp as SinonStub).resolves([]);
      await updateTransfers();

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).is.not.calledWithExactly(
        "destination_reconcile_timestamp_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).is.not.calledWithExactly(
        "destination_reconcile_timestamp_" + mockContext.domains[1],
      );
    });

    it("should handle nonce out of sync", async () => {
      const response = [...mockDestinationSubgraphResponse];
      response[0].xparams.nonce = undefined;
      (mockContext.adapters.subgraph.getDestinationTransfersByNonce as SinonStub).resolves([
        mockDestinationSubgraphResponse[0],
      ]);
      await updateTransfers();

      expect(mockContext.adapters.database.saveTransfers as SinonStub).to.be.calledWithExactly([
        mockDestinationSubgraphResponse[0],
      ]);

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(4);
    });

    it("should handle no reconcile", async () => {
      const response = [...mockDestinationSubgraphResponse];
      response[0].destination.reconcile!.timestamp = 0;
      response[1].destination.reconcile = undefined;
      const response2 = [...mockOriginSubgraphResponse];
      (mockContext.adapters.subgraph.getDestinationTransfersByDomainAndReconcileTimestamp as SinonStub).resolves([
        ...response,
        ...response2,
      ]);

      await updateTransfers();

      expect(mockContext.adapters.database.saveTransfers as SinonStub).to.be.calledWithExactly([
        ...response,
        ...response2,
      ]);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(3);
    });

    it("should handle initial condition", async () => {
      (mockContext.adapters.database.getCheckPoint as SinonStub).resolves(0);
      await updateTransfers();

      expect(mockContext.adapters.database.saveTransfers as SinonStub).callCount(6);
      expect(mockContext.adapters.database.saveTransfers as SinonStub).to.be.calledWithExactly(
        mockOriginSubgraphResponse,
      );
      expect(mockContext.adapters.database.saveTransfers as SinonStub).to.be.calledWithExactly(
        mockDestinationSubgraphResponse,
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(6);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(3);
    });
  });
});
