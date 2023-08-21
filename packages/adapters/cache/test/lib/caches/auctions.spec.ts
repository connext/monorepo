import { stub, SinonStub } from "sinon";
import {
  Logger,
  expect,
  mock,
  mkAddress,
  Auction,
  ExecStatus,
  MetaTxTask,
  getRandomBytes32,
  Bid,
  getNtpTimeSeconds,
  RelayerType,
  Status,
} from "@connext/nxtp-utils";

import { AuctionsCache } from "../../../src/index";

const RedisMock = require("ioredis-mock");
const redis = new RedisMock();

describe("AuctionCache", () => {
  const prefix = "auctions";
  // Helpers for accessing mock cache directly and altering state.
  const mockRedisHelpers = {
    setAuction: async (transferId: string, auction: Auction) =>
      await redis.hset(`${prefix}:auction`, transferId, JSON.stringify(auction)),
    getAuction: async (transferId: string): Promise<Auction | null> => {
      const res = await redis.hget(`${prefix}:auction`, transferId);
      return res ? JSON.parse(res) : null;
    },

    setExecStatus: async (transferId: string, status: ExecStatus) =>
      await redis.hset(
        `${prefix}:status`,
        transferId,
        JSON.stringify({
          timestamp: "1000".toString(),
          status: status.toString(),
        }),
      ),
    getExecStatus: async (transferId: string): Promise<ExecStatus | null> => {
      const rawStatus = await redis.hget(`${prefix}:status`, transferId);
      const res = rawStatus ? ((JSON.parse(rawStatus) as Status).status as string) : null;
      return res ? ExecStatus[res as ExecStatus] : null;
    },

    setMetaTxTask: async (transferId: string, task: MetaTxTask) =>
      await redis.hset(`${prefix}:task`, transferId, JSON.stringify(task)),
    getMetaTxTask: async (transferId: string): Promise<MetaTxTask | null> => {
      const res = await redis.hget(`${prefix}:task`, transferId);
      return res ? JSON.parse(res) : null;
    },
  };

  const logger = new Logger({ level: "debug" });
  let cache: AuctionsCache;
  beforeEach(() => {
    cache = new AuctionsCache({ host: "mock", port: 1234, mock: true, logger });
  });

  afterEach(async () => {
    await redis.flushall();
  });

  describe("AuctionCache", () => {
    describe("#getAuction", () => {
      it("happy: should retrieve existing auction data", async () => {
        const transferId = getRandomBytes32();
        const auction = mock.entity.auction({
          transferId,
        });
        await mockRedisHelpers.setAuction(transferId, auction);
        const res = await cache.getAuction(transferId);
        expect(res).to.deep.eq(auction);
      });

      it("sad: should return undefined if auction data does not exist", async () => {
        const transferId = getRandomBytes32();
        const res = await cache.getAuction(transferId);
        expect(res).to.be.undefined;
      });
    });

    describe("#upsertAuction", () => {
      const mockUpsertAuctionArgs = (transferId: string, origin: string, destination: string, bid?: Bid) => ({
        transferId,
        origin,
        destination,
        bid: bid ?? mock.entity.bid(),
      });
      let getAuctionStub: SinonStub;
      beforeEach(() => {
        getAuctionStub = stub(cache, "getAuction").resolves(undefined);
      });

      afterEach(() => {
        getAuctionStub.restore();
      });

      it("happy: should create new auction data", async () => {
        const transferId = "1";
        const args = mockUpsertAuctionArgs(transferId, "2", "3");
        const res = await cache.upsertAuction(args);
        expect(res).to.eq(1);
        expect(getAuctionStub.calledOnce).to.be.true;
        const { timestamp, ...auction } = await mockRedisHelpers.getAuction(transferId);
        expect(Number(timestamp)).to.be.a("number");
        expect(auction).to.deep.eq({
          origin: args.origin,
          destination: args.destination,
          bids: {
            [args.bid.router]: args.bid,
          },
        });
      });

      it("happy: should update existing auction data with subsuquent bids", async () => {
        const transferId = getRandomBytes32();
        const origin = mock.domain.A;
        const destination = mock.domain.B;

        const firstBid: Bid = mock.entity.bid({
          router: mkAddress("0x1"),
        });
        const secondBid: Bid = mock.entity.bid({
          router: mkAddress("0x2"),
        });

        const args = mockUpsertAuctionArgs(transferId, origin, destination, firstBid);

        const firstCallRes = await cache.upsertAuction(args);
        expect(firstCallRes).to.eq(1);

        const { timestamp: firstCallTimestamp } = await mockRedisHelpers.getAuction(transferId);
        getAuctionStub.resolves({
          ...args,
          origin,
          destination,
          bids: {
            [firstBid.router]: firstBid,
          },
        });

        const secondCallRes = await cache.upsertAuction({
          ...args,
          bid: secondBid,
        });
        expect(secondCallRes).to.eq(0);

        const auction = await mockRedisHelpers.getAuction(transferId);
        expect(auction).to.deep.eq({
          // Timestamp shouldn't have been overwritten.
          timestamp: firstCallTimestamp,
          origin,
          destination,
          bids: {
            [firstBid.router]: firstBid,
            [secondBid.router]: secondBid,
          },
        });
      });
    });

    describe("#getExecStatus", () => {
      it("happy: should retrieve existing auction status", async () => {
        for (const status of [ExecStatus.Enqueued, ExecStatus.Sent, ExecStatus.Completed]) {
          const transferId = getRandomBytes32();
          await mockRedisHelpers.setExecStatus(transferId, status);
          const res = await cache.getExecStatus(transferId);
          expect(res).to.eq(status);
        }
      });

      it("sad: should return ExecStatus.None if auction status does not exist", async () => {
        const transferId = getRandomBytes32();
        const res = await cache.getExecStatus(transferId);
        expect(res).to.eq(ExecStatus.None);
      });
    });

    describe("#setExecStatus", () => {
      it("happy: should set status", async () => {
        const transferId = getRandomBytes32();

        const resOne = await cache.setExecStatus(transferId, ExecStatus.Enqueued);
        expect(resOne).to.eq(1);
        expect(await mockRedisHelpers.getExecStatus(transferId)).to.eq(ExecStatus.Enqueued);

        const resTwo = await cache.setExecStatus(transferId, ExecStatus.Sent);
        expect(resTwo).to.eq(0);
        expect(await mockRedisHelpers.getExecStatus(transferId)).to.eq(ExecStatus.Sent);
      });
    });

    describe("#getMetaTxTask", () => {
      it("happy: should retrieve existing auction task", async () => {
        const transferId = getRandomBytes32();
        const task: MetaTxTask = {
          timestamp: getNtpTimeSeconds().toString(),
          taskId: getRandomBytes32(),
          relayer: RelayerType.Mock,
          attempts: 7,
        };
        await mockRedisHelpers.setMetaTxTask(transferId, task);
        const res = await cache.getMetaTxTask(transferId);
        expect(res).to.deep.eq(task);
      });

      it("sad: should return undefined if auction task does not exist", async () => {
        const transferId = getRandomBytes32();
        const res = await cache.getMetaTxTask(transferId);
        expect(res).to.eq(undefined);
      });
    });

    describe("#setMetaTxTask", () => {
      it("happy: should set/update task", async () => {
        const transferId = getRandomBytes32();

        const taskId = getRandomBytes32();
        const resOne = await cache.upsertMetaTxTask({
          transferId,
          taskId,
        });
        expect(resOne).to.eq(1);

        const { timestamp: firstCallTimestamp, ...firstEntry } = await mockRedisHelpers.getMetaTxTask(transferId);
        expect(firstEntry).to.deep.eq({
          taskId,
          attempts: 1,
        });

        // Overwrite timestamp for testing:
        const timestamp = (getNtpTimeSeconds() - 400).toString();
        await mockRedisHelpers.setMetaTxTask(transferId, {
          timestamp,
          taskId,
          attempts: 1,
        });

        const updatedTaskId = getRandomBytes32();
        const resTwo = await cache.upsertMetaTxTask({
          transferId,
          taskId: updatedTaskId,
        });
        expect(resTwo).to.eq(0);

        const { timestamp: secondCallTimestamp, ...secondEntry } = await mockRedisHelpers.getMetaTxTask(transferId);
        expect(secondEntry).to.deep.eq({
          taskId: updatedTaskId,
          attempts: 2,
        });
        // Ts should be overwritten with latest in this case.
        expect(secondCallTimestamp).to.not.be.eq(timestamp);
      });
    });

    describe("#getQueuedTransfers", () => {
      const mockTransferIdBatch = (count: number) => new Array(count).fill(0).map(() => getRandomBytes32());

      it("happy: should retrieve existing queued transfers", async () => {
        const transferIds = mockTransferIdBatch(10);
        for (const transferId of transferIds) {
          await mockRedisHelpers.setExecStatus(transferId, ExecStatus.Enqueued);
        }

        const res = await cache.getQueuedTransfers();
        expect(res).to.deep.eq(transferIds);
      });

      it("should not retrieve transfers of other statuses", async () => {
        const queuedTransferIds = mockTransferIdBatch(10);
        for (const transferId of queuedTransferIds) {
          await mockRedisHelpers.setExecStatus(transferId, ExecStatus.Enqueued);
        }

        // Simulate: a lot have been sent already.
        const sentTransferIds = mockTransferIdBatch(1234);
        for (const transferId of sentTransferIds) {
          await mockRedisHelpers.setExecStatus(transferId, ExecStatus.Sent);
        }

        const res = await cache.getQueuedTransfers();
        expect(res).to.deep.eq(queuedTransferIds);
      });

      it("should return empty array if no transfers have queued status", async () => {
        const sentTransferIds = mockTransferIdBatch(27);
        for (const transferId of sentTransferIds) {
          await mockRedisHelpers.setExecStatus(transferId, ExecStatus.Sent);
        }

        const res = await cache.getQueuedTransfers();
        expect(res).to.deep.eq([]);
      });

      it("sad: should return empty array if no queued transfers exist", async () => {
        const res = await cache.getQueuedTransfers();
        expect(res).to.deep.eq([]);
      });
    });
  });
});
