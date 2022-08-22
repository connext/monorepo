import { expect, MetaTxTask, mkBytes32 } from "@connext/nxtp-utils";
import { GelatoTaskState } from "@connext/nxtp-utils/dist/types/relayer";
import { stub, SinonStub } from "sinon";
import { updateTasks } from "../../../src/lib/operations/tasks";
import { ctxMock, getHelpersStub } from "../../globalTestHook";

describe("Operations:Tasks", () => {
  let getGelatoTaskStatusStub: SinonStub;
  let getSentTransfersStub: SinonStub;
  let getTaskStub: SinonStub;
  let setExecutorDataStatusStub: SinonStub;
  let pruneExecutorDataStub: SinonStub;
  beforeEach(() => {
    const { executors } = ctxMock.adapters.cache;
    getGelatoTaskStatusStub = stub();
    getSentTransfersStub = stub(executors, "getSentTransfers");
    getTaskStub = stub(executors, "getTask");
    setExecutorDataStatusStub = stub(executors, "setExecutorDataStatus");
    pruneExecutorDataStub = stub(executors, "pruneExecutorData");

    getHelpersStub.returns({
      relayer: {
        getGelatoTaskStatus: getGelatoTaskStatusStub,
      },
    });
  });
  describe("#updateTasks", () => {
    it("should update tasks successfully", async () => {
      const mockTransferId1 = mkBytes32("0x111");
      const mockTransferId2 = mkBytes32("0x222");
      const mockTransferId3 = mkBytes32("0x333");

      const mockMetaTxTask = {
        timestamp: "100",
        taskId: "0xtask",
        attempts: 1,
      } as MetaTxTask;

      getSentTransfersStub.resolves([mockTransferId1, mockTransferId2, mockTransferId3]);
      getTaskStub.resolves(mockMetaTxTask);
      getGelatoTaskStatusStub.resolves(GelatoTaskState.ExecSuccess);
      setExecutorDataStatusStub.resolves();
      pruneExecutorDataStub.resolves();
      await updateTasks();
      expect(getSentTransfersStub.callCount).to.be.eq(1);
      expect(getTaskStub.callCount).to.be.eq(3);
      expect(getGelatoTaskStatusStub.callCount).to.be.eq(3);
      expect(setExecutorDataStatusStub.callCount).to.be.eq(3);
      expect(pruneExecutorDataStub.callCount).to.be.eq(3);
    });
  });
});
