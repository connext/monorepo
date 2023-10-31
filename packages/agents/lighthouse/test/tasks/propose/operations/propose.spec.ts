import { expect, SparseMerkleTree } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { NoChainIdForDomain } from "../../../../src/tasks/propose/errors";
import { proposeHub, proposeSnapshot } from "../../../../src/tasks/propose/operations";
import * as ProposeFns from "../../../../src/tasks/propose/operations/propose";
import { proposeCtxMock, sendWithRelayerWithBackupStub } from "../../../globalTestHook";
import { mock } from "../../../mock";
import * as Mockable from "../../../../src/mockable";
import { BigNumber } from "ethers";

describe("Operations: Propose", () => {
  describe("#propose", () => {
    beforeEach(() => {});

    it("should throw an error if no hub domain id", async () => {
      proposeCtxMock.chainData = new Map();
      await expect(proposeHub()).to.eventually.be.rejectedWith(NoChainIdForDomain);
    });

    it("should call propose snapshot succesfully", async () => {
      let proposeSnapshotStub = stub(ProposeFns, "proposeSnapshot").resolves();

      (proposeCtxMock.adapters.database.getLatestPendingSnapshotRootByDomain as SinonStub).resolves([
        mock.entity.snapshotRoot().root,
      ]);

      await proposeHub();
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
      (proposeCtxMock.adapters.database.getLatestPendingSnapshotRootByDomain as SinonStub).resolves([
        mock.entity.snapshotRoot().root,
      ]);
      let aggregateRootCheckStub = stub(ProposeFns, "aggregateRootCheck").resolves(true);
      encodeFunctionData.returns("0x");

      await proposeSnapshot("1", ["0xA", "0xB"], [mock.domain.A, mock.domain.B], undefined as any);
      expect(sendWithRelayerWithBackupStub).callCount(1);
      expect(aggregateRootCheckStub).callCount(1);
    });

    it("should throw an error if no hub domain id", async () => {
      proposeCtxMock.chainData = new Map();
      await expect(proposeHub()).to.eventually.be.rejectedWith(NoChainIdForDomain);
    });
  });

  describe("#aggregateRootCheck", () => {
    let encodeFunctionData: SinonStub;
    let decodeFunctionData: SinonStub;

    beforeEach(() => {
      encodeFunctionData = proposeCtxMock.adapters.contracts.rootManager.encodeFunctionData as SinonStub;
      decodeFunctionData = proposeCtxMock.adapters.contracts.rootManager.decodeFunctionResult as SinonStub;
    });

    it("happy case should call aggregateRootCheck successfully", async () => {
      encodeFunctionData.returns("0x");
      decodeFunctionData.onFirstCall().returns(11);
      decodeFunctionData.onSecondCall().returns(["0x"]);
      (proposeCtxMock.adapters.database.getPendingAggregateRoot as SinonStub).resolves(mock.entity.snapshot());

      const result = await ProposeFns.aggregateRootCheck("0xAggRoot", undefined as any);
      expect(result).to.eq(true);
    });

    it("should fail when onchain root is the same", async () => {
      encodeFunctionData.returns("0x");
      decodeFunctionData.onFirstCall().returns(11);
      decodeFunctionData.onSecondCall().returns(["0xAB"]);
      (proposeCtxMock.adapters.database.getPendingAggregateRoot as SinonStub).resolves(mock.entity.snapshot());

      const result = await ProposeFns.aggregateRootCheck("0xAB", undefined as any);
      expect(result).to.eq(false);
    });

    it("should fail when db is out of sync", async () => {
      encodeFunctionData.returns("0x");
      decodeFunctionData.onFirstCall().returns(11);
      decodeFunctionData.onSecondCall().returns(["0x"]);

      const result = await ProposeFns.aggregateRootCheck("0xAggRoot", undefined as any);
      expect(result).to.eq(false);
    });

    it("should fail when onchain lastSavedAggregateRootTimestamp is NA", async () => {
      encodeFunctionData.returns("0x");
      decodeFunctionData.returns(undefined);

      const result = await ProposeFns.aggregateRootCheck("0x", undefined as any);
      expect(result).to.eq(false);
    });
  });
});
