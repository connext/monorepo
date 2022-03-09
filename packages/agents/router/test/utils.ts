import { mkAddress, variantDataMock, invariantDataMock, mkBytes32, chainDataToMap } from "@connext/nxtp-utils";

import { NxtpRouterConfig } from "../src/config";

export const routerAddrMock = mkAddress("0xb");
export const routerContractAddressMock = mkAddress("0xccc");

export const MUTATED_AMOUNT = "100000000000000000000";
export const MUTATED_BUFFER = 123400;
export const BID_EXPIRY = 123401;

export const configMock: NxtpRouterConfig = {
  chains: {
    "1337": {
      assets: [
        {
          name: "TEST",
          address: mkAddress("0xbeefbeefbeef"),
        },
      ],
      confirmations: 1,
      providers: ["http://example.com"],
      subgraph: {
        runtime: ["http://example.com"],
        analytics: ["http://example.com"],
        maxLag: 10,
      },
      deployments: {
        transactionManager: mkAddress("0xaaa"),
      },
      gasStations: [],
    },
    "1338": {
      assets: [
        {
          name: "TEST",
          address: mkAddress("0xbeefbeefbeef"),
        },
      ],
      confirmations: 1,
      providers: ["http://example.com"],
      subgraph: {
        runtime: ["http://example.com"],
        analytics: ["http://example.com"],
        maxLag: 10,
      },
      deployments: {
        transactionManager: mkAddress("0xaaa"),
      },
      gasStations: [],
    },
  },
  mnemonic: "hello world",
  logLevel: "info",
  redisUrl: "",
  sequencerUrl: "",
  server: {
    host: "0.0.0.0",
    port: 3000,
    requestLimit: 2000,
    adminToken: "blahblahblah",
  },
  network: "testnet",
  maxSlippage: 0,
  mode: {
    diagnostic: false,
    cleanup: false,
    priceCaching: false,
  },
};

// export const prepareInputMock: PrepareInput = {
//   senderAmount: variantDataMock.amount,
//   senderExpiry: variantDataMock.expiry,
//   encryptedCallData: "0xabc",
//   encodedBid: "0xdef",
//   bidSignature: "0xcba",
// };

// export const fulfillInputMock: FulfillInput = {
//   amount: variantDataMock.amount,
//   expiry: variantDataMock.expiry,
//   preparedBlockNumber: variantDataMock.preparedBlockNumber,
//   signature: "0xabcd",
//   relayerFee: "10",
//   callData: "0x",
// };

export const mockHashes = {
  prepareHash: mkBytes32("0xa"),
};

// export const cancelInputMock: CancelInput = {
//   amount: variantDataMock.amount,
//   expiry: variantDataMock.expiry,
//   preparedBlockNumber: variantDataMock.preparedBlockNumber,
//   preparedTransactionHash: mockHashes.prepareHash,
//   side: "sender",
// };

export const sendingMock = variantDataMock;
export const receivingMock = {
  amount: "900000",
  expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 2,
  preparedBlockNumber: 1221,
};

// export const activeTransactionPrepareMock: ActiveTransaction<"SenderPrepared"> = {
//   crosschainTx: { sending: sendingMock, invariant: invariantDataMock },
//   payload: {
//     bidSignature: "0xdbc",
//     encodedBid: "0xdef",
//     encryptedCallData: "0xabc",
//     hashes: { sending: mockHashes },
//   },
//   status: CrosschainTransactionStatus.SenderPrepared,
// };

// export const activeTransactionFulfillMock: ActiveTransaction<"ReceiverFulfilled"> = {
//   crosschainTx: { sending: sendingMock, invariant: invariantDataMock, receiving: receivingMock },
//   payload: {
//     callData: "0x",
//     relayerFee: "100000",
//     signature: "0xabc",
//     hashes: { sending: mockHashes, receiving: { ...mockHashes, fulfillHash: mkBytes32("0xb") } },
//   },
//   status: CrosschainTransactionStatus.ReceiverFulfilled,
// };

// export const singleChainTransactionMock: SingleChainTransaction = {
//   bidSignature: "0xdbc",
//   signature: "0xfee",
//   relayerFee: "100000",
//   encodedBid: "0xdef",
//   encryptedCallData: "0xabc",
//   status: SdkTransactionStatus.Fulfilled,
//   txData: { ...invariantDataMock, ...variantDataMock },
// };

export const chainDataMock = chainDataToMap([
  {
    name: "Unit Test Chain 1",
    chainId: 1337,
    confirmations: 1,
    assetId: {},
  },
  {
    name: "Unit Test Chain 2",
    chainId: 1338,
    confirmations: 1,
    assetId: {},
  },
]);

export const relayerFeeMock = "1234";

export const callDataMock = "0xabc";
