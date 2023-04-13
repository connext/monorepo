import { createLoggingContext, expect, mkBytes32 } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { sendExecuteSlowToSequencer } from "../../../src/tasks/executor/operations";
import { mock } from "../../mock";
import * as MockableFns from "../../../src/mockable";
import { mockExecutorContext } from "../../globalTestHook";

const { requestContext } = createLoggingContext("TEST");
describe("Operations:Sequencer", () => {
  let axiosPostStub: SinonStub;
  beforeEach(() => {
    axiosPostStub = stub(MockableFns, "axiosPost");
  });
  describe("#sendExecuteSlowToSequencer", () => {
    it("should still send a meta tx if gas estimation fails", async () => {
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      const encodedDataMock = "0xabcde";
      (mockExecutorContext.adapters.chainreader.getGasEstimateWithRevertCode as SinonStub).throws();
      await sendExecuteSlowToSequencer(executeArgs, encodedDataMock, transferId, requestContext);
      expect(axiosPostStub.callCount).to.be.eq(1);
    });

    it("should keep running even if response/response.data is empty", async () => {
      axiosPostStub.resolves({ code: 200, message: "success" });
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      const encodedDataMock = "0xabcde";
      await expect(sendExecuteSlowToSequencer(executeArgs, encodedDataMock, transferId, requestContext)).to.not
        .rejected;
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
