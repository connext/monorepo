import {
  ExecutorData,
  ExecStatus,
  expect,
  mkAddress,
  mkBytes32,
  RelayerType,
  getNtpTimeSeconds,
} from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { MessageType } from "../../../../src/lib/entities";
import {
  MissingXCall,
  ParamsInvalid,
  ExecuteSlowCompleted,
  MissingTransfer,
  MissingExecutorData,
  ExecutorDataExpired,
  RelayerSendFailed,
} from "../../../../src/lib/errors";
import { executeSlowPathData, storeSlowPathData } from "../../../../src/lib/operations/execute";
import { ctxMock, getOperationsStub, getHelpersStub } from "../../../globalTestHook";
import { mock } from "../../../mock";
const { requestContext } = mock.loggingContext("EXECUTOR-TEST");

describe("Operations:Execute:SlowPath", () => {
  let getGelatoRelayerAddressStub: SinonStub;
  let getTransferStub: SinonStub;
  let storeTransferStub: SinonStub;
  let getExecutorDataStub: SinonStub;
  let getExecStatusStub: SinonStub;
  let getExecStatusTimeStub: SinonStub;
  let storeBackupDataStub: SinonStub;
  let setExecStatusStub: SinonStub;
  let storeSlowPathDataStub: SinonStub;
  let sendExecuteSlowToRelayerStub: SinonStub;
  let getBackupDataStub: SinonStub;
  let upsertTaskStub: SinonStub;
  let pruneExecutorDataStub: SinonStub;
  let canSubmitToRelayerStub: SinonStub;
  beforeEach(() => {
    const { executors, transfers } = ctxMock.adapters.cache;

    getTransferStub = stub(transfers, "getTransfer");
    storeTransferStub = stub(transfers, "storeTransfers");
    getExecutorDataStub = stub(executors, "getExecutorData");
    getExecStatusStub = stub(executors, "getExecStatus");
    getExecStatusTimeStub = stub(executors, "getExecStatusTime");
    storeBackupDataStub = stub(executors, "storeBackupData");
    setExecStatusStub = stub(executors, "setExecStatus");
    storeSlowPathDataStub = stub(executors, "storeExecutorData");
    getBackupDataStub = stub(executors, "getBackupData");
    upsertTaskStub = stub(executors, "upsertMetaTxTask");
    pruneExecutorDataStub = stub(executors, "pruneExecutorData");

    canSubmitToRelayerStub = stub().resolves({ canSubmit: true, needed: "0" });

    getGelatoRelayerAddressStub = stub();
    getHelpersStub.returns({
      relayer: {
        getGelatoRelayerAddress: getGelatoRelayerAddressStub,
      },
      relayerfee: { canSubmitToRelayer: canSubmitToRelayerStub },
    });

    sendExecuteSlowToRelayerStub = stub();
    getOperationsStub.returns({
      relayer: {
        sendExecuteSlowToRelayer: sendExecuteSlowToRelayerStub,
      },
    });
  });
  describe("#storeSlowPathData", () => {
    it("should throw if transfer doesn't exist in the cache", async () => {
      getTransferStub.resolves(undefined);
      (ctxMock.adapters.subgraph.getOriginTransferById as SinonStub).resolves(undefined);
      const mockExecutorData = mock.entity.executorData();
      await expect(storeSlowPathData(mockExecutorData, requestContext)).to.be.rejectedWith(MissingXCall);
    });

    it("should throw if the slow data got already executed", async () => {
      getTransferStub.resolves(undefined);
      const mockTransfer = mock.entity.xtransfer();
      (ctxMock.adapters.subgraph.getOriginTransferById as SinonStub).resolves(mockTransfer);
      storeTransferStub.resolves();
      getGelatoRelayerAddressStub.resolves(mkAddress("0x111"));
      getExecStatusStub.resolves(ExecStatus.Completed);
      const mockExecutorData = mock.entity.executorData();
      await expect(storeSlowPathData(mockExecutorData, requestContext)).to.be.rejectedWith(ExecuteSlowCompleted);
    });
    it("should store executor data in the backup cache if its already being processed", async () => {
      getTransferStub.resolves(undefined);
      const mockTransfer = mock.entity.xtransfer();
      (ctxMock.adapters.subgraph.getOriginTransferById as SinonStub).resolves(mockTransfer);
      storeTransferStub.resolves();
      getGelatoRelayerAddressStub.resolves(mkAddress("0x111"));
      getExecStatusStub.resolves(ExecStatus.Enqueued);
      getExecStatusTimeStub.resolves(getNtpTimeSeconds());
      storeBackupDataStub.resolves(1);
      const mockExecutorData = mock.entity.executorData();
      await storeSlowPathData(mockExecutorData, requestContext);
      expect(storeBackupDataStub.callCount).to.be.eq(1);
      storeBackupDataStub.resolves(2);
      await storeSlowPathData(mockExecutorData, requestContext);
      expect(storeBackupDataStub.callCount).to.be.eq(2);
    });
    it("should publish data to the message queue successfully", async () => {
      getTransferStub.resolves(undefined);
      const mockTransfer = mock.entity.xtransfer();
      (ctxMock.adapters.subgraph.getOriginTransferById as SinonStub).resolves(mockTransfer);
      storeTransferStub.resolves();
      getGelatoRelayerAddressStub.resolves(mkAddress("0x111"));
      getExecStatusStub.resolves(ExecStatus.None);
      setExecStatusStub.resolves();
      storeSlowPathDataStub.resolves();
      storeBackupDataStub.resolves(1);
      const mockExecutorData = mock.entity.executorData();
      await storeSlowPathData(mockExecutorData, requestContext);
      expect(storeBackupDataStub.callCount).to.be.eq(0);
    });
  });
  describe("#executeSlowPathData", () => {
    it("should throw if transfer doesn't exist", async () => {
      const mockTransferId = mkBytes32();
      getTransferStub.resolves(undefined);
      getExecutorDataStub.resolves(mock.entity.executorData());
      await expect(executeSlowPathData(mockTransferId, MessageType.ExecuteSlow, requestContext)).to.be.rejectedWith(
        MissingTransfer,
      );
    });

    it("should throw if the executor data is missing", async () => {
      const mockTransferId = mkBytes32();
      const mockTransfer = mock.entity.xtransfer({ transferId: mockTransferId });
      getTransferStub.resolves(mockTransfer);
      getExecutorDataStub.resolves(undefined);
      await expect(executeSlowPathData(mockTransferId, MessageType.ExecuteSlow, requestContext)).to.be.rejectedWith(
        MissingExecutorData,
      );
    });

    it("should throw if the status of executor data isn't pending", async () => {
      const mockTransferId = mkBytes32();
      const mockTransfer = mock.entity.xtransfer({ transferId: mockTransferId });
      getTransferStub.resolves(mockTransfer);
      getExecutorDataStub.resolves(mock.entity.executorData());
      getExecStatusStub.resolves(ExecStatus.Sent);
      await expect(executeSlowPathData(mockTransferId, MessageType.ExecuteSlow, requestContext)).to.be.rejectedWith(
        ExecutorDataExpired,
      );
    });

    it("should run a fallback mechanism by pulling the executor data from the backup cache", async () => {
      const mockTransferId = mkBytes32();
      const mockTransfer = mock.entity.xtransfer({ transferId: mockTransferId });

      const mockExecutorData = mock.entity.executorData({ transferId: mockTransferId });
      const mockExecutorBackupData1 = mock.entity.executorData({
        transferId: mockTransferId,
        encodedData: "0x11111",
      });
      const mockExecutorBackupData2 = mock.entity.executorData({
        transferId: mockTransferId,
        encodedData: "0x22222",
      });
      const mockTaskId = mkBytes32("0xmockTask");

      getTransferStub.resolves(mockTransfer);
      getExecutorDataStub.resolves(mockExecutorData);
      getExecStatusStub.resolves(ExecStatus.Dequeued);
      getBackupDataStub.resolves([mockExecutorBackupData1, mockExecutorBackupData2]);
      sendExecuteSlowToRelayerStub.onCall(0).throws("Failed to send to the gelato");
      sendExecuteSlowToRelayerStub.onCall(1).resolves({ taskId: undefined, relayer: undefined });
      sendExecuteSlowToRelayerStub.onCall(2).resolves({ taskId: mockTaskId, relayer: RelayerType.Mock });
      setExecStatusStub.resolves();
      upsertTaskStub.resolves();
      await expect(executeSlowPathData(mockTransferId, MessageType.ExecuteSlow, requestContext)).to.not.rejected;
      expect(sendExecuteSlowToRelayerStub.callCount).to.be.eq(3);
    });

    it("should prune all the executor data if fails", async () => {
      const mockTransferId = mkBytes32();
      const mockTransfer = mock.entity.xtransfer({ transferId: mockTransferId });

      const mockExecutorData = mock.entity.executorData({ transferId: mockTransferId });
      const mockExecutorBackupData1 = mock.entity.executorData({
        transferId: mockTransferId,
        encodedData: "0x11111",
      });
      const mockExecutorBackupData2 = mock.entity.executorData({
        transferId: mockTransferId,
        encodedData: "0x22222",
      });

      getTransferStub.resolves(mockTransfer);
      getExecutorDataStub.resolves(mockExecutorData);
      getExecStatusStub.resolves(ExecStatus.Dequeued);
      getBackupDataStub.resolves([mockExecutorBackupData1, mockExecutorBackupData2]);
      sendExecuteSlowToRelayerStub.onCall(0).throws("Failed to send to the gelato");
      sendExecuteSlowToRelayerStub.onCall(1).resolves({ taskId: undefined, relayer: undefined });
      sendExecuteSlowToRelayerStub.onCall(2).resolves({ taskId: undefined, relayer: undefined });
      setExecStatusStub.resolves();
      upsertTaskStub.resolves();
      pruneExecutorDataStub.resolves();
      await expect(executeSlowPathData(mockTransferId, MessageType.ExecuteSlow, requestContext)).to.be.rejectedWith(
        RelayerSendFailed,
      );
      expect(sendExecuteSlowToRelayerStub.callCount).to.be.eq(3);
      expect(setExecStatusStub.callCount).to.be.eq(0);
      expect(upsertTaskStub.callCount).to.be.eq(0);
      expect(pruneExecutorDataStub.callCount).to.be.eq(1);
    });
  });
});
