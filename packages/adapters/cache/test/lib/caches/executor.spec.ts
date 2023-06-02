import { expect, ExecutorData, ExecStatus, Logger, mkBytes32, RelayerType } from "@connext/nxtp-utils";
import { constants } from "ethers";
import { ExecutorCache } from "../../../src";

const RedisMock = require("ioredis-mock");
const redis = new RedisMock();

describe("ExecutorCache", () => {
  const logger = new Logger({ level: "debug" });

  const mockTransferId = mkBytes32("0x111");
  const mockData1: ExecutorData = {
    executorVersion: "0.0.1",
    transferId: mockTransferId,
    origin: "13337",
    relayerFee: {
      amount: "100",
      asset: constants.AddressZero,
    },
    encodedData: "0xMockEncoded",
  };
  const mockData2: ExecutorData = {
    executorVersion: "0.0.1",
    transferId: mockTransferId,
    origin: "13337",
    relayerFee: {
      amount: "101",
      asset: constants.AddressZero,
    },
    encodedData: "0xMockEncoded",
  };

  let cache: ExecutorCache;
  beforeEach(async () => {
    cache = new ExecutorCache({ host: "mock", port: 1234, mock: true, logger });
  });

  afterEach(async () => {
    await redis.flushall();
  });

  describe("#storeSlowPathData", () => {
    it("happy: should store lighthosue data successfully", async () => {
      await cache.storeExecutorData(mockData1);
      const mockTransferId = mockData1.transferId;
      const lightHouseData = await cache.getExecutorData(mockTransferId);
      expect(lightHouseData).to.be.deep.eq(mockData1);
    });
  });

  describe("#getExecutorData", () => {
    it("should return undefined if no exists", async () => {
      const mockTransferId = mockData1.transferId;
      const lightHouseData = await cache.getExecutorData(mockTransferId);
      expect(lightHouseData).to.be.undefined;
    });
    it("happy: should return lighthouse data if exists", async () => {
      const mockTransferId = mockData1.transferId;
      let lightHouseData = await cache.getExecutorData(mockTransferId);
      expect(lightHouseData).to.be.undefined;
      await cache.storeExecutorData(mockData1);
      lightHouseData = await cache.getExecutorData(mockTransferId);
      expect(lightHouseData).to.be.deep.eq(mockData1);
    });
  });

  describe("#setExecStatus", () => {
    it("happy", async () => {
      await cache.setExecStatus(mockData1.transferId, ExecStatus.Enqueued);
      let status = await cache.getExecStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecStatus.Enqueued);
      await cache.setExecStatus(mockData1.transferId, ExecStatus.Sent);
      status = await cache.getExecStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecStatus.Sent);
      await cache.setExecStatus(mockData1.transferId, ExecStatus.Completed);
      status = await cache.getExecStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecStatus.Completed);
    });
  });

  describe("#getExecStatus", () => {
    it("should be none if no exists", async () => {
      let status = await cache.getExecStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecStatus.None);
    });
    it("happy", async () => {
      await cache.setExecStatus(mockData1.transferId, ExecStatus.Enqueued);
      let status = await cache.getExecStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecStatus.Enqueued);
      await cache.setExecStatus(mockData1.transferId, ExecStatus.Sent);
      status = await cache.getExecStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecStatus.Sent);
      await cache.setExecStatus(mockData1.transferId, ExecStatus.Completed);
      status = await cache.getExecStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecStatus.Completed);
    });
  });

  describe("#storeBackupData", () => {
    it("happy: should store data in the backup cache successfully", async () => {
      await cache.storeBackupData(mockData1);
      await cache.storeBackupData(mockData2);
      const backupData = await cache.getBackupData(mockTransferId);
      expect(backupData).to.be.deep.eq([mockData1, mockData2]);
    });
    it("should skip if same raw data already exists", async () => {
      await cache.storeBackupData(mockData1);
      const res = await cache.storeBackupData(mockData1);
      expect(res).to.be.eq(2);
      const backupData = await cache.getBackupData(mockTransferId);
      expect(backupData).to.be.deep.eq([mockData1]);
    });
  });

  describe("#getBackupData", () => {
    it("happy", async () => {
      await cache.storeBackupData(mockData1);
      await cache.storeBackupData(mockData2);
      const backupData = await cache.getBackupData(mockTransferId);
      expect(backupData).to.be.deep.eq([mockData1, mockData2]);
    });
  });

  describe("#pruneExecutorData", () => {
    it("happy", async () => {
      await cache.storeExecutorData(mockData1);
      await cache.storeBackupData(mockData2);
      await cache.setExecStatus(mockTransferId, ExecStatus.Enqueued);
      await cache.pruneExecutorData(mockTransferId);

      const executorData = await cache.getExecutorData(mockTransferId);
      expect(executorData).to.be.undefined;

      const backupData = await cache.getBackupData(mockTransferId);
      expect(backupData).to.be.deep.eq([]);

      const status = await cache.getExecStatus(mockTransferId);
      expect(status).to.be.eq(ExecStatus.None);
    });
  });
  describe("#upsertTask", () => {
    it("happy", async () => {
      const mockTaskId = mkBytes32("0x123");
      await cache.upsertMetaTxTask({
        transferId: mockTransferId,
        taskId: mockTaskId,
        relayer: RelayerType.Mock,
      });
      const metaTxTask = await cache.getMetaTxTask(mockTransferId);
      expect(metaTxTask?.taskId).to.be.eq(mockTaskId);
    });
  });
  describe("#getMetaTxTask", () => {
    it("should be undefined", async () => {
      const metaTxTask = await cache.getMetaTxTask(mockTransferId);
      expect(metaTxTask).to.be.undefined;
    });
    it("happy", async () => {
      const mockTaskId = mkBytes32("0x123");
      await cache.upsertMetaTxTask({
        transferId: mockTransferId,
        taskId: mockTaskId,
        relayer: RelayerType.Mock,
      });
      const metaTxTask = await cache.getMetaTxTask(mockTransferId);
      expect(metaTxTask?.taskId).to.be.eq(mockTaskId);
    });
  });

  describe("#getSentTransfers", () => {
    it("happy", async () => {
      const mockTransferId1 = mkBytes32("0x111");
      const mockTransferId2 = mkBytes32("0x222");
      const mockTransferId3 = mkBytes32("0x333");

      await cache.upsertMetaTxTask({
        transferId: mockTransferId1,
        taskId: mkBytes32("0x111"),
        relayer: RelayerType.Mock,
      });
      await cache.upsertMetaTxTask({
        transferId: mockTransferId2,
        taskId: mkBytes32("0x222"),
        relayer: RelayerType.Mock,
      });
      await cache.upsertMetaTxTask({
        transferId: mockTransferId3,
        taskId: mkBytes32("0x333"),
        relayer: RelayerType.Mock,
      });

      const transferIds = await cache.getSentTransfers();
      expect(transferIds).to.be.deep.eq([mockTransferId1, mockTransferId2, mockTransferId3]);
    });
  });
});
