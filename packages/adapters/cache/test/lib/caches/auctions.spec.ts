import { stub, SinonStub } from "sinon";
import {
  Logger,
  expect,
  mock,
  mkAddress,
  Auction,
  AuctionStatus,
  AuctionTask,
  getRandomBytes32,
  Bid,
  getNtpTimeSeconds,
  BidData,
} from "@connext/nxtp-utils";

import { AuctionsCache } from "../../../src/index";

const RedisMock = require("ioredis-mock");
const redis = new RedisMock();

const mockReplyTransformer = (hgetReply: Record<string, string>): any => {
  console.log(hgetReply[1])

}

describe("AuctionCache", () => {
  const prefix = "auctions";
  // Helpers for accessing mock cache directly and altering state.
  const mockRedisHelpers = {
    setAuction: async (transferId: string, auction: Auction) =>
      await redis.hmset(`${prefix}:auction:${transferId}`,
        "origin", auction.origin,
        "destination", auction.destination,
        "timestamp", auction.timestamp,
        "bids", JSON.stringify(auction.bids)),
    getAuction: async (transferId: string): Promise<Auction | null> => {
      const res = await redis.hgetall(`${prefix}:auction:${transferId}`);
      return res ? res : null;
    },

    setStatus: async (transferId: string, status: AuctionStatus) =>
      await redis.hset(`${prefix}:status`, transferId, status.toString()),
    getStatus: async (transferId: string): Promise<AuctionStatus | null> => {
      const res = await redis.hget(`${prefix}:status`, transferId);
      return res ? AuctionStatus[res as AuctionStatus] : null;
    },

    setTask: async (transferId: string, task: AuctionTask) =>
      await redis.hset(`${prefix}:task`, transferId, JSON.stringify(task)),
    getTask: async (transferId: string): Promise<AuctionTask | null> => {
      const res = await redis.hget(`${prefix}:task`, transferId);
      return res ? JSON.parse(res) : null;
    },

    setBidData: async (transferId: string, bid: BidData) =>
      await redis.hset(`${prefix}:bidData`, transferId, JSON.stringify(bid)),
    getBidData: async (transferId: string): Promise<BidData | null> => {
      const res = await redis.hget(`${prefix}:bidData`, transferId);
      return res ? JSON.parse(res) : null;
    },
    addTxfrIdToDomainSet: async (originDomain: string, transferId: string) => {
      await redis.sadd(`trackedTransfers:${originDomain}`, transferId)
    },
    getTxfrIdsInDomainSet: async (originDomain: string) => {
      const res = await redis.smembers(`trackedTransfers:${originDomain}`);
      return res;
    }
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
        let auction = mock.entity.auction({
          transferId,
        });
        await mockRedisHelpers.setAuction(transferId, auction);
        const res = await cache.getAuction(transferId);
        //todo: better deep assertion, bids arent same type
       console.log(`res${res.bids}      auction${auction.bids}`);
       expect(auction.origin).to.eq(res.origin);
      });

      it("sad: should return undefined if auction data does not exist", async () => {
        const transferId = getRandomBytes32();
        const res = await cache.getAuction(transferId);
        expect(res).to.be.empty;
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
        console.log(`Mock ARGS ${JSON.stringify(args)}`);
        const res = await cache.upsertAuction(args);
        console.log(`Mock ARG RES ${JSON.stringify(res)}`);
        expect(res).to.eq(1);
        expect(getAuctionStub.calledOnce).to.be.true;
        // const { timestamp, ...auction } = await mockRedisHelpers.getAuction(transferId);
        const auction = await mockRedisHelpers.getAuction(transferId);
        console.log(`Auction Res: ${auction}`);
        // expect(Number(timestamp)).to.be.a("number");
        // expect(auction).to.deep.eq({
        //   origin: args.origin,
        //   destination: args.destination,
        //   bids: {
        //     [args.bid.router]: args.bid,
        //   },
        // });

        console.log(`auction a: ${JSON.stringify(auction)}`);
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

        const auction = await cache.getAuction(transferId);
        console.log(`AUCTION FROM MOCK ${JSON.stringify(auction)}`);
        expect(auction.origin).to.eq("1337");

      });
    });

    describe("#getStatus", () => {
      it("happy: should retrieve existing auction status", async () => {
        for (const status of [AuctionStatus.Queued, AuctionStatus.Sent, AuctionStatus.Executed]) {
          const transferId = getRandomBytes32();
          await mockRedisHelpers.setStatus(transferId, status);
          const res = await cache.getStatus(transferId);
          expect(res).to.eq(status);
        }
      });

      it("sad: should return AuctionStatus.None if auction status does not exist", async () => {
        const transferId = getRandomBytes32();
        const res = await cache.getStatus(transferId);
        expect(res).to.eq(AuctionStatus.None);
      });
    });

    describe("#setStatus", () => {
      it("happy: should set status", async () => {
        const transferId = getRandomBytes32();

        const resOne = await cache.setStatus(transferId, AuctionStatus.Queued);
        expect(resOne).to.eq(1);
        expect(await mockRedisHelpers.getStatus(transferId)).to.eq(AuctionStatus.Queued);

        const resTwo = await cache.setStatus(transferId, AuctionStatus.Sent);
        expect(resTwo).to.eq(0);
        expect(await mockRedisHelpers.getStatus(transferId)).to.eq(AuctionStatus.Sent);
      });
    });

    describe("#getTask", () => {
      it("happy: should retrieve existing auction task", async () => {
        const transferId = getRandomBytes32();
        const task: AuctionTask = {
          timestamp: getNtpTimeSeconds().toString(),
          taskId: getRandomBytes32(),
          attempts: 7,
        };
        await mockRedisHelpers.setTask(transferId, task);
        const res = await cache.getTask(transferId);
        expect(res).to.deep.eq(task);
      });

      it("sad: should return undefined if auction task does not exist", async () => {
        const transferId = getRandomBytes32();
        const res = await cache.getTask(transferId);
        expect(res).to.eq(undefined);
      });
    });

    describe("#setTask", () => {
      it("happy: should set/update task", async () => {
        const transferId = getRandomBytes32();

        const taskId = getRandomBytes32();
        const resOne = await cache.upsertTask({
          transferId,
          taskId,
        });
        expect(resOne).to.eq(1);

        const { timestamp: firstCallTimestamp, ...firstEntry } = await mockRedisHelpers.getTask(transferId);
        expect(firstEntry).to.deep.eq({
          taskId,
          attempts: 1,
        });

        // Overwrite timestamp for testing:
        const timestamp = (getNtpTimeSeconds() - 400).toString();
        await mockRedisHelpers.setTask(transferId, {
          timestamp,
          taskId,
          attempts: 1,
        });

        const updatedTaskId = getRandomBytes32();
        const resTwo = await cache.upsertTask({
          transferId,
          taskId: updatedTaskId,
        });
        expect(resTwo).to.eq(0);

        const { timestamp: secondCallTimestamp, ...secondEntry } = await mockRedisHelpers.getTask(transferId);
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
          await mockRedisHelpers.setStatus(transferId, AuctionStatus.Queued);
        }

        const res = await cache.getQueuedTransfers();
        expect(res).to.deep.eq(transferIds);
      });

      it("should not retrieve transfers of other statuses", async () => {
        const queuedTransferIds = mockTransferIdBatch(10);
        for (const transferId of queuedTransferIds) {
          await mockRedisHelpers.setStatus(transferId, AuctionStatus.Queued);
        }

        // Simulate: a lot have been sent already.
        const sentTransferIds = mockTransferIdBatch(1234);
        for (const transferId of sentTransferIds) {
          await mockRedisHelpers.setStatus(transferId, AuctionStatus.Sent);
        }

        const res = await cache.getQueuedTransfers();
        expect(res).to.deep.eq(queuedTransferIds);
      });

      it("should return empty array if no transfers have queued status", async () => {
        const sentTransferIds = mockTransferIdBatch(27);
        for (const transferId of sentTransferIds) {
          await mockRedisHelpers.setStatus(transferId, AuctionStatus.Sent);
        }

        const res = await cache.getQueuedTransfers();
        expect(res).to.deep.eq([]);
      });

      it("sad: should return empty array if no queued transfers exist", async () => {
        const res = await cache.getQueuedTransfers();
        expect(res).to.deep.eq([]);
      });
    });

    describe("#getBidData", () => {
      it("happy: should retrieve existing bid data", async () => {
        const transferId = getRandomBytes32();
        const bidData: BidData = mock.entity.bidData();

        await mockRedisHelpers.setBidData(transferId, bidData);
        const res = await mockRedisHelpers.getBidData(transferId);
        expect(res).to.deep.eq(bidData);
      });

      it("sad: should return undefined if bid data does not exist", async () => {
        const transferId = getRandomBytes32();
        const res = await mockRedisHelpers.getBidData(transferId);
        expect(res).to.deep.eq(undefined);
      });
    });

    describe("#setBidData", () => {
      it("happy: should set/update bid data", async () => {
        const transferId = getRandomBytes32();
        const bidData = mock.entity.bidData();

        const resOne = await mockRedisHelpers.setBidData(transferId, bidData);
        expect(resOne).to.eq(1);

        const resTwo = await mockRedisHelpers.setBidData(transferId, bidData);
        expect(resTwo).to.eq(0);

        const entry = await mockRedisHelpers.getBidData(transferId);
        expect(entry).to.deep.eq(bidData);
      });
    });
    describe("#addTransferIdToDomainSet", () => {
      const originDomain = "1337";
      const transferId = "0xdeadbeef";

      it(`happy: should add txid: ${transferId} to SET for ${originDomain}`, async () => {
        const res = await cache.addTransferIdToDomainSet(originDomain, transferId);
        expect(res).to.greaterThanOrEqual(1);
      })

      it(`happy: should get domain tracked transfers for ${originDomain}`, async () => {
        const res = await cache.getSetDomainSetMemebers(originDomain);
        //sadcase
        expect([res]).to.eq([transferId]);
      })

      it(`happy: should delete all old transfers for domain`, async () => {
        const res = await cache.deleteOldTransferIdsPerDomain("1337");
      })
    })

  });
});
