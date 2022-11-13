import { expect, MetaTxTask, mkBytes32 } from "@connext/nxtp-utils";
import { RelayerTaskStatus, RelayerType } from "@connext/nxtp-utils/dist/types/relayer";
import { stub, SinonStub } from "sinon";
import { MessageType } from "../../../src/lib/entities";
import { updateTask } from "../../../src/lib/operations/tasks";
import { ctxMock, getHelpersStub } from "../../globalTestHook";

describe("Operations:Tasks", () => {
  let executorGetTaskStub: SinonStub;
  let executorSetExecStatusStub: SinonStub;
  let executorPruneExecutorDataStub: SinonStub;

  let auctionsGetTaskStub: SinonStub;
  let auctionsSetExecStatusStub: SinonStub;

  let getTaskStatusFromGelatoStub: SinonStub;
  let getTaskStatusFromBackupRelayerStub: SinonStub;
  beforeEach(() => {
    const { executors, auctions } = ctxMock.adapters.cache;
    executorGetTaskStub = stub(executors, "getMetaTxTask");
    executorSetExecStatusStub = stub(executors, "setExecStatus");
    executorPruneExecutorDataStub = stub(executors, "pruneExecutorData");

    auctionsGetTaskStub = stub(auctions, "getMetaTxTask");
    auctionsSetExecStatusStub = stub(auctions, "setExecStatus");
    getTaskStatusFromGelatoStub = stub();
    getTaskStatusFromBackupRelayerStub = stub();
    getHelpersStub.returns({
      relayer: {
        getTaskStatusFromGelato: getTaskStatusFromGelatoStub,
        getTaskStatusFromBackupRelayer: getTaskStatusFromBackupRelayerStub,
      },
    });
  });

  describe("#updateTask", () => {
    it("should update fast-path task successfully", async () => {
      const mockTransferId1 = mkBytes32("0x111");

      const mockMetaTxTask = {
        timestamp: "100",
        taskId: "0xtask",
        attempts: 1,
      } as MetaTxTask;

      auctionsGetTaskStub.resolves(mockMetaTxTask);
      auctionsSetExecStatusStub.resolves();
      await updateTask(mockTransferId1, MessageType.ExecuteFast);
      expect(auctionsGetTaskStub.callCount).to.be.eq(1);
      expect(auctionsSetExecStatusStub.callCount).to.be.eq(1);
    });
  });

  it("should update slow-path task successfully", async () => {
    const mockTransferId1 = mkBytes32("0x111");

    const mockMetaTxTask = {
      timestamp: "100",
      taskId: "0xtask",
      attempts: 1,
    } as MetaTxTask;

    executorGetTaskStub.resolves(mockMetaTxTask);
    executorSetExecStatusStub.resolves();
    executorPruneExecutorDataStub.resolves();
    await updateTask(mockTransferId1, MessageType.ExecuteSlow);
    expect(executorGetTaskStub.callCount).to.be.eq(1);
    expect(executorSetExecStatusStub.callCount).to.be.eq(1);
    expect(executorPruneExecutorDataStub.callCount).to.be.eq(1);
  });
});
