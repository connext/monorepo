import { mkAddress, variantDataMock, invariantDataMock } from "@connext/nxtp-utils";

import { TransactionStatus as SdkTransactionStatus } from "../src/adapters/subgraph/graphqlsdk";
import { NxtpRouterConfig } from "../src/config";
import {
  ActiveTransaction,
  CancelInput,
  SingleChainTransaction,
  CrosschainTransactionStatus,
  FulfillInput,
  PrepareInput,
} from "../src/lib/entities";

export const routerAddrMock = mkAddress("0xb");

export const MUTATED_AMOUNT = "100";
export const MUTATED_BUFFER = 123400;
export const BID_EXPIRY = 123401;

export const configMock: NxtpRouterConfig = {
  adminToken: "foo",
  authUrl: "http://example.com",
  chainConfig: {
    1337: {
      confirmations: 1,
      providers: ["http://example.com"],
      subgraph: "http://example.com",
      transactionManagerAddress: mkAddress("0xaaa"),
      minGas: "100",
      feePercentage: 0.05,
      safeRelayerFee: 1000,
    },
    1338: {
      confirmations: 1,
      providers: ["http://example.com"],
      subgraph: "http://example.com",
      transactionManagerAddress: mkAddress("0xbbb"),
      minGas: "100",
      feePercentage: 0.05,
      safeRelayerFee: 1000,
    },
  },
  mnemonic: "hello world",
  natsUrl: "http://example.com",
  logLevel: "info",
  swapPools: [
    {
      name: "TEST",
      assets: [
        { assetId: mkAddress("0xc"), chainId: 1337 },
        { assetId: mkAddress("0xf"), chainId: 1338 },
      ],
    },
  ],
  host: "0.0.0.0",
  port: 8080,
};

export const prepareInputMock: PrepareInput = {
  senderAmount: variantDataMock.amount,
  senderExpiry: variantDataMock.expiry,
  encryptedCallData: "0xabc",
  encodedBid: "0xdef",
  bidSignature: "0xcba",
};

export const fulfillInputMock: FulfillInput = {
  amount: variantDataMock.amount,
  expiry: variantDataMock.expiry,
  preparedBlockNumber: variantDataMock.preparedBlockNumber,
  signature: "0xabcd",
  relayerFee: "100000",
  callData: "0xbaa",
  side: "receiver",
};

export const cancelInputMock: CancelInput = {
  amount: variantDataMock.amount,
  expiry: variantDataMock.expiry,
  preparedBlockNumber: variantDataMock.preparedBlockNumber,
  side: "sender",
};

export const activeTransactionPrepareMock: ActiveTransaction<"SenderPrepared"> = {
  crosschainTx: { sending: variantDataMock, invariant: invariantDataMock },
  payload: {
    bidSignature: "0xdbc",
    encodedBid: "0xdef",
    encryptedCallData: "0xabc",
  },
  status: CrosschainTransactionStatus.SenderPrepared,
};

export const activeTransactionFulfillMock: ActiveTransaction<"ReceiverFulfilled"> = {
  crosschainTx: { sending: variantDataMock, invariant: invariantDataMock, receiving: variantDataMock },
  payload: {
    callData: "0x",
    relayerFee: "100000",
    signature: "0xabc",
  },
  status: CrosschainTransactionStatus.ReceiverFulfilled,
};

export const singleChainTransactionMock: SingleChainTransaction = {
  bidSignature: "0xdbc",
  signature: "0xfee",
  relayerFee: "100000",
  encodedBid: "0xdef",
  encryptedCallData: "0xabc",
  status: SdkTransactionStatus.Fulfilled,
  txData: { ...invariantDataMock, ...variantDataMock },
};

const chainDataToMap = (data: any) => {
  const chainData: Map<string, any> = new Map();
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const chainId = item.chainId.toString();
    chainData.set(chainId, Object.fromEntries(Object.entries(item).filter((e) => e[0] !== "chainId")));
  }
  return chainData;
};

export const chainDataMock = chainDataToMap([
  {
    name: "Unit Test Chain",
    chainId: 1337,
    confirmations: 1,
  },
]);
