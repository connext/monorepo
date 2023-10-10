import { expect, getNtpTimeSeconds, getRandomBytes32 } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { NoChainIdForHubDomain } from "../../../../src/tasks/propose/errors";
import { propose } from "../../../../src/tasks/propose/operations";
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
});
