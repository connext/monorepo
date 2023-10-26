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

    it("should throw an error if no`hub domain id", async () => {
      proposeCtxMock.chainData = new Map();
      (proposeCtxMock.adapters.database.getCurrentPropagatedSnapshot as SinonStub).resolves(mock.entity.snapshot());
      await expect(proposeSpoke("")).to.eventually.be.rejectedWith(NoChainIdForDomain);
    });
    it("should throw an error if no propagated snapshot", async () => {
      await expect(proposeSpoke("")).to.eventually.be.rejectedWith(LatestPropagatedSnapshot);
    });
    it("should throw an error if no propagated timestamp", async () => {
      const propagatedSnapshot = mock.entity.snapshot();
      propagatedSnapshot.propagateTimestamp = undefined;
      (proposeCtxMock.adapters.database.getCurrentPropagatedSnapshot as SinonStub).resolves(propagatedSnapshot);
      await expect(proposeSpoke("")).to.eventually.be.rejectedWith(NoRootTimestamp);
    });

    it("should call proposeSpoke snapshot succesfully", async () => {
      let proposeOptimisticRootStub = stub(ProposeFns, "proposeOptimisticRoot").resolves();

      (proposeCtxMock.adapters.database.getCurrentPropagatedSnapshot as SinonStub).resolves(mock.entity.snapshot());

      await proposeSpoke(mock.domain.B);
      expect(proposeOptimisticRootStub).callCount(1);
    });

    it("should call sendRootToHubSpoke snapshot succesfully", async () => {
      let sendRootToHubSpokeStub = stub(ProposeFns, "sendRootToHubSpoke").resolves();

      (proposeCtxMock.adapters.database.getCurrentPropagatedSnapshot as SinonStub).resolves(mock.entity.snapshot());

      await proposeSpoke(mock.domain.A);
      expect(sendRootToHubSpokeStub).callCount(1);
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
});
