import { expect, SparseMerkleTree } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { NoChainIdForHubDomain } from "../../../../src/tasks/propose/errors";
import { propose, proposeSnapshot } from "../../../../src/tasks/propose/operations";
import * as ProposeFns from "../../../../src/tasks/propose/operations/propose";
import { proposeCtxMock, sendWithRelayerWithBackupStub } from "../../../globalTestHook";
import { mock } from "../../../mock";
import * as Mockable from "../../../../src/mockable";

describe("Operations: Propose", () => {
  describe("#propose", () => {
    beforeEach(() => {});

    it("should throw an error if no hub domain id", async () => {
      proposeCtxMock.chainData = new Map();
      await expect(propose()).to.eventually.be.rejectedWith(NoChainIdForHubDomain);
    });

    it("should call propose snapshot succesfully", async () => {
      let proposeSnapshotStub = stub(ProposeFns, "proposeSnapshot").resolves();

      (proposeCtxMock.adapters.database.getPendingSnapshots as SinonStub).resolves([mock.entity.snapshotRoot()]);

      await propose();
      expect(proposeSnapshotStub).callCount(1);
    });
  });
  describe("#proposeSnapshot", () => {
    let getRootStub: SinonStub;
    let encodeFunctionData: SinonStub;

    beforeEach(() => {
      getRootStub = stub(SparseMerkleTree.prototype, "getRoot");
      encodeFunctionData = proposeCtxMock.adapters.contracts.relayerProxyHub.encodeFunctionData as SinonStub;
    });

    it("happy case should call propose snapshot succesfully", async () => {
      (proposeCtxMock.adapters.database.getBaseAggregateRoot as SinonStub).resolves("0x");
      (proposeCtxMock.adapters.database.getBaseAggregateRootCount as SinonStub).resolves(1);
      (proposeCtxMock.adapters.database.getAggregateRoots as SinonStub).resolves(["0x"]);
      (proposeCtxMock.adapters.database.getPendingSnapshots as SinonStub).resolves([mock.entity.snapshotRoot()]);
      encodeFunctionData.returns("0x");

      await proposeSnapshot("1", ["0xA", "0xB"], undefined as any);
      expect(sendWithRelayerWithBackupStub).callCount(1);
    });

    it("should throw an error if no hub domain id", async () => {
      proposeCtxMock.chainData = new Map();
      await expect(propose()).to.eventually.be.rejectedWith(NoChainIdForHubDomain);
    });
  });
});
