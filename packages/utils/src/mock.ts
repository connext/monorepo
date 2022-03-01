import { providers, constants, BigNumber } from "ethers";

import {
  mkAddress,
  mkBytes32,
  InvariantTransactionData,
  VariantTransactionData,
  TransactionData,
  TransactionFulfilledEvent,
  mkSig,
  RequestContext,
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
  effectiveGasPrice: BigNumber.from(10),
  gasUsed: constants.One,
  to: mkAddress(),
  logs: [],
  logsBloom: "",
  transactionIndex: 1,
} as unknown as providers.TransactionReceipt;

export const invariantDataMock: InvariantTransactionData = {
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
};

export const variantDataMock: VariantTransactionData = {
  amount: "1000000",
  expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
  preparedBlockNumber: 1234,
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

export const sigMock = "0xabcdef1c";
