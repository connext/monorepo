import { expect, SparseMerkleTree } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { NoChainIdForDomain, LatestPropagatedSnapshot, NoRootTimestamp } from "../../../../src/tasks/propose/errors";
import { proposeSpoke } from "../../../../src/tasks/propose/operations";
import * as ProposeFns from "../../../../src/tasks/propose/operations/proposeSpoke";
import { proposeCtxMock, sendWithRelayerWithBackupStub } from "../../../globalTestHook";
import { mock } from "../../../mock";
import * as Mockable from "../../../../src/mockable";

describe("Operations: ProposeSpoke", () => {
  describe("#proposeSpoke", () => {
    beforeEach(() => {});

    it("should early exit if root already finalized in db", async () => {
      (proposeCtxMock.adapters.database.getCurrentFinalizedSnapshot as SinonStub).resolves(mock.entity.snapshot());
      const spokeRoot = mock.entity.spokeOptimisticRoot({ status: "Finalized" });
      (proposeCtxMock.adapters.database.getSpokeOptimisticRoot as SinonStub).resolves(spokeRoot);

      const result = await proposeSpoke("");
      expect(result).to.eq(undefined);
    });

    it("should early exit if root already finalized on chain but not db", async () => {
      let aggregateRootCheckStub = stub(ProposeFns, "aggregateRootCheck").resolves(true);
      (proposeCtxMock.adapters.database.getCurrentFinalizedSnapshot as SinonStub).resolves(mock.entity.snapshot());
      (proposeCtxMock.adapters.database.getSpokeOptimisticRoot as SinonStub).resolves(
        mock.entity.spokeOptimisticRoot(),
      );

      const result = await proposeSpoke("");
      expect(result).to.eq(undefined);
      expect(aggregateRootCheckStub).callCount(1);
    });

    it("should throw an error if no propagated snapshot", async () => {
      await expect(proposeSpoke("")).to.eventually.be.rejectedWith(LatestPropagatedSnapshot);
    });
    it("should throw an error if no propagated timestamp", async () => {
      const propagatedSnapshot = mock.entity.snapshot();
      propagatedSnapshot.finalizedTimestamp = undefined;
      (proposeCtxMock.adapters.database.getCurrentFinalizedSnapshot as SinonStub).resolves(propagatedSnapshot);
      await expect(proposeSpoke("")).to.eventually.be.rejectedWith(NoRootTimestamp);
    });

    it("should call proposeSpoke snapshot succesfully", async () => {
      let proposeOptimisticRootStub = stub(ProposeFns, "proposeOptimisticRoot").resolves();
      let aggregateRootCheckStub = stub(ProposeFns, "aggregateRootCheck").resolves(false);

      (proposeCtxMock.adapters.database.getCurrentFinalizedSnapshot as SinonStub).resolves(mock.entity.snapshot());
      (proposeCtxMock.adapters.database.getSpokeOptimisticRoot as SinonStub).resolves(
        mock.entity.spokeOptimisticRoot(),
      );

      await proposeSpoke(mock.domain.B);
      expect(proposeOptimisticRootStub).callCount(1);
      expect(aggregateRootCheckStub).callCount(1);
    });

    it("should call sendRootToHubSpoke snapshot succesfully", async () => {
      let aggregateRootCheckStub = stub(ProposeFns, "aggregateRootCheck").resolves(false);
      let sendRootToHubSpokeStub = stub(ProposeFns, "sendRootToHubSpoke").resolves();

      (proposeCtxMock.adapters.database.getCurrentFinalizedSnapshot as SinonStub).resolves(mock.entity.snapshot());
      (proposeCtxMock.adapters.database.getSpokeOptimisticRoot as SinonStub).resolves(
        mock.entity.spokeOptimisticRoot(),
      );

      await proposeSpoke(mock.domain.A);
      expect(sendRootToHubSpokeStub).callCount(1);
      expect(aggregateRootCheckStub).callCount(1);
    });
  });

  describe("#proposeOptimisticRoot", () => {
    let encodeFunctionData: SinonStub;

    beforeEach(() => {
      encodeFunctionData = proposeCtxMock.adapters.contracts.spokeConnector.encodeFunctionData as SinonStub;
    });

    it("happy case should call proposeOptimisticRoot snapshot succesfully", async () => {
      encodeFunctionData.returns("0x");

      await ProposeFns.proposeOptimisticRoot("0xaggregateRootHash", 1, mock.domain.B, +mock.domain.B, undefined as any);
      expect(sendWithRelayerWithBackupStub).callCount(1);
    });
  });

  describe("#sendRootToHubSpoke", () => {
    let encodeFunctionData: SinonStub;

    beforeEach(() => {
      encodeFunctionData = proposeCtxMock.adapters.contracts.rootManager.encodeFunctionData as SinonStub;
    });

    it("happy case should call sendRootToHubSpoke snapshot succesfully", async () => {
      encodeFunctionData.returns("0x");

      await ProposeFns.sendRootToHubSpoke(undefined as any);
      expect(sendWithRelayerWithBackupStub).callCount(1);
    });
  });

  describe("#aggregateRootCheck", () => {
    let encodeFunctionData: SinonStub;
    let decodeFunctionData: SinonStub;

    beforeEach(() => {
      encodeFunctionData = proposeCtxMock.adapters.contracts.spokeConnector.encodeFunctionData as SinonStub;
      decodeFunctionData = proposeCtxMock.adapters.contracts.spokeConnector.decodeFunctionResult as SinonStub;
    });

    it("happy case should call aggregateRootCheck succesfully", async () => {
      encodeFunctionData.returns("0x");
      decodeFunctionData.returns([true]);

      const result = await ProposeFns.aggregateRootCheck("0x", mock.domain.A, undefined as any);
      expect(result).to.eq(true);
    });
  });
});
