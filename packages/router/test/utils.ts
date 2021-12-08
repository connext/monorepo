import { mkAddress, variantDataMock, invariantDataMock, mkBytes32, chainDataToMap } from "@connext/nxtp-utils";

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

export const MUTATED_AMOUNT = "100000000000000000000";
export const MUTATED_BUFFER = 123400;
export const BID_EXPIRY = 123401;

export const configMock: NxtpRouterConfig = {
  adminToken: "foo",
  authUrl: "http://example.com",
  chainConfig: {
    1337: {
      confirmations: 1,
      providers: ["http://example.com"],
      subgraph: ["http://example.com"],
      transactionManagerAddress: mkAddress("0xaaa"),
      priceOracleAddress: mkAddress("0x0"),
      multicallAddress: mkAddress("0x1"),
      minGas: "100",
      relayerFeeThreshold: 100,
      allowFulfillRelay: true,
      subgraphSyncBuffer: 10,
      gasStations: [],
      weight: 1,
    },
    1338: {
      confirmations: 1,
      providers: ["http://example.com"],
      subgraph: ["http://example.com"],
      transactionManagerAddress: mkAddress("0xbbb"),
      priceOracleAddress: mkAddress("0x0"),
      multicallAddress: mkAddress("0x1"),
      minGas: "100",
      relayerFeeThreshold: 100,
      allowFulfillRelay: true,
      subgraphSyncBuffer: 10,
      gasStations: [],
      weight: 1,
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
        { assetId: mkAddress("0xd"), chainId: 1338 },
      ],
      mainnetEquivalent: mkAddress("0xd"),
    },
  ],
  allowedTolerance: 10,
  host: "0.0.0.0",
  port: 8080,
  requestLimit: 2000,
  cleanUpMode: false,
  diagnosticMode: false,
  allowedUsers: [],
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
  relayerFee: "10",
  callData: "0xbaa",
  side: "receiver",
};

export const mockHashes = {
  prepareHash: mkBytes32("0xa"),
};

export const cancelInputMock: CancelInput = {
  amount: variantDataMock.amount,
  expiry: variantDataMock.expiry,
  preparedBlockNumber: variantDataMock.preparedBlockNumber,
  preparedTransactionHash: mockHashes.prepareHash,
  side: "sender",
};

export const sendingMock = variantDataMock;
export const receivingMock = {
  amount: "900000",
  expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 2,
  preparedBlockNumber: 1221,
};

export const activeTransactionPrepareMock: ActiveTransaction<"SenderPrepared"> = {
  crosschainTx: { sending: sendingMock, invariant: invariantDataMock },
  payload: {
    bidSignature: "0xdbc",
    encodedBid: "0xdef",
    encryptedCallData: "0xabc",
    hashes: { sending: mockHashes },
  },
  status: CrosschainTransactionStatus.SenderPrepared,
};

export const activeTransactionFulfillMock: ActiveTransaction<"ReceiverFulfilled"> = {
  crosschainTx: { sending: sendingMock, invariant: invariantDataMock, receiving: receivingMock },
  payload: {
    callData: "0x",
    relayerFee: "100000",
    signature: "0xabc",
    hashes: { sending: mockHashes, receiving: { ...mockHashes, fulfillHash: mkBytes32("0xb") } },
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

export const chainDataMock = chainDataToMap([
  {
    name: "Unit Test Chain",
    chainId: 1337,
    confirmations: 1,
  },
]);
