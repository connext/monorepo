import { Logger, XTransferStatus, expect, mock, getRandomBytes32, mkAddress } from "@connext/nxtp-utils";
import { TransfersCache } from "../../../src/index";

const logger = new Logger({ level: "debug" });
const RedisMock = require("ioredis-mock");
let transfersCache: TransfersCache;

const fakeTxs = [
  mock.entity.xtransfer({
    originDomain: "3000",
    destinationDomain: "4000",
  }),
  mock.entity.xtransfer({
    originDomain: "3000",
    destinationDomain: "4000",
    amount: "1000",
    nonce: 5555,
    asset: mkAddress("0xaaa"),
    user: mkAddress("0xa"),
  }),
];

describe("TransfersCache", () => {
  const rmock = new RedisMock();

  beforeEach(async () => {
    transfersCache = new TransfersCache({ host: "mock", port: 1234, mock: true, logger });
  });

  afterEach(async () => {
    // new RedisMock().flushall();
  });

  describe("#getLatestNonce", () => {
    it("should get default nonce if none exists", async () => {
      await transfersCache.storeTransfers([fakeTxs[1]]);
      const latestNonce = await transfersCache.getLatestNonce("1");
      expect(latestNonce).to.be.equal(-1);
    });

    it("should get domain's latest nonce according to the cache", async () => {
      await transfersCache.storeTransfers([fakeTxs[1]]);
      const latestNonce = await transfersCache.getLatestNonce("3000");
      expect(latestNonce).to.be.equal(fakeTxs[1].xparams.nonce);
    });
  });

  describe("#setLatestNonce", () => {
    it("should get default nonce if none exists", async () => {
      await transfersCache.setLatestNonce("3000", 5);
      const latestNonce = await transfersCache.getLatestNonce("3000");
      expect(latestNonce).to.be.equal(5);
    });
  });

  describe("#storeTransfers", () => {
    it("happy: should store transaction data", async () => {
      const mockXTransfer = mock.entity.xtransfer({
        originDomain: "100",
        nonce: 1234,
      });
      //add fake txid's status, should fire off event.
      await transfersCache.storeTransfers([mockXTransfer]);
      let latestNonce = await transfersCache.getLatestNonce("100");
      expect(latestNonce).to.be.eq(1234);
    });

    it("happy: should store multiple xtransfers", async () => {
      const mockXTransfer1 = mock.entity.xtransfer({
        originDomain: "100",
        nonce: 1233,
      });
      const mockXTransfer2 = mock.entity.xtransfer({ originDomain: "100", nonce: 1234 });
      await transfersCache.storeTransfers([mockXTransfer1]);
      await transfersCache.storeTransfers([mockXTransfer2]);
      let latestNonce = await transfersCache.getLatestNonce("100");
      expect(latestNonce).to.be.eq(1234);
    });

    it("happy: should delete the stall transfer", async () => {
      const mockXTransfer = mock.entity.xtransfer({
        originDomain: "100",
        status: XTransferStatus.Executed,
      });
      //add fake txid's status, should fire off event.
      await transfersCache.storeTransfers([mockXTransfer]);
      await transfersCache.storeTransfers([mockXTransfer]);
      let latestNonce = await transfersCache.getLatestNonce("100");
      expect(latestNonce).to.be.eq(1234);
    });

    it("should update latest nonce", async () => {
      const mockTransfer = mock.entity.xtransfer({
        originDomain: "100",
        nonce: 1234,
      });
      //add fake txid's status, should fire off event.
      await transfersCache.storeTransfers([mockTransfer]);
      let latestNonce = await transfersCache.getLatestNonce("100");
      expect(latestNonce).to.be.eq(1234);

      const mockNewTransfer = mock.entity.xtransfer({ originDomain: "100", nonce: 1235 });
      const res = await transfersCache.storeTransfers([mockNewTransfer]);
      latestNonce = await transfersCache.getLatestNonce("100");
      expect(latestNonce).to.be.eq(1235);
    });
  });

  describe("#getTransfer", () => {
    it("should return null if no exists", async () => {
      const res = await transfersCache.getTransfer(getRandomBytes32());
      expect(res).to.be.undefined;
    });

    it("happy case: should return data", async () => {
      const transferId = getRandomBytes32();
      const mockXTransfer = mock.entity.xtransfer({ transferId });
      await transfersCache.storeTransfers([mockXTransfer]);

      const res = await transfersCache.getTransfer(transferId);
      expect(res.transferId).to.eq(transferId);
    });
  });

  describe("#getPending", () => {
    it("happy: returns pending transfer IDs", async () => {
      // First, flush
      await rmock.flushall();
      //then store
      const transferId = getRandomBytes32();
      const domain = "1234";
      await (transfersCache as any).addPending(domain, transferId);
      const res = await transfersCache.getPending(domain);
      expect(res).to.deep.eq([transferId]);
    });

    it("should create a new domain entry if it doesn't exist and return empty array", async () => {
      await rmock.flushall();
      const res = await transfersCache.getPending("1234");
      expect(res).to.deep.eq([]);
    });
  });

  describe("#addPending", () => {
    it("happy: adds new pending transfer ID", async () => {
      const domain = "1234";
      const transferId = getRandomBytes32();
      await (transfersCache as any).addPending(domain, transferId);
      const res = await transfersCache.getPending(domain);
      expect(res).to.deep.eq([transferId]);
    });

    it("should append to current array, not overwrite", async () => {
      await rmock.flushall();
      const domain = "1234";
      const transferIds = new Array(10).fill(0).map(() => getRandomBytes32());
      for (const transferId of transferIds) {
        await (transfersCache as any).addPending(domain, transferId);
      }
      const res = await transfersCache.getPending(domain);
      expect(res).to.deep.eq(transferIds);
    });
  });

  describe("#removePending", () => {
    it("happy: should remove from array of pending transfers", async () => {
      await rmock.flushall();
      const domain = "1234";
      const transferIds = new Array(10).fill(0).map(() => getRandomBytes32());
      for (const transferId of transferIds) {
        await (transfersCache as any).addPending(domain, transferId);
      }
      const indexToRemove = 4;
      const successful = await (transfersCache as any).removePending(domain, transferIds[indexToRemove]);
      expect(successful).to.be.true;

      transferIds.splice(indexToRemove, 1);

      const res = await transfersCache.getPending(domain);
      expect(res).to.deep.eq(transferIds);
    });

    it("shouldn't remove anything if non-existant transfer ID is passed in", async () => {
      //flush cache before
      await rmock.flushall();

      const domain = "1234";
      const transferIds = new Array(10).fill(0).map(() => getRandomBytes32());
      for (const transferId of transferIds) {
        await (transfersCache as any).addPending(domain, transferId);
      }
      // Removal should be unsuccessful.
      const successful = await (transfersCache as any).removePending(domain, getRandomBytes32());
      expect(successful).to.be.false;

      // Should be the same.
      const res = await transfersCache.getPending(domain);
      expect(res).to.deep.eq(transferIds);
    });
  });

  describe("#prunePending", () => {
    const maxPruneTimeMs = 10_000;
    const testOnRealDb = false;

    it("happy: mock should not prune pending transactions ", async () => {
      const domain = 3000;
      //add some pending txns back
      const transferIds = new Array(10).fill(0).map(() => getRandomBytes32());
      for (const transferId of transferIds) {
        await (transfersCache as any).addPending(domain, transferId);
      }

      const pendingBefore = await transfersCache.getPending("3000");

      const res = await transfersCache.pruneTransfers(domain);

      const stillPending = await transfersCache.getPending("3000");

      expect(pendingBefore).to.deep.eq(stillPending);
    });

    it("happy: mock should prune all old completed transactions ", async () => {
      await rmock.flushall();
      const domain = 3000;

      //create 10 finished Xtransfers
      const xtransfers = new Array(10).fill(0).map(() =>
        mock.entity.xtransfer({
          originDomain: domain.toString(),
          transferId: getRandomBytes32(),
          nonce: Math.floor(Math.random() * 10000),
          status: "CompletedFast",
        }),
      );

      //get completed transfer with highest nonce (this one should stay around after the prune
      const highestTransfer = xtransfers.reduce((p, c) => {
        return p.nonce > c.nonce ? p : c;
      });

      //all the transfers that should be deleted by prune (lower nonce than highestTransfer)
      const transfersShouldBeDeleted = xtransfers.filter((txfr) => {
        return txfr.transferId !== highestTransfer.transferId;
      });

      //stores the transfers normally
      await transfersCache.storeTransfers(xtransfers);
      //delete all the newly stored completed transfers except the one with the highest nonce
      const startPrune = Date.now();
      await transfersCache.pruneTransfers(domain);
      const endPrune = Date.now();

      const transferStillExists = await transfersCache.getTransfer(highestTransfer.transferId);

      //test all nonces are less than the highest.
      let deletedNoncesHaveHigherNonce = true;

      transfersShouldBeDeleted.forEach((txfr) =>
        txfr.nonce > highestTransfer.nonce
          ? (deletedNoncesHaveHigherNonce = true)
          : (deletedNoncesHaveHigherNonce = false),
      );

      expect(deletedNoncesHaveHigherNonce).to.eq(false);

      //should deep equal but saving adds a mock asset id etc.
      expect(transferStillExists?.transferId).to.eq(highestTransfer.transferId);

      //set max prune time limit
      expect(endPrune).to.be.lte(startPrune + maxPruneTimeMs);
    });

    it("should use real db to test pruning", async () => {
      if (testOnRealDb) {
        const realTransferCache = new TransfersCache({ host: "localhost", port: 6379, mock: false, logger });
        const startPrune = Date.now();
        await realTransferCache.pruneTransfers(3331);
        await realTransferCache.pruneTransfers(2221);
        await realTransferCache.pruneTransfers(1111);

        const endPrune = Date.now();

        console.log("endPrune", endPrune);
        //always false
        expect(endPrune).to.be.lte(startPrune + maxPruneTimeMs * 1000);
      }
    });
  });

  describe("#getErrors", () => {
    it("happy: returns errors for transfer ID", async () => {
      // First, store
      const error = "bad stuff happened >:(";
      const transferId = getRandomBytes32();
      await transfersCache.saveError(transferId, error);
      const res = await (transfersCache as any).getErrors(transferId);
      expect(res).to.deep.eq([error]);
    });

    it("sad: should return empty if no errors saved", async () => {
      const transferId = getRandomBytes32();
      const res = await (transfersCache as any).getErrors(transferId);
      expect(res).to.deep.eq([]);
    });
  });

  describe("#saveError", () => {
    it("happy: should save error", async () => {
      const transferId = getRandomBytes32();
      const error = "bad stuff happened >:(";
      const isNew = await transfersCache.saveError(transferId, error);
      const res = await (transfersCache as any).getErrors(transferId);
      expect(res).to.deep.eq([error]);
      expect(isNew).to.be.true;
    });

    it("should save many errors", async () => {
      const transferId = getRandomBytes32();
      // Store a list of all of my problems
      const errors = new Array(99).fill(0).map((_, i) => `problem #${i}`);
      for (const error of errors) {
        await transfersCache.saveError(transferId, error);
      }
      // Errors should be returned in order
      const res = await (transfersCache as any).getErrors(transferId);
      expect(res).to.deep.eq(errors);
    });

    it("should not save non-new error", async () => {
      const transferId = getRandomBytes32();
      const error = "bad stuff happened >:(";
      let isNew = await transfersCache.saveError(transferId, error);
      const res = await (transfersCache as any).getErrors(transferId);
      expect(res).to.deep.eq([error]);
      expect(isNew).to.be.true;

      isNew = await transfersCache.saveError(transferId, error);
      const res2 = await (transfersCache as any).getErrors(transferId);
      expect(res2).to.deep.eq([error]);
      expect(isNew).to.be.false;
    });
  });

  describe("#pruneTransfersByIds", () => {
    it("happy: should work", async () => {
      const domain = "133712";
      const xtransfers = new Array(10).fill(0).map(() =>
        mock.entity.xtransfer({
          originDomain: domain.toString(),
          transferId: getRandomBytes32(),
          nonce: Math.floor(Math.random() * 10000),
          status: "XCalled",
        }),
      );
      const transferIds = xtransfers.map((i) => i.transferId);
      const transferIdsToRemove = [transferIds[0], transferIds[3], transferIds[7]];

      //stores the transfers under non clenaup mode
      await transfersCache.storeTransfers(xtransfers, false);

      expect(await transfersCache.getPending(domain)).to.be.deep.eq(transferIds);

      // prune transfers by transferIdsToRemove
      await transfersCache.pruneTransfersByIds(transferIdsToRemove);
      expect(await transfersCache.getPending(domain)).to.be.deep.eq(
        transferIds.filter((i) => !transferIdsToRemove.includes(i)),
      );

      for (const transferId of transferIdsToRemove) {
        const transfer = await transfersCache.getTransfer(transferId);
        expect(transfer).to.be.undefined;
      }
    });
  });

  describe("#Transfer Bid Status", () => {
    it("happy: should work", async () => {
      const domain = "133712";
      const xtransfers = new Array(10).fill(0).map(() =>
        mock.entity.xtransfer({
          originDomain: domain.toString(),
          transferId: getRandomBytes32(),
          nonce: Math.floor(Math.random() * 10000),
          status: "XCalled",
        }),
      );
      const transferIds = xtransfers.map((i) => i.transferId);
      const transferIdsToRemove = [transferIds[0], transferIds[3], transferIds[7]];

      //stores the transfers under non clenaup mode
      for (const transferId of transferIds) {
        const bidStatusBefore = await transfersCache.getBidStatus(transferId);
        expect(bidStatusBefore).to.be.undefined;
        await transfersCache.setBidStatus(transferId);
        const bidStatusAfter = await transfersCache.getBidStatus(transferId);
        expect(bidStatusAfter).not.to.be.undefined;
      }

      // prune transfer status by transferIds
      await transfersCache.pruneBidStatusByIds(transferIdsToRemove);
      for (const transferId of transferIdsToRemove) {
        const bidStatusAfter = await transfersCache.getBidStatus(transferId);
        expect(bidStatusAfter).to.be.undefined;
      }
    });
  });
});
