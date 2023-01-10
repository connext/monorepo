import { stub, SinonStub } from "sinon";
import {
  Logger,
  expect,
  mkAddress,
  getRandomBytes32,
  RelayerTaskStatus,
  getNtpTimeSeconds,
  delay,
} from "@connext/nxtp-utils";

import { TasksCache } from "../../../src/lib/caches/tasks";

const RedisMock = require("ioredis-mock");
const redis = new RedisMock();

describe("TasksCache", () => {
  const mockTaskIdBatch = (count: number) => new Array(count).fill(0).map(() => getRandomBytes32());
  const mockCachedTasksBatch = (count: number) =>
    new Array(count).fill(0).map(() => {
      return {
        chain: 1,
        to: mkAddress("0xabcdef"),
        data: getRandomBytes32(),
        fee: {
          amount: "1",
          token: mkAddress("0x12345"),
          chain: 2,
        },
      };
    });
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

  let tasksCache: TasksCache;
  beforeEach(() => {
    tasksCache = new TasksCache({ host: "mock", port: 1234, mock: true, logger });
  });

  afterEach(async () => {
    await redis.flushall();
  });

  describe("#getTask", () => {
    it("happy: should retrieve existing auction data", async () => {
      const taskId = await tasksCache.createTask(mockTask);
      const res = await tasksCache.getTask(taskId);
      expect(res).to.be.deep.eq(mockTask);
    });

    it("sad: should return undefined if auction data does not exist", async () => {
      const taskId = getRandomBytes32();
      const res = await tasksCache.getTask(taskId);
      expect(res).to.be.undefined;
    });
  });

  describe("#createTask", () => {
    let setStatusStub: SinonStub;
    beforeEach(() => {
      setStatusStub = stub(tasksCache as any, "setStatus").resolves(undefined);
    });

    afterEach(() => {
      setStatusStub.restore();
    });

    it("happy: should create new task data", async () => {
      const taskId = await tasksCache.createTask(mockTask);
      // Should return random task ID.
      expect(taskId.length).to.be.eq(getRandomBytes32().length);
      expect(setStatusStub.calledOnce).to.be.true;
      expect(setStatusStub).to.have.been.calledOnceWithExactly(taskId, RelayerTaskStatus.ExecPending);
      const task = await tasksCache.getTask(taskId);
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
        await tasksCache.setStatus(taskId, status);
        const res = await tasksCache.getStatus(taskId);
        expect(res).to.eq(status);
      }
    });

    it("sad: should return RelayerTaskStatus.NotFound if task status does not exist", async () => {
      const taskId = getRandomBytes32();
      const res = await tasksCache.getStatus(taskId);
      expect(res).to.eq(RelayerTaskStatus.NotFound);
    });
  });

  describe("#setStatus", () => {
    it("happy: should set status", async () => {
      const taskId = getRandomBytes32();

      const resOne = await tasksCache.setStatus(taskId, RelayerTaskStatus.ExecPending);
      expect(resOne).to.eq(1);
      expect(await tasksCache.getStatus(taskId)).to.eq(RelayerTaskStatus.ExecPending);

      const resTwo = await tasksCache.setStatus(taskId, RelayerTaskStatus.ExecSuccess);
      expect(resTwo).to.eq(0);
      expect(await tasksCache.getStatus(taskId)).to.eq(RelayerTaskStatus.ExecSuccess);
    });
  });

  describe("#getError", () => {
    it("happy: should retrieve existing task error", async () => {
      const taskId = getRandomBytes32();
      const error = "some error";
      await tasksCache.setError(taskId, error);
      const res = await tasksCache.getError(taskId);
      expect(res).to.deep.eq(error);
    });

    it("sad: should return undefined if task error does not exist", async () => {
      const taskId = getRandomBytes32();
      const res = await tasksCache.getError(taskId);
      expect(res).to.eq(undefined);
    });
  });

  describe("#setError", () => {
    it("happy: should set task error", async () => {
      const taskId = getRandomBytes32();
      const error = "some error";
      const res = await tasksCache.setError(taskId, error);
      expect(res).to.eq(1);

      const found = await tasksCache.getError(taskId);
      expect(found).to.be.eq(error);
    });
  });

  describe("#getHash", () => {
    it("happy: should retrieve existing task hash", async () => {
      const taskId = getRandomBytes32();
      const txhash = getRandomBytes32();
      await tasksCache.setHash(taskId, txhash);
      const res = await tasksCache.getHash(taskId);
      expect(res).to.deep.eq(txhash);
    });

    it("sad: should return undefined if task hash does not exist", async () => {
      const taskId = getRandomBytes32();
      const res = await tasksCache.getHash(taskId);
      expect(res).to.eq(undefined);
    });
  });

  describe("#setHash", () => {
    it("happy: should set task error", async () => {
      const taskId = getRandomBytes32();
      const txhash = getRandomBytes32();
      await tasksCache.setHash(taskId, txhash);
      const res = await tasksCache.getHash(taskId);
      expect(res).to.deep.eq(txhash);
    });
  });

  describe("#getTimestamp/setTimestamp", () => {
    it("happy: should retrieve existing task hash", async () => {
      const taskId = getRandomBytes32();
      const curtimeInSecs = getNtpTimeSeconds();
      await tasksCache.setTimestamp(taskId);
      const res = await tasksCache.getTimestamp(taskId);
      expect(res).to.deep.eq(curtimeInSecs);
    });

    it("sad: should return undefined if task hash does not exist", async () => {
      const taskId = getRandomBytes32();
      const res = await tasksCache.getTimestamp(taskId);
      expect(res).to.eq(0);
    });
  });

  describe("#getPending", () => {
    it("happy: should retrieve existing pending tasks", async () => {
      const taskIds = mockTaskIdBatch(10);
      for (const taskId of taskIds) {
        await tasksCache.setStatus(taskId, RelayerTaskStatus.ExecPending);
      }

      const res = await tasksCache.getPending();
      expect(res).to.deep.eq(taskIds);
    });

    it("should not retrieve tasks of other statuses", async () => {
      const pendingTaskIds = mockTaskIdBatch(10);
      for (const taskId of pendingTaskIds) {
        await tasksCache.setStatus(taskId, RelayerTaskStatus.ExecPending);
      }

      // Simulate: a lot have been sent already.
      const completedTaskIds = mockTaskIdBatch(1234);
      for (const taskId of completedTaskIds) {
        await tasksCache.setStatus(taskId, RelayerTaskStatus.ExecSuccess);
      }

      const res = await tasksCache.getPending();
      expect(res).to.deep.eq(pendingTaskIds);
    });

    it("should return empty array if no tasks have pending status", async () => {
      const completedTaskIds = mockTaskIdBatch(27);
      for (const taskId of completedTaskIds) {
        await tasksCache.setStatus(taskId, RelayerTaskStatus.ExecSuccess);
      }

      const res = await tasksCache.getPending();
      expect(res).to.deep.eq([]);
    });

    it("sad: should return empty array if no pending tasks exist", async () => {
      const res = await tasksCache.getPending();
      expect(res).to.deep.eq([]);
    });
  });

  describe("#pruneTasks", () => {
    it("happy: should prune expired tasks", async () => {
      const taskIds: string[] = [];

      const successTasks = mockCachedTasksBatch(10);
      for (const task of successTasks) {
        const taskId = await tasksCache.createTask(task);
        await tasksCache.setStatus(taskId, RelayerTaskStatus.ExecSuccess);
        taskIds.push(taskId);
      }

      const revertedTasks = mockCachedTasksBatch(10);
      for (const task of revertedTasks) {
        const taskId = await tasksCache.createTask(task);
        await tasksCache.setStatus(taskId, RelayerTaskStatus.ExecReverted);
        taskIds.push(taskId);
      }

      const cancelledTasks = mockCachedTasksBatch(10);
      for (const task of cancelledTasks) {
        const taskId = await tasksCache.createTask(task);
        await tasksCache.setStatus(taskId, RelayerTaskStatus.Cancelled);
        taskIds.push(taskId);
      }

      await delay(2_000);

      await tasksCache.pruneTasks(1);

      for (const taskId of taskIds) {
        const res = await tasksCache.getTask(taskId);
        console.log({ taskId, res });
        expect(res).to.be.undefined;
      }
    });
  });
});
