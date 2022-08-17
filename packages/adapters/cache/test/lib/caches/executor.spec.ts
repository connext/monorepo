import { expect, ExecutorData, ExecutorDataStatus, Logger, mkBytes32 } from "@connext/nxtp-utils";
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

  describe("#storeExecutorData", () => {
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

  describe("#setExecutorDataStatus", () => {
    it("happy", async () => {
      await cache.setExecutorDataStatus(mockData1.transferId, ExecutorDataStatus.Pending);
      let status = await cache.getExecutorDataStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecutorDataStatus.Pending);
      await cache.setExecutorDataStatus(mockData1.transferId, ExecutorDataStatus.Sent);
      status = await cache.getExecutorDataStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecutorDataStatus.Sent);
      await cache.setExecutorDataStatus(mockData1.transferId, ExecutorDataStatus.Completed);
      status = await cache.getExecutorDataStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecutorDataStatus.Completed);
    });
  });

  describe("#getExecutorDataStatus", () => {
    it("should be none if no exists", async () => {
      let status = await cache.getExecutorDataStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecutorDataStatus.None);
    });
    it("happy", async () => {
      await cache.setExecutorDataStatus(mockData1.transferId, ExecutorDataStatus.Pending);
      let status = await cache.getExecutorDataStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecutorDataStatus.Pending);
      await cache.setExecutorDataStatus(mockData1.transferId, ExecutorDataStatus.Sent);
      status = await cache.getExecutorDataStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecutorDataStatus.Sent);
      await cache.setExecutorDataStatus(mockData1.transferId, ExecutorDataStatus.Completed);
      status = await cache.getExecutorDataStatus(mockData1.transferId);
      expect(status).to.be.eq(ExecutorDataStatus.Completed);
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

  describe("#pruneLighthouseData", () => {
    it("happy", async () => {
      await cache.storeExecutorData(mockData1);
      await cache.storeBackupData(mockData2);
      await cache.setExecutorDataStatus(mockTransferId, ExecutorDataStatus.Pending);
      await cache.pruneLighthouseData(mockTransferId);

      const executorData = await cache.getExecutorData(mockTransferId);
      expect(executorData).to.be.undefined;

      const backupData = await cache.getBackupData(mockTransferId);
      expect(backupData).to.be.deep.eq([]);

      const status = await cache.getExecutorDataStatus(mockTransferId);
      expect(status).to.be.eq(ExecutorDataStatus.None);
    });
  });
  describe("#upsertTask", () => {
    it("happy", async () => {
      const mockTaskId = mkBytes32("0x123");
      await cache.upsertTask({ transferId: mockTransferId, taskId: mockTaskId });
      const metaTxTask = await cache.getTask(mockTransferId);
      expect(metaTxTask?.taskId).to.be.eq(mockTaskId);
    });
  });
  describe("#getTask", () => {
    it("should be undefined", async () => {
      const metaTxTask = await cache.getTask(mockTransferId);
      expect(metaTxTask).to.be.undefined;
    });
    it("happy", async () => {
      const mockTaskId = mkBytes32("0x123");
      await cache.upsertTask({ transferId: mockTransferId, taskId: mockTaskId });
      const metaTxTask = await cache.getTask(mockTransferId);
      expect(metaTxTask?.taskId).to.be.eq(mockTaskId);
    });
  });

  describe("#getSentTransfers", () => {
    it("happy", async () => {
      const mockTransferId1 = mkBytes32("0x111");
      const mockTransferId2 = mkBytes32("0x222");
      const mockTransferId3 = mkBytes32("0x333");

      await cache.upsertTask({ transferId: mockTransferId1, taskId: mkBytes32("0x111") });
      await cache.upsertTask({ transferId: mockTransferId2, taskId: mkBytes32("0x222") });
      await cache.upsertTask({ transferId: mockTransferId3, taskId: mkBytes32("0x333") });

      const transferIds = await cache.getSentTransfers();
      expect(transferIds).to.be.deep.eq([mockTransferId1, mockTransferId2, mockTransferId3]);
    });
  });
});
