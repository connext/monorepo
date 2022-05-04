import { Logger, XTransferStatus, expect, mock, getRandomBytes32, mkAddress, delay } from "@connext/nxtp-utils";

import { ConsumersCache, TransfersCache, AuctionsCache } from "../../../src/index";
import { StoreChannel, SubscriptionCallback } from "../../../src/lib/entities";

const logger = new Logger({ level: "debug" });
const RedisMock = require("ioredis-mock");
let consumers: ConsumersCache;
let transactions: TransfersCache;

const fakeTxs = [
  mock.entity.xtransfer({
    originDomain: "1000",
    destinationDomain: "2000",
  }),
  mock.entity.xtransfer({
    originDomain: "1000",
    destinationDomain: "2000",
    amount: "1000",
    nonce: 5555,
    asset: mkAddress("0xaaa"),
    user: mkAddress("0xa"),
  }),
];

let callCountForHighestNonce = 0;
// subscription mock functions
const highestNonceHandler: SubscriptionCallback = async (msg: any, err?: any) => {
  callCountForHighestNonce++;
  console.log(`${highestNonceHandler.name} ===> Received message: ${msg}`);
};

describe("ConsumersCache", () => {
  before(async () => {
    logger.debug(`Subscribing to Channels for Redis Pub/Sub`);
    const RedisSub = new RedisMock();

    RedisSub.subscribe(StoreChannel.NewHighestNonce);

    RedisSub.on("message", (chan: any, msg: any) => {
      console.log(`Got Subscribed Message Channel: ${chan as string}, Message Data: ${msg as string}`);
    });

    consumers = new ConsumersCache({ host: "mock", port: 1234, mock: true, logger });
    transactions = new TransfersCache({ host: "mock", port: 1234, mock: true, logger });
  });

  describe("#subscribe", () => {
    it("should be ok", async () => {
      await consumers.subscribe(StoreChannel.NewHighestNonce, highestNonceHandler);
      expect(consumers.subscriptions.has(StoreChannel.NewHighestNonce)).to.be.eq(true);
    });
  });

  describe("#pub/sub", () => {
    it("subscriptions should be called if the new message arrives from its channel", async () => {
      // StoreChannel.NewHighestNonce
      callCountForHighestNonce = 0;
      await transactions.storeTransfers([fakeTxs[0]]);
      await delay(100);
      expect(callCountForHighestNonce).to.be.eq(1);
    });
  });
});
