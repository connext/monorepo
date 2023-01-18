import { stub, SinonStub } from "sinon";
import {
  Logger,
  expect,
  mock,
  mkAddress,
  getRandomBytes32,
  getNtpTimeSeconds,
  RelayerTaskStatus,
} from "@connext/nxtp-utils";

import { CachedTaskData, TasksCache } from "../../../src/lib/caches/tasks";

const RedisMock = require("ioredis-mock");
const redis = new RedisMock();

describe("TasksCache", () => {
  const prefix = "tasks";
  // Helpers for accessing mock cache directly and altering state.
  const mockRedisHelpers = {
    createTask: async (taskId: string, data: CachedTaskData) => {
      await redis.hset(`${prefix}:data`, taskId, JSON.stringify(data));
    },
    getTask: async (taskId: string): Promise<CachedTaskData | null> => {
      const res = await redis.hget(`${prefix}:data`, taskId);
      return res ? (JSON.parse(res) as CachedTaskData) : null;
    },

    setStatus: async (taskId: string, status: RelayerTaskStatus) =>
      await redis.hset(`${prefix}:status`, taskId, status),
    getStatus: async (taskId: string): Promise<RelayerTaskStatus | null> => {
      const res = await redis.hget(`${prefix}:status`, taskId);
      return res ? RelayerTaskStatus[res as RelayerTaskStatus] : null;
    },

    setError: async (taskId: string, error: string) => await redis.hset(`${prefix}:error`, taskId, error),
    getError: async (taskId: string): Promise<string | null> => {
      const res = await redis.hget(`${prefix}:error`, taskId);
      return res ? (res as string) : null;
    },
  };

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

  let cache: TasksCache;
  beforeEach(() => {
    cache = new TasksCache({ host: "mock", port: 1234, mock: true, logger });
  });

  afterEach(async () => {
    await redis.flushall();
  });

  describe("#getTask", () => {
    it("happy: should retrieve existing auction data", async () => {
      const taskId = getRandomBytes32();
      await mockRedisHelpers.createTask(taskId, mockTask);
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
      const task = await mockRedisHelpers.getTask(taskId);
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
        await mockRedisHelpers.setStatus(taskId, status);
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

      const resOne = await (cache as any).setStatus(taskId, RelayerTaskStatus.ExecPending);
      expect(resOne).to.eq(1);
      expect(await mockRedisHelpers.getStatus(taskId)).to.eq(RelayerTaskStatus.ExecPending);

      const resTwo = await (cache as any).setStatus(taskId, RelayerTaskStatus.ExecSuccess);
      expect(resTwo).to.eq(0);
      expect(await mockRedisHelpers.getStatus(taskId)).to.eq(RelayerTaskStatus.ExecSuccess);
    });
  });

  describe("#getError", () => {
    it("happy: should retrieve existing task error", async () => {
      const taskId = getRandomBytes32();
      const error = "some error";
      await mockRedisHelpers.setError(taskId, error);
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

      const found = await mockRedisHelpers.getError(taskId);
      expect(found).to.be.eq(error);
    });
  });

  describe("#getPending", () => {
    const mockTaskIdBatch = (count: number) => new Array(count).fill(0).map(() => getRandomBytes32());

    it("happy: should retrieve existing pending tasks", async () => {
      const taskIds = mockTaskIdBatch(10);
      for (const taskId of taskIds) {
        await mockRedisHelpers.setStatus(taskId, RelayerTaskStatus.ExecPending);
      }

      const res = await cache.getPending();
      expect(res).to.deep.eq(taskIds);
    });

    it("should not retrieve tasks of other statuses", async () => {
      const pendingTaskIds = mockTaskIdBatch(10);
      for (const taskId of pendingTaskIds) {
        await mockRedisHelpers.setStatus(taskId, RelayerTaskStatus.ExecPending);
      }

      // Simulate: a lot have been sent already.
      const completedTaskIds = mockTaskIdBatch(1234);
      for (const taskId of completedTaskIds) {
        await mockRedisHelpers.setStatus(taskId, RelayerTaskStatus.ExecSuccess);
      }

      const res = await cache.getPending();
      expect(res).to.deep.eq(pendingTaskIds);
    });

    it("should return empty array if no tasks have pending status", async () => {
      const completedTaskIds = mockTaskIdBatch(27);
      for (const taskId of completedTaskIds) {
        await mockRedisHelpers.setStatus(taskId, RelayerTaskStatus.ExecSuccess);
      }

      const res = await cache.getPending();
      expect(res).to.deep.eq([]);
    });

    it("sad: should return empty array if no pending tasks exist", async () => {
      const res = await cache.getPending();
      expect(res).to.deep.eq([]);
    });
  });
});
