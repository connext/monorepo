import {
  Logger,
  CrossChainTxStatus,
  expect,
  mock,
  getRandomBytes32,
  mkAddress,
  FulfillArgs,
} from "@connext/nxtp-utils";
import { randomBytes } from "crypto";
import { AuctionsCache, TransactionsCache } from "../src/index";
import { StoreChannel, SubscriptionCallback } from "../src/lib/entities";

const logger = new Logger({ level: "debug" });
const RedisMock = require("ioredis-mock");
let subscriptions: Map<string, SubscriptionCallback>;
let transactions: TransactionsCache;
let auctions: AuctionsCache;

const fakeTxs = [
  mock.entity.crossChainTx("3000", "4000"),
  mock.entity.crossChainTx("3000", "4000", {
    status: CrossChainTxStatus.Prepared,
    asset: mkAddress("0xaaa"),
    transactionId: getRandomBytes32(),
    nonce: 1234,
    user: mkAddress("0xa"),
  }),
];

const fakeFulfill: FulfillArgs = {
  params: {
    recipient: "0xbeefdead",
    callTo: "0x",
    callData: "0x0",
    originDomain: "2000",
    destinationDomain: "3000",
  },
  local: "0xdedddddddddddddd",
  router: mkAddress("0xa"),
  feePercentage: "0.1",
  nonce: "1",
  amount: "10",
  relayerSignature: "0xsigsigsig",
};

describe("Redis Mocks", () => {
  before(async () => {
    logger.debug(`Subscribing to Channels for Redis Pub/Sub`);
    const RedisSub = new RedisMock();

    RedisSub.subscribe(StoreChannel.NewHighestNonce);
    RedisSub.subscribe(StoreChannel.NewPreparedTx);
    RedisSub.subscribe(StoreChannel.NewStatus);
    RedisSub.subscribe(StoreChannel.NewBid);

    RedisSub.on("message", (chan: any, msg: any) => {
      console.log(`Got Subscribed Message Channel: ${chan as string}, Message Data: ${msg as string}`);
    });

    subscriptions = new Map();
    transactions = new TransactionsCache({ url: "mock", mock: true, logger });
    auctions = new AuctionsCache({ url: "mock", mock: true, logger });
  });

  describe("TransactionsCache", () => {
    describe("#storeStatus", () => {
      it("happy: should return true if `set` returns OK", async () => {
        const res = await transactions.storeStatus(fakeTxs[0].transactionId, CrossChainTxStatus.Prepared);
        expect(res).to.be.eq(true);
      });

      it("should return false if the new status is different from the previous one", async () => {
        await transactions.storeStatus(fakeTxs[0].transactionId, CrossChainTxStatus.Prepared);
        const res = await transactions.storeStatus(fakeTxs[0].transactionId, CrossChainTxStatus.Fulfilled);
        expect(res).to.be.eq(true);
      });

      it("should return false if the new status is same as the previous one", async () => {
        await transactions.storeStatus(fakeTxs[0].transactionId, CrossChainTxStatus.Prepared);
        const res = await transactions.storeStatus(fakeTxs[0].transactionId, CrossChainTxStatus.Prepared);
        expect(res).to.be.eq(false);
      });
    });

    describe("#getStatus", () => {
      it("happy: should get status of transaction by ID", async () => {
        await transactions.storeStatus(fakeTxs[1].transactionId, CrossChainTxStatus.Prepared);
        const status = await transactions.getStatus(fakeTxs[1].transactionId);
        expect(status).to.be.eq(CrossChainTxStatus.Prepared);
      });

      it("should return undefined if no exists", async () => {
        const status = await transactions.getStatus("0x111");
        expect(status).to.be.eq(undefined);
      });
    });

    describe("#getLatestNonce", () => {
      it("should get default nonce if no exists", async () => {
        await transactions.storeTxData([fakeTxs[1]]);
        const latestNonce = await transactions.getLatestNonce("1");
        expect(latestNonce).to.be.equal(0);
      });

      it("should get domain's latest nonce according to the cache", async () => {
        await transactions.storeTxData([fakeTxs[1]]);
        const latestNonce = await transactions.getLatestNonce("3000");
        expect(latestNonce).to.be.equal(fakeTxs[1].nonce);
      });
    });

    describe("#storeTxData", () => {
      it("happy: should store transaction data", async () => {
        const mockCrossChainTx = mock.entity.crossChainTx("100", "200");
        //add fake txid's status, should fire off event.
        const res = await transactions.storeTxData([mockCrossChainTx]);
        expect(res).to.be.undefined;
      });

      it("should update latest nonce", async () => {
        let latestNonce = await transactions.getLatestNonce("100");
        expect(latestNonce).to.be.eq(1234);

        const mockCrossChainTx = mock.entity.crossChainTx("100", "200", {
          status: CrossChainTxStatus.Prepared,
          asset: mkAddress("0xaaa"),
          transactionId: getRandomBytes32(),
          nonce: 1235,
          user: mkAddress("0xa"),
        });
        const res = await transactions.storeTxData([mockCrossChainTx]);
        latestNonce = await transactions.getLatestNonce("100");
        expect(latestNonce).to.be.eq(1235);
        expect(res).to.be.undefined;
      });
    });

    describe("#getTxDataByDomainAndTxID", () => {
      it("should return null if no exists", async () => {
        const res = await transactions.getTxDataByDomainAndTxID("101", getRandomBytes32());
        expect(res).to.be.undefined;
      });

      it("happy case: should return data", async () => {
        const transactionId = getRandomBytes32();
        const mockCrossChainTx = mock.entity.crossChainTx("101", "201", {
          status: CrossChainTxStatus.Prepared,
          asset: mkAddress("0xaaa"),
          transactionId,
          nonce: 1234,
          user: mkAddress("0xa"),
        });
        await transactions.storeTxData([mockCrossChainTx]);

        const res = await transactions.getTxDataByDomainAndTxID("101", transactionId);
        expect(res.transactionId).to.eq(transactionId);
      });
    });

    describe("#getTxDataByDomainAndNonce", () => {
      it("should return nil if no exists", async () => {
        const res = await transactions.getTxDataByDomainAndNonce("102", "1234");
        expect(res).to.be.undefined;
      });
      it("happy case: should return data", async () => {
        const transactionId = getRandomBytes32();
        const mockCrossChainTx = mock.entity.crossChainTx("102", "202", {
          status: CrossChainTxStatus.Prepared,
          asset: mkAddress("0xaaa"),
          transactionId,
          nonce: 1234,
          user: mkAddress("0xa"),
        });
        await transactions.storeTxData([mockCrossChainTx]);

        const res = await transactions.getTxDataByDomainAndNonce("102", "1234");
        expect(res.transactionId).to.eq(transactionId);
      });
    });
  });

  describe("AuctionsCache", () => {
    describe("#storeBid", () => {
      it("should store bid by transaction ID and domain", async () => {
        // needs fake Bid object
        // const latestNonce = await transactions.storeBid(fakeTxId, );
      });
    });

    describe("#updateBid", () => {});

    describe("#getBids", () => {
      it("should get bids by status", async () => {});
    });
  });
});
