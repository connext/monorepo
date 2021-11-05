import { providers, constants } from "ethers";

import {
  mkAddress,
  mkBytes32,
  InvariantTransactionData,
  VariantTransactionData,
  TransactionData,
  TransactionPreparedEvent,
  TransactionFulfilledEvent,
  AuctionBid,
  encodeAuctionBid,
  mkSig,
  RequestContext,
  PrepareParams,
  FulfillParams,
  CancelParams,
} from "./index";

export const txReceiptMock = {
  blockHash: "foo",
  blockNumber: 1,
  byzantium: true,
  confirmations: 5,
  contractAddress: mkAddress(),
  cumulativeGasUsed: constants.One,
  from: mkAddress(),
  transactionHash: mkBytes32(),
  gasUsed: constants.One,
  to: mkAddress(),
  logs: [],
  logsBloom: "",
  transactionIndex: 1,
} as unknown as providers.TransactionReceipt;

export const invariantDataMock: InvariantTransactionData = {
  receivingChainCondition: mkAddress("0xbb"),
  sendingChainCondition: mkAddress("0xbb"),
  receivingChainTxManagerAddress: mkAddress("0xbb"),
  user: mkAddress("0xa"),
  router: mkAddress("0xb"),
  initiator: mkAddress("0xbb"),
  sendingAssetId: mkAddress("0xc"),
  receivingAssetId: mkAddress("0xd"),
  sendingChainFallback: mkAddress("0xe"),
  receivingAddress: mkAddress("0xf"),
  callTo: mkAddress("0xaa"),
  sendingChainId: 1337,
  receivingChainId: 1338,
  callDataHash: mkBytes32("0xa"),
  transactionId: mkBytes32("0xb"),
  encodedConditionData: mkBytes32("0xffff"),
};

export const variantDataMock: VariantTransactionData = {
  amount: "1000000",
  expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
  preparedBlockNumber: 1234,
};

export const auctionBidMock: AuctionBid = {
  user: invariantDataMock.user,
  router: invariantDataMock.router,
  initiator: invariantDataMock.initiator,
  sendingAssetId: invariantDataMock.sendingAssetId,
  receivingAssetId: invariantDataMock.receivingAssetId,
  receivingAddress: invariantDataMock.receivingAddress,
  sendingChainId: invariantDataMock.sendingChainId,
  receivingChainId: invariantDataMock.receivingChainId,
  callTo: invariantDataMock.callTo,
  callDataHash: invariantDataMock.callDataHash,
  transactionId: invariantDataMock.transactionId,
  amount: variantDataMock.amount,
  sendingChainTxManagerAddress: mkAddress("0x1"),
  receivingChainTxManagerAddress: mkAddress("0x2"),
  expiry: variantDataMock.expiry,
  encryptedCallData: "0x",
  amountReceived: "120",
  bidExpiry: 123457,
  encodedConditionData: invariantDataMock.encodedConditionData,
  receivingChainCondition: invariantDataMock.receivingChainCondition,
  sendingChainCondition: invariantDataMock.sendingChainCondition,
};

export const txDataMock: TransactionData = {
  ...invariantDataMock,
  ...variantDataMock,
};

export const transactionSubgraphMock: any = {
  user: { id: txDataMock.user },
  router: { id: txDataMock.router },
  initiator: txDataMock.initiator,
  receivingChainTxManagerAddress: txDataMock.receivingChainTxManagerAddress,
  sendingChainId: txDataMock.sendingChainId,
  sendingAssetId: txDataMock.sendingAssetId,
  sendingChainFallback: txDataMock.sendingChainFallback,
  amount: txDataMock.amount,
  receivingChainId: txDataMock.receivingChainId,
  receivingAssetId: txDataMock.receivingAssetId,
  receivingAddress: txDataMock.receivingAddress,
  expiry: txDataMock.expiry,
  callDataHash: txDataMock.callDataHash,
  callTo: txDataMock.callTo,
  transactionId: txDataMock.transactionId,
  preparedBlockNumber: txDataMock.preparedBlockNumber,
};

export const senderPrepareDataMock: TransactionPreparedEvent = {
  txData: txDataMock,
  caller: mkAddress("0xf"),
  encryptedCallData: mkSig("0xabc"),
  encodedBid: encodeAuctionBid(auctionBidMock),
  bidSignature: mkSig("0xeee"),
};

export const receiverFulfillDataMock: TransactionFulfilledEvent = {
  txData: txDataMock,
  caller: mkAddress("0xf"),
  relayerFee: "5678",
  callData: "0x",
  signature: mkSig("0xeee"),
};

export const requestContextMock: RequestContext = {
  id: "0xf",
  origin: "0xe",
};

export const prepareParamsMock: PrepareParams = {
  txData: txDataMock,
  amount: "123",
  expiry: 123456,
  encryptedCallData: mkSig("0xabc"),
  encodedBid: encodeAuctionBid(auctionBidMock),
  bidSignature: mkSig("0xeee"),
};

export const fulfillParamsMock: FulfillParams = {
  txData: txDataMock,
  relayerFee: "5678",
  unlockData: mkSig("0xeee"),
  callData: "0x",
};

export const cancelParamsMock: CancelParams = {
  txData: txDataMock,
  unlockData: mkSig("0xeee"),
};

export const sigMock = "0xabcdef1c";
