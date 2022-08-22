import { ExecStatus, expect, MetaTxTask, mkBytes32 } from "@connext/nxtp-utils";
import { GelatoTaskState } from "@connext/nxtp-utils/dist/types/relayer";
import { stub, SinonStub } from "sinon";
import { updateTask } from "../../../src/lib/operations/tasks";
import { ctxMock, getHelpersStub } from "../../globalTestHook";

describe("Operations:Tasks", () => {
  let getGelatoTaskStatusStub: SinonStub;
  let getSentTransfersStub: SinonStub;
  let getTaskStub: SinonStub;
  let setExecStatusStub: SinonStub;
  let getExecStatusStub: SinonStub;
  let pruneExecutorDataStub: SinonStub;
  beforeEach(() => {
    const { executors } = ctxMock.adapters.cache;
    getGelatoTaskStatusStub = stub();
    getSentTransfersStub = stub(executors, "getSentTransfers");
    getTaskStub = stub(executors, "getTask");
    setExecStatusStub = stub(executors, "setExecStatus");
    pruneExecutorDataStub = stub(executors, "pruneExecutorData");
    getExecStatusStub = stub(executors, "getExecStatus");

    getHelpersStub.returns({
      relayer: {
        getGelatoTaskStatus: getGelatoTaskStatusStub,
      },
    });
  });
  describe("#updateTask", () => {
    it("should update tasks successfully", async () => {
      const mockTransferId1 = mkBytes32("0x111");

      const mockMetaTxTask = {
        timestamp: "100",
        taskId: "0xtask",
        attempts: 1,
      } as MetaTxTask;

      getExecStatusStub.resolves(ExecStatus.Sent);
      getTaskStub.resolves(mockMetaTxTask);
      getGelatoTaskStatusStub.resolves(GelatoTaskState.ExecSuccess);
      setExecStatusStub.resolves();
      pruneExecutorDataStub.resolves();
      await updateTask(mockTransferId1);
      expect(getExecStatusStub.callCount).to.be.eq(1);
      expect(getTaskStub.callCount).to.be.eq(1);
      expect(getGelatoTaskStatusStub.callCount).to.be.eq(1);
      expect(setExecStatusStub.callCount).to.be.eq(1);
      expect(pruneExecutorDataStub.callCount).to.be.eq(1);
    });
  });
});
