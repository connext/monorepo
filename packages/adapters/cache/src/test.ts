import { CrossChainTx, CrossChainTxStatus, mkBytes32, txDataMock } from "@connext/nxtp-utils";
import { TransactionsCache } from "./index";
import { StoreChannel } from "./lib/entities";
const RedisMock = require("ioredis-mock");

const RedisSub = new RedisMock();

const fakeTxId = "0xdeadbeefdeadbeefdeadbeefdeadbeef";
const fakeCrossChainTxData: CrossChainTx = {
  originDomain: "3000",
  destinationDomain: "2000",
  status: CrossChainTxStatus.Prepared,
  transactionId: fakeTxId,
  recipient: mkBytes32(),
  router: mkBytes32(),
  prepareCaller: mkBytes32(),
  prepareTransactingAmount: "10",
  prepareLocalAmount: "9",
  prepareTransactingAsset: mkBytes32(),
  prepareLocalAsset: mkBytes32(),
  callTo: mkBytes32(),
  callData: "0x",
  prepareTransactionHash: mkBytes32(),
  prepareTimestamp: Date.now(),
  prepareGasPrice: "100.1",
  prepareGasLimit: "140000",
  prepareBlockNumber: 2000000,
  fulfillCaller: mkBytes32(),
  fulfillTransactingAmount: "9",
  fulfillLocalAsset: mkBytes32(),
  fulfillTransactionHash: "",
  fulfillTimestamp: "",
  fulfillGasPrice: "",
  fulfillGasLimit: "",
  fulfillBlockNumber: 0,
  externalCallHash: mkBytes32(),
  reconciledTransactionHash: "",
  reconciledGasPrice: "",
  reconciledBlockNumber: 0,
  nonce: 0,
  fulfillLocalAmount: "",
  fulfillTransactingAsset: "",
  reconciledTimestamp: "",
  reconciledGasLimit: "",
};

export async function main() {
  const subscriptions = new Map();
  const transactions = new TransactionsCache({ url: "mock", subscriptions: subscriptions });

  RedisSub.subscribe(StoreChannel.NewHighestNonce);
  RedisSub.subscribe(StoreChannel.NewPreparedTx);
  RedisSub.subscribe(StoreChannel.NewStatus);

  //setup sub instance
  RedisSub.on("message", (chan: any, msg: any) => {
    console.log(`Got Subscribed Message Channel: ${chan as string}, Message Data: ${msg as string}`);
  });

  //add fake txid's status, should fire off event.
  await transactions.storeStatus(fakeTxId, CrossChainTxStatus.Prepared);
  await transactions.storeTxData([fakeCrossChainTxData]);

  //store to different domains,
  const secondFakeTxData = { ...fakeCrossChainTxData, originDomain: "4", transactionId: mkBytes32() };
  await transactions.storeTxData([secondFakeTxData]);
  await transactions.storeStatus(secondFakeTxData.transactionId,CrossChainTxStatus.Fulfilled)

  const statusFor3000 = await transactions.getStatus(fakeCrossChainTxData.transactionId);
  const nonceFor3000 = await transactions.getLatestNonce("3000");

  const statusFor4 = await transactions.getStatus(secondFakeTxData.transactionId);
  const nonceFor4 = await transactions.getLatestNonce("4")

  

  if (statusFor3000) {
    console.log(`Queried fake Tx Status for 3000: ${statusFor3000}`);
  }
  if (statusFor4) {
    console.log(`Queried fake Tx Status for 4: ${statusFor4}`)
  }
  //cover nonce being 0 which is falsy
  if (nonceFor3000 !== undefined) {
    console.log(`Queried latest nonce for 3000: ${nonceFor3000}`);
  }
  if (nonceFor4 !== undefined) {
    console.log(`Queried latest nonce for 4: ${nonceFor4}`);
  }
}

// main();
