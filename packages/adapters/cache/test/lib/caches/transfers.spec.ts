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
  beforeEach(async () => {
    transfersCache = new TransfersCache({ host: "mock", port: 1234, mock: true, logger });
  });

  afterEach(async () => {
    new RedisMock().flushall();
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
      expect(latestNonce).to.be.equal(fakeTxs[1].nonce);
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
      // First, store
      const transferId = getRandomBytes32();
      const domain = "1234";
      await (transfersCache as any).addPending(domain, transferId);
      const res = await transfersCache.getPending(domain);
      expect(res).to.deep.eq([transferId]);
    });

    it("should create a new domain entry if it doesn't exist and return empty array", async () => {
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
});
