import { CrossChainTx, CrossChainTxStatus, mkBytes32 } from "@connext/nxtp-utils";
import { stat } from "fs";
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

  const status = await transactions.getStatus(fakeTxId);
  const nonce = await transactions.getLatestNonce("3000");

  if (status) {
    // console.log(`Got fake Tx Status: ${status}`);
  }
  //cover nonce being 0 which is falsy
  if (nonce !== undefined) {
    console.log(`Got latest nonce for domain: ${nonce}`);
  }
}

main();
