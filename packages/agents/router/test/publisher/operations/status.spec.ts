import { expect } from "@connext/nxtp-utils";
import { mockPubContext } from "../../globalTestHook";
import { sendStatusToSequencer } from "../../../src/tasks/publisher/operations/status";
import { SinonStub, stub } from "sinon";
import * as Mockable from "../../../src/mockable";

describe("Operation:status", () => {
  describe("#sendStatusToSequencer", () => {
    const mockSequencerUrl = "http://mockUrl:1234";
    let axiosPostStub: SinonStub;
    beforeEach(() => {
      mockPubContext.config.sequencerUrl = mockSequencerUrl;
      axiosPostStub = stub(Mockable, "axiosPost").resolves({ data: "ok" });
    });
    it("send router status to the sequencer successfully", async () => {
      expect(() => sendStatusToSequencer()).to.not.throw;
    });
    it("should throw if sending failed", async () => {
      axiosPostStub.rejects({ response: { data: { message: "Forbidden" } } });
      expect(sendStatusToSequencer()).to.not.throw;
    });
    it("should fail to send router status", () => {
      axiosPostStub.rejects({ response: { error: "Bad Response" } });
      expect(sendStatusToSequencer()).to.not.throw;
    });
  });
});
