import { Logger, XTransferStatus, expect, mock, getRandomBytes32, mkAddress } from "@connext/nxtp-utils";
import { TransfersCache } from "../../../src/index";
import { StoreChannel } from "../../../src/lib/entities";

const logger = new Logger({ level: "debug" });
const RedisMock = require("ioredis-mock");
let transactions: TransfersCache;

const fakeTxs = [
  mock.entity.xtransfer("3000", "4000"),
  mock.entity.xtransfer(
    "3000",
    "4000",
    "1000",
    XTransferStatus.XCalled,
    mkAddress("0xaaa"),
    getRandomBytes32(),
    1234,
    mkAddress("0xa"),
  ),
];

describe("TransactionCache", () => {
  before(async () => {
    logger.debug(`Subscribing to Channels for Redis Pub/Sub`);
    const RedisSub = new RedisMock();

    RedisSub.subscribe(StoreChannel.NewHighestNonce);
    RedisSub.subscribe(StoreChannel.NewXCall);
    RedisSub.subscribe(StoreChannel.NewStatus);

    RedisSub.on("message", (chan: any, msg: any) => {
      console.log(`Got Subscribed Message Channel: ${chan as string}, Message Data: ${msg as string}`);
    });

    transactions = new TransfersCache({ url: "mock", mock: true, logger });
  });

  describe("TransfersCache", () => {
    describe("#storeStatus", () => {
      it("happy: should return true if `set` returns OK", async () => {
        const res = await transactions.storeStatus(fakeTxs[0].transferId, XTransferStatus.XCalled);
        expect(res).to.be.eq(true);
      });

      it("should return false if the new status is different from the previous one", async () => {
        await transactions.storeStatus(fakeTxs[0].transferId, XTransferStatus.XCalled);
        const res = await transactions.storeStatus(fakeTxs[0].transferId, XTransferStatus.Executed);
        expect(res).to.be.eq(true);
      });

      it("should return false if the new status is same as the previous one", async () => {
        await transactions.storeStatus(fakeTxs[0].transferId, XTransferStatus.XCalled);
        const res = await transactions.storeStatus(fakeTxs[0].transferId, XTransferStatus.XCalled);
        expect(res).to.be.eq(false);
      });
    });

    describe("#getStatus", () => {
      it("happy: should get status of transaction by ID", async () => {
        await transactions.storeStatus(fakeTxs[1].transferId, XTransferStatus.XCalled);
        const status = await transactions.getStatus(fakeTxs[1].transferId);
        expect(status).to.be.eq(XTransferStatus.XCalled);
      });

      it("should return undefined if no exists", async () => {
        const status = await transactions.getStatus("0x111");
        expect(status).to.be.eq(undefined);
      });
    });

    describe("#getLatestNonce", () => {
      it("should get default nonce if no exists", async () => {
        await transactions.storeTransfers([fakeTxs[1]]);
        const latestNonce = await transactions.getLatestNonce("1");
        expect(latestNonce).to.be.equal(0);
      });

      it("should get domain's latest nonce according to the cache", async () => {
        await transactions.storeTransfers([fakeTxs[1]]);
        const latestNonce = await transactions.getLatestNonce("3000");
        expect(latestNonce).to.be.equal(fakeTxs[1].nonce);
      });
    });

    describe("#storeTransfers", () => {
      it("happy: should store transaction data", async () => {
        const mockXTransfer = mock.entity.xtransfer("100", "200");
        //add fake txid's status, should fire off event.
        await transactions.storeTransfers([mockXTransfer]);
        let latestNonce = await transactions.getLatestNonce("100");
        expect(latestNonce).to.be.eq(1234);
      });

      it("should update latest nonce", async () => {
        let latestNonce = await transactions.getLatestNonce("100");
        expect(latestNonce).to.be.eq(1234);

        const mockXTransfer = mock.entity.xtransfer(
          "100",
          "200",
          "1000",
          XTransferStatus.XCalled,
          mkAddress("0xaaa"),
          getRandomBytes32(),
          1235,
          mkAddress("0xa"),
        );
        const res = await transactions.storeTransfers([mockXTransfer]);
        latestNonce = await transactions.getLatestNonce("100");
        expect(latestNonce).to.be.eq(1235);
      });
    });

    describe("#getTxDataByDomainAndTxID", () => {
      it("should return null if no exists", async () => {
        const res = await transactions.getTransferByTransferId(getRandomBytes32());
        expect(res).to.be.undefined;
      });

      it("happy case: should return data", async () => {
        const transferId = getRandomBytes32();
        const mockXTransfer = mock.entity.xtransfer(
          "101",
          "201",
          "1000",
          XTransferStatus.XCalled,
          mkAddress("0xaaa"),
          transferId,
          1234,
          mkAddress("0xa"),
        );
        await transactions.storeTransfers([mockXTransfer]);

        const res = await transactions.getTransferByTransferId(transferId);
        expect(res.transferId).to.eq(transferId);
      });
    });
  });
});
