import { Logger, CrossChainTxStatus, expect, mock, getRandomBytes32 } from "@connext/nxtp-utils";
import { randomBytes } from "crypto";
import { AuctionsCache, TransactionsCache } from "../src/index";
import { StoreChannel, SubscriptionCallback } from "../src/lib/entities";

const logger = new Logger({ level: "debug" });
const RedisMock = require("ioredis-mock");
let subscriptions: Map<string, SubscriptionCallback>;
let transactions: TransactionsCache;
let auctions: AuctionsCache;

const fakeTxs = [mock.entity.crossChainTx("3000", "4000"), mock.entity.crossChainTx("4", "4000")];

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
      it("should get domain's latest nonce according to the cache", async () => {
        await transactions.storeTxData([fakeTxs[0]]);
        const latestNonce = await transactions.getLatestNonce("4");
        expect(latestNonce).to.be.equal(fakeTxs[0].nonce);
      });

      it("should get different domain's nonce", async () => {
        await transactions.storeTxData([fakeTxs[1]]);
        const latestNonce = await transactions.getLatestNonce("3000");
        expect(latestNonce).to.be.equal(fakeTxs[1].nonce);
      });
    });

    describe("#getTxDataByDomainAndTxID", () => {});

    describe("#getTxDataByDomainAndNonce", () => {});

    describe("#storeTxData", () => {
      it("happy: should store transaction data", async () => {
        //add fake txid's status, should fire off event.
        const res = await transactions.storeTxData([fakeTxs[0]]);
        // TODO:
        expect(res).to.be.undefined;
      });

      it("should store different transaction's data", async () => {
        const res = await transactions.storeTxData([fakeTxs[1]]);
        // TODO:
        expect(res).to.be.undefined;
      });
    });

    describe("#storeBid", () => {});

    describe("#updateBid", () => {});

    describe("#getBidsByTransactionId", () => {});
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
