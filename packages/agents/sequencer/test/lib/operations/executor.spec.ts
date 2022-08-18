import { ExecutorData, ExecutorDataStatus, expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import Broker from "foo-foo-mq";
import {
  ExecutorVersionInvalid,
  GasEstimationFailed,
  MissingXCall,
  ParamsInvalid,
  ExecuteSlowCompleted,
} from "../../../src/lib/errors";
import { storeExecutorData } from "../../../src/lib/operations/executor";
import { ctxMock, getOperationsStub, getHelpersStub } from "../../globalTestHook";
import { mock } from "../../mock";
const { requestContext } = mock.loggingContext("EXECUTOR-TEST");

describe("Operations:Executor", () => {
  let getGelatoRelayerAddressStub: SinonStub;
  let getTransferStub: SinonStub;
  let storeTransferStub: SinonStub;
  let getExecutorDataStatusStub: SinonStub;
  let storeBackupDataStub: SinonStub;
  let setExecutorDataStatusStub: SinonStub;
  let storeExecutorDataStub: SinonStub;
  let publishStub: SinonStub;
  beforeEach(() => {
    const { mqClient } = ctxMock.adapters;
    const { executors, transfers } = ctxMock.adapters.cache;

    getGelatoRelayerAddressStub = stub();
    getTransferStub = stub(transfers, "getTransfer");
    storeTransferStub = stub(transfers, "storeTransfers");
    getExecutorDataStatusStub = stub(executors, "getExecutorDataStatus");
    storeBackupDataStub = stub(executors, "storeBackupData");
    setExecutorDataStatusStub = stub(executors, "setExecutorDataStatus");
    storeExecutorDataStub = stub(executors, "storeExecutorData");
    publishStub = ctxMock.adapters.mqClient.publish as SinonStub;

    getHelpersStub.returns({
      relayer: {
        getGelatoRelayerAddress: getGelatoRelayerAddressStub,
      },
    });
  });
  describe("#storeExecutorData", () => {
    it("should throw if params invalid", async () => {
      const mockExecutorData = {
        transferId: mkBytes32(),
        origin: "13337",
        executorVersion: "0.0.1",
        relayerFee: {
          amount: "aaa",
          asset: "0x",
        },
        encodedData: "0xabcde",
      } as ExecutorData;

      await expect(storeExecutorData(mockExecutorData, requestContext)).to.be.rejectedWith(ParamsInvalid);
    });
    it("should throw if executor version isn't supported by the sequencer", async () => {
      ctxMock.config.supportedVersion = "0.0.2";
      const mockExecutorData = mock.entity.executorData({ executorVersion: "0.0.1" });
      await expect(storeExecutorData(mockExecutorData, requestContext)).to.be.rejectedWith(ExecutorVersionInvalid);
    });

    it("should throw if transfer doesn't exist in the cache", async () => {
      getTransferStub.resolves(undefined);
      (ctxMock.adapters.subgraph.getOriginTransferById as SinonStub).resolves(undefined);
      const mockExecutorData = mock.entity.executorData();
      await expect(storeExecutorData(mockExecutorData, requestContext)).to.be.rejectedWith(MissingXCall);
    });

    it("should throw if gas estimation fails", async () => {
      getTransferStub.resolves(undefined);
      const mockTransfer = mock.entity.xtransfer();
      (ctxMock.adapters.subgraph.getOriginTransferById as SinonStub).resolves(mockTransfer);
      storeTransferStub.resolves();
      getGelatoRelayerAddressStub.resolves(mkAddress("0x111"));
      (ctxMock.adapters.chainreader.getGasEstimateWithRevertCode as SinonStub).throws();
      const mockExecutorData = mock.entity.executorData();
      await expect(storeExecutorData(mockExecutorData, requestContext)).to.be.rejectedWith(GasEstimationFailed);
    });

    it("should throw if the slow data got already executed", async () => {
      getTransferStub.resolves(undefined);
      const mockTransfer = mock.entity.xtransfer();
      (ctxMock.adapters.subgraph.getOriginTransferById as SinonStub).resolves(mockTransfer);
      storeTransferStub.resolves();
      getGelatoRelayerAddressStub.resolves(mkAddress("0x111"));
      getExecutorDataStatusStub.resolves(ExecutorDataStatus.Completed);
      const mockExecutorData = mock.entity.executorData();
      await expect(storeExecutorData(mockExecutorData, requestContext)).to.be.rejectedWith(ExecuteSlowCompleted);
    });
    it("should store executor data in the backup cache if its already being processed", async () => {
      getTransferStub.resolves(undefined);
      const mockTransfer = mock.entity.xtransfer();
      (ctxMock.adapters.subgraph.getOriginTransferById as SinonStub).resolves(mockTransfer);
      storeTransferStub.resolves();
      getGelatoRelayerAddressStub.resolves(mkAddress("0x111"));
      getExecutorDataStatusStub.resolves(ExecutorDataStatus.Pending);
      storeBackupDataStub.resolves(1);
      const mockExecutorData = mock.entity.executorData();
      await storeExecutorData(mockExecutorData, requestContext);
      expect(storeBackupDataStub.callCount).to.be.eq(1);
      storeBackupDataStub.resolves(2);
      await storeExecutorData(mockExecutorData, requestContext);
      expect(storeBackupDataStub.callCount).to.be.eq(2);
    });
    it("should publish data to the message queue successfully", async () => {
      getTransferStub.resolves(undefined);
      const mockTransfer = mock.entity.xtransfer();
      (ctxMock.adapters.subgraph.getOriginTransferById as SinonStub).resolves(mockTransfer);
      storeTransferStub.resolves();
      getGelatoRelayerAddressStub.resolves(mkAddress("0x111"));
      getExecutorDataStatusStub.resolves(ExecutorDataStatus.None);
      setExecutorDataStatusStub.resolves();
      storeExecutorDataStub.resolves();
      storeBackupDataStub.resolves(1);
      publishStub.resolves();
      const mockExecutorData = mock.entity.executorData();
      await storeExecutorData(mockExecutorData, requestContext);
      expect(publishStub.callCount).to.be.eq(1);
      expect(storeBackupDataStub.callCount).to.be.eq(0);
    });
  });
  describe("#executeSlowPathData", () => {
    it("should throw if transfer doesn't exist", async () => {});
    it("should throw if the executor data isn't the slow-liq transfer", async () => {});
    it("should throw if the status of executor data isn't pending", async () => {});
    it("should run a fallback mechanism by pulling the executor data from the backup cache", async () => {});
    it("should prune all the executor data if fails", async () => {});
    it("happy: should send the task to the gelato successfully", async () => {});
  });
});
