import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import {
  mockDestinationExecutedSubgraphResponse,
  mockDestinationSubgraphResponse,
  mockOriginSubgraphResponse,
} from "@connext/nxtp-adapters-subgraph/test/mock";

import { mockContext } from "../../globalTestHook";
import { updateBackoffs, updateTransfers } from "../../../src/lib/operations/transfers";

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
      expect(mockContext.adapters.database.saveTransfers as SinonStub).callCount(2);
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
      (mockContext.adapters.subgraph.getDestinationTransfersByDomainAndReconcileNonce as SinonStub).resolves([]);
      await updateTransfers();

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).is.not.calledWithExactly(
        "destination_reconcile_tx_nonce_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).is.not.calledWithExactly(
        "destination_reconcile_tx_nonce_" + mockContext.domains[1],
      );
    });

    it("should handle no reconcile", async () => {
      const response = [...mockDestinationSubgraphResponse];
      response[0].destination.reconcile!.txNonce = 0;
      response[1].destination.reconcile = undefined;
      const response2 = [...mockOriginSubgraphResponse];
      (mockContext.adapters.subgraph.getDestinationTransfersByDomainAndReconcileNonce as SinonStub).resolves([
        ...response,
        ...response2,
      ]);

      await updateTransfers();

      expect(mockContext.adapters.database.saveTransfers as SinonStub).to.be.calledWithExactly([
        ...response,
        ...response2,
      ]);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(4);
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
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(4);
    });
  });

  describe("updateBackoffs", () => {
    it("should work", async () => {
      await updateBackoffs();

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(4);
      expect(mockContext.adapters.subgraph.getRelayerFeesIncreasesByDomainAndTimestamp as SinonStub).callCount(1);
      expect(mockContext.adapters.subgraph.getSlippageUpdatesByDomainAndTimestamp as SinonStub).callCount(1);
      expect(mockContext.adapters.database.resetBackoffs as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(2);
    });
  });
});
