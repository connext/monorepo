import { expect, mkBytes32, OriginTransfer, DestinationTransfer } from "@connext/nxtp-utils";

import { mock } from "../../mock";
import { mockPubContext } from "../../globalTestHook";
import { sendStatusToSequencer } from "../../../src/tasks/publisher/operations/status";
import { SinonStub } from "sinon";

describe("Operation:status", () => {
  describe("#sendStatusToSequencer", () => {
    it("send router status to the sequencer successfully", async () => {
      expect(() => sendStatusToSequencer()).to.not.throw;
    });
    it("should throw if sending failed", () => {});
    it("should fail to send router status", () => {});
  });
});
