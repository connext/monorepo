import { createLoggingContext, expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";
import { sendExecuteSlowToSequencer } from "../../../src/tasks/executor/operations";
import { mock } from "../../mock";
import * as MockableFns from "../../../src/mockable";
import { mockExecutorContext } from "../../globalTestHook";
import { SequencerResponseInvalid } from "../../../src/errors";

const { requestContext } = createLoggingContext("TEST");
describe("Operations:Sequencer", () => {
  let axiosPostStub: SinonStub;
  beforeEach(() => {
    axiosPostStub = stub(MockableFns, "axiosPost");
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#sendExecuteSlowToSequencer", () => {
    it("should not send a meta tx if gas estimation fails", async () => {
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      const encodedDataMock = "0xabcde";
      (mockExecutorContext.adapters.chainreader.getGasEstimateWithRevertCode as SinonStub).throws();
      await sendExecuteSlowToSequencer(executeArgs, encodedDataMock, transferId, requestContext);
      expect(axiosPostStub.callCount).to.be.eq(0);
    });

    it("should throw SequencerResponseInvalid error if response/response.data is empty", async () => {
      axiosPostStub.resolves({ code: 200, message: "success" });
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      const encodedDataMock = "0xabcde";
      await expect(
        sendExecuteSlowToSequencer(executeArgs, encodedDataMock, transferId, requestContext),
      ).to.be.rejectedWith(SequencerResponseInvalid);
      expect(axiosPostStub.callCount).to.be.eq(1);
    });

    it("should send a meta tx to the sequencer successfully", async () => {
      axiosPostStub.resolves({ code: 200, message: "success", data: "OK" });
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      const encodedDataMock = "0xabcde";
      await expect(sendExecuteSlowToSequencer(executeArgs, encodedDataMock, transferId, requestContext)).to.not
        .rejected;
      expect(axiosPostStub.callCount).to.be.eq(1);
    });
  });
});
