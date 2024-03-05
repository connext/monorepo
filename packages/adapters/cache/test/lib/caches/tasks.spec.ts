import { stub, SinonStub } from "sinon";
import {
  Logger,
  expect,
  mock,
  mkAddress,
  getRandomBytes32,
  getNtpTimeSeconds,
  RelayerTaskStatus,
  ExecStatus,
} from "@connext/nxtp-utils";

import { CachedTaskData, TasksCache } from "../../../src/lib/caches/tasks";

const RedisMock = require("ioredis-mock");
const redis = new RedisMock();

describe("TasksCache", () => {
  const logger = new Logger({ level: "debug" });

  const mockTask = {
    chain: 1,
    to: mkAddress("0xabcdef"),
    data: getRandomBytes32(),
    fee: {
      amount: "1",
      token: mkAddress("0x12345"),
      chain: 2,
    },
  };

  const createMockTasks = async (count: number): Promise<string[]> => {
    const tasks: string[] = [];
    for (let i = 0; i < count; i++) {
      const taskId = await cache.createTask(mockTask);
      tasks.push(taskId);
    }

    return tasks;
  };

  let cache: TasksCache;
  beforeEach(() => {
    cache = new TasksCache({ host: "mock", port: 1234, mock: true, logger });
  });

  afterEach(async () => {
    await redis.flushall();
  });

  describe("#getTask", () => {
    it("happy: should retrieve existing auction data", async () => {
      const taskId = await cache.createTask(mockTask);
      const res = await cache.getTask(taskId);
      expect(res).to.be.deep.eq(mockTask);
    });

    it("sad: should return undefined if auction data does not exist", async () => {
      const taskId = getRandomBytes32();
      const res = await cache.getTask(taskId);
      expect(res).to.be.undefined;
    });
  });

  describe("#createTask", () => {
    let setStatusStub: SinonStub;
    beforeEach(() => {
      setStatusStub = stub(cache as any, "setStatus").resolves(undefined);
    });

    afterEach(() => {
      setStatusStub.restore();
    });

    it("happy: should create new task data", async () => {
      const taskId = await cache.createTask(mockTask);
      // Should return random task ID.
      expect(taskId.length).to.be.eq(getRandomBytes32().length);
      expect(setStatusStub.calledOnce).to.be.true;
      expect(setStatusStub).to.have.been.calledOnceWithExactly(taskId, RelayerTaskStatus.ExecPending);
      const task = await cache.getTask(taskId);
      expect(task).to.deep.eq(mockTask);
    });
  });

  describe("#getStatus", () => {
    it("happy: should retrieve existing task status", async () => {
      for (const status of [
        RelayerTaskStatus.ExecPending,
        RelayerTaskStatus.Cancelled,
        RelayerTaskStatus.ExecSuccess,
      ]) {
        const taskId = getRandomBytes32();
        await cache.setStatus(taskId, status);
        const res = await cache.getStatus(taskId);
        expect(res).to.eq(status);
      }
    });

    it("sad: should return RelayerTaskStatus.NotFound if task status does not exist", async () => {
      const taskId = getRandomBytes32();
      const res = await cache.getStatus(taskId);
      expect(res).to.eq(RelayerTaskStatus.NotFound);
    });
  });

  describe("#setStatus", () => {
    it("happy: should set status", async () => {
      const taskId = getRandomBytes32();

      const resOne = await cache.setStatus(taskId, RelayerTaskStatus.ExecPending);
      expect(resOne).to.eq(1);
      expect(await cache.getStatus(taskId)).to.eq(RelayerTaskStatus.ExecPending);

      const resTwo = await cache.setStatus(taskId, RelayerTaskStatus.ExecSuccess);
      expect(resTwo).to.eq(0);
      expect(await cache.getStatus(taskId)).to.eq(RelayerTaskStatus.ExecSuccess);
    });

    it("happy: should clear data cache, remove taskId from pending", async () => {
      const taskIds = await createMockTasks(10);
      for (const taskId of taskIds) {
        const taskData = await cache.getTask(taskId);
        expect(taskData).to.be.not.undefined;
      }

      let pendings = await cache.getPending(0, 100);
      expect(pendings.length).to.be.eq(10);

      // Update a task status
      const taskId1 = taskIds[0];
      await cache.setStatus(taskId1, RelayerTaskStatus.ExecSuccess);
      const task1Data = await cache.getTask(taskId1);
      expect(task1Data).to.be.undefined;
      pendings = await cache.getPending(0, 100);
      expect(pendings.length).to.be.eq(9);
    });
  });

  describe("#getError", () => {
    it("happy: should retrieve existing task error", async () => {
      const taskId = getRandomBytes32();
      const error = "some error";
      await cache.setError(taskId, error);
      const res = await cache.getError(taskId);
      expect(res).to.deep.eq(error);
    });

    it("sad: should return undefined if task error does not exist", async () => {
      const taskId = getRandomBytes32();
      const res = await cache.getError(taskId);
      expect(res).to.eq(undefined);
    });
  });

  describe("#setError", () => {
    it("happy: should set task error", async () => {
      const taskId = getRandomBytes32();
      const error = "some error";
      const res = await cache.setError(taskId, error);
      expect(res).to.eq(1);

      const found = await cache.getError(taskId);
      expect(found).to.be.eq(error);
    });
  });

  describe("#getPending", () => {
    it("happy: should retrieve existing pending tasks", async () => {
      const taskIds = await createMockTasks(10);
      const res = await cache.getPending(0, 100);
      expect(res).to.deep.eq(taskIds);
    });

    it("should not retrieve tasks of other statuses", async () => {
      const taskIds = await createMockTasks(10);

      // Simulate: a lot have been sent already.
      const pendingTaskIds: string[] = [];
      for (let i = 0; i < taskIds.length; i++) {
        const taskId = taskIds[i];
        if (i % 2 == 0) {
          await cache.setStatus(taskId, RelayerTaskStatus.ExecSuccess);
        } else {
          pendingTaskIds.push(taskId);
        }
      }

      const res = await cache.getPending(0, 100);
      expect(res).to.deep.eq(pendingTaskIds);
    });

    it("should return empty array if no tasks have pending status", async () => {
      const taskIds = await createMockTasks(10);

      for (let i = 0; i < taskIds.length; i++) {
        await cache.setStatus(taskIds[i], RelayerTaskStatus.ExecSuccess);
      }

      const res = await cache.getPending(0, 100);
      expect(res).to.deep.eq([]);
    });

    it("sad: should return empty array if no pending tasks exist", async () => {
      const res = await cache.getPending(0, 100);
      expect(res).to.deep.eq([]);
    });
  });
});
