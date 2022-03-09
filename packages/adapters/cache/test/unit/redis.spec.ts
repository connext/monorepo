import { Logger, CrossChainTxStatus, mkBytes32, expect } from "@connext/nxtp-utils";
import { TransactionsCache } from "../../src/index";
import { StoreChannel } from "../../src/lib/entities";
import { fakeCrossChainTxData, fakeTxId } from "../helpers/mocks";

const logger = new Logger({ level: "debug" });
const RedisMock = require("ioredis-mock");

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
    const secondFakeTxData = { ...fakeCrossChainTxData, originDomain: "4", transactionId: mkBytes32() };


    const subscriptions = new Map();
    const transactions = new TransactionsCache({ url: "mock", subscriptions: subscriptions });
    
    it(`Should Store Status`, async () => {
      const res = await transactions.storeStatus(fakeTxId, CrossChainTxStatus.Prepared);

    })

    it(`Should Get Status`, async () => {
      const status = await transactions.getStatus(fakeCrossChainTxData.transactionId);
      expect(status).to.not.be(undefined);
    })

    it(`Should Store Different Domain's Status`, async () => {
      const res = await transactions.storeStatus(secondFakeTxData.transactionId, CrossChainTxStatus.Prepared);
      expect(res).to.not.be(undefined);
    })

    it(`Should Get Different Domain's Status`, async () => {
      const status = await transactions.getStatus(secondFakeTxData.transactionId);
      expect(status).to.not.be(undefined);
    })

    it(`Should Store TX Data`, async () => {
      //add fake txid's status, should fire off event.
      const res = await transactions.storeTxData([fakeCrossChainTxData]);
    })

    it(`Should Get Domain's Nonce`, async () => {
      const latestNonce = await transactions.getLatestNonce("4");
      expect(latestNonce).to.be.equal(fakeCrossChainTxData.nonce);

    })

    it(`Should Store Different TX Data `, async () => {
      const res = await transactions.storeTxData([secondFakeTxData]);
      expect(res).to.not.be(undefined);
    })

    it(`Should Get Different Domain's Nonce`, async () => {
      const latestNonce = await transactions.getLatestNonce("3000");
      expect(latestNonce).to.be.equal(secondFakeTxData.nonce);

    })

    it(`Should Put a Bid in for Domain`, async () => {
      // needs fake Bid object
      // const latestNonce = await transactions.storeBid(fakeTxId, );
    })
    
  
  })
 
})

