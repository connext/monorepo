import {
  Logger,
  CrossChainTxStatus,
  expect,
  mock,
  getRandomBytes32,
  mkAddress,
  CrossChainTx,
  delay,
} from "@connext/nxtp-utils";
import { ConsumersCache, TransactionsCache, AuctionsCache } from "../../../src/index";
import { StoreChannel, SubscriptionCallback } from "../../../src/lib/entities";

const logger = new Logger({ level: "debug" });
const RedisMock = require("ioredis-mock");
let consumers: ConsumersCache;
let auctions: AuctionsCache;
let transactions: TransactionsCache;

const fakeTxs = [
  mock.entity.crossChainTx("1000", "2000"),
  mock.entity.crossChainTx(
    "1000",
    "2000",
    "1000",
    CrossChainTxStatus.Prepared,
    mkAddress("0xaaa"),
    getRandomBytes32(),
    5555,
    mkAddress("0xa"),
  ),
];

let callCountForHightedNonce = 0;
// subscription mock functions
const highestNonceHandler: SubscriptionCallback = async (msg: any, err?: any) => {
  callCountForHightedNonce++;
  console.log(`${highestNonceHandler.name} ===> Received message: ${msg}`);
};

let callCountForNewPrepared = 0;
const newPreparedTxHandler: SubscriptionCallback = async (msg: any, err?: any) => {
  callCountForNewPrepared++;
  console.log(`${newPreparedTxHandler.name} ===> Received message: ${msg}`);
};

let callCountForNewStatus = 0;
const newStatusHandler: SubscriptionCallback = async (msg: any, err?: any) => {
  callCountForNewStatus++;
  console.log(`${newStatusHandler.name} ===> Received message: ${msg}`);
};

let callCountForNewBid = 0;
const newBidHandler: SubscriptionCallback = async (msg: any, err?: any) => {
  callCountForNewBid++;
  console.log(`${newBidHandler.name} ===> Received message: ${msg}`);
};

describe("ConsumersCache", () => {
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

    consumers = new ConsumersCache({ url: "mock", mock: true, logger });
    auctions = new AuctionsCache({ url: "mock", mock: true, logger });
    transactions = new TransactionsCache({ url: "mock", mock: true, logger });
  });

  describe("#subscribe", () => {
    it("should be ok", async () => {
      await consumers.subscribe(StoreChannel.NewHighestNonce, highestNonceHandler);
      expect(consumers.subscriptions.has(StoreChannel.NewHighestNonce)).to.be.eq(true);
      await consumers.subscribe(StoreChannel.NewPreparedTx, newPreparedTxHandler);
      expect(consumers.subscriptions.has(StoreChannel.NewPreparedTx)).to.be.eq(true);
      await consumers.subscribe(StoreChannel.NewStatus, newStatusHandler);
      expect(consumers.subscriptions.has(StoreChannel.NewStatus)).to.be.eq(true);
      await consumers.subscribe(StoreChannel.NewBid, newBidHandler);
      expect(consumers.subscriptions.has(StoreChannel.NewBid));
    });
  });

  describe("#pub/sub", () => {
    it("subscriptions should be called if the new message arrives from its channel", async () => {
      // StoreChannel.NewPreparedTx
      expect(callCountForNewPrepared).to.be.eq(0);
      await transactions.storeTxData([fakeTxs[0]]);
      await delay(100);
      expect(callCountForNewPrepared).to.be.eq(1);

      // StoreChannel.NewStatus
      expect(callCountForNewStatus).to.be.eq(0);
      await transactions.storeStatus((fakeTxs[0] as CrossChainTx).transactionId, CrossChainTxStatus.Fulfilled);
      await delay(100);
      expect(callCountForNewStatus).to.be.eq(1);

      // StoreChannel.NewBid
      expect(callCountForNewBid).to.be.eq(0);
      await auctions.storeBid(mock.entity.bid());
      await delay(100);
      expect(callCountForNewBid).to.be.eq(1);

      // StoreChannel.NewHighestNonce
      callCountForHightedNonce = 0;
      await transactions.storeTxData([fakeTxs[1]]);
      await delay(100);
      expect(callCountForHightedNonce).to.be.eq(1);
    });
  });
});
