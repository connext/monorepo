import { expect } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { NoChainIdForHubDomain } from "../../../../src/tasks/propagate/errors";
import { propagate } from "../../../../src/tasks/propagate/operations";
import { propagateCtxMock } from "../../../globalTestHook";

describe("Operations: Propagate", () => {
  describe("#propagate", () => {
    it("should throw an error if no hub domain id", async () => {
      propagateCtxMock.config.chains = {};
      await expect(propagate()).to.eventually.be.rejectedWith(NoChainIdForHubDomain);
    });

    it("should throw an error if root manager not found", async () => {});
    it("should send encoded data to relayer succesfully", async () => {});
  });
});
