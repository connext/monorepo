import { expect, getNtpTimeSeconds } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { NoChainIdForDomain } from "../../../../src/tasks/propagate/errors";
import { finalizeSpoke } from "../../../../src/tasks/propagate/operations";
import { propagateCtxMock, sendWithRelayerWithBackupStub } from "../../../globalTestHook";
import { mock } from "../../../mock";

describe("Operations: PropagateSpoke", () => {
  describe("#finalizeSpoke", () => {
    beforeEach(() => {});

    it("should throw an error if no hub domain id", async () => {
      propagateCtxMock.chainData = new Map();
      await expect(finalizeSpoke("")).to.eventually.be.rejectedWith(NoChainIdForDomain);
    });

    it("should skip if finalizeSpoke is hub domain", async () => {
      await finalizeSpoke(mock.domain.A);
      expect(sendWithRelayerWithBackupStub).callCount(0);
    });

    it("should send encoded data to relayer succesfully", async () => {
      const optimistiRoot = mock.entity.spokeOptimisticRoot();
      optimistiRoot.endOfDispute = 9999999999999999999;
      (propagateCtxMock.adapters.database.getCurrentProposedOptimisticRoot as SinonStub).resolves([optimistiRoot]);
      await finalizeSpoke(mock.domain.B);
      expect(sendWithRelayerWithBackupStub).callCount(1);
    });
  });
});
